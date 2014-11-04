module app {
    'use strict';

    export interface Config {
        docTitle: string;
        version: string;
    }

    export interface UtilService {
        editDraft(draft: Draft): void;
        goHome(): void;
        
        /**
         * By default the local cache won't be used
         * By default a new window won't be opened, opening a new window may trigger pop-up block
         */
        readPoem(poem: Poem, useCache?: boolean, openNewWindow?: boolean): void;
        isDebug(): boolean;
    }
    
    // #region Data Models - Please note that Dates coming from the server will end up as strings typically
    // but they may sometimes be Date objects locally. For example the date picker in the draft view
    // transforms the string into a Date object but generally other dates are strings.
    export interface Draft extends common.Model, ng.resource.IResource<any> {
        Title: string;
        CreatedOn: any;
        LastModified: any;
        Date: any;
        People: string;
        Place: string;
        Tags: string;
        Description: string;
        Content: string;
        $update(): ng.IPromise<Draft>;
        Author: string;
    }
    export interface Poem extends Draft, ng.resource.IResource<any> {
        $update(): ng.IPromise<Poem>;
    }
    // #endregion
}