import { enableProdMode } from '@angular/core';
<<<<<<< HEAD
import { isDevMode } from '@angular/core';
=======
>>>>>>> frontend-backend_CANETE
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

<<<<<<< HEAD
console.log('isDevMode:', isDevMode());
console.log('environment: ', environment.production);

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
=======
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
>>>>>>> frontend-backend_CANETE
