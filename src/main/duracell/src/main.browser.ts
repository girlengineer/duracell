/*
 * Angular bootstraping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader } from '@angularclass/hmr';

import { CoreDecorateModuleRef } from 'angular2-nexus-uiux';
/*
 * App Module
 * our top level module that holds all of our components
 */
import { AppModule } from './app';



/*
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {
	let coreDecorateModuleRef = new CoreDecorateModuleRef(ENV);
  	return platformBrowserDynamic()
    	.bootstrapModule(AppModule)
    	.then(coreDecorateModuleRef.getDecorateModuleRef())
    	.catch(err => console.error(err));
}

// needed for hmr
// in prod this is replace for document ready
bootloader(main);
