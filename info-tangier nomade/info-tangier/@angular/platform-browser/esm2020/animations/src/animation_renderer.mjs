import { ɵAnimationEngine as AnimationEngine } from '@angular/animations/browser';
import { Injectable, NgZone, RendererFactory2 } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/animations/browser";
const ANIMATION_PREFIX = '@';
const DISABLE_ANIMATIONS_FLAG = '@.disabled';
export class AnimationRendererFactory {
    constructor(delegate, engine, _zone) {
        this.delegate = delegate;
        this.engine = engine;
        this._zone = _zone;
        this._currentId = 0;
        this._microtaskId = 1;
        this._animationCallbacksBuffer = [];
        this._rendererCache = new Map();
        this._cdRecurDepth = 0;
        this.promise = Promise.resolve(0);
        engine.onRemovalComplete = (element, delegate) => {
            // Note: if a component element has a leave animation, and a host leave animation,
            // the view engine will call `removeChild` for the parent
            // component renderer as well as for the child component renderer.
            // Therefore, we need to check if we already removed the element.
            const parentNode = delegate?.parentNode(element);
            if (parentNode) {
                delegate.removeChild(parentNode, element);
            }
        };
    }
    createRenderer(hostElement, type) {
        const EMPTY_NAMESPACE_ID = '';
        // cache the delegates to find out which cached delegate can
        // be used by which cached renderer
        const delegate = this.delegate.createRenderer(hostElement, type);
        if (!hostElement || !type || !type.data || !type.data['animation']) {
            let renderer = this._rendererCache.get(delegate);
            if (!renderer) {
                renderer = new BaseAnimationRenderer(EMPTY_NAMESPACE_ID, delegate, this.engine);
                // only cache this result when the base renderer is used
                this._rendererCache.set(delegate, renderer);
            }
            return renderer;
        }
        const componentId = type.id;
        const namespaceId = type.id + '-' + this._currentId;
        this._currentId++;
        this.engine.register(namespaceId, hostElement);
        const registerTrigger = (trigger) => {
            if (Array.isArray(trigger)) {
                trigger.forEach(registerTrigger);
            }
            else {
                this.engine.registerTrigger(componentId, namespaceId, hostElement, trigger.name, trigger);
            }
        };
        const animationTriggers = type.data['animation'];
        animationTriggers.forEach(registerTrigger);
        return new AnimationRenderer(this, namespaceId, delegate, this.engine);
    }
    begin() {
        this._cdRecurDepth++;
        if (this.delegate.begin) {
            this.delegate.begin();
        }
    }
    _scheduleCountTask() {
        // always use promise to schedule microtask instead of use Zone
        this.promise.then(() => {
            this._microtaskId++;
        });
    }
    /** @internal */
    scheduleListenerCallback(count, fn, data) {
        if (count >= 0 && count < this._microtaskId) {
            this._zone.run(() => fn(data));
            return;
        }
        if (this._animationCallbacksBuffer.length == 0) {
            Promise.resolve(null).then(() => {
                this._zone.run(() => {
                    this._animationCallbacksBuffer.forEach(tuple => {
                        const [fn, data] = tuple;
                        fn(data);
                    });
                    this._animationCallbacksBuffer = [];
                });
            });
        }
        this._animationCallbacksBuffer.push([fn, data]);
    }
    end() {
        this._cdRecurDepth--;
        // this is to prevent animations from running twice when an inner
        // component does CD when a parent component instead has inserted it
        if (this._cdRecurDepth == 0) {
            this._zone.runOutsideAngular(() => {
                this._scheduleCountTask();
                this.engine.flush(this._microtaskId);
            });
        }
        if (this.delegate.end) {
            this.delegate.end();
        }
    }
    whenRenderingDone() {
        return this.engine.whenRenderingDone();
    }
}
AnimationRendererFactory.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.3.10", ngImport: i0, type: AnimationRendererFactory, deps: [{ token: i0.RendererFactory2 }, { token: i1.ɵAnimationEngine }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Injectable });
AnimationRendererFactory.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.3.10", ngImport: i0, type: AnimationRendererFactory });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.3.10", ngImport: i0, type: AnimationRendererFactory, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i0.RendererFactory2 }, { type: i1.ɵAnimationEngine }, { type: i0.NgZone }]; } });
export class BaseAnimationRenderer {
    constructor(namespaceId, delegate, engine) {
        this.namespaceId = namespaceId;
        this.delegate = delegate;
        this.engine = engine;
        this.destroyNode = this.delegate.destroyNode ? (n) => delegate.destroyNode(n) : null;
    }
    get data() {
        return this.delegate.data;
    }
    destroy() {
        this.engine.destroy(this.namespaceId, this.delegate);
        this.delegate.destroy();
    }
    createElement(name, namespace) {
        return this.delegate.createElement(name, namespace);
    }
    createComment(value) {
        return this.delegate.createComment(value);
    }
    createText(value) {
        return this.delegate.createText(value);
    }
    appendChild(parent, newChild) {
        this.delegate.appendChild(parent, newChild);
        this.engine.onInsert(this.namespaceId, newChild, parent, false);
    }
    insertBefore(parent, newChild, refChild, isMove = true) {
        this.delegate.insertBefore(parent, newChild, refChild);
        // If `isMove` true than we should animate this insert.
        this.engine.onInsert(this.namespaceId, newChild, parent, isMove);
    }
    removeChild(parent, oldChild, isHostElement) {
        this.engine.onRemove(this.namespaceId, oldChild, this.delegate, isHostElement);
    }
    selectRootElement(selectorOrNode, preserveContent) {
        return this.delegate.selectRootElement(selectorOrNode, preserveContent);
    }
    parentNode(node) {
        return this.delegate.parentNode(node);
    }
    nextSibling(node) {
        return this.delegate.nextSibling(node);
    }
    setAttribute(el, name, value, namespace) {
        this.delegate.setAttribute(el, name, value, namespace);
    }
    removeAttribute(el, name, namespace) {
        this.delegate.removeAttribute(el, name, namespace);
    }
    addClass(el, name) {
        this.delegate.addClass(el, name);
    }
    removeClass(el, name) {
        this.delegate.removeClass(el, name);
    }
    setStyle(el, style, value, flags) {
        this.delegate.setStyle(el, style, value, flags);
    }
    removeStyle(el, style, flags) {
        this.delegate.removeStyle(el, style, flags);
    }
    setProperty(el, name, value) {
        if (name.charAt(0) == ANIMATION_PREFIX && name == DISABLE_ANIMATIONS_FLAG) {
            this.disableAnimations(el, !!value);
        }
        else {
            this.delegate.setProperty(el, name, value);
        }
    }
    setValue(node, value) {
        this.delegate.setValue(node, value);
    }
    listen(target, eventName, callback) {
        return this.delegate.listen(target, eventName, callback);
    }
    disableAnimations(element, value) {
        this.engine.disableAnimations(element, value);
    }
}
export class AnimationRenderer extends BaseAnimationRenderer {
    constructor(factory, namespaceId, delegate, engine) {
        super(namespaceId, delegate, engine);
        this.factory = factory;
        this.namespaceId = namespaceId;
    }
    setProperty(el, name, value) {
        if (name.charAt(0) == ANIMATION_PREFIX) {
            if (name.charAt(1) == '.' && name == DISABLE_ANIMATIONS_FLAG) {
                value = value === undefined ? true : !!value;
                this.disableAnimations(el, value);
            }
            else {
                this.engine.process(this.namespaceId, el, name.substr(1), value);
            }
        }
        else {
            this.delegate.setProperty(el, name, value);
        }
    }
    listen(target, eventName, callback) {
        if (eventName.charAt(0) == ANIMATION_PREFIX) {
            const element = resolveElementFromTarget(target);
            let name = eventName.substr(1);
            let phase = '';
            // @listener.phase is for trigger animation callbacks
            // @@listener is for animation builder callbacks
            if (name.charAt(0) != ANIMATION_PREFIX) {
                [name, phase] = parseTriggerCallbackName(name);
            }
            return this.engine.listen(this.namespaceId, element, name, phase, event => {
                const countId = event['_data'] || -1;
                this.factory.scheduleListenerCallback(countId, callback, event);
            });
        }
        return this.delegate.listen(target, eventName, callback);
    }
}
function resolveElementFromTarget(target) {
    switch (target) {
        case 'body':
            return document.body;
        case 'document':
            return document;
        case 'window':
            return window;
        default:
            return target;
    }
}
function parseTriggerCallbackName(triggerName) {
    const dotIndex = triggerName.indexOf('.');
    const trigger = triggerName.substring(0, dotIndex);
    const phase = triggerName.substr(dotIndex + 1);
    return [trigger, phase];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zL3NyYy9hbmltYXRpb25fcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUUEsT0FBTyxFQUFDLGdCQUFnQixJQUFJLGVBQWUsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBQ2hGLE9BQU8sRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFhLGdCQUFnQixFQUFxQyxNQUFNLGVBQWUsQ0FBQzs7O0FBRWxILE1BQU0sZ0JBQWdCLEdBQUcsR0FBRyxDQUFDO0FBQzdCLE1BQU0sdUJBQXVCLEdBQUcsWUFBWSxDQUFDO0FBUzdDLE1BQU0sT0FBTyx3QkFBd0I7SUFRbkMsWUFDWSxRQUEwQixFQUFVLE1BQXVCLEVBQVUsS0FBYTtRQUFsRixhQUFRLEdBQVIsUUFBUSxDQUFrQjtRQUFVLFdBQU0sR0FBTixNQUFNLENBQWlCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQVJ0RixlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBQ3ZCLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBQ3pCLDhCQUF5QixHQUE2QixFQUFFLENBQUM7UUFDekQsbUJBQWMsR0FBRyxJQUFJLEdBQUcsRUFBb0MsQ0FBQztRQUM3RCxrQkFBYSxHQUFHLENBQUMsQ0FBQztRQUNsQixZQUFPLEdBQWlCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFJakQsTUFBTSxDQUFDLGlCQUFpQixHQUFHLENBQUMsT0FBWSxFQUFFLFFBQW1CLEVBQUUsRUFBRTtZQUMvRCxrRkFBa0Y7WUFDbEYseURBQXlEO1lBQ3pELGtFQUFrRTtZQUNsRSxpRUFBaUU7WUFDakUsTUFBTSxVQUFVLEdBQUcsUUFBUSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqRCxJQUFJLFVBQVUsRUFBRTtnQkFDZCxR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Q0QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzNELENBQUM7Q0FDRjtBQUVELFNBQVMsd0JBQXdCLENBQUMsTUFBc0M7SUFDdEUsUUFBUSxNQUFNLEVBQUU7UUFDZCxLQUFLLE1BQU07WUFDVCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDdkIsS0FBSyxVQUFVO1lBQ2IsT0FBTyxRQUFRLENBQUM7UUFDbEIsS0FBSyxRQUFRO1lBQ1gsT0FBTyxNQUFNLENBQUM7UUFDaEI7WUFDRSxPQUFPLE1BQU0sQ0FBQztLQUNqQjtBQUNILENBQUM7QUFFRCxTQUFTLHdCQUF3QixDQUFDLFdBQW1CO0lBQ25ELE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUMsTUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDbkQsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDL0MsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztBQUMxQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge0FuaW1hdGlvblRyaWdnZXJNZXRhZGF0YX0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge8m1QW5pbWF0aW9uRW5naW5lIGFzIEFuaW1hdGlvbkVuZ2luZX0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucy9icm93c2VyJztcbmltcG9ydCB7SW5qZWN0YWJsZSwgTmdab25lLCBSZW5kZXJlcjIsIFJlbmRlcmVyRmFjdG9yeTIsIFJlbmRlcmVyU3R5bGVGbGFnczIsIFJlbmRlcmVyVHlwZTJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5jb25zdCBBTklNQVRJT05fUFJFRklYID0gJ0AnO1xuY29uc3QgRElTQUJMRV9BTklNQVRJT05TX0ZMQUcgPSAnQC5kaXNhYmxlZCc7XG5cbi8vIERlZmluZSBhIHJlY3Vyc2l2ZSB0eXBlIHRvIGFsbG93IGZvciBuZXN0ZWQgYXJyYXlzIG9mIGBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGFgLiBOb3RlIHRoYXQgYW5cbi8vIGludGVyZmFjZSBkZWNsYXJhdGlvbiBpcyB1c2VkIGFzIFR5cGVTY3JpcHQgcHJpb3IgdG8gMy43IGRvZXMgbm90IHN1cHBvcnQgcmVjdXJzaXZlIHR5cGVcbi8vIHJlZmVyZW5jZXMsIHNlZSBodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L1R5cGVTY3JpcHQvcHVsbC8zMzA1MCBmb3IgZGV0YWlscy5cbnR5cGUgTmVzdGVkQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhID0gQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhfFJlY3Vyc2l2ZUFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YTtcbmludGVyZmFjZSBSZWN1cnNpdmVBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEgZXh0ZW5kcyBBcnJheTxOZXN0ZWRBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGE+IHt9XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBbmltYXRpb25SZW5kZXJlckZhY3RvcnkgaW1wbGVtZW50cyBSZW5kZXJlckZhY3RvcnkyIHtcbiAgcHJpdmF0ZSBfY3VycmVudElkOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9taWNyb3Rhc2tJZDogbnVtYmVyID0gMTtcbiAgcHJpdmF0ZSBfYW5pbWF0aW9uQ2FsbGJhY2tzQnVmZmVyOiBbKGU6IGFueSkgPT4gYW55LCBhbnldW10gPSBbXTtcbiAgcHJpdmF0ZSBfcmVuZGVyZXJDYWNoZSA9IG5ldyBNYXA8UmVuZGVyZXIyLCBCYXNlQW5pbWF0aW9uUmVuZGVyZXI+KCk7XG4gIHByaXZhdGUgX2NkUmVjdXJEZXB0aCA9IDA7XG4gIHByaXZhdGUgcHJvbWlzZTogUHJvbWlzZTxhbnk+ID0gUHJvbWlzZS5yZXNvbHZlKDApO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBkZWxlZ2F0ZTogUmVuZGVyZXJGYWN0b3J5MiwgcHJpdmF0ZSBlbmdpbmU6IEFuaW1hdGlvbkVuZ2luZSwgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7XG4gICAgZW5naW5lLm9uUmVtb3ZhbENvbXBsZXRlID0gKGVsZW1lbnQ6IGFueSwgZGVsZWdhdGU6IFJlbmRlcmVyMikgPT4ge1xuICAgICAgLy8gTm90ZTogaWYgYSBjb21wb25lbnQgZWxlbWVudCBoYXMgYSBsZWF2ZSBhbmltYXRpb24sIGFuZCBhIGhvc3QgbGVhdmUgYW5pbWF0aW9uLFxuICAgICAgLy8gdGhlIHZpZXcgZW5naW5lIHdpbGwgY2FsbCBgcmVtb3ZlQ2hpbGRgIGZvciB0aGUgcGFyZW50XG4gICAgICAvLyBjb21wb25lbnQgcmVuZGVyZXIgYXMgd2VsbCBhcyBmb3IgdGhlIGNoaWxkIGNvbXBvbmVudCByZW5kZXJlci5cbiAgICAgIC8vIFRoZXJlZm9yZSwgd2UgbmVlZCB0byBjaGVjayBpZiB3ZSBhbHJlYWR5IHJlbW92ZWQgdGhlIGVsZW1lbnQuXG4gICAgICBjb25zdCBwYXJlbnROb2RlID0gZGVsZWdhdGU/LnBhcmVudE5vZGUoZWxlbWVudCk7XG4gICAgICBpZiAocGFyZW50Tm9kZSkge1xuICAgICAgICBkZWxlZ2F0ZS5yZW1vdmVDaGlsZChwYXJlbnROb2RlLCBlbGVtZW50KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgY3JlYXRlUmVuZGVyZXIoaG9zdEVsZW1lbnQ6IGFueSwgdHlwZTogUmVuZGVyZXJUeXBlMik6IFJlbmRlcmVyMiB7XG4gICAgY29uc3QgRU1QVFlfTkFNRVNQQUNFX0lEID0gJyc7XG5cbiAgICAvLyBjYWNoZSB0aGUgZGVsZWdhdGVzIHRvIGZpbmQgb3V0IHdoaWNoIGNhY2hlZCBkZWxlZ2F0ZSBjYW5cbiAgICAvLyBiZSB1c2VkIGJ5IHdoaWNoIGNhY2hlZCByZW5kZXJlclxuICAgIGNvbnN0IGRlbGVnYXRlID0gdGhpcy5kZWxlZ2F0ZS5jcmVhdGVSZW5kZXJlcihob3N0RWxlbWVudCwgdHlwZSk7XG4gICAgaWYgKCFob3N0RWxlbWVudCB8fCAhdHlwZSB8fCAhdHlwZS5kYXRhIHx8ICF0eXBlLmRhdGFbJ2FuaW1hdGlvbiddKSB7XG4gICAgICBsZXQgcmVuZGVyZXI6IEJhc2VBbmltYXRpb25SZW5kZXJlcnx1bmRlZmluZWQgPSB0aGlzLl9yZW5kZXJlckNhY2hlLmdldChkZWxlZ2F0ZSk7XG4gICAgICBpZiAoIXJlbmRlcmVyKSB7XG4gICAgICAgIHJlbmRlcmVyID0gbmV3IEJhc2VBbmltYXRpb25SZW5kZXJlcihFTVBUWV9OQU1FU1BBQ0VfSUQsIGRlbGVnYXRlLCB0aGlzLmVuZ2luZSk7XG4gICAgICAgIC8vIG9ubHkgY2FjaGUgdGhpcyByZXN1bHQgd2hlbiB0aGUgYmFzZSByZW5kZXJlciBpcyB1c2VkXG4gICAgICAgIHRoaXMuX3JlbmRlcmVyQ2FjaGUuc2V0KGRlbGVnYXRlLCByZW5kZXJlcik7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVuZGVyZXI7XG4gICAgfVxuXG4gICAgY29uc3QgY29tcG9uZW50SWQgPSB0eXBlLmlkO1xuICAgIGNvbnN0IG5hbWVzcGFjZUlkID0gdHlwZS5pZCArICctJyArIHRoaXMuX2N1cnJlbnRJZDtcbiAgICB0aGlzLl9jdXJyZW50SWQrKztcblxuICAgIHRoaXMuZW5naW5lLnJlZ2lzdGVyKG5hbWVzcGFjZUlkLCBob3N0RWxlbWVudCk7XG5cbiAgICBjb25zdCByZWdpc3RlclRyaWdnZXIgPSAodHJpZ2dlcjogTmVzdGVkQW5pbWF0aW9uVHJpZ2dlck1ldGFkYXRhKSA9PiB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh0cmlnZ2VyKSkge1xuICAgICAgICB0cmlnZ2VyLmZvckVhY2gocmVnaXN0ZXJUcmlnZ2VyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZW5naW5lLnJlZ2lzdGVyVHJpZ2dlcihjb21wb25lbnRJZCwgbmFtZXNwYWNlSWQsIGhvc3RFbGVtZW50LCB0cmlnZ2VyLm5hbWUsIHRyaWdnZXIpO1xuICAgICAgfVxuICAgIH07XG4gICAgY29uc3QgYW5pbWF0aW9uVHJpZ2dlcnMgPSB0eXBlLmRhdGFbJ2FuaW1hdGlvbiddIGFzIE5lc3RlZEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YVtdO1xuICAgIGFuaW1hdGlvblRyaWdnZXJzLmZvckVhY2gocmVnaXN0ZXJUcmlnZ2VyKTtcblxuICAgIHJldHVybiBuZXcgQW5pbWF0aW9uUmVuZGVyZXIodGhpcywgbmFtZXNwYWNlSWQsIGRlbGVnYXRlLCB0aGlzLmVuZ2luZSk7XG4gIH1cblxuICBiZWdpbigpIHtcbiAgICB0aGlzLl9jZFJlY3VyRGVwdGgrKztcbiAgICBpZiAodGhpcy5kZWxlZ2F0ZS5iZWdpbikge1xuICAgICAgdGhpcy5kZWxlZ2F0ZS5iZWdpbigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3NjaGVkdWxlQ291bnRUYXNrKCkge1xuICAgIC8vIGFsd2F5cyB1c2UgcHJvbWlzZSB0byBzY2hlZHVsZSBtaWNyb3Rhc2sgaW5zdGVhZCBvZiB1c2UgWm9uZVxuICAgIHRoaXMucHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMuX21pY3JvdGFza0lkKys7XG4gICAgfSk7XG4gIH1cblxuICAvKiogQGludGVybmFsICovXG4gIHNjaGVkdWxlTGlzdGVuZXJDYWxsYmFjayhjb3VudDogbnVtYmVyLCBmbjogKGU6IGFueSkgPT4gYW55LCBkYXRhOiBhbnkpIHtcbiAgICBpZiAoY291bnQgPj0gMCAmJiBjb3VudCA8IHRoaXMuX21pY3JvdGFza0lkKSB7XG4gICAgICB0aGlzLl96b25lLnJ1bigoKSA9PiBmbihkYXRhKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2FuaW1hdGlvbkNhbGxiYWNrc0J1ZmZlci5sZW5ndGggPT0gMCkge1xuICAgICAgUHJvbWlzZS5yZXNvbHZlKG51bGwpLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLl96b25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgdGhpcy5fYW5pbWF0aW9uQ2FsbGJhY2tzQnVmZmVyLmZvckVhY2godHVwbGUgPT4ge1xuICAgICAgICAgICAgY29uc3QgW2ZuLCBkYXRhXSA9IHR1cGxlO1xuICAgICAgICAgICAgZm4oZGF0YSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5fYW5pbWF0aW9uQ2FsbGJhY2tzQnVmZmVyID0gW107XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5fYW5pbWF0aW9uQ2FsbGJhY2tzQnVmZmVyLnB1c2goW2ZuLCBkYXRhXSk7XG4gIH1cblxuICBlbmQoKSB7XG4gICAgdGhpcy5fY2RSZWN1ckRlcHRoLS07XG5cbiAgICAvLyB0aGlzIGlzIHRvIHByZXZlbnQgYW5pbWF0aW9ucyBmcm9tIHJ1bm5pbmcgdHdpY2Ugd2hlbiBhbiBpbm5lclxuICAgIC8vIGNvbXBvbmVudCBkb2VzIENEIHdoZW4gYSBwYXJlbnQgY29tcG9uZW50IGluc3RlYWQgaGFzIGluc2VydGVkIGl0XG4gICAgaWYgKHRoaXMuX2NkUmVjdXJEZXB0aCA9PSAwKSB7XG4gICAgICB0aGlzLl96b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgdGhpcy5fc2NoZWR1bGVDb3VudFRhc2soKTtcbiAgICAgICAgdGhpcy5lbmdpbmUuZmx1c2godGhpcy5fbWljcm90YXNrSWQpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmRlbGVnYXRlLmVuZCkge1xuICAgICAgdGhpcy5kZWxlZ2F0ZS5lbmQoKTtcbiAgICB9XG4gIH1cblxuICB3aGVuUmVuZGVyaW5nRG9uZSgpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmVuZ2luZS53aGVuUmVuZGVyaW5nRG9uZSgpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBCYXNlQW5pbWF0aW9uUmVuZGVyZXIgaW1wbGVtZW50cyBSZW5kZXJlcjIge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByb3RlY3RlZCBuYW1lc3BhY2VJZDogc3RyaW5nLCBwdWJsaWMgZGVsZWdhdGU6IFJlbmRlcmVyMiwgcHVibGljIGVuZ2luZTogQW5pbWF0aW9uRW5naW5lKSB7XG4gICAgdGhpcy5kZXN0cm95Tm9kZSA9IHRoaXMuZGVsZWdhdGUuZGVzdHJveU5vZGUgPyAobikgPT4gZGVsZWdhdGUuZGVzdHJveU5vZGUhKG4pIDogbnVsbDtcbiAgfVxuXG4gIGdldCBkYXRhKCkge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLmRhdGE7XG4gIH1cblxuICBkZXN0cm95Tm9kZTogKChuOiBhbnkpID0+IHZvaWQpfG51bGw7XG5cbiAgZGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmVuZ2luZS5kZXN0cm95KHRoaXMubmFtZXNwYWNlSWQsIHRoaXMuZGVsZWdhdGUpO1xuICAgIHRoaXMuZGVsZWdhdGUuZGVzdHJveSgpO1xuICB9XG5cbiAgY3JlYXRlRWxlbWVudChuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZ3xudWxsfHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLmNyZWF0ZUVsZW1lbnQobmFtZSwgbmFtZXNwYWNlKTtcbiAgfVxuXG4gIGNyZWF0ZUNvbW1lbnQodmFsdWU6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLmNyZWF0ZUNvbW1lbnQodmFsdWUpO1xuICB9XG5cbiAgY3JlYXRlVGV4dCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUuY3JlYXRlVGV4dCh2YWx1ZSk7XG4gIH1cblxuICBhcHBlbmRDaGlsZChwYXJlbnQ6IGFueSwgbmV3Q2hpbGQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUuYXBwZW5kQ2hpbGQocGFyZW50LCBuZXdDaGlsZCk7XG4gICAgdGhpcy5lbmdpbmUub25JbnNlcnQodGhpcy5uYW1lc3BhY2VJZCwgbmV3Q2hpbGQsIHBhcmVudCwgZmFsc2UpO1xuICB9XG5cbiAgaW5zZXJ0QmVmb3JlKHBhcmVudDogYW55LCBuZXdDaGlsZDogYW55LCByZWZDaGlsZDogYW55LCBpc01vdmU6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5pbnNlcnRCZWZvcmUocGFyZW50LCBuZXdDaGlsZCwgcmVmQ2hpbGQpO1xuICAgIC8vIElmIGBpc01vdmVgIHRydWUgdGhhbiB3ZSBzaG91bGQgYW5pbWF0ZSB0aGlzIGluc2VydC5cbiAgICB0aGlzLmVuZ2luZS5vbkluc2VydCh0aGlzLm5hbWVzcGFjZUlkLCBuZXdDaGlsZCwgcGFyZW50LCBpc01vdmUpO1xuICB9XG5cbiAgcmVtb3ZlQ2hpbGQocGFyZW50OiBhbnksIG9sZENoaWxkOiBhbnksIGlzSG9zdEVsZW1lbnQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmVuZ2luZS5vblJlbW92ZSh0aGlzLm5hbWVzcGFjZUlkLCBvbGRDaGlsZCwgdGhpcy5kZWxlZ2F0ZSwgaXNIb3N0RWxlbWVudCk7XG4gIH1cblxuICBzZWxlY3RSb290RWxlbWVudChzZWxlY3Rvck9yTm9kZTogYW55LCBwcmVzZXJ2ZUNvbnRlbnQ/OiBib29sZWFuKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZWdhdGUuc2VsZWN0Um9vdEVsZW1lbnQoc2VsZWN0b3JPck5vZGUsIHByZXNlcnZlQ29udGVudCk7XG4gIH1cblxuICBwYXJlbnROb2RlKG5vZGU6IGFueSkge1xuICAgIHJldHVybiB0aGlzLmRlbGVnYXRlLnBhcmVudE5vZGUobm9kZSk7XG4gIH1cblxuICBuZXh0U2libGluZyhub2RlOiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5uZXh0U2libGluZyhub2RlKTtcbiAgfVxuXG4gIHNldEF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZ3xudWxsfHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUuc2V0QXR0cmlidXRlKGVsLCBuYW1lLCB2YWx1ZSwgbmFtZXNwYWNlKTtcbiAgfVxuXG4gIHJlbW92ZUF0dHJpYnV0ZShlbDogYW55LCBuYW1lOiBzdHJpbmcsIG5hbWVzcGFjZT86IHN0cmluZ3xudWxsfHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIHRoaXMuZGVsZWdhdGUucmVtb3ZlQXR0cmlidXRlKGVsLCBuYW1lLCBuYW1lc3BhY2UpO1xuICB9XG5cbiAgYWRkQ2xhc3MoZWw6IGFueSwgbmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5kZWxlZ2F0ZS5hZGRDbGFzcyhlbCwgbmFtZSk7XG4gIH1cblxuICByZW1vdmVDbGFzcyhlbDogYW55LCBuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLnJlbW92ZUNsYXNzKGVsLCBuYW1lKTtcbiAgfVxuXG4gIHNldFN0eWxlKGVsOiBhbnksIHN0eWxlOiBzdHJpbmcsIHZhbHVlOiBhbnksIGZsYWdzPzogUmVuZGVyZXJTdHlsZUZsYWdzMnx1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLnNldFN0eWxlKGVsLCBzdHlsZSwgdmFsdWUsIGZsYWdzKTtcbiAgfVxuXG4gIHJlbW92ZVN0eWxlKGVsOiBhbnksIHN0eWxlOiBzdHJpbmcsIGZsYWdzPzogUmVuZGVyZXJTdHlsZUZsYWdzMnx1bmRlZmluZWQpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLnJlbW92ZVN0eWxlKGVsLCBzdHlsZSwgZmxhZ3MpO1xuICB9XG5cbiAgc2V0UHJvcGVydHkoZWw6IGFueSwgbmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgaWYgKG5hbWUuY2hhckF0KDApID09IEFOSU1BVElPTl9QUkVGSVggJiYgbmFtZSA9PSBESVNBQkxFX0FOSU1BVElPTlNfRkxBRykge1xuICAgICAgdGhpcy5kaXNhYmxlQW5pbWF0aW9ucyhlbCwgISF2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUuc2V0UHJvcGVydHkoZWwsIG5hbWUsIHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBzZXRWYWx1ZShub2RlOiBhbnksIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmRlbGVnYXRlLnNldFZhbHVlKG5vZGUsIHZhbHVlKTtcbiAgfVxuXG4gIGxpc3Rlbih0YXJnZXQ6IGFueSwgZXZlbnROYW1lOiBzdHJpbmcsIGNhbGxiYWNrOiAoZXZlbnQ6IGFueSkgPT4gYm9vbGVhbiB8IHZvaWQpOiAoKSA9PiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5saXN0ZW4odGFyZ2V0LCBldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBkaXNhYmxlQW5pbWF0aW9ucyhlbGVtZW50OiBhbnksIHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5lbmdpbmUuZGlzYWJsZUFuaW1hdGlvbnMoZWxlbWVudCwgdmFsdWUpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBBbmltYXRpb25SZW5kZXJlciBleHRlbmRzIEJhc2VBbmltYXRpb25SZW5kZXJlciBpbXBsZW1lbnRzIFJlbmRlcmVyMiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHVibGljIGZhY3Rvcnk6IEFuaW1hdGlvblJlbmRlcmVyRmFjdG9yeSwgbmFtZXNwYWNlSWQ6IHN0cmluZywgZGVsZWdhdGU6IFJlbmRlcmVyMixcbiAgICAgIGVuZ2luZTogQW5pbWF0aW9uRW5naW5lKSB7XG4gICAgc3VwZXIobmFtZXNwYWNlSWQsIGRlbGVnYXRlLCBlbmdpbmUpO1xuICAgIHRoaXMubmFtZXNwYWNlSWQgPSBuYW1lc3BhY2VJZDtcbiAgfVxuXG4gIG92ZXJyaWRlIHNldFByb3BlcnR5KGVsOiBhbnksIG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xuICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PSBBTklNQVRJT05fUFJFRklYKSB7XG4gICAgICBpZiAobmFtZS5jaGFyQXQoMSkgPT0gJy4nICYmIG5hbWUgPT0gRElTQUJMRV9BTklNQVRJT05TX0ZMQUcpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6ICEhdmFsdWU7XG4gICAgICAgIHRoaXMuZGlzYWJsZUFuaW1hdGlvbnMoZWwsIHZhbHVlIGFzIGJvb2xlYW4pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lbmdpbmUucHJvY2Vzcyh0aGlzLm5hbWVzcGFjZUlkLCBlbCwgbmFtZS5zdWJzdHIoMSksIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5kZWxlZ2F0ZS5zZXRQcm9wZXJ0eShlbCwgbmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIG92ZXJyaWRlIGxpc3RlbihcbiAgICAgIHRhcmdldDogJ3dpbmRvdyd8J2RvY3VtZW50J3wnYm9keSd8YW55LCBldmVudE5hbWU6IHN0cmluZyxcbiAgICAgIGNhbGxiYWNrOiAoZXZlbnQ6IGFueSkgPT4gYW55KTogKCkgPT4gdm9pZCB7XG4gICAgaWYgKGV2ZW50TmFtZS5jaGFyQXQoMCkgPT0gQU5JTUFUSU9OX1BSRUZJWCkge1xuICAgICAgY29uc3QgZWxlbWVudCA9IHJlc29sdmVFbGVtZW50RnJvbVRhcmdldCh0YXJnZXQpO1xuICAgICAgbGV0IG5hbWUgPSBldmVudE5hbWUuc3Vic3RyKDEpO1xuICAgICAgbGV0IHBoYXNlID0gJyc7XG4gICAgICAvLyBAbGlzdGVuZXIucGhhc2UgaXMgZm9yIHRyaWdnZXIgYW5pbWF0aW9uIGNhbGxiYWNrc1xuICAgICAgLy8gQEBsaXN0ZW5lciBpcyBmb3IgYW5pbWF0aW9uIGJ1aWxkZXIgY2FsbGJhY2tzXG4gICAgICBpZiAobmFtZS5jaGFyQXQoMCkgIT0gQU5JTUFUSU9OX1BSRUZJWCkge1xuICAgICAgICBbbmFtZSwgcGhhc2VdID0gcGFyc2VUcmlnZ2VyQ2FsbGJhY2tOYW1lKG5hbWUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMuZW5naW5lLmxpc3Rlbih0aGlzLm5hbWVzcGFjZUlkLCBlbGVtZW50LCBuYW1lLCBwaGFzZSwgZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCBjb3VudElkID0gKGV2ZW50IGFzIGFueSlbJ19kYXRhJ10gfHwgLTE7XG4gICAgICAgIHRoaXMuZmFjdG9yeS5zY2hlZHVsZUxpc3RlbmVyQ2FsbGJhY2soY291bnRJZCwgY2FsbGJhY2ssIGV2ZW50KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5kZWxlZ2F0ZS5saXN0ZW4odGFyZ2V0LCBldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZXNvbHZlRWxlbWVudEZyb21UYXJnZXQodGFyZ2V0OiAnd2luZG93J3wnZG9jdW1lbnQnfCdib2R5J3xhbnkpOiBhbnkge1xuICBzd2l0Y2ggKHRhcmdldCkge1xuICAgIGNhc2UgJ2JvZHknOlxuICAgICAgcmV0dXJuIGRvY3VtZW50LmJvZHk7XG4gICAgY2FzZSAnZG9jdW1lbnQnOlxuICAgICAgcmV0dXJuIGRvY3VtZW50O1xuICAgIGNhc2UgJ3dpbmRvdyc6XG4gICAgICByZXR1cm4gd2luZG93O1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gdGFyZ2V0O1xuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlVHJpZ2dlckNhbGxiYWNrTmFtZSh0cmlnZ2VyTmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IGRvdEluZGV4ID0gdHJpZ2dlck5hbWUuaW5kZXhPZignLicpO1xuICBjb25zdCB0cmlnZ2VyID0gdHJpZ2dlck5hbWUuc3Vic3RyaW5nKDAsIGRvdEluZGV4KTtcbiAgY29uc3QgcGhhc2UgPSB0cmlnZ2VyTmFtZS5zdWJzdHIoZG90SW5kZXggKyAxKTtcbiAgcmV0dXJuIFt0cmlnZ2VyLCBwaGFzZV07XG59XG4iXX0=