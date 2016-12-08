//Angular
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule, XHRBackend, RequestOptions, Http} from "@angular/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, PreloadAllModules } from "@angular/router";

//Components
import {AppComponent} from "./app.component";

//Services/providers
import { ROUTES } from "./app.routes";

@NgModule({
  imports:      [ BrowserModule, 
		  HttpModule,
                  FormsModule,
		  RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules }),
		  ReactiveFormsModule
                  ],
  declarations: [ AppComponent
                ],
  bootstrap:    [ AppComponent],
  providers:    [                ]
})
export class AppModule { }
