import { NgModule }            from '@angular/core';
import { RouterModule, Routes }        from '@angular/router';

import { HomeModule }    from './home.module';
import { IndexComponent }    from './index.component';

/*
    ANGULAR2-NEXUS-STARTER NOTE:
    For Routing Modules related to modules with no sub modules follow the current example
*/
export const HOME_ROUTES: Routes = [
	/*
      	ANGULAR2-NEXUS-STARTER NOTE:
      	Redirect to the first page for the module. 
  	*/
  	{ 
  		path: '', 
  		redirectTo: 'index', 
  		pathMatch: 'full' 
  	},
  	/*
    ANGULAR2-NEXUS-STARTER NOTE:
		Specify the path and the component for every page.
  	*/
  	{ 
  		path: 'index', 
  		component: IndexComponent
  	}
];

@NgModule({
  	imports: [
  		  RouterModule.forChild(HOME_ROUTES),
        HomeModule
  	]
})
export class HomeRoutingModule {}


