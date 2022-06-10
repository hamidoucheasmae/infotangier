import { ɵgetAllInstancesOf } from '@angular/fire';
import { from, timer } from 'rxjs';
import { concatMap, distinct } from 'rxjs/operators';
export const APP_CHECK_PROVIDER_NAME = 'app-check';
export class AppCheck {
    constructor(appCheck) {
        return appCheck;
    }
}
export class AppCheckInstances {
    constructor() {
        return ɵgetAllInstancesOf(APP_CHECK_PROVIDER_NAME);
    }
}
export const appCheckInstance$ = timer(0, 300).pipe(concatMap(() => from(ɵgetAllInstancesOf(APP_CHECK_PROVIDER_NAME))), distinct());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLWNoZWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FwcC1jaGVjay9hcHAtY2hlY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ25DLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFckQsTUFBTSxDQUFDLE1BQU0sdUJBQXVCLEdBQUcsV0FBVyxDQUFDO0FBTW5ELE1BQU0sT0FBTyxRQUFRO0lBQ25CLFlBQVksUUFBMEI7UUFDcEMsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztDQUNGO0FBS0QsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QjtRQUNFLE9BQU8sa0JBQWtCLENBQW1CLHVCQUF1QixDQUFDLENBQUM7SUFDdkUsQ0FBQztDQUNGO0FBRUQsTUFBTSxDQUFDLE1BQU0saUJBQWlCLEdBQUcsS0FBSyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQ2pELFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQW1CLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxFQUNwRixRQUFRLEVBQUUsQ0FDWCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwQ2hlY2sgYXMgRmlyZWJhc2VBcHBDaGVjayB9IGZyb20gJ2ZpcmViYXNlL2FwcC1jaGVjayc7XG5pbXBvcnQgeyDJtWdldEFsbEluc3RhbmNlc09mIH0gZnJvbSAnQGFuZ3VsYXIvZmlyZSc7XG5pbXBvcnQgeyBmcm9tLCB0aW1lciB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY29uY2F0TWFwLCBkaXN0aW5jdCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGNvbnN0IEFQUF9DSEVDS19QUk9WSURFUl9OQU1FID0gJ2FwcC1jaGVjayc7XG5cbi8vIHNlZSBub3RlcyBpbiBjb3JlL2ZpcmViYXNlLmFwcC5tb2R1bGUudHMgZm9yIHdoeSB3ZSdyZSBidWlsZGluZyB0aGUgY2xhc3MgbGlrZSB0aGlzXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHktaW50ZXJmYWNlXG5leHBvcnQgaW50ZXJmYWNlIEFwcENoZWNrIGV4dGVuZHMgRmlyZWJhc2VBcHBDaGVjayB7fVxuXG5leHBvcnQgY2xhc3MgQXBwQ2hlY2sge1xuICBjb25zdHJ1Y3RvcihhcHBDaGVjazogRmlyZWJhc2VBcHBDaGVjaykge1xuICAgIHJldHVybiBhcHBDaGVjaztcbiAgfVxufVxuXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tZW1wdHktaW50ZXJmYWNlXG5leHBvcnQgaW50ZXJmYWNlIEFwcENoZWNrSW5zdGFuY2VzIGV4dGVuZHMgQXJyYXk8RmlyZWJhc2VBcHBDaGVjaz4ge31cblxuZXhwb3J0IGNsYXNzIEFwcENoZWNrSW5zdGFuY2VzIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgcmV0dXJuIMm1Z2V0QWxsSW5zdGFuY2VzT2Y8RmlyZWJhc2VBcHBDaGVjaz4oQVBQX0NIRUNLX1BST1ZJREVSX05BTUUpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBhcHBDaGVja0luc3RhbmNlJCA9IHRpbWVyKDAsIDMwMCkucGlwZShcbiAgY29uY2F0TWFwKCgpID0+IGZyb20oybVnZXRBbGxJbnN0YW5jZXNPZjxGaXJlYmFzZUFwcENoZWNrPihBUFBfQ0hFQ0tfUFJPVklERVJfTkFNRSkpKSxcbiAgZGlzdGluY3QoKSxcbik7XG4iXX0=