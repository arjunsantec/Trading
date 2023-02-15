import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-playground',
  templateUrl: './form-playground.component.html',
  styleUrls: ['./form-playground.component.scss']
})
export class FormPlaygroundComponent implements OnInit {
  public fields: any[] = [
    {
      type: 'text',
      name: 'firstName',
      label: 'First Name',
      placeholder: 'First Name',
      value: '',
      validation: {
        required: true,
        minlength: 5,
        maxlength: 10
      },
      prefixGroupBy: true,
      prefixGroupByIcon: 'pi-user',
      errorText: {
        required: "First name is required",
        minlength: "First name min 5",
        maxlength: "First name max 10"
      }
    },
    {
      type: 'text',
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Last Name',
      value: '',
      validation: {
        required: true
      },
      prefixGroupBy: true,
      prefixGroupByText: 'Mr',
      errorText: {
        required: "Last name is required"
      }
    },
    {
      type: 'text',
      name: 'email',
      label: 'Email',
      placeholder: 'Email',
      value: '',
      validation: {
        required: true,
        email: true,
        pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
      },
      suffixGroupBy: true,
      suffixGroupByIcon: 'pi-google',
      errorText: {
        required: "Email is required",
        email: "Email is not valid",
        pattern: "Email is not valid"
      }
    },
    {
      type: 'text',
      name: 'price',
      label: 'Price',
      placeholder: 'Price',
      value: '',
      validation: {
        required: true
      },
      prefixGroupBy: true,
      prefixGroupByText: '$',
      suffixGroupBy: true,
      suffixGroupByText: '.00',
      errorText: {
        required: "Price is required"
      }
    },
    {
      type: 'text',
      name: 'product',
      label: 'Product',
      placeholder: 'Search Product',
      value: '',
      prefixGroupBy: true,
      prefixGroupByIcon: 'pi-tags',
      suffixActionGroupBy: true,
      suffixActionGroupByIcon: 'pi-times',
      onSuffixActionGroupByClick: this.onClick.bind(this),
      errorText: "Product is required"
    },
    {
      type: 'text',
      name: 'integer',
      label: 'Integer',
      placeholder: 'Integer',
      value: '',
      keyFilter: "int",
      errorText: "Integer only"
    },
    {
      type: 'text',
      name: 'noSpecial',
      label: 'noSpecial',
      placeholder: 'no Special',
      value: '',
      keyFilter: "/[A-Z]/g",
      errorText: "Custom no special"
    },
    {
      type: 'text',
      name: 'address',
      label: 'Address',
      placeholder: 'Add address',
      value: '',
      multiline: true,
      errorText: "address is required"
    },
    {
      type: 'dropdown',
      name: 'country',
      label: 'Country',
      value: 'in',
      placeholder: 'Enter Country',
      validation: {
        required: true
      },
      options: [
        { id: 'in', name: 'India' },
        { id: 'us', name: 'USA' }
      ],
      optionLabel: "name",
      optionValue: "id",
    },
    {
      type: 'radio',
      name: 'gender',
      label: 'Gender',
      value: 'm',
      validation: {
        required: true
      },
      options: [
        { key: 'm', label: 'Male' },
        { key: 'f', label: 'Female' }
      ]
    },
    {
      type: 'checkbox',
      name: 'hobby',
      label: 'Hobby',
      validation: {
        required: true
      },
      options: [
        { key: 'f', label: 'Fishing' },
        { key: 'c', label: 'Cooking' }
      ]
    },
    {
      type: 'date',
      name: 'date',
      label: 'Create Date',
      validation: {
        required: true
      },
      selectionMode: 'range'
    },
    {
      type: 'boolean',
      name: 'isHeadOffice',
      label: 'isHeadOfficeLabel_TC',
      value: false,
      validation: {
        required: true
      },
      errorText: {
        required: "isHeadOfficeRequiredError_SC"
      }
    }
  ];

