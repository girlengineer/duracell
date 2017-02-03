import {
    async,
    ComponentFixture,
    fakeAsync,
    inject,
    getTestBed,
    TestBed
} from '@angular/core/testing';
import {
    BaseRequestOptions,
    ConnectionBackend,
    Http,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';
import {
    MockBackend,
    MockConnection,
} from '@angular/http/testing';
import {
    RouterTestingModule
} from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CitiModule } from 'ddl/citi.module';
import { HttpService, AppConfigService, ContentService } from 'angular2-nexus-uiux/services';
import { SessionStorageService } from 'ng2-webstorage';

import { AppComponent } from './app.component';

import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';



describe('Quick Links', () => {
    let de: DebugElement[];
    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    
    beforeEach(() => {
        TestBed.configureTestingModule({
        providers: [
            AppConfigService
        ],
        declarations: [AppComponent],
        imports: [
                CitiModule,
                RouterTestingModule
            ]
        });

        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;
        fixture.detectChanges();
    });    

    it('App Component - Should create component', () => expect(comp).toBeDefined());

});