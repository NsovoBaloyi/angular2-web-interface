/*
 * App Module
 * our top level module that holds all of our components
 */
import {AppModule} from "./app/app.module";
import { enableProdMode } from '@angular/core';
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";


if (process.env.ENV === 'production') {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);