  fields2: any[] = [
    {
      type: 'text',
      name: 'firstName',
      label: 'First Name',
      placeholder: 'First Name',
      value: '',
      validation: {
        required: true,
        minlength: 5,
        maxlength: 10
      },
      prefixGroupBy: true,
      prefixGroupByIcon: 'pi-user',
      errorText: {
        required: "First name is required",
        minlength: "First name min 5",
        maxlength: "First name max 10"
      }
    },
    {
      type: 'text',
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Last Name',
      value: '',
      validation: {
        required: true
      },
      prefixGroupBy: true,
      prefixGroupByText: 'Mr',
      errorText: {
        required: "Last name is required"
      }
    },
    {
      type: 'dropdown',
      name: 'country',
      label: 'Country',
      placeholder: 'Enter Country',
      value: 'in',
      validation: {
        required: true
      },
      options: [
        { id: 'in', name: 'India' },
        { id: 'us', name: 'USA' }
      ],
      optionLabel: "name",
      optionValue: "id",
    },
    {
      type: 'table',
      name: 'billingAddress',
      label: 'Billing Address',
      formInitialise: { code: '', name: '', inventoryStatus: '', price: '' },
      columnSchema: ['companyNameLabel_TC', 'pinCodeLabel_TC', 'cityLabel_TC', 'stateNameLabel_TC'],
      formSchema: [
        {
          name: 'code',
          type: 'input'
        },
        {
          name: 'name',
          type: 'input'
        },
        {
          name: 'inventoryStatus',
          type: 'dropdown',
          placeholder: 'Enter status',
          options: [{ name: 'In Stock', id: 'INSTOCK' }, { name: 'Low Stock', id: 'LOWSTOCK' }, { name: 'Out of Stock', id: 'OUTOFSTOCK' }],
          optionLabel: "name",
          optionValue: "id"
        },
        {
          name: 'price',
          type: 'input'
        }
      ],
      dataKey: 'id',
      dataSource: [
        {
          "id": "1000",
          "code": "f230fh0g3",
          "name": "Bamboo Watch",
          "description": "Product Description",
          "image": "bamboo-watch.jpg",
          "price": 65,
          "category": "Accessories",
          "quantity": 24,
          "inventoryStatus": "INSTOCK",
          "rating": 5
        },
        {
          "id": "1001",
          "code": "nvklal433",
          "name": "Black Watch",
          "description": "Product Description",
          "image": "black-watch.jpg",
          "price": 72,
          "category": "Accessories",
          "quantity": 61,
          "inventoryStatus": "INSTOCK",
          "rating": 4
        },
        {
          "id": "1002",
          "code": "zz21cz3c1",
          "name": "Blue Band",
          "description": "Product Description",
          "image": "blue-band.jpg",
          "price": 79,
          "category": "Fitness",
          "quantity": 2,
          "inventoryStatus": "LOWSTOCK",
          "rating": 3
        },
        {
          "id": "1003",
          "code": "244wgerg2",
          "name": "Blue T-Shirt",
          "description": "Product Description",
          "image": "blue-t-shirt.jpg",
          "price": 29,
          "category": "Clothing",
          "quantity": 25,
          "inventoryStatus": "INSTOCK",
          "rating": 5
        },
        {
          "id": "1004",
          "code": "h456wer53",
          "name": "Bracelet",
          "description": "Product Description",
          "image": "bracelet.jpg",
          "price": 15,
          "category": "Accessories",
          "quantity": 73,
          "inventoryStatus": "INSTOCK",
          "rating": 4
        },
        {
          "id": "1005",
          "code": "av2231fwg",
          "name": "Brown Purse",
          "description": "Product Description",
          "image": "brown-purse.jpg",
          "price": 120,
          "category": "Accessories",
          "quantity": 0,
          "inventoryStatus": "OUTOFSTOCK",
          "rating": 4
        },
        {
          "id": "1006",
          "code": "bib36pfvm",
          "name": "Chakra Bracelet",
          "description": "Product Description",
          "image": "chakra-bracelet.jpg",
          "price": 32,
          "category": "Accessories",
          "quantity": 5,
          "inventoryStatus": "LOWSTOCK",
          "rating": 3
        },
        {
          "id": "1007",
          "code": "mbvjkgip5",
          "name": "Galaxy Earrings",
          "description": "Product Description",
          "image": "galaxy-earrings.jpg",
          "price": 34,
          "category": "Accessories",
          "quantity": 23,
          "inventoryStatus": "INSTOCK",
          "rating": 5
        },
        {
          "id": "1008",
          "code": "vbb124btr",
          "name": "Game Controller",
          "description": "Product Description",
          "image": "game-controller.jpg",
          "price": 99,
          "category": "Electronics",
          "quantity": 2,
          "inventoryStatus": "LOWSTOCK",
          "rating": 4
        },
        {
          "id": "1009",
          "code": "cm230f032",
          "name": "Gaming Set",
          "description": "Product Description",
          "image": "gaming-set.jpg",
          "price": 299,
          "category": "Electronics",
          "quantity": 63,
          "inventoryStatus": "INSTOCK",
          "rating": 3
        }
      ]
    },
    {
      type: 'text',
      name: 'City',
      label: 'City',
      placeholder: 'City',
      value: '',
      validation: {
        required: true
      },
      prefixGroupBy: true,
      prefixGroupByIcon: 'pi-user',
      errorText: {
        required: "First name is required"
      }
    },
  ];

