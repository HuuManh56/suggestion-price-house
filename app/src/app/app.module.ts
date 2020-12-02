import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule  } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy, PathLocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';

import {AutoCompleteModule} from 'primeng/autocomplete';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SlideMenuModule } from 'primeng/slidemenu';

import {AccordionModule} from 'primeng/accordion';
import { DataTableModule } from 'primeng/primeng';
import { PaginatorModule } from 'primeng/primeng';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { NgxWebstorageModule} from 'ngx-webstorage';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './core/guards/auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
    AuthLayoutComponent
  ],
  imports: [

    // localStorageService & sessionStorageService
    NgxWebstorageModule.forRoot(),

    AccordionModule,
    AutoCompleteModule,
    PanelMenuModule,
    ScrollPanelModule,
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    SlideMenuModule,
    DataTableModule,
    PaginatorModule,
    ToastModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [
    AuthGuard,
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    // Định nghĩa service vào đây (những cái của shared thì k cần)
    AppComponent,
    MessageService,
  ],
  bootstrap: [AppComponent],
  exports: [
  ]
})
export class AppModule {}
