import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HOME_ROUTES } from './home/home-routing.module';
import { HomeModule } from './home/home.module';
import {OFFER_ROUTES}  from './offer/offer-routing.module';
/*
      ANGULAR2-NEXUS-STARTER NOTE:
      For Routing Modules export the routes into a constant. Then in the NgModule directive call RouterModule.forRoot or RouterModule.forChild with the constant.
      This separation allows to load the routing module in an eager way importing the routes (like home, see example below), 
      or in a lazy way importing the routing module with System.import.
      RouterModule.forRoot only is used in the AppRoutingModule. For all the feature modules call RouterModule.forChild.

      IMPORTANT: As a best practice for better performance, for every Routing Module, load the default module using eager loading, and the rest of modules using lazy loading.      
*/

export const APP_ROUTES: Routes = [
        /*
            ANGULAR-NEXUS-STARTER NOTE:
            Redirect to the default landing module for the app. The default landing module must be a eager loaded module.
        */
        { 
            path: '', 
            redirectTo: 'home', 
            pathMatch: 'full' 
        },
        /*
            ANGULAR2-NEXUS-STARTER NOTE:
            Use children option to specify routes for eager loaded modules.
        */
        { 
            path: 'home', 
            children: HOME_ROUTES 
        },
        { 
            path: 'offers', 
            children: OFFER_ROUTES 
        },
        /*
            ANGULAR2-NEXUS-STARTER NOTE:
            Use loadChildren option to specify routes for lazy loaded modules. Use System.import in order to tell webpack to separate the module into a new javascript chunk file.
            Example:
            {
                path: '{path}',
                loadChildren: () => System.import('{path to the routing module}').then((comp: any) => {
                    return comp.{subAppName}RoutingModule;
                })
            }            
        */
        /* 
          DO NOT DELETE @ANS-CLI@ DIRECTIVES. THEY ARE USED FOR ANS-CLI. 
          OTHERWISE ANS-CLI MAY STOP WORKING IN THE PROPER WAY. 
        */
        /*@ANS-CLI-ROUTING@*/
/*				,{
						path: 'statements',
						loadChildren: () => System.import('statements/statements-routing.module').then((comp: any) => {
								return comp.StatementsRoutingModule;
						})
				}   */
];

@NgModule({
  imports: [
    RouterModule.forRoot(APP_ROUTES),
    /*

      ANGULAR2-NEXUS-STARTER NOTE:
      Import SubApp that are eager loaded like dahboard. 
      SubApp that are lazy loaded don't have to be imported.
      If home needs to be lazy loaded, this import must be removed and System.import must be used in the routes definition.
    */
    HomeModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}