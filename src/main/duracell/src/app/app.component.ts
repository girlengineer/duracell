/*
 * Angular 2 decorators and services
 */
import { Component } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { AppConfigService } from 'angular2-nexus-uiux/services';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  styles:[require('./app.component.css')],
  template: require('./app.component.html') 
})
export class AppComponent {

	name = 'Main App Component';

  	constructor(private _appConfigService: AppConfigService) {

  	}	

  	ngOnInit() {
		    console.log('Initial App Component');

  	}

}