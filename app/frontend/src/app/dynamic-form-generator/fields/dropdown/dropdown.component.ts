import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, pairwise, startWith } from 'rxjs';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() field: any = {};
  @Input() form: FormGroup | any;
  selectedValue: any;
  display: boolean = false;

  constructor() { }

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
  get errorText() {
    let errorText = '';
    if (Object.keys(this.form?.controls[this.field?.name]?.errors)?.length > 0) {
      Object.keys(this.form?.controls[this.field.name].errors).forEach((validation) => {
        if(this.field?.errorText?.hasOwnProperty(validation)) {
          errorText += this.field?.errorText[validation] + ' ';
        }
      })
    }
    return errorText ? errorText : this.field?.errorText ? this.field?.errorText : 'This field is invalid';
  }

  ngOnInit(): void {
    this.selectedValue = this.field?.value;
    this.onValueChanges();
  }

  getOptionValue(item: any, optionLabelList: any) {
    let optionValue = '';
    if (optionLabelList?.length) {
      optionLabelList.forEach((e: any) => {
        optionValue += item[e] + ' | ';
      })
    } else {
      optionValue = item[this.field?.optionLabel];
    }
    return optionValue;
  }

  getDropDownText(itemId: string) {
    let value = itemId;

    if (this.field?.options?.length) {
      const filteredValue = this.field?.options.filter((e: any) => e[this.field.optionValue] === itemId);
      value = (filteredValue?.length) ? this.getOptionValue(filteredValue[0], this.field.optionLabelList) : itemId;
    }

    return value;
  }

  onChangeHandler($event: any) {
    if ($event?.value) {
      this.field.value = $event?.value;
    }
    // const value = this.field?.updateValue(this.form.value);
    // console.log('active', value);
    // if (value) {
    //   this.form.patchValue(value);
    // }
  }

  onValueChanges() {
    if (typeof (this.field.onValueChange) === 'function') {
      this.form.get(this.field.name)
        .valueChanges
        .pipe(debounceTime(500), startWith(null), distinctUntilChanged(), pairwise())
        .subscribe(([prev, next]: [any, any]) => {
          const value = this.field?.onValueChange(prev, next, this.form.value);
          // console.log('active');
          if (value) {
            this.form.patchValue(value);
          }
        });
    }
  }

  showDialog() {
    this.display = true;
    this.field?.getFieldsName(this.field?.name);
    // console.log('check', this.field?.name)
  }

  saveDialogueData(event: any) {
    this.field?.saveDialogueData(event, this.form.value);
    this.display = false;
    // console.log('dialogue data', this.event);
  }

  handleDialogue(event: any) {
    this.field.closeDialogueEvent(event);
    return event;
  }

}
