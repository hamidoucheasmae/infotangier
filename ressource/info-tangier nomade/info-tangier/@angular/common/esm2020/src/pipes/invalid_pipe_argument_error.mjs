/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ɵRuntimeError as RuntimeError, ɵstringify as stringify } from '@angular/core';
export function invalidPipeArgumentError(type, value) {
    const errorMessage = (typeof ngDevMode === 'undefined' || ngDevMode) ?
        `InvalidPipeArgument: '${value}' for pipe '${stringify(type)}'` :
        '';
    return new RuntimeError(2100 /* INVALID_PIPE_ARGUMENT */, errorMessage);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52YWxpZF9waXBlX2FyZ3VtZW50X2Vycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29tbW9uL3NyYy9waXBlcy9pbnZhbGlkX3BpcGVfYXJndW1lbnRfZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFPLGFBQWEsSUFBSSxZQUFZLEVBQUUsVUFBVSxJQUFJLFNBQVMsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUkzRixNQUFNLFVBQVUsd0JBQXdCLENBQUMsSUFBZSxFQUFFLEtBQWE7SUFDckUsTUFBTSxZQUFZLEdBQUcsQ0FBQyxPQUFPLFNBQVMsS0FBSyxXQUFXLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNsRSx5QkFBeUIsS0FBSyxlQUFlLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakUsRUFBRSxDQUFDO0lBQ1AsT0FBTyxJQUFJLFlBQVksbUNBQXlDLFlBQVksQ0FBQyxDQUFDO0FBQ2hGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtUeXBlLCDJtVJ1bnRpbWVFcnJvciBhcyBSdW50aW1lRXJyb3IsIMm1c3RyaW5naWZ5IGFzIHN0cmluZ2lmeX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7UnVudGltZUVycm9yQ29kZX0gZnJvbSAnLi4vZXJyb3JzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGludmFsaWRQaXBlQXJndW1lbnRFcnJvcih0eXBlOiBUeXBlPGFueT4sIHZhbHVlOiBPYmplY3QpIHtcbiAgY29uc3QgZXJyb3JNZXNzYWdlID0gKHR5cGVvZiBuZ0Rldk1vZGUgPT09ICd1bmRlZmluZWQnIHx8IG5nRGV2TW9kZSkgP1xuICAgICAgYEludmFsaWRQaXBlQXJndW1lbnQ6ICcke3ZhbHVlfScgZm9yIHBpcGUgJyR7c3RyaW5naWZ5KHR5cGUpfSdgIDpcbiAgICAgICcnO1xuICByZXR1cm4gbmV3IFJ1bnRpbWVFcnJvcihSdW50aW1lRXJyb3JDb2RlLklOVkFMSURfUElQRV9BUkdVTUVOVCwgZXJyb3JNZXNzYWdlKTtcbn1cbiJdfQ==