  fields3: any[] = [
    {
      type: 'text',
      name: 'firstName',
      label: 'First Name',
      placeholder: 'First Name',
      value: '',
      validation: {
        required: true,
        minlength: 5,
        maxlength: 10
      },
      prefixGroupBy: true,
      prefixGroupByIcon: 'pi-user',
      errorText: {
        required: "First name is required",
        minlength: "First name min 5",
        maxlength: "First name max 10"
      }
    },
    {
      type: 'text',
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Last Name',
      value: '',
      validation: {
        required: true
      },
      prefixGroupBy: true,
      prefixGroupByText: 'Mr',
      errorText: {
        required: "Last name is required"
      }
    },
    {
      type: 'dropdown',
      name: 'country',
      label: 'Country',
      placeholder: 'Enter Country',
      value: 'in',
      validation: {
        required: true
      },
      options: [
        { id: 'in', name: 'India' },
        { id: 'us', name: 'USA' }
      ],
      optionLabel: "name",
      optionValue: "id",
    },
    {
      type: 'text',
      name: 'City',
      label: 'City',
      placeholder: 'City',
      value: '',
      validation: {
        required: true
      },
      prefixGroupBy: true,
      prefixGroupByIcon: 'pi-user',
      errorText: {
        required: "First name is required"
      }
    }
  ];

