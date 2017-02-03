import { NgModule }            from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoreCommonModule } from 'angular2-nexus-uiux';
import { CitiModule } from 'ddl/citi.module';

import { IndexComponent }    from './index.component';



@NgModule({
    imports: [
    /*
      ANGULAR2-NEXUS-STARTER NOTE:
      Import the CoreCommonModule to have access to directives of Angular modules (like FormsModule, HttpModule, RouterModule, etc). 
    */
      CoreCommonModule,
      CitiModule
    ],
    declarations: [
    /*
      ANGULAR2-NEXUS-STARTER NOTE:
      Declare all the components of the sub app.
  */
      IndexComponent
    ],
    providers: [
      //This service is only specific to Dashboard subapp
    ]
})
export class HomeModule {

}


