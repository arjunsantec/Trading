export interface ProductCategory {
    id?: string;
    categoryName: string;
    // title: Categoryname
    // maxLength: 30
    // minLength: 1
    categoryCode:	string;
    // title: Categorycode
    // minLength: 1
    // categoryCode: string;
    // title: Categorycode
    // minLength: 1
    categoryDescription: string;
    // title: Categorydescriptions
    // minLength: 1
    images?: string;
    // title: Images
    // readOnly: true 
}

export interface ProductSubCategory {
    id?: string;
    // title: ID
    // readOnly: true
    productCategory: number;
    // title: Productcategory   
    subCategoryName: string;
    // title: Subcat name
    // maxLength: 30
    subCategoryCode: string;
    // title: Subcat code
    // maxLength: 30
    subcat_descriptions: string;
    // title: Subcat descriptions
    // x-nullable: true
    subcat_images: string
    // title: Subcat images
    // readOnly: true
}

export interface productMaster {
    id?: Number;
    // title: ID
    // readOnly: true
    productCategory: number
    // title: Productcategory
    productSubCategory:	number
    // title: Productsubcategory
    units: number
    // title: Units
    productName: string;
    // title: Productname
    // minLength: 1
    // maxLength: 30
    productCode: string;
    // title: Productcode
    // minLength: 1
    usageType: string;
    // title: Usagetype
    // minLength: 1
    safetyStockLevel: string;
    // title: Safetystocklevel
    // minLength: 1
    product_images: string;
    // title: Productimages
    // minLength: 1
    // priceMethod: string
    // // title: Pricemethod
    // // minLength: 1
    // basePrice: number
    // // title: Baseprice
    // taxGst: number
    // // title: Taxgst
    // totalPrice: number
    // // title: Totalprice
    // salesMargin: number;
    // // title: Salesmargin
    // typeBasePrice: string;
    // // title: Typebaseprice
    // // minLength: 1
    // salesBasePrice: number;
    // // title: Salesbaseprice
    // salesGst: number;
    // // title: Salesgst
    // salesPrice: number;
    // // title: Salesprice
    // maxPerDis: number;
    // // title: Maxperdis
    // maxAmtDis: number;
    // title: Maxamtdis
    type: string;
    // title: Type
    // maxLength: 30
    country: string;
    // title: Country
    // maxLength: 30
    countryCode: string;
    // title: Country code
    // maxLength: 30
    technical_specification: string;
    // title: Technical specification
    // x-nullable: true
    hsn: string;
    // title: Hsn
    // maxLength: 30
    unitPrice: number;
    // title: Unitprice
    currencyType: string;
    // title: Currencytype
    minTemp:string,
    // title: Mintemp
    maxTemp:string,
    // title: Maxtemp
    images: any;
}

export interface Images {
    id: any;
    // title: ID
    // readOnly: true
    product_creation: number;
    // title: Product creation
    file: any;
    // title: Image
    // readOnly: true
    // x-nullable: true
 }