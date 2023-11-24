import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// [ ] 15:30 Сделать аналог стора на BehaviorSubject (как Subject только обязан иметь начальное состояние) в виде сервиса