import { __awaiter } from "tslib";
import { Inject, Injectable, InjectionToken, NgZone, Optional, PLATFORM_ID } from '@angular/core';
import { concat, EMPTY, Observable, of } from 'rxjs';
import { catchError, defaultIfEmpty, map, mergeMap, observeOn, switchMap, switchMapTo, shareReplay, subscribeOn } from 'rxjs/operators';
import { ɵAngularFireSchedulers } from '@angular/fire';
import { ɵlazySDKProxy, ɵapplyMixins } from '@angular/fire/compat';
import { ɵfirebaseAppFactory, FIREBASE_APP_NAME, FIREBASE_OPTIONS, ɵcacheInstance } from '@angular/fire/compat';
import { proxyPolyfillCompat } from './base';
import { isSupported } from 'firebase/messaging';
import * as i0 from "@angular/core";
import * as i1 from "@angular/fire";
export const VAPID_KEY = new InjectionToken('angularfire2.messaging.vapid-key');
export const SERVICE_WORKER = new InjectionToken('angularfire2.messaging.service-worker-registeration');
export class AngularFireMessaging {
    constructor(options, name, 
    // tslint:disable-next-line:ban-types
    platformId, zone, schedulers, vapidKey, _serviceWorker) {
        const serviceWorker = _serviceWorker;
        const messaging = of(undefined).pipe(subscribeOn(schedulers.outsideAngular), observeOn(schedulers.insideAngular), switchMap(isSupported), switchMap(supported => supported ? import('firebase/compat/messaging') : EMPTY), map(() => ɵfirebaseAppFactory(options, zone, name)), switchMap(app => ɵcacheInstance(`${app.name}.messaging`, 'AngularFireMessaging', app.name, () => __awaiter(this, void 0, void 0, function* () {
            return app.messaging();
        }), [])), shareReplay({ bufferSize: 1, refCount: false }));
        this.requestPermission = messaging.pipe(subscribeOn(schedulers.outsideAngular), observeOn(schedulers.insideAngular), switchMap(() => Notification.requestPermission()));
        this.getToken = messaging.pipe(subscribeOn(schedulers.outsideAngular), observeOn(schedulers.insideAngular), switchMap((messaging) => __awaiter(this, void 0, void 0, function* () {
            if (Notification.permission === 'granted') {
                const serviceWorkerRegistration = serviceWorker ? yield serviceWorker : null;
                return yield messaging.getToken({ vapidKey, serviceWorkerRegistration });
            }
            else {
                return null;
            }
        })));
        const notificationPermission$ = new Observable(emitter => {
            navigator.permissions.query({ name: 'notifications' }).then(notificationPerm => {
                notificationPerm.onchange = () => emitter.next();
            });
        });
        const tokenChange$ = messaging.pipe(subscribeOn(schedulers.outsideAngular), observeOn(schedulers.insideAngular), switchMapTo(notificationPermission$), switchMapTo(this.getToken));
        this.tokenChanges = messaging.pipe(subscribeOn(schedulers.outsideAngular), observeOn(schedulers.insideAngular), switchMap(() => concat(this.getToken, tokenChange$)));
        this.messages = messaging.pipe(subscribeOn(schedulers.outsideAngular), observeOn(schedulers.insideAngular), switchMap(messaging => new Observable(emitter => messaging.onMessage(emitter))));
        this.requestToken = messaging.pipe(subscribeOn(schedulers.outsideAngular), observeOn(schedulers.insideAngular), switchMap(() => this.requestPermission), catchError(() => of(null)), mergeMap(() => this.tokenChanges));
        this.deleteToken = () => messaging.pipe(subscribeOn(schedulers.outsideAngular), observeOn(schedulers.insideAngular), switchMap(messaging => messaging.deleteToken()), defaultIfEmpty(false));
        return ɵlazySDKProxy(this, messaging, zone);
    }
}
AngularFireMessaging.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AngularFireMessaging, deps: [{ token: FIREBASE_OPTIONS }, { token: FIREBASE_APP_NAME, optional: true }, { token: PLATFORM_ID }, { token: i0.NgZone }, { token: i1.ɵAngularFireSchedulers }, { token: VAPID_KEY, optional: true }, { token: SERVICE_WORKER, optional: true }], target: i0.ɵɵFactoryTarget.Injectable });
AngularFireMessaging.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AngularFireMessaging, providedIn: 'any' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: AngularFireMessaging, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'any'
                }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [FIREBASE_OPTIONS]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [FIREBASE_APP_NAME]
                }] }, { type: Object, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.NgZone }, { type: i1.ɵAngularFireSchedulers }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [VAPID_KEY]
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: [SERVICE_WORKER]
                }] }]; } });
