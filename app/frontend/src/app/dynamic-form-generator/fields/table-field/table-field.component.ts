import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'table-field',
  templateUrl: './table-field.component.html',
  styleUrls: ['./table-field.component.scss']
})
export class TableFieldComponent implements OnInit {

  @Input() columnSchema: any = [];
  @Input() formSchema: any = [];
  @Input() formInitialise: any = [];
  @Input() formName: string = '';
  @Input() dataSource: any = [];
  @Input() form: FormGroup | any;
  @Input() dataKey: string = 'id';
  @Input() field: any = {};
  disableMultipleEditing = false;
  display: boolean = false;


  get isValid() { 
    return this.form?.controls[this.field.name].valid;
  }
  get inValid() { 
    return this.form?.controls[this.field.name].invalid;
  }
  get isDirty() { 
    return this.form?.controls[this.field.name].dirty;
  }
  get isTouched() { 
    return this.form?.controls[this.field.name].touched;
  }
  get isError() { 
    return Object.keys(this.form?.controls[this.field?.name]?.errors)?.length;
  }

  statuses: any = [];
  clonedTableData: { [s: string]: any; } = {};
  previousTableData: { [s: string]: any; } = {};

  constructor() { }

  public disableNavigation(event: any) {
    if (event.key == 'ArrowRight' || event.key == 'ArrowLeft' || event.key == 'ArrowDown' || event.key == 'ArrowUp' 
    || event.key == 'Down' || event.key == 'Up' || event.key == 'Left' || event.key == 'Right') {
      event.stopPropagation();
    }
    // console.log('event', event.key);
  }

  ngOnInit(): void {
    this.form.get(this.formName).setValue(this.dataSource);
    // console.log('Product table field', this.field.dialogueFields)
  }
  
  buildOrderItemsForm(item: any): FormGroup {
    return new FormGroup(item);
  }
  onRowEditInit(item: any) {
    if(this.field?.disableMultipleEditing) {
      this.disableMultipleEditing = true;
    }
    if(this.dataSource.filter(e => e.id === item.id).length) {
      this.previousTableData[item.id] = { ...item };
    }
    this.clonedTableData[item.id] = { ...item };
  }

  onRowEditSave(item: any) {
    if(this.field?.disableMultipleEditing) {
      this.disableMultipleEditing = false;
    }
    if (item[this.dataKey]) {
      delete this.clonedTableData[item[this.dataKey]];
      if(this.previousTableData[item[this.dataKey]]) {
        delete this.previousTableData[item[this.dataKey]];
      }
      // this.messageService.add({severity:'success', summary: 'Success', detail:'Product is updated'});
    }
    Object.assign(this.dataSource.filter(e => e.id === item.id)[0], this.clonedTableData[item.id])
    this.form.get(this.formName).setValue(this.dataSource);
    // console.log(this.formName)
    // this.onTableValueChangeHandler(this.dataSource, this.field)
    this.field.footerInitialise
  }

  onRowEditCancel(item: any, index: number) {
    if(this.field?.disableMultipleEditing) {
      this.disableMultipleEditing = false;
    }
    this.dataSource[index] = this.clonedTableData[item[this.dataKey]];
    delete this.clonedTableData[item[this.dataKey]];
    if(this.previousTableData[item[this.dataKey]]) {
      this.dataSource[index] = this.field?.onCancelForm(this.previousTableData[item[this.dataKey]], item[this.dataKey]);
      delete this.previousTableData[item[this.dataKey]];
    }
  }

  onRowAddInit() {
    const id = this.generateUniqueId();
    let item: any = {};
    Object.assign(item, this.formInitialise)
    item.id = id;
    this.dataSource.push(item);
    this.clonedTableData[id] = { ...item };
  }

  generateUniqueId() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  onRowDeleteInit(item: any, index: number, tableValue) {
    delete this.clonedTableData[item[this.dataKey]];
    this.dataSource.splice(index, 1);
    this.form.get(this.formName).setValue(this.dataSource);
    this.onTableValueChangeHandler(1, this.field, tableValue)

  }

  getDropDownText(itemId: string, fieldOptions: any) {
    let value = itemId;
    // console.log("check dropdown", value)

    if (fieldOptions?.options?.length) {
      const filteredValue = fieldOptions?.options.filter((e: any) => e[fieldOptions?.optionValue] === itemId);
      value = (filteredValue?.length) ? filteredValue[0][fieldOptions?.optionLabel] : this.fallBackDisplayText(itemId, fieldOptions);
    }

    return value;
  }

  fallBackDisplayText(itemId: string, fieldOptions: any) {
    let value = itemId;
    // console.log("check dropdown", value)

    if (fieldOptions?.displayOptions?.length) {
      const filteredValue = fieldOptions?.displayOptions.filter((e: any) => e[fieldOptions?.optionValue] === itemId);
      value = (filteredValue?.length) ? filteredValue[0][fieldOptions?.optionLabel] : itemId;
    }

    return value;
  }

  onChangeHandler($event: any, field: any, item: any) {
    if ($event?.value && typeof (field.onValueChange) === 'function') {
      this.clonedTableData[item.id] = field?.onValueChange($event?.value, item);
      Object.assign(this.dataSource.filter(e => e.id === item.id)[0], this.clonedTableData[item.id])
    }
    this.field?.getTableRowID(item);
  }
  onValueChangeHandler($event: any, field: any, item: any) {
    // console.log("check value",$event)
    // console.log("check item",item)
    if ($event && typeof (field.onValueChange) === 'function') {
      this.clonedTableData[item.id] = field?.onValueChange($event, item);
      // console.log('tabel check1', this.clonedTableData[item.id])
      Object.assign(this.dataSource.filter(e => e.id === item.id)[0], this.clonedTableData[item.id])
    }
  }
  onTableValueChangeHandler($event: any, field:any, item) {
    // console.log('event', $event);
      if ($event && typeof (field.onValueChange) === 'function') {
        const value = this.field?.onValueChange($event, item, this.form.value);
        if(value) {
          this.form.patchValue(value)
        }
      }
     
  }

  showDialog(item: any) {
    this.display = true;
    this.field?.getTableRowID(item);
  }

  saveDialogueData(event: any) {
    this.field?.saveDialogueData(event);
    // console.log('dialogue data', event);
    this.display = false;
  }

  handleDialogue(event: any) {
    this.field.closeDialogueEvent(event)
    return event;
  }
}
