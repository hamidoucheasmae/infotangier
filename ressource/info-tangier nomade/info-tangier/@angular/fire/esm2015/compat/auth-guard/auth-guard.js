import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, pipe } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@angular/fire/compat/auth";
export const loggedIn = map(user => !!user);
export class AngularFireAuthGuard {
    constructor(router, auth) {
        this.router = router;
        this.auth = auth;
        this.canActivate = (next, state) => {
            const authPipeFactory = next.data.authGuardPipe || (() => loggedIn);
            return this.auth.user.pipe(take(1), authPipeFactory(next, state), map(can => {
                if (typeof can === 'boolean') {
                    return can;
                }
                else if (Array.isArray(can)) {
                    return this.router.createUrlTree(can);
                }
                else {
                    // TODO(EdricChan03): Add tests
                    return this.router.parseUrl(can);
                }
            }));
        };
    }
}
AngularFireAuthGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AngularFireAuthGuard, deps: [{ token: i1.Router }, { token: i2.AngularFireAuth }], target: i0.ɵɵFactoryTarget.Injectable });
AngularFireAuthGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AngularFireAuthGuard, providedIn: 'any' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AngularFireAuthGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'any'
                }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i2.AngularFireAuth }]; } });
export const canActivate = (pipe) => ({
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: pipe }
});
export const isNotAnonymous = map(user => !!user && !user.isAnonymous);
export const idTokenResult = switchMap((user) => user ? user.getIdTokenResult() : of(null));
export const emailVerified = map(user => !!user && user.emailVerified);
export const customClaims = pipe(idTokenResult, map(idTokenResult => idTokenResult ? idTokenResult.claims : []));
export const hasCustomClaim = (claim) => pipe(customClaims, map(claims => claims.hasOwnProperty(claim)));
export const redirectUnauthorizedTo = (redirect) => pipe(loggedIn, map(loggedIn => loggedIn || redirect));
export const redirectLoggedInTo = (redirect) => pipe(loggedIn, map(loggedIn => loggedIn && redirect || true));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jb21wYXQvYXV0aC1ndWFyZC9hdXRoLWd1YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUF1QyxNQUFNLEVBQXVCLE1BQU0saUJBQWlCLENBQUM7QUFDbkcsT0FBTyxFQUFjLEVBQUUsRUFBRSxJQUFJLEVBQWlCLE1BQU0sTUFBTSxDQUFDO0FBQzNELE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXRELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7OztBQUs1RCxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBS3RELE1BQU0sT0FBTyxvQkFBb0I7SUFFL0IsWUFBb0IsTUFBYyxFQUFVLElBQXFCO1FBQTdDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFpQjtRQUVqRSxnQkFBVyxHQUFHLENBQUMsSUFBNEIsRUFBRSxLQUEwQixFQUFFLEVBQUU7WUFDekUsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFrQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekYsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ3hCLElBQUksQ0FBQyxDQUFDLENBQUMsRUFDUCxlQUFlLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUM1QixHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ1IsSUFBSSxPQUFPLEdBQUcsS0FBSyxTQUFTLEVBQUU7b0JBQzVCLE9BQU8sR0FBRyxDQUFDO2lCQUNaO3FCQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDN0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDdkM7cUJBQU07b0JBQ0wsK0JBQStCO29CQUMvQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNsQztZQUNILENBQUMsQ0FBQyxDQUNILENBQUM7UUFDSixDQUFDLENBQUE7SUFsQm1FLENBQUM7O2lIQUYxRCxvQkFBb0I7cUhBQXBCLG9CQUFvQixjQUZuQixLQUFLOzJGQUVOLG9CQUFvQjtrQkFIaEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsS0FBSztpQkFDbEI7O0FBeUJELE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBRyxDQUFDLElBQXVCLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdkQsV0FBVyxFQUFFLENBQUUsb0JBQW9CLENBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFO0NBQ3JFLENBQUMsQ0FBQztBQUdILE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBYSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2pGLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUMsQ0FBQyxJQUF3QixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNoSCxNQUFNLENBQUMsTUFBTSxhQUFhLEdBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDakYsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2pILE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FDekIsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDOUUsTUFBTSxDQUFDLE1BQU0sc0JBQXNCLEdBQ2pDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ3RFLE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUM3QixDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBDYW5BY3RpdmF0ZSwgUm91dGVyLCBSb3V0ZXJTdGF0ZVNuYXBzaG90IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUsIG9mLCBwaXBlLCBVbmFyeUZ1bmN0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIHN3aXRjaE1hcCwgdGFrZSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCBmaXJlYmFzZSBmcm9tICdmaXJlYmFzZS9jb21wYXQvYXBwJztcbmltcG9ydCB7IEFuZ3VsYXJGaXJlQXV0aCB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUvY29tcGF0L2F1dGgnO1xuXG5leHBvcnQgdHlwZSBBdXRoUGlwZUdlbmVyYXRvciA9IChuZXh0OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCkgPT4gQXV0aFBpcGU7XG5leHBvcnQgdHlwZSBBdXRoUGlwZSA9IFVuYXJ5RnVuY3Rpb248T2JzZXJ2YWJsZTxmaXJlYmFzZS5Vc2VyfG51bGw+LCBPYnNlcnZhYmxlPGJvb2xlYW58c3RyaW5nfGFueVtdPj47XG5cbmV4cG9ydCBjb25zdCBsb2dnZWRJbjogQXV0aFBpcGUgPSBtYXAodXNlciA9PiAhIXVzZXIpO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdhbnknXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJGaXJlQXV0aEd1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgYXV0aDogQW5ndWxhckZpcmVBdXRoKSB7fVxuXG4gIGNhbkFjdGl2YXRlID0gKG5leHQ6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KSA9PiB7XG4gICAgY29uc3QgYXV0aFBpcGVGYWN0b3J5ID0gbmV4dC5kYXRhLmF1dGhHdWFyZFBpcGUgYXMgQXV0aFBpcGVHZW5lcmF0b3IgfHwgKCgpID0+IGxvZ2dlZEluKTtcbiAgICByZXR1cm4gdGhpcy5hdXRoLnVzZXIucGlwZShcbiAgICAgIHRha2UoMSksXG4gICAgICBhdXRoUGlwZUZhY3RvcnkobmV4dCwgc3RhdGUpLFxuICAgICAgbWFwKGNhbiA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgY2FuID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICByZXR1cm4gY2FuO1xuICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoY2FuKSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnJvdXRlci5jcmVhdGVVcmxUcmVlKGNhbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gVE9ETyhFZHJpY0NoYW4wMyk6IEFkZCB0ZXN0c1xuICAgICAgICAgIHJldHVybiB0aGlzLnJvdXRlci5wYXJzZVVybChjYW4pO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxufVxuXG5leHBvcnQgY29uc3QgY2FuQWN0aXZhdGUgPSAocGlwZTogQXV0aFBpcGVHZW5lcmF0b3IpID0+ICh7XG4gIGNhbkFjdGl2YXRlOiBbIEFuZ3VsYXJGaXJlQXV0aEd1YXJkIF0sIGRhdGE6IHsgYXV0aEd1YXJkUGlwZTogcGlwZSB9XG59KTtcblxuXG5leHBvcnQgY29uc3QgaXNOb3RBbm9ueW1vdXM6IEF1dGhQaXBlID0gbWFwKHVzZXIgPT4gISF1c2VyICYmICF1c2VyLmlzQW5vbnltb3VzKTtcbmV4cG9ydCBjb25zdCBpZFRva2VuUmVzdWx0ID0gc3dpdGNoTWFwKCh1c2VyOiBmaXJlYmFzZS5Vc2VyfG51bGwpID0+IHVzZXIgPyB1c2VyLmdldElkVG9rZW5SZXN1bHQoKSA6IG9mKG51bGwpKTtcbmV4cG9ydCBjb25zdCBlbWFpbFZlcmlmaWVkOiBBdXRoUGlwZSA9IG1hcCh1c2VyID0+ICEhdXNlciAmJiB1c2VyLmVtYWlsVmVyaWZpZWQpO1xuZXhwb3J0IGNvbnN0IGN1c3RvbUNsYWltcyA9IHBpcGUoaWRUb2tlblJlc3VsdCwgbWFwKGlkVG9rZW5SZXN1bHQgPT4gaWRUb2tlblJlc3VsdCA/IGlkVG9rZW5SZXN1bHQuY2xhaW1zIDogW10pKTtcbmV4cG9ydCBjb25zdCBoYXNDdXN0b21DbGFpbTogKGNsYWltOiBzdHJpbmcpID0+IEF1dGhQaXBlID1cbiAgKGNsYWltKSA9PiBwaXBlKGN1c3RvbUNsYWltcywgbWFwKGNsYWltcyA9PiAgY2xhaW1zLmhhc093blByb3BlcnR5KGNsYWltKSkpO1xuZXhwb3J0IGNvbnN0IHJlZGlyZWN0VW5hdXRob3JpemVkVG86IChyZWRpcmVjdDogc3RyaW5nfGFueVtdKSA9PiBBdXRoUGlwZSA9XG4gIChyZWRpcmVjdCkgPT4gcGlwZShsb2dnZWRJbiwgbWFwKGxvZ2dlZEluID0+IGxvZ2dlZEluIHx8IHJlZGlyZWN0KSk7XG5leHBvcnQgY29uc3QgcmVkaXJlY3RMb2dnZWRJblRvOiAocmVkaXJlY3Q6IHN0cmluZ3xhbnlbXSkgPT4gQXV0aFBpcGUgPVxuICAocmVkaXJlY3QpID0+IHBpcGUobG9nZ2VkSW4sIG1hcChsb2dnZWRJbiA9PiBsb2dnZWRJbiAmJiByZWRpcmVjdCB8fCB0cnVlKSk7XG4iXX0=