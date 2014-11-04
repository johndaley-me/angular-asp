module common {
    'use strict';

    export interface Common {
        // angular commonly used services
        $q: ng.IQService;
        $timeout: ng.ITimeoutService;
        // custom services
        config: CommonConfig;
        logger: LoggerService;
        modal: ModalService;
        tempData: TempDataService;
    }


    export interface CommonConfig {
        DEBUG: boolean;
    }

    export interface TempDataService {
        setData(data: any): void;
        removeData(): any;
    }

    export interface ModalService {
        show(options: ModalOptions): ng.IPromise<any>;
    }

    export interface ModalOptions {
        title: string;
        message: string;
        okText?: string;
        cancelText?: string;
    }

    // #region Routing
    export interface RouteConfigSettings {
        nav?: number;
        /**
         * HTML for the nav
         */
        content: string;
    }

    export interface RouteConfig {
        title?: string;
        templateUrl: string;
        settings?: RouteConfigSettings;
        controller?: string;
        controllerAs?: string;
        resolve?: any;
    }

    export interface Route { //extends ng.route.IRoute {
        url: string;
        config: RouteConfig;
    }

    // #endregion

    // #region LoggerService
    export interface LoggerService {
        getLogger(source: string): Logger;
    }

    export interface Logger {
        debug: LoggerMethod;
        error: LoggerMethod;
        info: LoggerMethod;
        success: LoggerMethod;
        warning: LoggerMethod;
    }

    export interface LoggerMethod {
        (message: string, data?: any, showToast?: boolean): void;
    }
    // #endregion

    // #region FacebookUserService

    export interface UserService {
        user: User;
        /** 
         * Used to resolve protected routes
         */
        ensureLogin(): ng.IPromise<any>;
        // user methods
        getFirstName(): string;
        getPicture(): string;
        
    }
        
    export interface ResolveLoginService {
        ensureLogin(): ng.IPromise<any>;
    }
    // #endregion

    // #region Data Models
    export interface Model {
        Id: number;
    }
    export interface User extends Model {
        Name: string;
    }
    // #endregion
} 