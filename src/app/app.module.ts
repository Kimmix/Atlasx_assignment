import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { LocatorComponent } from "./locator/locator.component";
import { EsriMapComponent } from "./esri-map/esri-map.component";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, LocatorComponent, EsriMapComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
