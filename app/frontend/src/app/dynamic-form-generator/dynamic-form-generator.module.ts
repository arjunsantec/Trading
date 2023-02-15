import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldBuilderComponent } from './components/field-builder/field-builder.component';
import { FormBuilderComponent } from './components/form-builder/form-builder.component';
import { CheckboxComponent } from './fields/checkbox/checkbox.component';
import { DropdownComponent } from './fields/dropdown/dropdown.component';
import { FileComponent } from './fields/file/file.component';
import { RadioComponent } from './fields/radio/radio.component';
import { TextboxComponent } from './fields/textbox/textbox.component';
import { MaterialLibModuleModule } from '../material-lib-module/material-lib-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateComponent } from './fields/date/date.component';
import { AutocompleteComponent } from './fields/autocomplete/autocomplete.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SlideToggleComponent } from './fields/slide-toggle/slide-toggle.component';
import {TableFieldComponent } from './fields/table-field/table-field.component';
import {CardComponent } from './fields/cards/card.component';
import { TranslateModule } from '@ngx-translate/core';
import { FieldSetComponent } from './fields/fieldset/fieldset.component';
import { TabComponent } from './fields/tab/tab.component';
import { PFileComponent } from './fields/p-file/p-file.component';
import {ConfirmationService} from 'primeng/api';


@NgModule({
  declarations: [
    FieldBuilderComponent,
    FormBuilderComponent,
    CheckboxComponent,
    DropdownComponent,
    FileComponent,
    RadioComponent,
    TextboxComponent,
    DateComponent,
    AutocompleteComponent,
    SlideToggleComponent,
    TableFieldComponent,
    CardComponent,
    FieldSetComponent,
    TabComponent,
    PFileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialLibModuleModule,
    TranslateModule
  ],
  exports: [
    FormBuilderComponent
  ],
  providers: [ConfirmationService]
})
export class DynamicFormGeneratorModule { }
