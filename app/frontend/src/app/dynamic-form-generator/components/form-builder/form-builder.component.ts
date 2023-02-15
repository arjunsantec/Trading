import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
interface IFields {
  type:'',
  name:'',
  validation:any,
  fields?:[],
}
@Component({
  selector: 'dynamic-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})



export class FormBuilderComponent implements OnInit, OnChanges {
  @Output() onSubmit = new EventEmitter();
  @Input() fields : IFields[] | any;
  @Input() fullScreen: boolean = true;
  @Input() buttonLabel: string = 'save';
  // @Input() label: string = 'get';
  @Input() disabled: boolean = false;
  form: FormGroup | any;

  constructor() { }

  ngOnInit() {
      this.setFormFields();
      // console.log(this.buttonLabel);
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes && changes['fields'] && changes['fields']?.previousValue) {
        this.setFormFields();
      }
    }

  setFormFields() {
    let fieldsCtrls: any = {};
    for (let f of this.fields) {
      // if (f?.type === 'dropdown') {
      //   let opts: any = {};
      //   for (let opt of f.options) {
      //     opts[opt.key] = new FormControl(opt.value);
      //   }
      //   fieldsCtrls[f?.name] = new FormGroup(opts)
      // } else 
      // debugger
      if (f?.type === 'fieldset' || f?.type === 'card' || f?.type === 'tab') {
        for (let f1 of f?.fields) {
          if (f1?.type === 'boolean') {
            fieldsCtrls[f1?.name] = new FormControl(f1?.value || false, this.mapValidators(f1?.validation))
          } else {
            if (f1?.type != 'checkbox') {
              fieldsCtrls[f1?.name] = new FormControl(f1?.value || '', this.mapValidators(f1?.validation))
            }
          }
        }
      }
      else if (f?.type === 'boolean') {
        fieldsCtrls[f?.name] = new FormControl(f?.value || false, this.mapValidators(f?.validation))
      } else {
        if (f?.type != 'checkbox') {
          fieldsCtrls[f?.name] = new FormControl(f?.value || '', this.mapValidators(f?.validation))
        }
      }
    }
    this.form = new FormGroup(fieldsCtrls);
  }

  mapValidators(validators: any){
    const formValidators = [];

    if (validators) {
      for (const validation of Object.keys(validators)) {
        if (validation === 'required') {
          formValidators.push(Validators.required);
        } else if (validation === 'email') {
          formValidators.push(Validators.email);
        } else if (validation === 'minlength') {
          formValidators.push(Validators.minLength(validators[validation]));
        } else if (validation === 'maxlength') {
          formValidators.push(Validators.maxLength(validators[validation]));
        } else if (validation === 'pattern') {
          formValidators.push(Validators.pattern(validators[validation]));
        } 
      }
    }

    return formValidators;
  }

}
