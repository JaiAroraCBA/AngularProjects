import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { jqxGridComponent } from 'jqwidgets-framework/jqwidgets-ts/angular_jqxgrid';


import { CommonModule } from '@angular/common';
import { GridModule } from '@progress/kendo-angular-grid';

import { AppComponent } from './app.component';
import { ProductComponent } from './products/product.component';
import { NavbarComponent } from './nav/nav.component';

import { ProductService } from './products/product.service';


@NgModule({
  imports: [BrowserModule,
    FormsModule,
    AppRoutingModule,
    CommonModule,
    GridModule
  ],
  declarations: [AppComponent,
    ProductComponent,
    NavbarComponent,
    jqxGridComponent
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})

export class AppModule { }