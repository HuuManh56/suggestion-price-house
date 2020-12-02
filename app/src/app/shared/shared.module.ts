import { NgModule } from '@angular/core';

import { MenuItems } from './menu-items/menu-items';
import {SlideMenuModule} from 'primeng/slidemenu';

import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { TableModule } from 'primeng/table';
import { PaginatorModule, ConfirmDialogModule, CalendarModule,
         ScrollPanelModule, BreadcrumbModule, TabMenuModule,
         DropdownModule, TabViewModule, FieldsetModule,
         ContextMenuModule, ColorPickerModule, MultiSelectModule, ConfirmationService,
         SelectButtonModule, OrganizationChartModule, OverlayPanelModule, PickListModule, EditorModule } from 'primeng/primeng';
import { TreeModule } from 'primeng/tree';
import {TreeTableModule} from 'primeng/treetable';
import { StepsModule } from 'primeng/steps';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTableModule } from 'primeng/primeng';
import { TableFooterComponent } from './components/table-footer/table-footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ControlMessagesComponent } from './components/control-messages/control-messages.component';
// import {DragDropModule} from 'primeng/dragdrop';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTableModule } from '@angular/cdk/table';
import { SelectFilterComponent } from './components/select-filter/select-filter.component';
import { FileChoserComponent } from './components/file-choser/file-choser.component';
import {ChartModule} from 'primeng/chart';
import {RadioButtonModule} from 'primeng/radiobutton';
import { ImportErrorComponent } from './components/import-error/import-error.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';


@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    TableFooterComponent,
    ControlMessagesComponent,
    SelectFilterComponent,
    FileChoserComponent,
    ImportErrorComponent,
    DatePickerComponent,

  ],
  imports: [
    SlideMenuModule,
    FlexLayoutModule,
    CdkTableModule,
    ChartModule,
    /**
     * Shared module
     */
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    NgbModule.forRoot(),

    /**
     * prime
     */
    RadioButtonModule,
    TableModule,
    TreeTableModule,
    PaginatorModule,
    ConfirmDialogModule,
    TreeModule,
    CalendarModule,
    ScrollPanelModule,
    StepsModule,
    BreadcrumbModule,
    TabMenuModule,
    DropdownModule,
    TabViewModule,
    FieldsetModule,
    ContextMenuModule,
    ColorPickerModule,
    MultiSelectModule,
    FullCalendarModule,
    DragDropModule,
    EditorModule
  ],
  providers: [
    ConfirmationService,
    MenuItems
  ],
  exports: [
    FlexLayoutModule,
    CdkTableModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    TableFooterComponent,
    ControlMessagesComponent,
    SelectFilterComponent,
    FileChoserComponent,
    ImportErrorComponent,
    DatePickerComponent,

    /**
     * prime
     */
    RadioButtonModule,
    TableModule,
    TreeTableModule,
    PaginatorModule,
    ConfirmDialogModule,
    CalendarModule,
    StepsModule,
    BreadcrumbModule,
    TabMenuModule,
    DropdownModule,
    TabViewModule,
    FieldsetModule,
    SelectButtonModule,
    ContextMenuModule,
    OrganizationChartModule,
    OverlayPanelModule,
    ScrollPanelModule,
    PickListModule,
    TreeModule,
    ColorPickerModule,
    MultiSelectModule,
    FullCalendarModule,
    DataTableModule,
    FontAwesomeModule,
    DragDropModule,
    EditorModule,
    ChartModule
   ]
})
export class SharedModule { }
