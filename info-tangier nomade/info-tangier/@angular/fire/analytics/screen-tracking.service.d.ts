import { ComponentFactoryResolver, NgZone, OnDestroy, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UserTrackingService } from './user-tracking.service';
import * as i0 from "@angular/core";
declare const FIREBASE_EVENT_ORIGIN_KEY = "firebase_event_origin";
declare const FIREBASE_PREVIOUS_SCREEN_CLASS_KEY = "firebase_previous_class";
declare const FIREBASE_PREVIOUS_SCREEN_INSTANCE_ID_KEY = "firebase_previous_id";
declare const FIREBASE_PREVIOUS_SCREEN_NAME_KEY = "firebase_previous_screen";
declare const FIREBASE_SCREEN_CLASS_KEY = "firebase_screen_class";
declare const FIREBASE_SCREEN_INSTANCE_ID_KEY = "firebase_screen_id";
declare const FIREBASE_SCREEN_NAME_KEY = "firebase_screen";
declare const OUTLET_KEY = "outlet";
declare const PAGE_PATH_KEY = "page_path";
declare const PAGE_TITLE_KEY = "page_title";
declare const SCREEN_CLASS_KEY = "screen_class";
declare const SCREEN_NAME_KEY = "screen_name";
export declare const ɵscreenViewEvent: (router: Router, title: Title | null, componentFactoryResolver: ComponentFactoryResolver) => Observable<{
    [SCREEN_NAME_KEY]: string;
    [PAGE_PATH_KEY]: string;
    [FIREBASE_EVENT_ORIGIN_KEY]: 'auto';
    [FIREBASE_SCREEN_NAME_KEY]: string;
    [OUTLET_KEY]: string;
    [PAGE_TITLE_KEY]?: string;
    [SCREEN_CLASS_KEY]: string;
    [FIREBASE_SCREEN_CLASS_KEY]: string;
    [FIREBASE_SCREEN_INSTANCE_ID_KEY]: number;
    [FIREBASE_PREVIOUS_SCREEN_CLASS_KEY]: string;
    [FIREBASE_PREVIOUS_SCREEN_NAME_KEY]: string;
    [FIREBASE_PREVIOUS_SCREEN_INSTANCE_ID_KEY]: number;
}>;
export declare class ScreenTrackingService implements OnDestroy {
    private disposable;
    constructor(router: Router, title: Title, componentFactoryResolver: ComponentFactoryResolver, zone: NgZone, userTrackingService: UserTrackingService, injector: Injector);
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScreenTrackingService, [{ optional: true; }, { optional: true; }, null, null, { optional: true; }, null]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ScreenTrackingService>;
}
export {};
