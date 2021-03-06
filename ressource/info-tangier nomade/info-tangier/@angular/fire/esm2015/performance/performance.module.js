import { NgModule, Optional, NgZone, InjectionToken, PLATFORM_ID, Injector } from '@angular/core';
import { ɵgetDefaultInstanceOf, ɵAngularFireSchedulers, VERSION } from '@angular/fire';
import { Performance, PerformanceInstances, PERFORMANCE_PROVIDER_NAME } from './performance';
import { FirebaseApps, FirebaseApp } from '@angular/fire/app';
import { registerVersion } from 'firebase/app';
import { isPlatformBrowser } from '@angular/common';
import * as i0 from "@angular/core";
export const PROVIDED_PERFORMANCE_INSTANCES = new InjectionToken('angularfire2.performance-instances');
export function defaultPerformanceInstanceFactory(provided, defaultApp, 
// tslint:disable-next-line:ban-types
platform) {
    if (!isPlatformBrowser(platform)) {
        return null;
    }
    const defaultPerformance = ɵgetDefaultInstanceOf(PERFORMANCE_PROVIDER_NAME, provided, defaultApp);
    return defaultPerformance && new Performance(defaultPerformance);
}
export function performanceInstanceFactory(fn) {
    // tslint:disable-next-line:ban-types
    return (zone, platform, injector) => {
        if (!isPlatformBrowser(platform)) {
            return null;
        }
        const performance = zone.runOutsideAngular(() => fn(injector));
        return new Performance(performance);
    };
}
const PERFORMANCE_INSTANCES_PROVIDER = {
    provide: PerformanceInstances,
    deps: [
        [new Optional(), PROVIDED_PERFORMANCE_INSTANCES],
    ]
};
const DEFAULT_PERFORMANCE_INSTANCE_PROVIDER = {
    provide: Performance,
    useFactory: defaultPerformanceInstanceFactory,
    deps: [
        [new Optional(), PROVIDED_PERFORMANCE_INSTANCES],
        FirebaseApp,
        PLATFORM_ID,
    ]
};
export class PerformanceModule {
    constructor() {
        registerVersion('angularfire', VERSION.full, 'perf');
    }
}
PerformanceModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PerformanceModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
PerformanceModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PerformanceModule });
PerformanceModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PerformanceModule, providers: [
        DEFAULT_PERFORMANCE_INSTANCE_PROVIDER,
        PERFORMANCE_INSTANCES_PROVIDER,
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.1.3", ngImport: i0, type: PerformanceModule, decorators: [{
            type: NgModule,
            args: [{
                    providers: [
                        DEFAULT_PERFORMANCE_INSTANCE_PROVIDER,
                        PERFORMANCE_INSTANCES_PROVIDER,
                    ]
                }]
        }], ctorParameters: function () { return []; } });