  fields4: any = [
    {
      type: 'card',
      headerText: 'Card Header',
      footerText: '',
      fillScreen: '',
      fields: [
        {
          type: 'text',
          name: 'firstName',
          label: 'First Name',
          placeholder: 'First Name',
          value: '',
          validation: {
            required: true,
            minlength: 5,
            maxlength: 10
          },
          prefixGroupBy: true,
          prefixGroupByIcon: 'pi-user',
          errorText: {
            required: "First name is required",
            minlength: "First name min 5",
            maxlength: "First name max 10"
          }
        },
        {
          type: 'text',
          name: 'lastName',
          label: 'Last Name',
          placeholder: 'Last Name',
          value: '',
          validation: {
            required: true
          },
          prefixGroupBy: true,
          prefixGroupByText: 'Mr',
          errorText: {
            required: "Last name is required"
          }
        }
      ]
    },
    {
      type: 'fieldset',
      headerText: 'Header Text',
      fillScreen: false,
      fields: [
        {
          type: 'dropdown',
          name: 'country',
          label: 'Country',
          placeholder: 'Enter Country',
          value: 'in',
          validation: {
            required: true
          },
          options: [
            { id: 'in', name: 'India' },
            { id: 'us', name: 'USA' }
          ],
          optionLabel: "name",
          optionValue: "id",
        },
        {
          type: 'text',
          name: 'City',
          label: 'City',
          placeholder: 'City',
          value: '',
          validation: {
            required: true
          },
          prefixGroupBy: true,
          prefixGroupByIcon: 'pi-user',
          errorText: {
            required: "First name is required"
          }
        }
      ]
    },
    {
      type: 'tab',
      headerTextArray: ['Header Text', 'Header Text 1', 'Header Text 2'],
      fields: [

        {
          type: 'table',
          name: 'billingAddress',
          label: 'Billing Address',
          formInitialise: { code: '', name: '', inventoryStatus: '', price: '' },
          columnSchema: ['companyNameLabel_TC', 'pinCodeLabel_TC', 'cityLabel_TC', 'stateNameLabel_TC'],
          formSchema: [
            {
              name: 'code',
              type: 'input'
            },
            {
              name: 'name',
              type: 'input'
            },
            {
              name: 'inventoryStatus',
              type: 'dropdown',
              placeholder: 'Enter status',
              options: [{ name: 'In Stock', id: 'INSTOCK' }, { name: 'Low Stock', id: 'LOWSTOCK' }, { name: 'Out of Stock', id: 'OUTOFSTOCK' }],
              optionLabel: "name",
              optionValue: "id"
            },
            {
              name: 'price',
              type: 'input'
            }
          ],
          dataKey: 'id',
          dataSource: [
            {
              "id": "1000",
              "code": "f230fh0g3",
              "name": "Bamboo Watch",
              "description": "Product Description",
              "image": "bamboo-watch.jpg",
              "price": 65,
              "category": "Accessories",
              "quantity": 24,
              "inventoryStatus": "INSTOCK",
              "rating": 5
            },
            {
              "id": "1001",
              "code": "nvklal433",
              "name": "Black Watch",
              "description": "Product Description",
              "image": "black-watch.jpg",
              "price": 72,
              "category": "Accessories",
              "quantity": 61,
              "inventoryStatus": "INSTOCK",
              "rating": 4
            },
            {
              "id": "1002",
              "code": "zz21cz3c1",
              "name": "Blue Band",
              "description": "Product Description",
              "image": "blue-band.jpg",
              "price": 79,
              "category": "Fitness",
              "quantity": 2,
              "inventoryStatus": "LOWSTOCK",
              "rating": 3
            },
            {
              "id": "1003",
              "code": "244wgerg2",
              "name": "Blue T-Shirt",
              "description": "Product Description",
              "image": "blue-t-shirt.jpg",
              "price": 29,
              "category": "Clothing",
              "quantity": 25,
              "inventoryStatus": "INSTOCK",
              "rating": 5
            },
            {
              "id": "1004",
              "code": "h456wer53",
              "name": "Bracelet",
              "description": "Product Description",
              "image": "bracelet.jpg",
              "price": 15,
              "category": "Accessories",
              "quantity": 73,
              "inventoryStatus": "INSTOCK",
              "rating": 4
            },
            {
              "id": "1005",
              "code": "av2231fwg",
              "name": "Brown Purse",
              "description": "Product Description",
              "image": "brown-purse.jpg",
              "price": 120,
              "category": "Accessories",
              "quantity": 0,
              "inventoryStatus": "OUTOFSTOCK",
              "rating": 4
            },
            {
              "id": "1006",
              "code": "bib36pfvm",
              "name": "Chakra Bracelet",
              "description": "Product Description",
              "image": "chakra-bracelet.jpg",
              "price": 32,
              "category": "Accessories",
              "quantity": 5,
              "inventoryStatus": "LOWSTOCK",
              "rating": 3
            },
            {
              "id": "1007",
              "code": "mbvjkgip5",
              "name": "Galaxy Earrings",
              "description": "Product Description",
              "image": "galaxy-earrings.jpg",
              "price": 34,
              "category": "Accessories",
              "quantity": 23,
              "inventoryStatus": "INSTOCK",
              "rating": 5
            },
            {
              "id": "1008",
              "code": "vbb124btr",
              "name": "Game Controller",
              "description": "Product Description",
              "image": "game-controller.jpg",
              "price": 99,
              "category": "Electronics",
              "quantity": 2,
              "inventoryStatus": "LOWSTOCK",
              "rating": 4
            },
            {
              "id": "1009",
              "code": "cm230f032",
              "name": "Gaming Set",
              "description": "Product Description",
              "image": "gaming-set.jpg",
              "price": 299,
              "category": "Electronics",
              "quantity": 63,
              "inventoryStatus": "INSTOCK",
              "rating": 3
            }
          ]
        },
        {
          type: 'table',
          name: 'sellingAddress',
          label: 'Selling Address',
          formInitialise: { code: '', name: '', inventoryStatus: '', price: '' },
          columnSchema: ['companyNameLabel_TC', 'pinCodeLabel_TC', 'cityLabel_TC', 'stateNameLabel_TC'],
          formSchema: [
            {
              name: 'code',
              type: 'input'
            },
            {
              name: 'name',
              type: 'input'
            },
            {
              name: 'inventoryStatus',
              type: 'dropdown',
              placeholder: 'Enter status',
              options: [{ name: 'In Stock', id: 'INSTOCK' }, { name: 'Low Stock', id: 'LOWSTOCK' }, { name: 'Out of Stock', id: 'OUTOFSTOCK' }],
              optionLabel: "name",
              optionValue: "id"
            },
            {
              name: 'price',
              type: 'input'
            }
          ],
          dataKey: 'id',
          dataSource: [
            {
              "id": "1000",
              "code": "f230fh0g3",
              "name": "Bamboo Watch",
              "description": "Product Description",
              "image": "bamboo-watch.jpg",
              "price": 65,
              "category": "Accessories",
              "quantity": 24,
              "inventoryStatus": "INSTOCK",
              "rating": 5
            },
            {
              "id": "1001",
              "code": "nvklal433",
              "name": "Black Watch",
              "description": "Product Description",
              "image": "black-watch.jpg",
              "price": 72,
              "category": "Accessories",
              "quantity": 61,
              "inventoryStatus": "INSTOCK",
              "rating": 4
            },
            {
              "id": "1002",
              "code": "zz21cz3c1",
              "name": "Blue Band",
              "description": "Product Description",
              "image": "blue-band.jpg",
              "price": 79,
              "category": "Fitness",
              "quantity": 2,
              "inventoryStatus": "LOWSTOCK",
              "rating": 3
            },
            {
              "id": "1003",
              "code": "244wgerg2",
              "name": "Blue T-Shirt",
              "description": "Product Description",
              "image": "blue-t-shirt.jpg",
              "price": 29,
              "category": "Clothing",
              "quantity": 25,
              "inventoryStatus": "INSTOCK",
              "rating": 5
            }
          ]
        },
        {
          type: 'table',
          name: 'shippingAddress',
          label: 'Shipping Address',
          formInitialise: { code: '', name: '', inventoryStatus: '', price: '' },
          columnSchema: ['companyNameLabel_TC', 'pinCodeLabel_TC', 'cityLabel_TC', 'stateNameLabel_TC'],
          formSchema: [
            {
              name: 'code',
              type: 'input'
            },
            {
              name: 'name',
              type: 'input'
            },
            {
              name: 'inventoryStatus',
              type: 'dropdown',
              placeholder: 'Enter status',
              options: [{ name: 'In Stock', id: 'INSTOCK' }, { name: 'Low Stock', id: 'LOWSTOCK' }, { name: 'Out of Stock', id: 'OUTOFSTOCK' }],
              optionLabel: "name",
              optionValue: "id"
            },
            {
              name: 'price',
              type: 'input'
            }
          ],
          dataKey: 'id',
          dataSource: [
            {
              "id": "1000",
              "code": "f230fh0g3",
              "name": "Bamboo Watch",
              "description": "Product Description",
              "image": "bamboo-watch.jpg",
              "price": 65,
              "category": "Accessories",
              "quantity": 24,
              "inventoryStatus": "INSTOCK",
              "rating": 5
            },
            {
              "id": "1001",
              "code": "nvklal433",
              "name": "Black Watch",
              "description": "Product Description",
              "image": "black-watch.jpg",
              "price": 72,
              "category": "Accessories",
              "quantity": 61,
              "inventoryStatus": "INSTOCK",
              "rating": 4
            },
            {
              "id": "1002",
              "code": "zz21cz3c1",
              "name": "Blue Band",
              "description": "Product Description",
              "image": "blue-band.jpg",
              "price": 79,
              "category": "Fitness",
              "quantity": 2,
              "inventoryStatus": "LOWSTOCK",
              "rating": 3
            },
            {
              "id": "1003",
              "code": "244wgerg2",
              "name": "Blue T-Shirt",
              "description": "Product Description",
              "image": "blue-t-shirt.jpg",
              "price": 29,
              "category": "Clothing",
              "quantity": 25,
              "inventoryStatus": "INSTOCK",
              "rating": 5
            },
            {
              "id": "1004",
              "code": "h456wer53",
              "name": "Bracelet",
              "description": "Product Description",
              "image": "bracelet.jpg",
              "price": 15,
              "category": "Accessories",
              "quantity": 73,
              "inventoryStatus": "INSTOCK",
              "rating": 4
            }
          ]
        }
      ]
    }
  ];

  showCompanyModifier: boolean = false;
  showCompanyModifier2: boolean = false;
  showCompanyModifier3: boolean = false;

  showMultiFormModifier: boolean = false;
  showMultiFormModifier2: boolean = false;
  showMultiFormModifier3: boolean = false;

  public form: FormGroup;
  unsubcribe: any;

  constructor() {
    this.form = new FormGroup({
      fields: new FormControl(JSON.stringify(this.fields))
    })
    this.unsubcribe = this.form.valueChanges.subscribe((update) => {
      console.log(update);
      this.fields = JSON.parse(update.fields);
    });
  }

  ngOnInit(): void {
  }

  getFields() {
    return this.fields;
  }

  getFields2() {
    return this.fields2;
  }

  getFields3() {
    return this.fields3;
  }

  getMultiFields() {
    return this.fields4;
  }

  getMultiFields2() {
    return this.fields4;
  }

  getMultiFields3() {
    return this.fields4;
  }

  formSubmission(e: any) {
    console.log(e);
  }

  onUpload(e: any) {
    console.log(e);
  }

  onClick(e: any) {
    console.log(e);
  }

  // ngOnDestroy() {
  //   this.unsubcribe.unsubcribe();
  // }
  clearFields() {
    // Call setfield
  }
}
