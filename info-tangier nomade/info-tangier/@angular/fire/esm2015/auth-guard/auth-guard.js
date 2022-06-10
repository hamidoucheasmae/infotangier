import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of, pipe } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { Auth, user } from '@angular/fire/auth';
import * as i0 from "@angular/core";
import * as i1 from "@angular/router";
import * as i2 from "@angular/fire/auth";
export const loggedIn = map(user => !!user);
export class AuthGuard {
    constructor(router, auth) {
        this.router = router;
        this.auth = auth;
        this.canActivate = (next, state) => {
            const authPipeFactory = next.data.authGuardPipe || (() => loggedIn);
            return user(this.auth).pipe(take(1), authPipeFactory(next, state), map(can => {
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
AuthGuard.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AuthGuard, deps: [{ token: i1.Router }, { token: i2.Auth }], target: i0.ɵɵFactoryTarget.Injectable });
AuthGuard.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AuthGuard, providedIn: 'any' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AuthGuard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'any'
                }]
        }], ctorParameters: function () { return [{ type: i1.Router }, { type: i2.Auth }]; } });
export const canActivate = (pipe) => ({
    canActivate: [AuthGuard], data: { authGuardPipe: pipe }
});
export const isNotAnonymous = map(user => !!user && !user.isAnonymous);
export const idTokenResult = switchMap((user) => user ? user.getIdTokenResult() : of(null));
export const emailVerified = map(user => !!user && user.emailVerified);
export const customClaims = pipe(idTokenResult, map(idTokenResult => idTokenResult ? idTokenResult.claims : []));
export const hasCustomClaim = (claim) => pipe(customClaims, map(claims => claims.hasOwnProperty(claim)));
export const redirectUnauthorizedTo = (redirect) => pipe(loggedIn, map(loggedIn => loggedIn || redirect));
export const redirectLoggedInTo = (redirect) => pipe(loggedIn, map(loggedIn => loggedIn && redirect || true));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC1ndWFyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hdXRoLWd1YXJkL2F1dGgtZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQXVDLE1BQU0sRUFBdUIsTUFBTSxpQkFBaUIsQ0FBQztBQUNuRyxPQUFPLEVBQWMsRUFBRSxFQUFFLElBQUksRUFBaUIsTUFBTSxNQUFNLENBQUM7QUFDM0QsT0FBTyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDdEQsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7OztBQU1oRCxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQWEsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBS3RELE1BQU0sT0FBTyxTQUFTO0lBRXBCLFlBQW9CLE1BQWMsRUFBVSxJQUFVO1FBQWxDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFNO1FBRXRELGdCQUFXLEdBQUcsQ0FBQyxJQUE0QixFQUFFLEtBQTBCLEVBQUUsRUFBRTtZQUN6RSxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWtDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6RixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUN6QixJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1AsZUFBZSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFDNUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNSLElBQUksT0FBTyxHQUFHLEtBQUssU0FBUyxFQUFFO29CQUM1QixPQUFPLEdBQUcsQ0FBQztpQkFDWjtxQkFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzdCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ3ZDO3FCQUFNO29CQUNMLCtCQUErQjtvQkFDL0IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDbEM7WUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBQ0osQ0FBQyxDQUFBO0lBbEJ3RCxDQUFDOztzR0FGL0MsU0FBUzswR0FBVCxTQUFTLGNBRlIsS0FBSzsyRkFFTixTQUFTO2tCQUhyQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxLQUFLO2lCQUNsQjs7QUF5QkQsTUFBTSxDQUFDLE1BQU0sV0FBVyxHQUFHLENBQUMsSUFBdUIsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN2RCxXQUFXLEVBQUUsQ0FBRSxTQUFTLENBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFO0NBQzFELENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBYSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2pGLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBRyxTQUFTLENBQUMsQ0FBQyxJQUFlLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3ZHLE1BQU0sQ0FBQyxNQUFNLGFBQWEsR0FBYSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUNqRixNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxHQUFHLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDakgsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUN6QixDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBRSxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5RSxNQUFNLENBQUMsTUFBTSxzQkFBc0IsR0FDakMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDdEUsTUFBTSxDQUFDLE1BQU0sa0JBQWtCLEdBQzdCLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIENhbkFjdGl2YXRlLCBSb3V0ZXIsIFJvdXRlclN0YXRlU25hcHNob3QgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YsIHBpcGUsIFVuYXJ5RnVuY3Rpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc3dpdGNoTWFwLCB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgQXV0aCwgdXNlciB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUvYXV0aCc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnZmlyZWJhc2UvYXV0aCc7XG5cbmV4cG9ydCB0eXBlIEF1dGhQaXBlR2VuZXJhdG9yID0gKG5leHQ6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KSA9PiBBdXRoUGlwZTtcbmV4cG9ydCB0eXBlIEF1dGhQaXBlID0gVW5hcnlGdW5jdGlvbjxPYnNlcnZhYmxlPFVzZXJ8bnVsbD4sIE9ic2VydmFibGU8Ym9vbGVhbnxzdHJpbmd8YW55W10+PjtcblxuZXhwb3J0IGNvbnN0IGxvZ2dlZEluOiBBdXRoUGlwZSA9IG1hcCh1c2VyID0+ICEhdXNlcik7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ2FueSdcbn0pXG5leHBvcnQgY2xhc3MgQXV0aEd1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgYXV0aDogQXV0aCkge31cblxuICBjYW5BY3RpdmF0ZSA9IChuZXh0OiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCkgPT4ge1xuICAgIGNvbnN0IGF1dGhQaXBlRmFjdG9yeSA9IG5leHQuZGF0YS5hdXRoR3VhcmRQaXBlIGFzIEF1dGhQaXBlR2VuZXJhdG9yIHx8ICgoKSA9PiBsb2dnZWRJbik7XG4gICAgcmV0dXJuIHVzZXIodGhpcy5hdXRoKS5waXBlKFxuICAgICAgdGFrZSgxKSxcbiAgICAgIGF1dGhQaXBlRmFjdG9yeShuZXh0LCBzdGF0ZSksXG4gICAgICBtYXAoY2FuID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjYW4gPT09ICdib29sZWFuJykge1xuICAgICAgICAgIHJldHVybiBjYW47XG4gICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShjYW4pKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucm91dGVyLmNyZWF0ZVVybFRyZWUoY2FuKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBUT0RPKEVkcmljQ2hhbjAzKTogQWRkIHRlc3RzXG4gICAgICAgICAgcmV0dXJuIHRoaXMucm91dGVyLnBhcnNlVXJsKGNhbik7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG59XG5cbmV4cG9ydCBjb25zdCBjYW5BY3RpdmF0ZSA9IChwaXBlOiBBdXRoUGlwZUdlbmVyYXRvcikgPT4gKHtcbiAgY2FuQWN0aXZhdGU6IFsgQXV0aEd1YXJkIF0sIGRhdGE6IHsgYXV0aEd1YXJkUGlwZTogcGlwZSB9XG59KTtcblxuZXhwb3J0IGNvbnN0IGlzTm90QW5vbnltb3VzOiBBdXRoUGlwZSA9IG1hcCh1c2VyID0+ICEhdXNlciAmJiAhdXNlci5pc0Fub255bW91cyk7XG5leHBvcnQgY29uc3QgaWRUb2tlblJlc3VsdCA9IHN3aXRjaE1hcCgodXNlcjogVXNlcnxudWxsKSA9PiB1c2VyID8gdXNlci5nZXRJZFRva2VuUmVzdWx0KCkgOiBvZihudWxsKSk7XG5leHBvcnQgY29uc3QgZW1haWxWZXJpZmllZDogQXV0aFBpcGUgPSBtYXAodXNlciA9PiAhIXVzZXIgJiYgdXNlci5lbWFpbFZlcmlmaWVkKTtcbmV4cG9ydCBjb25zdCBjdXN0b21DbGFpbXMgPSBwaXBlKGlkVG9rZW5SZXN1bHQsIG1hcChpZFRva2VuUmVzdWx0ID0+IGlkVG9rZW5SZXN1bHQgPyBpZFRva2VuUmVzdWx0LmNsYWltcyA6IFtdKSk7XG5leHBvcnQgY29uc3QgaGFzQ3VzdG9tQ2xhaW06IChjbGFpbTogc3RyaW5nKSA9PiBBdXRoUGlwZSA9XG4gIChjbGFpbSkgPT4gcGlwZShjdXN0b21DbGFpbXMsIG1hcChjbGFpbXMgPT4gIGNsYWltcy5oYXNPd25Qcm9wZXJ0eShjbGFpbSkpKTtcbmV4cG9ydCBjb25zdCByZWRpcmVjdFVuYXV0aG9yaXplZFRvOiAocmVkaXJlY3Q6IHN0cmluZ3xhbnlbXSkgPT4gQXV0aFBpcGUgPVxuICAocmVkaXJlY3QpID0+IHBpcGUobG9nZ2VkSW4sIG1hcChsb2dnZWRJbiA9PiBsb2dnZWRJbiB8fCByZWRpcmVjdCkpO1xuZXhwb3J0IGNvbnN0IHJlZGlyZWN0TG9nZ2VkSW5UbzogKHJlZGlyZWN0OiBzdHJpbmd8YW55W10pID0+IEF1dGhQaXBlID1cbiAgKHJlZGlyZWN0KSA9PiBwaXBlKGxvZ2dlZEluLCBtYXAobG9nZ2VkSW4gPT4gbG9nZ2VkSW4gJiYgcmVkaXJlY3QgfHwgdHJ1ZSkpO1xuIl19