export function providePerformance(fn, ...deps) {
    return {
        ngModule: PerformanceModule,
        providers: [{
                provide: PROVIDED_PERFORMANCE_INSTANCES,
                useFactory: performanceInstanceFactory(fn),
                multi: true,
                deps: [
                    NgZone,
                    PLATFORM_ID,
                    Injector,
                    ɵAngularFireSchedulers,
                    FirebaseApps,
                    ...deps,
                ]
            }]
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyZm9ybWFuY2UubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3BlcmZvcm1hbmNlL3BlcmZvcm1hbmNlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsY0FBYyxFQUF1QixXQUFXLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZILE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxzQkFBc0IsRUFBRSxPQUFPLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkYsT0FBTyxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSx5QkFBeUIsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RixPQUFPLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzlELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7O0FBRXBELE1BQU0sQ0FBQyxNQUFNLDhCQUE4QixHQUFHLElBQUksY0FBYyxDQUFnQixvQ0FBb0MsQ0FBQyxDQUFDO0FBRXRILE1BQU0sVUFBVSxpQ0FBaUMsQ0FDL0MsUUFBeUMsRUFDekMsVUFBdUI7QUFDdkIscUNBQXFDO0FBQ3JDLFFBQWdCO0lBRWhCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUFFLE9BQU8sSUFBSSxDQUFDO0tBQUU7SUFDbEQsTUFBTSxrQkFBa0IsR0FBRyxxQkFBcUIsQ0FBc0IseUJBQXlCLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3ZILE9BQU8sa0JBQWtCLElBQUksSUFBSSxXQUFXLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUNuRSxDQUFDO0FBRUQsTUFBTSxVQUFVLDBCQUEwQixDQUFDLEVBQStDO0lBQ3hGLHFDQUFxQztJQUNyQyxPQUFPLENBQUMsSUFBWSxFQUFFLFFBQWdCLEVBQUUsUUFBa0IsRUFBRSxFQUFFO1FBQzVELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUFFLE9BQU8sSUFBSSxDQUFDO1NBQUU7UUFDbEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQy9ELE9BQU8sSUFBSSxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sOEJBQThCLEdBQUc7SUFDckMsT0FBTyxFQUFFLG9CQUFvQjtJQUM3QixJQUFJLEVBQUU7UUFDSixDQUFDLElBQUksUUFBUSxFQUFFLEVBQUUsOEJBQThCLENBQUU7S0FDbEQ7Q0FDRixDQUFDO0FBRUYsTUFBTSxxQ0FBcUMsR0FBRztJQUM1QyxPQUFPLEVBQUUsV0FBVztJQUNwQixVQUFVLEVBQUUsaUNBQWlDO0lBQzdDLElBQUksRUFBRTtRQUNKLENBQUMsSUFBSSxRQUFRLEVBQUUsRUFBRSw4QkFBOEIsQ0FBRTtRQUNqRCxXQUFXO1FBQ1gsV0FBVztLQUNaO0NBQ0YsQ0FBQztBQVFGLE1BQU0sT0FBTyxpQkFBaUI7SUFDNUI7UUFDRSxlQUFlLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdkQsQ0FBQzs7OEdBSFUsaUJBQWlCOytHQUFqQixpQkFBaUI7K0dBQWpCLGlCQUFpQixhQUxqQjtRQUNULHFDQUFxQztRQUNyQyw4QkFBOEI7S0FDL0I7MkZBRVUsaUJBQWlCO2tCQU43QixRQUFRO21CQUFDO29CQUNSLFNBQVMsRUFBRTt3QkFDVCxxQ0FBcUM7d0JBQ3JDLDhCQUE4QjtxQkFDL0I7aUJBQ0Y7O0FBT0QsTUFBTSxVQUFVLGtCQUFrQixDQUNoQyxFQUErQyxFQUFFLEdBQUcsSUFBVztJQUUvRCxPQUFPO1FBQ0wsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQixTQUFTLEVBQUUsQ0FBQztnQkFDVixPQUFPLEVBQUUsOEJBQThCO2dCQUN2QyxVQUFVLEVBQUUsMEJBQTBCLENBQUMsRUFBRSxDQUFDO2dCQUMxQyxLQUFLLEVBQUUsSUFBSTtnQkFDWCxJQUFJLEVBQUU7b0JBQ0osTUFBTTtvQkFDTixXQUFXO29CQUNYLFFBQVE7b0JBQ1Isc0JBQXNCO29CQUN0QixZQUFZO29CQUNaLEdBQUcsSUFBSTtpQkFDUjthQUNGLENBQUM7S0FDSCxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBPcHRpb25hbCwgTmdab25lLCBJbmplY3Rpb25Ub2tlbiwgTW9kdWxlV2l0aFByb3ZpZGVycywgUExBVEZPUk1fSUQsIEluamVjdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaXJlYmFzZVBlcmZvcm1hbmNlIH0gZnJvbSAnZmlyZWJhc2UvcGVyZm9ybWFuY2UnO1xuaW1wb3J0IHsgybVnZXREZWZhdWx0SW5zdGFuY2VPZiwgybVBbmd1bGFyRmlyZVNjaGVkdWxlcnMsIFZFUlNJT04gfSBmcm9tICdAYW5ndWxhci9maXJlJztcbmltcG9ydCB7IFBlcmZvcm1hbmNlLCBQZXJmb3JtYW5jZUluc3RhbmNlcywgUEVSRk9STUFOQ0VfUFJPVklERVJfTkFNRSB9IGZyb20gJy4vcGVyZm9ybWFuY2UnO1xuaW1wb3J0IHsgRmlyZWJhc2VBcHBzLCBGaXJlYmFzZUFwcCB9IGZyb20gJ0Bhbmd1bGFyL2ZpcmUvYXBwJztcbmltcG9ydCB7IHJlZ2lzdGVyVmVyc2lvbiB9IGZyb20gJ2ZpcmViYXNlL2FwcCc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmV4cG9ydCBjb25zdCBQUk9WSURFRF9QRVJGT1JNQU5DRV9JTlNUQU5DRVMgPSBuZXcgSW5qZWN0aW9uVG9rZW48UGVyZm9ybWFuY2VbXT4oJ2FuZ3VsYXJmaXJlMi5wZXJmb3JtYW5jZS1pbnN0YW5jZXMnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRQZXJmb3JtYW5jZUluc3RhbmNlRmFjdG9yeShcbiAgcHJvdmlkZWQ6IEZpcmViYXNlUGVyZm9ybWFuY2VbXXx1bmRlZmluZWQsXG4gIGRlZmF1bHRBcHA6IEZpcmViYXNlQXBwLFxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6YmFuLXR5cGVzXG4gIHBsYXRmb3JtOiBPYmplY3Rcbikge1xuICBpZiAoIWlzUGxhdGZvcm1Ccm93c2VyKHBsYXRmb3JtKSkgeyByZXR1cm4gbnVsbDsgfVxuICBjb25zdCBkZWZhdWx0UGVyZm9ybWFuY2UgPSDJtWdldERlZmF1bHRJbnN0YW5jZU9mPEZpcmViYXNlUGVyZm9ybWFuY2U+KFBFUkZPUk1BTkNFX1BST1ZJREVSX05BTUUsIHByb3ZpZGVkLCBkZWZhdWx0QXBwKTtcbiAgcmV0dXJuIGRlZmF1bHRQZXJmb3JtYW5jZSAmJiBuZXcgUGVyZm9ybWFuY2UoZGVmYXVsdFBlcmZvcm1hbmNlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBlcmZvcm1hbmNlSW5zdGFuY2VGYWN0b3J5KGZuOiAoaW5qZWN0b3I6IEluamVjdG9yKSA9PiBGaXJlYmFzZVBlcmZvcm1hbmNlKSB7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpiYW4tdHlwZXNcbiAgcmV0dXJuICh6b25lOiBOZ1pvbmUsIHBsYXRmb3JtOiBPYmplY3QsIGluamVjdG9yOiBJbmplY3RvcikgPT4ge1xuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm0pKSB7IHJldHVybiBudWxsOyB9XG4gICAgY29uc3QgcGVyZm9ybWFuY2UgPSB6b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IGZuKGluamVjdG9yKSk7XG4gICAgcmV0dXJuIG5ldyBQZXJmb3JtYW5jZShwZXJmb3JtYW5jZSk7XG4gIH07XG59XG5cbmNvbnN0IFBFUkZPUk1BTkNFX0lOU1RBTkNFU19QUk9WSURFUiA9IHtcbiAgcHJvdmlkZTogUGVyZm9ybWFuY2VJbnN0YW5jZXMsXG4gIGRlcHM6IFtcbiAgICBbbmV3IE9wdGlvbmFsKCksIFBST1ZJREVEX1BFUkZPUk1BTkNFX0lOU1RBTkNFUyBdLFxuICBdXG59O1xuXG5jb25zdCBERUZBVUxUX1BFUkZPUk1BTkNFX0lOU1RBTkNFX1BST1ZJREVSID0ge1xuICBwcm92aWRlOiBQZXJmb3JtYW5jZSxcbiAgdXNlRmFjdG9yeTogZGVmYXVsdFBlcmZvcm1hbmNlSW5zdGFuY2VGYWN0b3J5LFxuICBkZXBzOiBbXG4gICAgW25ldyBPcHRpb25hbCgpLCBQUk9WSURFRF9QRVJGT1JNQU5DRV9JTlNUQU5DRVMgXSxcbiAgICBGaXJlYmFzZUFwcCxcbiAgICBQTEFURk9STV9JRCxcbiAgXVxufTtcblxuQE5nTW9kdWxlKHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgREVGQVVMVF9QRVJGT1JNQU5DRV9JTlNUQU5DRV9QUk9WSURFUixcbiAgICBQRVJGT1JNQU5DRV9JTlNUQU5DRVNfUFJPVklERVIsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgUGVyZm9ybWFuY2VNb2R1bGUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICByZWdpc3RlclZlcnNpb24oJ2FuZ3VsYXJmaXJlJywgVkVSU0lPTi5mdWxsLCAncGVyZicpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwcm92aWRlUGVyZm9ybWFuY2UoXG4gIGZuOiAoaW5qZWN0b3I6IEluamVjdG9yKSA9PiBGaXJlYmFzZVBlcmZvcm1hbmNlLCAuLi5kZXBzOiBhbnlbXVxuKTogTW9kdWxlV2l0aFByb3ZpZGVyczxQZXJmb3JtYW5jZU1vZHVsZT4ge1xuICByZXR1cm4ge1xuICAgIG5nTW9kdWxlOiBQZXJmb3JtYW5jZU1vZHVsZSxcbiAgICBwcm92aWRlcnM6IFt7XG4gICAgICBwcm92aWRlOiBQUk9WSURFRF9QRVJGT1JNQU5DRV9JTlNUQU5DRVMsXG4gICAgICB1c2VGYWN0b3J5OiBwZXJmb3JtYW5jZUluc3RhbmNlRmFjdG9yeShmbiksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICAgIGRlcHM6IFtcbiAgICAgICAgTmdab25lLFxuICAgICAgICBQTEFURk9STV9JRCxcbiAgICAgICAgSW5qZWN0b3IsXG4gICAgICAgIMm1QW5ndWxhckZpcmVTY2hlZHVsZXJzLFxuICAgICAgICBGaXJlYmFzZUFwcHMsXG4gICAgICAgIC4uLmRlcHMsXG4gICAgICBdXG4gICAgfV1cbiAgfTtcbn1cbiJdfQ==