ɵapplyMixins(AngularFireMessaging, [proxyPolyfillCompat]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2NvbXBhdC9tZXNzYWdpbmcvbWVzc2FnaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbEcsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4SSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkQsT0FBTyxFQUFFLGFBQWEsRUFBaUIsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDbEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRWhILE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUM3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7OztBQUVqRCxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQUcsSUFBSSxjQUFjLENBQVMsa0NBQWtDLENBQUMsQ0FBQztBQUN4RixNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUcsSUFBSSxjQUFjLENBQXFDLHFEQUFxRCxDQUFDLENBQUM7QUFRNUksTUFBTSxPQUFPLG9CQUFvQjtJQVMvQixZQUM0QixPQUF3QixFQUNYLElBQStCO0lBQ3RFLHFDQUFxQztJQUNoQixVQUFrQixFQUN2QyxJQUFZ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QyxDQUFDOztpSEFsR1Usb0JBQW9CLGtCQVVyQixnQkFBZ0IsYUFDSixpQkFBaUIsNkJBRTdCLFdBQVcseUVBR0MsU0FBUyw2QkFDVCxjQUFjO3FIQWpCekIsb0JBQW9CLGNBRm5CLEtBQUs7MkZBRU4sb0JBQW9CO2tCQUhoQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxLQUFLO2lCQUNsQjs7MEJBV0ksTUFBTTsyQkFBQyxnQkFBZ0I7OzBCQUN2QixRQUFROzswQkFBSSxNQUFNOzJCQUFDLGlCQUFpQjs4QkFFSixNQUFNOzBCQUF0QyxNQUFNOzJCQUFDLFdBQVc7OzBCQUdsQixRQUFROzswQkFBSSxNQUFNOzJCQUFDLFNBQVM7OzBCQUM1QixRQUFROzswQkFBSSxNQUFNOzJCQUFDLGNBQWM7O0FBcUZ0QyxZQUFZLENBQUMsb0JBQW9CLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUsIEluamVjdGlvblRva2VuLCBOZ1pvbmUsIE9wdGlvbmFsLCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IGZpcmViYXNlIGZyb20gJ2ZpcmViYXNlL2NvbXBhdC9hcHAnO1xuaW1wb3J0IHsgY29uY2F0LCBFTVBUWSwgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNhdGNoRXJyb3IsIGRlZmF1bHRJZkVtcHR5LCBtYXAsIG1lcmdlTWFwLCBvYnNlcnZlT24sIHN3aXRjaE1hcCwgc3dpdGNoTWFwVG8sIHNoYXJlUmVwbGF5LCBzdWJzY3JpYmVPbiB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IMm1QW5ndWxhckZpcmVTY2hlZHVsZXJzIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZSc7XG5pbXBvcnQgeyDJtWxhenlTREtQcm94eSwgybVQcm9taXNlUHJveHksIMm1YXBwbHlNaXhpbnMgfSBmcm9tICdAYW5ndWxhci9maXJlL2NvbXBhdCc7XG5pbXBvcnQgeyDJtWZpcmViYXNlQXBwRmFjdG9yeSwgRklSRUJBU0VfQVBQX05BTUUsIEZJUkVCQVNFX09QVElPTlMsIMm1Y2FjaGVJbnN0YW5jZSB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUvY29tcGF0JztcbmltcG9ydCB7IEZpcmViYXNlT3B0aW9ucyB9IGZyb20gJ2ZpcmViYXNlL2FwcCc7XG5pbXBvcnQgeyBwcm94eVBvbHlmaWxsQ29tcGF0IH0gZnJvbSAnLi9iYXNlJztcbmltcG9ydCB7IGlzU3VwcG9ydGVkIH0gZnJvbSAnZmlyZWJhc2UvbWVzc2FnaW5nJztcblxuZXhwb3J0IGNvbnN0IFZBUElEX0tFWSA9IG5ldyBJbmplY3Rpb25Ub2tlbjxzdHJpbmc+KCdhbmd1bGFyZmlyZTIubWVzc2FnaW5nLnZhcGlkLWtleScpO1xuZXhwb3J0IGNvbnN0IFNFUlZJQ0VfV09SS0VSID0gbmV3IEluamVjdGlvblRva2VuPFByb21pc2U8U2VydmljZVdvcmtlclJlZ2lzdHJhdGlvbj4+KCdhbmd1bGFyZmlyZTIubWVzc2FnaW5nLnNlcnZpY2Utd29ya2VyLXJlZ2lzdGVyYXRpb24nKTtcblxuZXhwb3J0IGludGVyZmFjZSBBbmd1bGFyRmlyZU1lc3NhZ2luZyBleHRlbmRzIE9taXQ8ybVQcm9taXNlUHJveHk8ZmlyZWJhc2UubWVzc2FnaW5nLk1lc3NhZ2luZz4sICdkZWxldGVUb2tlbicgfCAnZ2V0VG9rZW4nIHwgJ3JlcXVlc3RQZXJtaXNzaW9uJz4ge1xufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdhbnknXG59KVxuZXhwb3J0IGNsYXNzIEFuZ3VsYXJGaXJlTWVzc2FnaW5nIHtcblxuICBwdWJsaWMgcmVhZG9ubHkgcmVxdWVzdFBlcm1pc3Npb246IE9ic2VydmFibGU8Tm90aWZpY2F0aW9uUGVybWlzc2lvbj47XG4gIHB1YmxpYyByZWFkb25seSBnZXRUb2tlbjogT2JzZXJ2YWJsZTxzdHJpbmcgfCBudWxsPjtcbiAgcHVibGljIHJlYWRvbmx5IHRva2VuQ2hhbmdlczogT2JzZXJ2YWJsZTxzdHJpbmcgfCBudWxsPjtcbiAgcHVibGljIHJlYWRvbmx5IG1lc3NhZ2VzOiBPYnNlcnZhYmxlPGZpcmViYXNlLm1lc3NhZ2luZy5NZXNzYWdlUGF5bG9hZD47XG4gIHB1YmxpYyByZWFkb25seSByZXF1ZXN0VG9rZW46IE9ic2VydmFibGU8c3RyaW5nIHwgbnVsbD47XG4gIHB1YmxpYyByZWFkb25seSBkZWxldGVUb2tlbjogKHRva2VuOiBzdHJpbmcpID0+IE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChGSVJFQkFTRV9PUFRJT05TKSBvcHRpb25zOiBGaXJlYmFzZU9wdGlvbnMsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChGSVJFQkFTRV9BUFBfTkFNRSkgbmFtZTogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCxcbiAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6YmFuLXR5cGVzXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcGxhdGZvcm1JZDogT2JqZWN0LFxuICAgIHpvbmU6IE5nWm9uZSxcbiAgICBzY2hlZHVsZXJzOiDJtUFuZ3VsYXJGaXJlU2NoZWR1bGVycyxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KFZBUElEX0tFWSkgdmFwaWRLZXk6IHN0cmluZ3xudWxsLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoU0VSVklDRV9XT1JLRVIpIF9zZXJ2aWNlV29ya2VyOiBhbnksXG4gICkge1xuICAgIGNvbnN0IHNlcnZpY2VXb3JrZXI6IFByb21pc2U8U2VydmljZVdvcmtlclJlZ2lzdHJhdGlvbj4gfCBudWxsID0gX3NlcnZpY2VXb3JrZXI7XG5cbiAgICBjb25zdCBtZXNzYWdpbmcgPSBvZih1bmRlZmluZWQpLnBpcGUoXG4gICAgICBzdWJzY3JpYmVPbihzY2hlZHVsZXJzLm91dHNpZGVBbmd1bGFyKSxcbiAgICAgIG9ic2VydmVPbihzY2hlZHVsZXJzLmluc2lkZUFuZ3VsYXIpLFxuICAgICAgc3dpdGNoTWFwKGlzU3VwcG9ydGVkKSxcbiAgICAgIHN3aXRjaE1hcChzdXBwb3J0ZWQgPT4gc3VwcG9ydGVkID8gaW1wb3J0KCdmaXJlYmFzZS9jb21wYXQvbWVzc2FnaW5nJykgOiBFTVBUWSksXG4gICAgICBtYXAoKCkgPT4gybVmaXJlYmFzZUFwcEZhY3Rvcnkob3B0aW9ucywgem9uZSwgbmFtZSkpLFxuICAgICAgc3dpdGNoTWFwKGFwcCA9PiDJtWNhY2hlSW5zdGFuY2UoYCR7YXBwLm5hbWV9Lm1lc3NhZ2luZ2AsICdBbmd1bGFyRmlyZU1lc3NhZ2luZycsIGFwcC5uYW1lLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIHJldHVybiBhcHAubWVzc2FnaW5nKCk7XG4gICAgICB9LCBbXSkpLFxuICAgICAgc2hhcmVSZXBsYXkoeyBidWZmZXJTaXplOiAxLCByZWZDb3VudDogZmFsc2UgfSlcbiAgICApO1xuXG5cbiAgICB0aGlzLnJlcXVlc3RQZXJtaXNzaW9uID0gbWVzc2FnaW5nLnBpcGUoXG4gICAgICBzdWJzY3JpYmVPbihzY2hlZHVsZXJzLm91dHNpZGVBbmd1bGFyKSxcbiAgICAgIG9ic2VydmVPbihzY2hlZHVsZXJzLmluc2lkZUFuZ3VsYXIpLFxuICAgICAgc3dpdGNoTWFwKCgpID0+IE5vdGlmaWNhdGlvbi5yZXF1ZXN0UGVybWlzc2lvbigpKVxuICAgICk7XG5cbiAgICB0aGlzLmdldFRva2VuID0gbWVzc2FnaW5nLnBpcGUoXG4gICAgICBzdWJzY3JpYmVPbihzY2hlZHVsZXJzLm91dHNpZGVBbmd1bGFyKSxcbiAgICAgIG9ic2VydmVPbihzY2hlZHVsZXJzLmluc2lkZUFuZ3VsYXIpLFxuICAgICAgc3dpdGNoTWFwKGFzeW5jIG1lc3NhZ2luZyA9PiB7XG4gICAgICAgIGlmIChOb3RpZmljYXRpb24ucGVybWlzc2lvbiA9PT0gJ2dyYW50ZWQnKSB7XG4gICAgICAgICAgY29uc3Qgc2VydmljZVdvcmtlclJlZ2lzdHJhdGlvbiA9IHNlcnZpY2VXb3JrZXIgPyBhd2FpdCBzZXJ2aWNlV29ya2VyIDogbnVsbDtcbiAgICAgICAgICByZXR1cm4gYXdhaXQgbWVzc2FnaW5nLmdldFRva2VuKHsgdmFwaWRLZXksIHNlcnZpY2VXb3JrZXJSZWdpc3RyYXRpb24gfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIGNvbnN0IG5vdGlmaWNhdGlvblBlcm1pc3Npb24kID0gbmV3IE9ic2VydmFibGU8c3RyaW5nPihlbWl0dGVyID0+IHtcbiAgICAgIG5hdmlnYXRvci5wZXJtaXNzaW9ucy5xdWVyeSh7IG5hbWU6ICdub3RpZmljYXRpb25zJyB9KS50aGVuKG5vdGlmaWNhdGlvblBlcm0gPT4ge1xuICAgICAgICBub3RpZmljYXRpb25QZXJtLm9uY2hhbmdlID0gKCkgPT4gZW1pdHRlci5uZXh0KCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuXG4gICAgY29uc3QgdG9rZW5DaGFuZ2UkID0gbWVzc2FnaW5nLnBpcGUoXG4gICAgICBzdWJzY3JpYmVPbihzY2hlZHVsZXJzLm91dHNpZGVBbmd1bGFyKSxcbiAgICAgIG9ic2VydmVPbihzY2hlZHVsZXJzLmluc2lkZUFuZ3VsYXIpLFxuICAgICAgc3dpdGNoTWFwVG8obm90aWZpY2F0aW9uUGVybWlzc2lvbiQpLFxuICAgICAgc3dpdGNoTWFwVG8odGhpcy5nZXRUb2tlbilcbiAgICApO1xuXG4gICAgdGhpcy50b2tlbkNoYW5nZXMgPSBtZXNzYWdpbmcucGlwZShcbiAgICAgIHN1YnNjcmliZU9uKHNjaGVkdWxlcnMub3V0c2lkZUFuZ3VsYXIpLFxuICAgICAgb2JzZXJ2ZU9uKHNjaGVkdWxlcnMuaW5zaWRlQW5ndWxhciksXG4gICAgICBzd2l0Y2hNYXAoKCkgPT4gY29uY2F0KHRoaXMuZ2V0VG9rZW4sIHRva2VuQ2hhbmdlJCkpXG4gICAgKTtcblxuXG4gICAgdGhpcy5tZXNzYWdlcyA9IG1lc3NhZ2luZy5waXBlKFxuICAgICAgc3Vic2NyaWJlT24oc2NoZWR1bGVycy5vdXRzaWRlQW5ndWxhciksXG4gICAgICBvYnNlcnZlT24oc2NoZWR1bGVycy5pbnNpZGVBbmd1bGFyKSxcbiAgICAgIHN3aXRjaE1hcChtZXNzYWdpbmcgPT4gbmV3IE9ic2VydmFibGU8ZmlyZWJhc2UubWVzc2FnaW5nLk1lc3NhZ2VQYXlsb2FkPihlbWl0dGVyID0+XG4gICAgICAgIG1lc3NhZ2luZy5vbk1lc3NhZ2UoZW1pdHRlcilcbiAgICAgICkpLFxuICAgICk7XG5cbiAgICB0aGlzLnJlcXVlc3RUb2tlbiA9IG1lc3NhZ2luZy5waXBlKFxuICAgICAgc3Vic2NyaWJlT24oc2NoZWR1bGVycy5vdXRzaWRlQW5ndWxhciksXG4gICAgICBvYnNlcnZlT24oc2NoZWR1bGVycy5pbnNpZGVBbmd1bGFyKSxcbiAgICAgIHN3aXRjaE1hcCgoKSA9PiB0aGlzLnJlcXVlc3RQZXJtaXNzaW9uKSxcbiAgICAgIGNhdGNoRXJyb3IoKCkgPT4gb2YobnVsbCkpLFxuICAgICAgbWVyZ2VNYXAoKCkgPT4gdGhpcy50b2tlbkNoYW5nZXMpXG4gICAgKTtcblxuICAgIHRoaXMuZGVsZXRlVG9rZW4gPSAoKSA9PiBtZXNzYWdpbmcucGlwZShcbiAgICAgIHN1YnNjcmliZU9uKHNjaGVkdWxlcnMub3V0c2lkZUFuZ3VsYXIpLFxuICAgICAgb2JzZXJ2ZU9uKHNjaGVkdWxlcnMuaW5zaWRlQW5ndWxhciksXG4gICAgICBzd2l0Y2hNYXAobWVzc2FnaW5nID0+IG1lc3NhZ2luZy5kZWxldGVUb2tlbigpKSxcbiAgICAgIGRlZmF1bHRJZkVtcHR5KGZhbHNlKVxuICAgICk7XG5cbiAgICByZXR1cm4gybVsYXp5U0RLUHJveHkodGhpcywgbWVzc2FnaW5nLCB6b25lKTtcbiAgfVxuXG59XG5cbsm1YXBwbHlNaXhpbnMoQW5ndWxhckZpcmVNZXNzYWdpbmcsIFtwcm94eVBvbHlmaWxsQ29tcGF0XSk7XG4iXX0=