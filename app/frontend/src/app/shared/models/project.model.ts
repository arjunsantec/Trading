export interface ProjectCreation {
    id?: string;
    // title: ID
    // readOnly: true
    projectName: string;
    // title: Projectname
    projectCode: string;
    // title: Projectcode
    createdDate: string;
    // title: Createddate
    loadingDate: string;
    // title: Loadingdate
    shipmentDate: string;
    // title: Shipmentdate
    storageDays: string;
    // title: Storagedays
    fromName: string;
    // title: Fromname
    fromAddress: string;
    // title: Fromaddress
    zipcode: string;
    // title: Zipcode
    // maxLength: 250
    // x-nullable: true
    studyNumber: string;
    // title: Studynumber
    protocolNumber: string;
    // title: Protocolnumber
    orderNumber: string;
    // title: Ordernumber
    contactNo: string;
    // title: Contactno
    contactPerson: string;
    // title: Contactperson
    email: string;
    // title: Email
    // maxLength: 250
    // x-nullable: true
    invoiceNumber: string;
    // title: Invoicenumber
    awbNo: string;
    // title: Awbno
    proformaInvoice: string;
    // title: Proformainvoice
    invoiceType: string;
    // title: Invoicetype
    toName: number;
    // title: Toname
    toAddress: string;
    // title: Toaddress
    toZipcode: string;
    // title: Tozipcode
    tempControlled: boolean;
    // title: Tempcontrolled
    minTemp: string;
    // title: Mintemp
    maxTemp: string;
    // title: Maxtemp
    ambientControlled: boolean;
    // title: Ambientcontrolled
    ambientNote: string;
    // title: Ambientnote
    documentNo: string;
    // title: Documentno
    effectiveDate: string;
    // title: Effectivedate
    sopRelatedTo: string;
    // title: Soprelatedto
    note: string;
    // title: Note
    // x-nullable: true
    name: string;
    // title: Name
    // maxLength: 250
    // x-nullable: true
    title: string;
    // title: Title
    // maxLength: 250
    // x-nullable: true
    locations: string;
    // title: Locations
    // maxLength: 250
    // x-nullable: true
    date: string;
    // title: Date
    // maxLength: 200
    // x-nullable: true
    signature: string;
    // title: Signature
    // maxLength: 250
    // x-nullable: true
    project_creation_list: any;
    totalQuantity: number;
    // title: Totalquantity
    totalWeight: number;
    // title: Totalweight
    grandTotal: number;
    // title: Grandtotal
    // documents: any;
    file_upload: any;
}

export interface ProjectCreationDeatils {
    id: string;
    // title: ID
    // readOnly: true
    project_creation: number;
    // title: Project creation
    product: string;
    // title: Product
    // maxLength: 1000
    // x-nullable: true
    batch_no: string;
    // title: Batch no
    // maxLength: 200
    // x-nullable: true
    expiry_date: string;
    // title: Expiry date
    // maxLength: 1000
    // x-nullable: true
    quantity: string;
    // title: Quantity
    // maxLength: 200
    // x-nullable: true
    hs_code: string;
    // title: Hs code
    // maxLength: 200
    // x-nullable: true
    net_weight: string;
    // title: Net weight
    // maxLength: 200
    // x-nullable: true
    unit_value: string;
    // title: Unit value
    // maxLength: 200
    // x-nullable: true
    total_value: string;
    // title: Total value
    // maxLength: 200
    // x-nullable: true
    currency_type: string;
    // title: Currency type
    // maxLength: 200
    // x-nullable: true
}

export interface ProjectCreationFileUpload{
    id: string;
    // title: ID
    // readOnly: true
    project_creation: number;
    // title: Project creation
    file: any;
    // title: File
    // readOnly: true
    // x-nullable: true     
    // x-nullable	true
}

export interface ProformaKitCreation {
    id?: string;
    kitName:string;
    kitQTY:string;
    kitValue:string;
    project:any;
    totalUnits:number;
    totalPrice:number;
    productList:any;
}

export interface ProformaKitCreationDetails {
    id?: string;
  productCode:string;
  product:string;
  unit:string;
  price:Number;
}

export interface CMTRFCreation {
    id?: string;
    protocol: string;
    // title: Protocol
    // maxLength: 100
    // x-nullable: true
    depot: string;
    // title: Depot
    // maxLength: 100
    // x-nullable: true
    orderNumber: string;
    // title: Ordernumber
    // maxLength: 100
    batchNumber: string;
    // title: Batchnumber
    // maxLength: 100
    receiverName: number;
    // title: Receivername
    cmtrf_list: any;
    acknowledgement_list: any;
}

export interface CMTRFCreationDetails {
    id?: string;
    // cmtrf_creation: number;
    // title: Cmtrf creation
    item: string;
    // title: Item
    // maxLength: 100
    // x-nullable: true
    quantity: string;
    // title: Quantity
    // maxLength: 100
    // x-nullable: true
    product: string;
    // title: Product
    // maxLength: 200
    // x-nullable: true
    expiry_date: string;
    // title: Expiry date
    // maxLength: 100
    // x-nullable: true
    kit_no: string;
    // title: Kit no
    // maxLength: 100
    // x-nullable: true
}

export interface CMTRFAcknowledgement {
    id?: string;
    // title: ID
    // readOnly: true
    // cmtrf_creation: number;
    // title: Cmtrf creation
    container: string;
    // title: Container
    // maxLength: 100
    // x-nullable: true
    data_logger: string;
    // title: Data logger
    // maxLength: 100
    // x-nullable: true
    alarm: any;
    // title: Alarm     
}



