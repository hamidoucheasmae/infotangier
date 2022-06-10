/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { sequence } from '@angular/animations';
import { invalidNodeType, invalidParamValue, invalidStyleParams, invalidTimingValue, negativeDelayValue, negativeStepValue } from './error_helpers';
import { isNode } from './render/shared';
export const ONE_SECOND = 1000;
export const SUBSTITUTION_EXPR_START = '{{';
export const SUBSTITUTION_EXPR_END = '}}';
export const ENTER_CLASSNAME = 'ng-enter';
export const LEAVE_CLASSNAME = 'ng-leave';
export const NG_TRIGGER_CLASSNAME = 'ng-trigger';
export const NG_TRIGGER_SELECTOR = '.ng-trigger';
export const NG_ANIMATING_CLASSNAME = 'ng-animating';
export const NG_ANIMATING_SELECTOR = '.ng-animating';
export function resolveTimingValue(value) {
    if (typeof value == 'number')
        return value;
    const matches = value.match(/^(-?[\.\d]+)(m?s)/);
    if (!matches || matches.length < 2)
        return 0;
    return _convertTimeValueToMS(parseFloat(matches[1]), matches[2]);
}
function _convertTimeValueToMS(value, unit) {
    switch (unit) {
        case 's':
            return value * ONE_SECOND;
        default: // ms or something else
            return value;
    }
}
export function resolveTiming(timings, errors, allowNegativeValues) {
    return timings.hasOwnProperty('duration') ?
        timings :
        parseTimeExpression(timings, errors, allowNegativeValues);
}
function parseTimeExpression(exp, errors, allowNegativeValues) {
    const regex = /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i;
    let duration;
    let delay = 0;
    let easing = '';
    if (typeof exp === 'string') {
        const matches = exp.match(regex);
        if (matches === null) {
            errors.push(invalidTimingValue(exp));
            return { duration: 0, delay: 0, easing: '' };
        }
        duration = _convertTimeValueToMS(parseFloat(matches[1]), matches[2]);
        const delayMatch = matches[3];
        if (delayMatch != null) {
            delay = _convertTimeValueToMS(parseFloat(delayMatch), matches[4]);
        }
        const easingVal = matches[5];
        if (easingVal) {
            easing = easingVal;
        }
    }
    else {
        duration = exp;
    }
    if (!allowNegativeValues) {
        let containsErrors = false;
        let startIndex = errors.length;
        if (duration < 0) {
            errors.push(negativeStepValue());
            containsErrors = true;
        }
        if (delay < 0) {
            errors.push(negativeDelayValue());
            containsErrors = true;
        }
        if (containsErrors) {
            errors.splice(startIndex, 0, invalidTimingValue(exp));
        }
    }
    return { duration, delay, easing };
}
export function copyObj(obj, destination = {}) {
    Object.keys(obj).forEach(prop => {
        destination[prop] = obj[prop];
    });
    return destination;
}
export function normalizeStyles(styles) {
    const normalizedStyles = {};
    if (Array.isArray(styles)) {
        styles.forEach(data => copyStyles(data, false, normalizedStyles));
    }
    else {
        copyStyles(styles, false, normalizedStyles);
    }
    return normalizedStyles;
}
export function copyStyles(styles, readPrototype, destination = {}) {
    if (readPrototype) {
        // we make use of a for-in loop so that the
        // prototypically inherited properties are
        // revealed from the backFill map
        for (let prop in styles) {
            destination[prop] = styles[prop];
        }
    }
    else {
        copyObj(styles, destination);
    }
    return destination;
}
function getStyleAttributeString(element, key, value) {
    // Return the key-value pair string to be added to the style attribute for the
    // given CSS style key.
    if (value) {
        return key + ':' + value + ';';
    }
    else {
        return '';
    }
}
function writeStyleAttribute(element) {
    // Read the style property of the element and manually reflect it to the
    // style attribute. This is needed because Domino on platform-server doesn't
    // understand the full set of allowed CSS properties and doesn't reflect some
    // of them automatically.
    let styleAttrValue = '';
    for (let i = 0; i < element.style.length; i++) {
        const key = element.style.item(i);
        styleAttrValue += getStyleAttributeString(element, key, element.style.getPropertyValue(key));
    }
    for (const key in element.style) {
        // Skip internal Domino properties that don't need to be reflected.
        if (!element.style.hasOwnProperty(key) || key.startsWith('_')) {
            continue;
        }
        const dashKey = camelCaseToDashCase(key);
        styleAttrValue += getStyleAttributeString(element, dashKey, element.style[key]);
    }
    element.setAttribute('style', styleAttrValue);
}
export function setStyles(element, styles, formerStyles) {
    if (element['style']) {
        Object.keys(styles).forEach(prop => {
            const camelProp = dashCaseToCamelCase(prop);
            if (formerStyles && !formerStyles.hasOwnProperty(prop)) {
                formerStyles[prop] = element.style[camelProp];
            }
            element.style[camelProp] = styles[prop];
        });
        // On the server set the 'style' attribute since it's not automatically reflected.
        if (isNode()) {
            writeStyleAttribute(element);
        }
    }
}
export function eraseStyles(element, styles) {
    if (element['style']) {
        Object.keys(styles).forEach(prop => {
            const camelProp = dashCaseToCamelCase(prop);
            element.style[camelProp] = '';
        });
        // On the server set the 'style' attribute since it's not automatically reflected.
        if (isNode()) {
            writeStyleAttribute(element);
        }
    }
}
export function normalizeAnimationEntry(steps) {
    if (Array.isArray(steps)) {
        if (steps.length == 1)
            return steps[0];
        return sequence(steps);
    }
    return steps;
}
export function validateStyleParams(value, options, errors) {
    const params = options.params || {};
    const matches = extractStyleParams(value);
    if (matches.length) {
        matches.forEach(varName => {
            if (!params.hasOwnProperty(varName)) {
                errors.push(invalidStyleParams(varName));
            }
        });
    }
}
const PARAM_REGEX = new RegExp(`${SUBSTITUTION_EXPR_START}\\s*(.+?)\\s*${SUBSTITUTION_EXPR_END}`, 'g');
export function extractStyleParams(value) {
    let params = [];
    if (typeof value === 'string') {
        let match;
        while (match = PARAM_REGEX.exec(value)) {
            params.push(match[1]);
        }
        PARAM_REGEX.lastIndex = 0;
    }
    return params;
}
export function interpolateParams(value, params, errors) {
    const original = value.toString();
    const str = original.replace(PARAM_REGEX, (_, varName) => {
        let localVal = params[varName];
        // this means that the value was never overridden by the data passed in by the user
        if (!params.hasOwnProperty(varName)) {
            errors.push(invalidParamValue(varName));
            localVal = '';
        }
        return localVal.toString();
    });
    // we do this to assert that numeric values stay as they are
    return str == original ? value : str;
}
export function iteratorToArray(iterator) {
    const arr = [];
    let item = iterator.next();
    while (!item.done) {
        arr.push(item.value);
        item = iterator.next();
    }
    return arr;
}
const DASH_CASE_REGEXP = /-+([a-z0-9])/g;
export function dashCaseToCamelCase(input) {
    return input.replace(DASH_CASE_REGEXP, (...m) => m[1].toUpperCase());
}
function camelCaseToDashCase(input) {
    return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
export function allowPreviousPlayerStylesMerge(duration, delay) {
    return duration === 0 || delay === 0;
}
export function balancePreviousStylesIntoKeyframes(element, keyframes, previousStyles) {
    const previousStyleProps = Object.keys(previousStyles);
    if (previousStyleProps.length && keyframes.length) {
        let startingKeyframe = keyframes[0];
        let missingStyleProps = [];
        previousStyleProps.forEach(prop => {
            if (!startingKeyframe.hasOwnProperty(prop)) {
                missingStyleProps.push(prop);
            }
            startingKeyframe[prop] = previousStyles[prop];
        });
        if (missingStyleProps.length) {
            // tslint:disable-next-line
            for (var i = 1; i < keyframes.length; i++) {
                let kf = keyframes[i];
                missingStyleProps.forEach(function (prop) {
                    kf[prop] = computeStyle(element, prop);
                });
            }
        }
    }
    return keyframes;
}
export function visitDslNode(visitor, node, context) {
    switch (node.type) {
        case 7 /* Trigger */:
            return visitor.visitTrigger(node, context);
        case 0 /* State */:
            return visitor.visitState(node, context);
        case 1 /* Transition */:
            return visitor.visitTransition(node, context);
        case 2 /* Sequence */:
            return visitor.visitSequence(node, context);
        case 3 /* Group */:
            return visitor.visitGroup(node, context);
        case 4 /* Animate */:
            return visitor.visitAnimate(node, context);
        case 5 /* Keyframes */:
            return visitor.visitKeyframes(node, context);
        case 6 /* Style */:
            return visitor.visitStyle(node, context);
        case 8 /* Reference */:
            return visitor.visitReference(node, context);
        case 9 /* AnimateChild */:
            return visitor.visitAnimateChild(node, context);
        case 10 /* AnimateRef */:
            return visitor.visitAnimateRef(node, context);
        case 11 /* Query */:
            return visitor.visitQuery(node, context);
        case 12 /* Stagger */:
            return visitor.visitStagger(node, context);
        default:
            throw invalidNodeType(node.type);
    }
}
export function computeStyle(element, prop) {
    return window.getComputedStyle(element)[prop];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuaW1hdGlvbnMvYnJvd3Nlci9zcmMvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxPQUFPLEVBQTZFLFFBQVEsRUFBYSxNQUFNLHFCQUFxQixDQUFDO0FBSXJJLE9BQU8sRUFBQyxlQUFlLEVBQUUsaUJBQWlCLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNsSixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFdkMsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQztBQUUvQixNQUFNLENBQUMsTUFBTSx1QkFBdUIsR0FBRyxJQUFJLENBQUM7QUFDNUMsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQUcsSUFBSSxDQUFDO0FBQzFDLE1BQU0sQ0FBQyxNQUFNLGVBQWUsR0FBRyxVQUFVLENBQUM7QUFDMUMsTUFBTSxDQUFDLE1BQU0sZUFBZSxHQUFHLFVBQVUsQ0FBQztBQUMxQyxNQUFNLENBQUMsTUFBTSxvQkFBb0IsR0FBRyxZQUFZLENBQUM7QUFDakQsTUFBTSxDQUFDLE1BQU0sbUJBQW1CLEdBQUcsYUFBYSxDQUFDO0FBQ2pELE1BQU0sQ0FBQyxNQUFNLHNCQUFzQixHQUFHLGNBQWMsQ0FBQztBQUNyRCxNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FBRyxlQUFlLENBQUM7QUFFckQsTUFBTSxVQUFVLGtCQUFrQixDQUFDLEtBQW9CO0lBQ3JELElBQUksT0FBTyxLQUFLLElBQUksUUFBUTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBRTNDLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUNqRCxJQUFJLENBQUMsT0FBTyxJQUFJLE9B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RUFBRSxPQUFPLENBQUMsQ0FBQztRQUMvQztZQUNFLE9BQU8sT0FBTyxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNsRDtZQUNFLE9BQU8sT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDaEQ7WUFDRSxPQUFPLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQzNDO1lBQ0UsT0FBTyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM3QztZQUNFLE1BQU0sZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNwQztBQUNILENBQUM7QUFFRCxNQUFNLFVBQVUsWUFBWSxDQUFDLE9BQVksRUFBRSxJQUFZO0lBQ3JELE9BQWEsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBRSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7QW5pbWF0ZVRpbWluZ3MsIEFuaW1hdGlvbk1ldGFkYXRhLCBBbmltYXRpb25NZXRhZGF0YVR5cGUsIEFuaW1hdGlvbk9wdGlvbnMsIHNlcXVlbmNlLCDJtVN0eWxlRGF0YX0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5cbmltcG9ydCB7QXN0IGFzIEFuaW1hdGlvbkFzdCwgQXN0VmlzaXRvciBhcyBBbmltYXRpb25Bc3RWaXNpdG9yfSBmcm9tICcuL2RzbC9hbmltYXRpb25fYXN0JztcbmltcG9ydCB7QW5pbWF0aW9uRHNsVmlzaXRvcn0gZnJvbSAnLi9kc2wvYW5pbWF0aW9uX2RzbF92aXNpdG9yJztcbmltcG9ydCB7aW52YWxpZE5vZGVUeXBlLCBpbnZhbGlkUGFyYW1WYWx1ZSwgaW52YWxpZFN0eWxlUGFyYW1zLCBpbnZhbGlkVGltaW5nVmFsdWUsIG5lZ2F0aXZlRGVsYXlWYWx1ZSwgbmVnYXRpdmVTdGVwVmFsdWV9IGZyb20gJy4vZXJyb3JfaGVscGVycyc7XG5pbXBvcnQge2lzTm9kZX0gZnJvbSAnLi9yZW5kZXIvc2hhcmVkJztcblxuZXhwb3J0IGNvbnN0IE9ORV9TRUNPTkQgPSAxMDAwO1xuXG5leHBvcnQgY29uc3QgU1VCU1RJVFVUSU9OX0VYUFJfU1RBUlQgPSAne3snO1xuZXhwb3J0IGNvbnN0IFNVQlNUSVRVVElPTl9FWFBSX0VORCA9ICd9fSc7XG5leHBvcnQgY29uc3QgRU5URVJfQ0xBU1NOQU1FID0gJ25nLWVudGVyJztcbmV4cG9ydCBjb25zdCBMRUFWRV9DTEFTU05BTUUgPSAnbmctbGVhdmUnO1xuZXhwb3J0IGNvbnN0IE5HX1RSSUdHRVJfQ0xBU1NOQU1FID0gJ25nLXRyaWdnZXInO1xuZXhwb3J0IGNvbnN0IE5HX1RSSUdHRVJfU0VMRUNUT1IgPSAnLm5nLXRyaWdnZXInO1xuZXhwb3J0IGNvbnN0IE5HX0FOSU1BVElOR19DTEFTU05BTUUgPSAnbmctYW5pbWF0aW5nJztcbmV4cG9ydCBjb25zdCBOR19BTklNQVRJTkdfU0VMRUNUT1IgPSAnLm5nLWFuaW1hdGluZyc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlVGltaW5nVmFsdWUodmFsdWU6IHN0cmluZ3xudW1iZXIpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykgcmV0dXJuIHZhbHVlO1xuXG4gIGNvbnN0IG1hdGNoZXMgPSB2YWx1ZS5tYXRjaCgvXigtP1tcXC5cXGRdKykobT9zKS8pO1xuICBpZiAoIW1hdGNoZXMgfHwgbWF0Y2hlcy5sZW5ndGggPCAyKSByZXR1cm4gMDtcblxuICByZXR1cm4gX2NvbnZlcnRUaW1lVmFsdWVUb01TKHBhcnNlRmxvYXQobWF0Y2hlc1sxXSksIG1hdGNoZXNbMl0pO1xufVxuXG5mdW5jdGlvbiBfY29udmVydFRpbWVWYWx1ZVRvTVModmFsdWU6IG51bWJlciwgdW5pdDogc3RyaW5nKTogbnVtYmVyIHtcbiAgc3dpdGNoICh1bml0KSB7XG4gICAgY2FzZSAncyc6XG4gICAgICByZXR1cm4gdmFsdWUgKiBPTkVfU0VDT05EO1xuICAgIGRlZmF1bHQ6ICAvLyBtcyBvciBzb21ldGhpbmcgZWxzZVxuICAgICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXNvbHZlVGltaW5nKFxuICAgIHRpbWluZ3M6IHN0cmluZ3xudW1iZXJ8QW5pbWF0ZVRpbWluZ3MsIGVycm9yczogRXJyb3JbXSwgYWxsb3dOZWdhdGl2ZVZhbHVlcz86IGJvb2xlYW4pIHtcbiAgcmV0dXJuIHRpbWluZ3MuaGFzT3duUHJvcGVydHkoJ2R1cmF0aW9uJykgP1xuICAgICAgPEFuaW1hdGVUaW1pbmdzPnRpbWluZ3MgOlxuICAgICAgcGFyc2VUaW1lRXhwcmVzc2lvbig8c3RyaW5nfG51bWJlcj50aW1pbmdzLCBlcnJvcnMsIGFsbG93TmVnYXRpdmVWYWx1ZXMpO1xufVxuXG5mdW5jdGlvbiBwYXJzZVRpbWVFeHByZXNzaW9uKFxuICAgIGV4cDogc3RyaW5nfG51bWJlciwgZXJyb3JzOiBFcnJvcltdLCBhbGxvd05lZ2F0aXZlVmFsdWVzPzogYm9vbGVhbik6IEFuaW1hdGVUaW1pbmdzIHtcbiAgY29uc3QgcmVnZXggPSAvXigtP1tcXC5cXGRdKykobT9zKSg/OlxccysoLT9bXFwuXFxkXSspKG0/cykpPyg/OlxccysoWy1hLXpdKyg/OlxcKC4rP1xcKSk/KSk/JC9pO1xuICBsZXQgZHVyYXRpb246IG51bWJlcjtcbiAgbGV0IGRlbGF5OiBudW1iZXIgPSAwO1xuICBsZXQgZWFzaW5nOiBzdHJpbmcgPSAnJztcbiAgaWYgKHR5cGVvZiBleHAgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uc3QgbWF0Y2hlcyA9IGV4cC5tYXRjaChyZWdleCk7XG4gICAgaWYgKG1hdGNoZXMgPT09IG51bGwpIHtcbiAgICAgIGVycm9ycy5wdXNoKGludmFsaWRUaW1pbmdWYWx1ZShleHApKTtcbiAgICAgIHJldHVybiB7ZHVyYXRpb246IDAsIGRlbGF5OiAwLCBlYXNpbmc6ICcnfTtcbiAgICB9XG5cbiAgICBkdXJhdGlvbiA9IF9jb252ZXJ0VGltZVZhbHVlVG9NUyhwYXJzZUZsb2F0KG1hdGNoZXNbMV0pLCBtYXRjaGVzWzJdKTtcblxuICAgIGNvbnN0IGRlbGF5TWF0Y2ggPSBtYXRjaGVzWzNdO1xuICAgIGlmIChkZWxheU1hdGNoICE9IG51bGwpIHtcbiAgICAgIGRlbGF5ID0gX2NvbnZlcnRUaW1lVmFsdWVUb01TKHBhcnNlRmxvYXQoZGVsYXlNYXRjaCksIG1hdGNoZXNbNF0pO1xuICAgIH1cblxuICAgIGNvbnN0IGVhc2luZ1ZhbCA9IG1hdGNoZXNbNV07XG4gICAgaWYgKGVhc2luZ1ZhbCkge1xuICAgICAgZWFzaW5nID0gZWFzaW5nVmFsO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBkdXJhdGlvbiA9IGV4cDtcbiAgfVxuXG4gIGlmICghYWxsb3dOZWdhdGl2ZVZhbHVlcykge1xuICAgIGxldCBjb250YWluc0Vycm9ycyA9IGZhbHNlO1xuICAgIGxldCBzdGFydEluZGV4ID0gZXJyb3JzLmxlbmd0aDtcbiAgICBpZiAoZHVyYXRpb24gPCAwKSB7XG4gICAgICBlcnJvcnMucHVzaChuZWdhdGl2ZVN0ZXBWYWx1ZSgpKTtcbiAgICAgIGNvbnRhaW5zRXJyb3JzID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGRlbGF5IDwgMCkge1xuICAgICAgZXJyb3JzLnB1c2gobmVnYXRpdmVEZWxheVZhbHVlKCkpO1xuICAgICAgY29udGFpbnNFcnJvcnMgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoY29udGFpbnNFcnJvcnMpIHtcbiAgICAgIGVycm9ycy5zcGxpY2Uoc3RhcnRJbmRleCwgMCwgaW52YWxpZFRpbWluZ1ZhbHVlKGV4cCkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7ZHVyYXRpb24sIGRlbGF5LCBlYXNpbmd9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29weU9iaihcbiAgICBvYmo6IHtba2V5OiBzdHJpbmddOiBhbnl9LCBkZXN0aW5hdGlvbjoge1trZXk6IHN0cmluZ106IGFueX0gPSB7fSk6IHtba2V5OiBzdHJpbmddOiBhbnl9IHtcbiAgT2JqZWN0LmtleXMob2JqKS5mb3JFYWNoKHByb3AgPT4ge1xuICAgIGRlc3RpbmF0aW9uW3Byb3BdID0gb2JqW3Byb3BdO1xuICB9KTtcbiAgcmV0dXJuIGRlc3RpbmF0aW9uO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplU3R5bGVzKHN0eWxlczogybVTdHlsZURhdGF8ybVTdHlsZURhdGFbXSk6IMm1U3R5bGVEYXRhIHtcbiAgY29uc3Qgbm9ybWFsaXplZFN0eWxlczogybVTdHlsZURhdGEgPSB7fTtcbiAgaWYgKEFycmF5LmlzQXJyYXkoc3R5bGVzKSkge1xuICAgIHN0eWxlcy5mb3JFYWNoKGRhdGEgPT4gY29weVN0eWxlcyhkYXRhLCBmYWxzZSwgbm9ybWFsaXplZFN0eWxlcykpO1xuICB9IGVsc2Uge1xuICAgIGNvcHlTdHlsZXMoc3R5bGVzLCBmYWxzZSwgbm9ybWFsaXplZFN0eWxlcyk7XG4gIH1cbiAgcmV0dXJuIG5vcm1hbGl6ZWRTdHlsZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5U3R5bGVzKFxuICAgIHN0eWxlczogybVTdHlsZURhdGEsIHJlYWRQcm90b3R5cGU6IGJvb2xlYW4sIGRlc3RpbmF0aW9uOiDJtVN0eWxlRGF0YSA9IHt9KTogybVTdHlsZURhdGEge1xuICBpZiAocmVhZFByb3RvdHlwZSkge1xuICAgIC8vIHdlIG1ha2UgdXNlIG9mIGEgZm9yLWluIGxvb3Agc28gdGhhdCB0aGVcbiAgICAvLyBwcm90b3R5cGljYWxseSBpbmhlcml0ZWQgcHJvcGVydGllcyBhcmVcbiAgICAvLyByZXZlYWxlZCBmcm9tIHRoZSBiYWNrRmlsbCBtYXBcbiAgICBmb3IgKGxldCBwcm9wIGluIHN0eWxlcykge1xuICAgICAgZGVzdGluYXRpb25bcHJvcF0gPSBzdHlsZXNbcHJvcF07XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGNvcHlPYmooc3R5bGVzLCBkZXN0aW5hdGlvbik7XG4gIH1cbiAgcmV0dXJuIGRlc3RpbmF0aW9uO1xufVxuXG5mdW5jdGlvbiBnZXRTdHlsZUF0dHJpYnV0ZVN0cmluZyhlbGVtZW50OiBhbnksIGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKSB7XG4gIC8vIFJldHVybiB0aGUga2V5LXZhbHVlIHBhaXIgc3RyaW5nIHRvIGJlIGFkZGVkIHRvIHRoZSBzdHlsZSBhdHRyaWJ1dGUgZm9yIHRoZVxuICAvLyBnaXZlbiBDU1Mgc3R5bGUga2V5LlxuICBpZiAodmFsdWUpIHtcbiAgICByZXR1cm4ga2V5ICsgJzonICsgdmFsdWUgKyAnOyc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG59XG5cbmZ1bmN0aW9uIHdyaXRlU3R5bGVBdHRyaWJ1dGUoZWxlbWVudDogYW55KSB7XG4gIC8vIFJlYWQgdGhlIHN0eWxlIHByb3BlcnR5IG9mIHRoZSBlbGVtZW50IGFuZCBtYW51YWxseSByZWZsZWN0IGl0IHRvIHRoZVxuICAvLyBzdHlsZSBhdHRyaWJ1dGUuIFRoaXMgaXMgbmVlZGVkIGJlY2F1c2UgRG9taW5vIG9uIHBsYXRmb3JtLXNlcnZlciBkb2Vzbid0XG4gIC8vIHVuZGVyc3RhbmQgdGhlIGZ1bGwgc2V0IG9mIGFsbG93ZWQgQ1NTIHByb3BlcnRpZXMgYW5kIGRvZXNuJ3QgcmVmbGVjdCBzb21lXG4gIC8vIG9mIHRoZW0gYXV0b21hdGljYWxseS5cbiAgbGV0IHN0eWxlQXR0clZhbHVlID0gJyc7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlbWVudC5zdHlsZS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGtleSA9IGVsZW1lbnQuc3R5bGUuaXRlbShpKTtcbiAgICBzdHlsZUF0dHJWYWx1ZSArPSBnZXRTdHlsZUF0dHJpYnV0ZVN0cmluZyhlbGVtZW50LCBrZXksIGVsZW1lbnQuc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShrZXkpKTtcbiAgfVxuICBmb3IgKGNvbnN0IGtleSBpbiBlbGVtZW50LnN0eWxlKSB7XG4gICAgLy8gU2tpcCBpbnRlcm5hbCBEb21pbm8gcHJvcGVydGllcyB0aGF0IGRvbid0IG5lZWQgdG8gYmUgcmVmbGVjdGVkLlxuICAgIGlmICghZWxlbWVudC5zdHlsZS5oYXNPd25Qcm9wZXJ0eShrZXkpIHx8IGtleS5zdGFydHNXaXRoKCdfJykpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBjb25zdCBkYXNoS2V5ID0gY2FtZWxDYXNlVG9EYXNoQ2FzZShrZXkpO1xuICAgIHN0eWxlQXR0clZhbHVlICs9IGdldFN0eWxlQXR0cmlidXRlU3RyaW5nKGVsZW1lbnQsIGRhc2hLZXksIGVsZW1lbnQuc3R5bGVba2V5XSk7XG4gIH1cbiAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgc3R5bGVBdHRyVmFsdWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0U3R5bGVzKGVsZW1lbnQ6IGFueSwgc3R5bGVzOiDJtVN0eWxlRGF0YSwgZm9ybWVyU3R5bGVzPzoge1trZXk6IHN0cmluZ106IGFueX0pIHtcbiAgaWYgKGVsZW1lbnRbJ3N0eWxlJ10pIHtcbiAgICBPYmplY3Qua2V5cyhzdHlsZXMpLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICBjb25zdCBjYW1lbFByb3AgPSBkYXNoQ2FzZVRvQ2FtZWxDYXNlKHByb3ApO1xuICAgICAgaWYgKGZvcm1lclN0eWxlcyAmJiAhZm9ybWVyU3R5bGVzLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgIGZvcm1lclN0eWxlc1twcm9wXSA9IGVsZW1lbnQuc3R5bGVbY2FtZWxQcm9wXTtcbiAgICAgIH1cbiAgICAgIGVsZW1lbnQuc3R5bGVbY2FtZWxQcm9wXSA9IHN0eWxlc1twcm9wXTtcbiAgICB9KTtcbiAgICAvLyBPbiB0aGUgc2VydmVyIHNldCB0aGUgJ3N0eWxlJyBhdHRyaWJ1dGUgc2luY2UgaXQncyBub3QgYXV0b21hdGljYWxseSByZWZsZWN0ZWQuXG4gICAgaWYgKGlzTm9kZSgpKSB7XG4gICAgICB3cml0ZVN0eWxlQXR0cmlidXRlKGVsZW1lbnQpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXJhc2VTdHlsZXMoZWxlbWVudDogYW55LCBzdHlsZXM6IMm1U3R5bGVEYXRhKSB7XG4gIGlmIChlbGVtZW50WydzdHlsZSddKSB7XG4gICAgT2JqZWN0LmtleXMoc3R5bGVzKS5mb3JFYWNoKHByb3AgPT4ge1xuICAgICAgY29uc3QgY2FtZWxQcm9wID0gZGFzaENhc2VUb0NhbWVsQ2FzZShwcm9wKTtcbiAgICAgIGVsZW1lbnQuc3R5bGVbY2FtZWxQcm9wXSA9ICcnO1xuICAgIH0pO1xuICAgIC8vIE9uIHRoZSBzZXJ2ZXIgc2V0IHRoZSAnc3R5bGUnIGF0dHJpYnV0ZSBzaW5jZSBpdCdzIG5vdCBhdXRvbWF0aWNhbGx5IHJlZmxlY3RlZC5cbiAgICBpZiAoaXNOb2RlKCkpIHtcbiAgICAgIHdyaXRlU3R5bGVBdHRyaWJ1dGUoZWxlbWVudCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVBbmltYXRpb25FbnRyeShzdGVwczogQW5pbWF0aW9uTWV0YWRhdGF8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQW5pbWF0aW9uTWV0YWRhdGFbXSk6IEFuaW1hdGlvbk1ldGFkYXRhIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoc3RlcHMpKSB7XG4gICAgaWYgKHN0ZXBzLmxlbmd0aCA9PSAxKSByZXR1cm4gc3RlcHNbMF07XG4gICAgcmV0dXJuIHNlcXVlbmNlKHN0ZXBzKTtcbiAgfVxuICByZXR1cm4gc3RlcHMgYXMgQW5pbWF0aW9uTWV0YWRhdGE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZVN0eWxlUGFyYW1zKFxuICAgIHZhbHVlOiBzdHJpbmd8bnVtYmVyLCBvcHRpb25zOiBBbmltYXRpb25PcHRpb25zLCBlcnJvcnM6IEVycm9yW10pIHtcbiAgY29uc3QgcGFyYW1zID0gb3B0aW9ucy5wYXJhbXMgfHwge307XG4gIGNvbnN0IG1hdGNoZXMgPSBleHRyYWN0U3R5bGVQYXJhbXModmFsdWUpO1xuICBpZiAobWF0Y2hlcy5sZW5ndGgpIHtcbiAgICBtYXRjaGVzLmZvckVhY2godmFyTmFtZSA9PiB7XG4gICAgICBpZiAoIXBhcmFtcy5oYXNPd25Qcm9wZXJ0eSh2YXJOYW1lKSkge1xuICAgICAgICBlcnJvcnMucHVzaChpbnZhbGlkU3R5bGVQYXJhbXModmFyTmFtZSkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbmNvbnN0IFBBUkFNX1JFR0VYID1cbiAgICBuZXcgUmVnRXhwKGAke1NVQlNUSVRVVElPTl9FWFBSX1NUQVJUfVxcXFxzKiguKz8pXFxcXHMqJHtTVUJTVElUVVRJT05fRVhQUl9FTkR9YCwgJ2cnKTtcbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0U3R5bGVQYXJhbXModmFsdWU6IHN0cmluZ3xudW1iZXIpOiBzdHJpbmdbXSB7XG4gIGxldCBwYXJhbXM6IHN0cmluZ1tdID0gW107XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgbGV0IG1hdGNoOiBhbnk7XG4gICAgd2hpbGUgKG1hdGNoID0gUEFSQU1fUkVHRVguZXhlYyh2YWx1ZSkpIHtcbiAgICAgIHBhcmFtcy5wdXNoKG1hdGNoWzFdIGFzIHN0cmluZyk7XG4gICAgfVxuICAgIFBBUkFNX1JFR0VYLmxhc3RJbmRleCA9IDA7XG4gIH1cbiAgcmV0dXJuIHBhcmFtcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGludGVycG9sYXRlUGFyYW1zKFxuICAgIHZhbHVlOiBzdHJpbmd8bnVtYmVyLCBwYXJhbXM6IHtbbmFtZTogc3RyaW5nXTogYW55fSwgZXJyb3JzOiBFcnJvcltdKTogc3RyaW5nfG51bWJlciB7XG4gIGNvbnN0IG9yaWdpbmFsID0gdmFsdWUudG9TdHJpbmcoKTtcbiAgY29uc3Qgc3RyID0gb3JpZ2luYWwucmVwbGFjZShQQVJBTV9SRUdFWCwgKF8sIHZhck5hbWUpID0+IHtcbiAgICBsZXQgbG9jYWxWYWwgPSBwYXJhbXNbdmFyTmFtZV07XG4gICAgLy8gdGhpcyBtZWFucyB0aGF0IHRoZSB2YWx1ZSB3YXMgbmV2ZXIgb3ZlcnJpZGRlbiBieSB0aGUgZGF0YSBwYXNzZWQgaW4gYnkgdGhlIHVzZXJcbiAgICBpZiAoIXBhcmFtcy5oYXNPd25Qcm9wZXJ0eSh2YXJOYW1lKSkge1xuICAgICAgZXJyb3JzLnB1c2goaW52YWxpZFBhcmFtVmFsdWUodmFyTmFtZSkpO1xuICAgICAgbG9jYWxWYWwgPSAnJztcbiAgICB9XG4gICAgcmV0dXJuIGxvY2FsVmFsLnRvU3RyaW5nKCk7XG4gIH0pO1xuXG4gIC8vIHdlIGRvIHRoaXMgdG8gYXNzZXJ0IHRoYXQgbnVtZXJpYyB2YWx1ZXMgc3RheSBhcyB0aGV5IGFyZVxuICByZXR1cm4gc3RyID09IG9yaWdpbmFsID8gdmFsdWUgOiBzdHI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpdGVyYXRvclRvQXJyYXkoaXRlcmF0b3I6IGFueSk6IGFueVtdIHtcbiAgY29uc3QgYXJyOiBhbnlbXSA9IFtdO1xuICBsZXQgaXRlbSA9IGl0ZXJhdG9yLm5leHQoKTtcbiAgd2hpbGUgKCFpdGVtLmRvbmUpIHtcbiAgICBhcnIucHVzaChpdGVtLnZhbHVlKTtcbiAgICBpdGVtID0gaXRlcmF0b3IubmV4dCgpO1xuICB9XG4gIHJldHVybiBhcnI7XG59XG5cbmNvbnN0IERBU0hfQ0FTRV9SRUdFWFAgPSAvLSsoW2EtejAtOV0pL2c7XG5leHBvcnQgZnVuY3Rpb24gZGFzaENhc2VUb0NhbWVsQ2FzZShpbnB1dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGlucHV0LnJlcGxhY2UoREFTSF9DQVNFX1JFR0VYUCwgKC4uLm06IGFueVtdKSA9PiBtWzFdLnRvVXBwZXJDYXNlKCkpO1xufVxuXG5mdW5jdGlvbiBjYW1lbENhc2VUb0Rhc2hDYXNlKGlucHV0OiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gaW5wdXQucmVwbGFjZSgvKFthLXpdKShbQS1aXSkvZywgJyQxLSQyJykudG9Mb3dlckNhc2UoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFsbG93UHJldmlvdXNQbGF5ZXJTdHlsZXNNZXJnZShkdXJhdGlvbjogbnVtYmVyLCBkZWxheTogbnVtYmVyKSB7XG4gIHJldHVybiBkdXJhdGlvbiA9PT0gMCB8fCBkZWxheSA9PT0gMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJhbGFuY2VQcmV2aW91c1N0eWxlc0ludG9LZXlmcmFtZXMoXG4gICAgZWxlbWVudDogYW55LCBrZXlmcmFtZXM6IHtba2V5OiBzdHJpbmddOiBhbnl9W10sIHByZXZpb3VzU3R5bGVzOiB7W2tleTogc3RyaW5nXTogYW55fSkge1xuICBjb25zdCBwcmV2aW91c1N0eWxlUHJvcHMgPSBPYmplY3Qua2V5cyhwcmV2aW91c1N0eWxlcyk7XG4gIGlmIChwcmV2aW91c1N0eWxlUHJvcHMubGVuZ3RoICYmIGtleWZyYW1lcy5sZW5ndGgpIHtcbiAgICBsZXQgc3RhcnRpbmdLZXlmcmFtZSA9IGtleWZyYW1lc1swXTtcbiAgICBsZXQgbWlzc2luZ1N0eWxlUHJvcHM6IHN0cmluZ1tdID0gW107XG4gICAgcHJldmlvdXNTdHlsZVByb3BzLmZvckVhY2gocHJvcCA9PiB7XG4gICAgICBpZiAoIXN0YXJ0aW5nS2V5ZnJhbWUuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgbWlzc2luZ1N0eWxlUHJvcHMucHVzaChwcm9wKTtcbiAgICAgIH1cbiAgICAgIHN0YXJ0aW5nS2V5ZnJhbWVbcHJvcF0gPSBwcmV2aW91c1N0eWxlc1twcm9wXTtcbiAgICB9KTtcblxuICAgIGlmIChtaXNzaW5nU3R5bGVQcm9wcy5sZW5ndGgpIHtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBrZXlmcmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgbGV0IGtmID0ga2V5ZnJhbWVzW2ldO1xuICAgICAgICBtaXNzaW5nU3R5bGVQcm9wcy5mb3JFYWNoKGZ1bmN0aW9uKHByb3ApIHtcbiAgICAgICAgICBrZltwcm9wXSA9IGNvbXB1dGVTdHlsZShlbGVtZW50LCBwcm9wKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBrZXlmcmFtZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB2aXNpdERzbE5vZGUoXG4gICAgdmlzaXRvcjogQW5pbWF0aW9uRHNsVmlzaXRvciwgbm9kZTogQW5pbWF0aW9uTWV0YWRhdGEsIGNvbnRleHQ6IGFueSk6IGFueTtcbmV4cG9ydCBmdW5jdGlvbiB2aXNpdERzbE5vZGUoXG4gICAgdmlzaXRvcjogQW5pbWF0aW9uQXN0VmlzaXRvciwgbm9kZTogQW5pbWF0aW9uQXN0PEFuaW1hdGlvbk1ldGFkYXRhVHlwZT4sIGNvbnRleHQ6IGFueSk6IGFueTtcbmV4cG9ydCBmdW5jdGlvbiB2aXNpdERzbE5vZGUodmlzaXRvcjogYW55LCBub2RlOiBhbnksIGNvbnRleHQ6IGFueSk6IGFueSB7XG4gIHN3aXRjaCAobm9kZS50eXBlKSB7XG4gICAgY2FzZSBBbmltYXRpb25NZXRhZGF0YVR5cGUuVHJpZ2dlcjpcbiAgICAgIHJldHVybiB2aXNpdG9yLnZpc2l0VHJpZ2dlcihub2RlLCBjb250ZXh0KTtcbiAgICBjYXNlIEFuaW1hdGlvbk1ldGFkYXRhVHlwZS5TdGF0ZTpcbiAgICAgIHJldHVybiB2aXNpdG9yLnZpc2l0U3RhdGUobm9kZSwgY29udGV4dCk7XG4gICAgY2FzZSBBbmltYXRpb25NZXRhZGF0YVR5cGUuVHJhbnNpdGlvbjpcbiAgICAgIHJldHVybiB2aXNpdG9yLnZpc2l0VHJhbnNpdGlvbihub2RlLCBjb250ZXh0KTtcbiAgICBjYXNlIEFuaW1hdGlvbk1ldGFkYXRhVHlwZS5TZXF1ZW5jZTpcbiAgICAgIHJldHVybiB2aXNpdG9yLnZpc2l0U2VxdWVuY2Uobm9kZSwgY29udGV4dCk7XG4gICAgY2FzZSBBbmltYXRpb25NZXRhZGF0YVR5cGUuR3JvdXA6XG4gICAgICByZXR1cm4gdmlzaXRvci52aXNpdEdyb3VwKG5vZGUsIGNvbnRleHQpO1xuICAgIGNhc2UgQW5pbWF0aW9uTWV0YWRhdGFUeXBlLkFuaW1hdGU6XG4gICAgICByZXR1cm4gdmlzaXRvci52aXNpdEFuaW1hdGUobm9kZSwgY29udGV4dCk7XG4gICAgY2FzZSBBbmltYXRpb25NZXRhZGF0YVR5cGUuS2V5ZnJhbWVzOlxuICAgICAgcmV0dXJuIHZpc2l0b3IudmlzaXRLZXlmcmFtZXMobm9kZSwgY29udGV4dCk7XG4gICAgY2FzZSBBbmltYXRpb25NZXRhZGF0YVR5cGUuU3R5bGU6XG4gICAgICByZXR1cm4gdmlzaXRvci52aXNpdFN0eWxlKG5vZGUsIGNvbnRleHQpO1xuICAgIGNhc2UgQW5pbWF0aW9uTWV0YWRhdGFUeXBlLlJlZmVyZW5jZTpcbiAgICAgIHJldHVybiB2aXNpdG9yLnZpc2l0UmVmZXJlbmNlKG5vZGUsIGNvbnRleHQpO1xuICAgIGNhc2UgQW5pbWF0aW9uTWV0YWRhdGFUeXBlLkFuaW1hdGVDaGlsZDpcbiAgICAgIHJldHVybiB2aXNpdG9yLnZpc2l0QW5pbWF0ZUNoaWxkKG5vZGUsIGNvbnRleHQpO1xuICAgIGNhc2UgQW5pbWF0aW9uTWV0YWRhdGFUeXBlLkFuaW1hdGVSZWY6XG4gICAgICByZXR1cm4gdmlzaXRvci52aXNpdEFuaW1hdGVSZWYobm9kZSwgY29udGV4dCk7XG4gICAgY2FzZSBBbmltYXRpb25NZXRhZGF0YVR5cGUuUXVlcnk6XG4gICAgICByZXR1cm4gdmlzaXRvci52aXNpdFF1ZXJ5KG5vZGUsIGNvbnRleHQpO1xuICAgIGNhc2UgQW5pbWF0aW9uTWV0YWRhdGFUeXBlLlN0YWdnZXI6XG4gICAgICByZXR1cm4gdmlzaXRvci52aXNpdFN0YWdnZXIobm9kZSwgY29udGV4dCk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IGludmFsaWROb2RlVHlwZShub2RlLnR5cGUpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlU3R5bGUoZWxlbWVudDogYW55LCBwcm9wOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gKDxhbnk+d2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCkpW3Byb3BdO1xufVxuIl19