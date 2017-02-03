import { NgModule }            from '@angular/core';
import { RouterModule, Routes }        from '@angular/router';

import { OfferComponent }    from './offer.component';
import { HOME_ROUTES } from '../home/home-routing.module';
import {HomeModule} from '../home/home.module';
/*
    ANGULAR2-NEXUS-STARTER NOTE:
    For Routing Modules related to modules with no sub modules follow the current example
*/
export const OFFER_ROUTES: Routes = [
	/*
      	ANGULAR2-NEXUS-STARTER NOTE:
      	Redirect to the first page for the module. 
  	*/
  	{ 
  		path: 'offers', 
  		redirectTo: 'index', 
  		pathMatch: 'full' 
  	},
  	/*
    ANGULAR2-NEXUS-STARTER NOTE:
		Specify the path and the component for every page.
  	*/
  	{ 
  		path: 'index', 
  		component: OfferComponent
  	}
];

@NgModule({
  	imports: [
  		  RouterModule.forChild(HOME_ROUTES),
        HomeModule
  	]
})
export class OfferRoutingModule {}


