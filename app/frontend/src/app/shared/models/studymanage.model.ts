export interface StudyMaterialReturn {

    id	:string,
    // title: ID
    // readOnly: true
    supplierName:string,
    // title: Suppliername
    // maxLength: 50
    supplierAddress:string,
    // title: Supplieraddress
    // maxLength: 500
    supplierPhone:string,
    // title: Supplierphone
    // maxLength: 50
    recipientName:string,
    // title: Recipientname
    // maxLength: 50
    recipientAddress:string,
    // title: Recipientaddress
    // maxLength: 500
    recipientPhone:string,
    // title: Recipientphone
    // maxLength: 50
    Invoice:string,
    // title: Invoice
    // maxLength: 50
    numberOfPlace:string,
    // title: Numberofplace
    // maxLength: 50
    sponsor: number;
    // title: Sponsor
    // x-nullable: true
    Weight:string,
    // title: Weight
    // maxLength: 50
    Size:string,
    // title: Size
    // maxLength: 50
    project: number;
    // title: Project
    // x-nullable: true
    Protocol:string,
    // title: Protocol
    // maxLength: 50
    Courier:string,
    // title: Courier
    // maxLength: 50
    Recipient:string,
    // title: Recipient
    // maxLength: 50
    pickUpDate:string,
    // title: Pickupdate
    // maxLength: 50
    incomeDate:string,
    // title: Incomedate
    // maxLength: 50
    // pickUpTime:string,
    // title: Pickuptime
    // maxLength: 50
    // incomeTime:string,
    // title: Incometime
    // maxLength: 50
    study_material_return_list:any

}

export interface study_material_return_list{
    study_product:string,
    // title: Studyproduct
    // maxLength: 50
    product_code:string,
    // title: Productcode
    // maxLength: 50
    kit_number:string,
    // title: Kitnumber
    // maxLength: 50
    batch_no:string,
    // title: Batchno
    // maxLength: 50
    serial_no:string,
    // title: Serialno
    // maxLength: 50
    quantity:string,
    // title: Quantity
    // maxLength: 50
    type:string,
    // title: Type
    // maxLength: 50
    date:string,
    // title: Date
    // maxLength: 50
    comment:string,
    // title: Comment
    // maxLength: 50
}

export interface StudyMaterialDestruction{

    id	:string,
    clientName:string,
    // title: Clientname
    clientAddress:string,
    // title: Clientaddress
    // maxLength: 500
    clientPhone:string,
    // title: Clientphone
    // maxLength: 50
    serviceProviderName:string,
    // title: Serviceprovidername
    serviceProviderAddress:string,
    // title: Serviceprovideraddress
    // maxLength: 500
    serviceProviderPhone:string,
    // title: Serviceproviderphone
    // maxLength: 50
    Document:string,
    // title: Document
    // maxLength: 50
    Site:string,
    // title: Site
    // maxLength: 50
    numberOfPlace:string,
    // title: Numberofplace
    // maxLength: 50
    sponsor: number;
    // title: Sponsor
    // x-nullable: true
    fullWeight:string,
    // title: Fullweight
    // maxLength: 50
    fullSize:string,
    // title: Fullsize
    // maxLength: 50
    project: number;
    // title: Project
    // x-nullable: true
    Protocol:string,
    // title: Protocol
    // maxLength: 50
    testNote:string,
    // title: Testnote
    // maxLength: 500
    storageLogisticManager:string,
    // title: Storagelogisticmanager
    // maxLength: 50
    destructionProvider:string,
    // title: Destructionprovider
    // maxLength: 50
    destructionDate:string,
    // title: Destructiondate
    // maxLength: 50
    study_material_destruction_list:any,

}

export interface study_material_destruction_list{
    // study_material_destruction:string,
    // title: Study material destruction
    destruction_product:string,
    // title: Destruction product id
    // readOnly: true
    product_code:string,
    // title: Product code
    // maxLength: 200
    // x-nullable: true
    kit_number:string,
    // title: Kit number
    // maxLength: 200
    // x-nullable: true
    batch_no:string,
    // title: Batch no
    // maxLength: 200
    // x-nullable: true
    serial_no:string,
    // title: Serial no
    // maxLength: 200
    // x-nullable: true
    quantity:string,
    // title: Quantity
    // maxLength: 200
    // x-nullable: true
    temp:string,
    // title: Temp
    // maxLength: 200
    // x-nullable: true
    expiry_date:string,
    // title: Expiry date
    // maxLength: 1000
    // x-nullable: true
    note:string,
    // title: Note
    // maxLength: 200
    // x-nullable: true
}

export interface StudyMaterialDelivery {
    id: string;
    // title: ID
    // readOnly: true
    supplierName: number;
    // title: Suppliername
    supplierAddress: string;
    // title: Supplieraddress
    // maxLength: 500
    supplierPhone: string;
    // title: Supplierphone
    // maxLength: 50
    recipientName: number;
    // title: Recipientname
    recipientAddress: string;
    // title: Recipientaddress
    // maxLength: 500
    recipientPhone: string;
    // title: Recipientphone
    // maxLength: 50
    Invoice: string;
    // title: Invoice
    // maxLength: 50
    localInvoice: string;
    // title: Localinvoice
    // maxLength: 50
    orderNumber: string;
    // title: Ordernumber
    // maxLength: 50
    AWB: string;
    // title: Awb
    // maxLength: 50
    sponsor: number;
    // title: Sponsor
    // x-nullable: true
    Protocol: string;
    // title: Protocol
    // maxLength: 50
    project: number;
    // title: Project
    // x-nullable: true
    Weight: string;
    // title: Weight
    // maxLength: 50
    Size: string;
    // title: Size
    // maxLength: 50
    boxQuantity: string;
    // title: Boxquantity
    // maxLength: 50
    supplierCourier: string;
    // title: Suppliercourier
    // maxLength: 50
    recipientCourier: string;
    // title: Recipientcourier
    // maxLength: 50
    warehouse: number;
    // title: Warehouse
    // x-nullable: true
    withdrawalDate: string;
    // title: Withdrawaldate
    // maxLength: 50
    Verification: string;
    // title: Verification
    // maxLength: 50
    deliveryDate: string;
    // title: Deliverydate
    // maxLength: 50
    study_material_delivery_list: any;	
}

export interface study_material_delivery_list {
    // id: string;
    // title: ID
    // readOnly: true
    // study_material_delivery	integer
    // title: Study material delivery
    study_product: string;
    // title: Study product id
    // readOnly: true
    product_code: string;
    // title: Product code
    // maxLength: 200
    // x-nullable: true
    kit_number: string;
    // title: Kit number
    // maxLength: 200
    // x-nullable: true
    batch_no: string;
    // title: Batch no
    // maxLength: 200
    // x-nullable: true
    serial_no: string;
    // title: Serial no
    // maxLength: 200
    // x-nullable: true
    quantity: string;
    // title: Quantity
    // maxLength: 200
    // x-nullable: true
    validity: string;
    // title: Validity
    // maxLength: 200
    // x-nullable: true
    temp: string;
    // title: Temp
    // maxLength: 200
    // x-nullable: true
    receive_date: string;
    // title: Receive date
    // maxLength: 200
    // x-nullable: true
    comment: string;
    // title: Comment
    // maxLength: 1000
    // x-nullable: true
}

export interface DeliverySitePatient {
    id: string;
    // title: ID
    // readOnly: true
    siteName: number;
    // title: Sitename
    siteAddress: string;
    // title: Siteaddress
    // maxLength: 500
    sitePhone: string;
    // title: Sitephone
    // maxLength: 50
    patientName: number;
    // title: Patientname
    patientAddress: string;
    // title: Patientaddress
    // maxLength: 500
    patientPhone: string;
    // title: Patientphone
    // maxLength: 50
    Document: string;
    // title: Document
    // maxLength: 50
    sponsor: number;
    // title: Sponsor
    // x-nullable: true
    Protocol: string;
    // title: Protocol
    // maxLength: 50
    project: number;
    // title: Project
    // x-nullable: true
    Weight: string;
    // title: Weight
    // maxLength: 50
    Size: string;
    // title: Size
    // maxLength: 50
    boxQuantity: string;
    // title: Boxquantity
    // maxLength: 50
    siteCourier: string;
    // title: Sitecourier
    // maxLength: 50
    patientCourier: string;
    // title: Patientcourier
    // maxLength: 50
    transferDate: string;
    // title: Transferdate
    // maxLength: 50
    deliveryDate: string;
    // title: Deliverydate
    // maxLength: 50
    delivery_site_patient_list: any;
}
    
export interface delivery_site_patient_list {
    // id: number;
    // // title: ID
    // // readOnly: true
    // delivery_site_patient: number;
    // // title: Delivery site patient
    product: string;
    // title: Product id
    // readOnly: true
    product_code: string;
    // title: Product code
    // maxLength: 200
    // x-nullable: true
    quantity: string;
    // title: Quantity
    // maxLength: 200
    // x-nullable: true
    kit_number: string;
    // title: Kit number
    // maxLength: 200
    // x-nullable: true
    batch_no: string;
    // title: Batch no
    // maxLength: 200
    // x-nullable: true
    serial_no: string;
    // title: Serial no
    // maxLength: 200
    // x-nullable: true
    temp: string;
    // title: Temp
    // maxLength: 200
    // x-nullable: true
    note: string;
    // title: Note
    // maxLength: 200
    // x-nullable: true
}

export interface NurseToPatient {
    id: string;
    // title: ID
    // readOnly: true
    siteName: number;
    // title: Sitename
    siteAddress: string;
    // title: Siteaddress
    // maxLength: 500
    sitePhone: string;
    // title: Sitephone
    // maxLength: 50
    patientName: number;
    // title: Patientname
    patientAddress: string;
    // title: Patientaddress
    // maxLength: 500
    patientPhone: string;
    // title: Patientphone
    // maxLength: 50
    Document: string;
    // title: Document
    // maxLength: 50
    sponsor: number;
    // title: Sponsor
    // x-nullable: true
    Protocol: string;
    // title: Protocol
    // maxLength: 50
    project: number;
    // title: Project
    // x-nullable: true
    Invoice: string;
    // title: Invoice
    // maxLength: 50
}

export interface SiteToSite {
    id: string;
    // title: ID
    // readOnly: true
    fromName: number;
    // title: Fromname
    fromAddress: string;
    // title: Fromaddress
    // maxLength: 500
    fromPhone: string;
    // title: Fromphone
    // maxLength: 50
    toName: number;
    // title: Toname
    toAddress: string;
    // title: Toaddress
    // maxLength: 500
    toPhone: string;
    // title: Tophone
    // maxLength: 50
    Document: string;
    // title: Document
    // maxLength: 50
    sponsor: number;
    // title: Sponsor
    // x-nullable: true
    Protocol: string;
    // title: Protocol
    // maxLength: 50
    project: number;
    // title: Project
    // x-nullable: true
    Weight: string;
    // title: Weight
    // maxLength: 50
    Size: string;
    // title: Size
    // maxLength: 50
    boxQuantity: string;
    // title: Boxquantity
    // maxLength: 50
    fromCourier: string;
    // title: Fromcourier
    // maxLength: 50
    toCourier: string;
    // title: Tocourier
    // maxLength: 50
    transferDate: string;
    // title: Transferdate
    // maxLength: 50
    deliveryDate: string;
    // title: Deliverydate
    // maxLength: 50
    site_to_site_list: any;
}

export interface site_to_site_list {
    id: string;
    // title: ID
    // readOnly: true
    // site_to_site: number;
    // title: Site to site
    product: string;
    // title: Product id
    // readOnly: true
    product_code: string;
    // title: Product code
    // maxLength: 200
    // x-nullable: true
    quantity: string;
    // title: Quantity
    // maxLength: 200
    // x-nullable: true
    kit_number: string;
    // title: Kit number
    // maxLength: 200
    // x-nullable: true
    batch_no: string;
    // title: Batch no
    // maxLength: 200
    // x-nullable: true
    serial_no: string;
    // title: Serial no
    // maxLength: 200
    // x-nullable: true
    temp: string;
    // title: Temp
    // maxLength: 200
    // x-nullable: true
    note: string;
    // title: Note
    // maxLength: 200
    // x-nullable: true
}

export interface StudyMaterialExported {
    id: string;
    // title: ID
    // readOnly: true
    senderName: number;
    // title: Sendername
    senderAddress: string;
    // title: Senderaddress
    // maxLength: 500
    senderPhone: string;
    // title: Senderphone
    // maxLength: 50
    recipientName: number;
    // title: Recipientname
    recipientAddress: string;
    // title: Recipientaddress
    // maxLength: 500
    recipientPhone: string;
    // title: Recipientphone
    // maxLength: 50
    localInvoice: string;
    // title: Localinvoice
    // maxLength: 50
    AWB: string;
    // title: Awb
    // maxLength: 50
    sponsor: number;
    // title: Sponsor
    // x-nullable: true
    project: number;
    // title: Project
    // x-nullable: true
    Weight: string;
    // title: Weight
    // maxLength: 50
    Size: string;
    // title: Size
    // maxLength: 50
    Courier: string;
    // title: Courier
    // maxLength: 50
    warehouse: number;
    // title: Warehouse
    // x-nullable: true
    withdrawalDate: string;
    // title: Withdrawaldate
    // maxLength: 50
    Verification: string;
    // title: Verification
    // maxLength: 50
    study_material_exported_list: any;	
}

export interface study_material_exported_list {
    id: string;
    // title: ID
    // readOnly: true
    // study_material_exported: number;
    // title: Study material exported
    product: string;
    // title: Product id
    // readOnly: true
    product_code: string;
    // title: Product code
    // maxLength: 200
    // x-nullable: true
    quantity: string;
    // title: Quantity
    // maxLength: 200
    // x-nullable: true
    batch_no: string;
    // title: Batch no
    // maxLength: 200
    // x-nullable: true
    serial_no: string;
    // title: Serial no
    // maxLength: 200
    // x-nullable: true
    validity: string;
    // title: Validity
    // maxLength: 200
    // x-nullable: true
    temp: string;
    // title: Temp
    // maxLength: 200
    // x-nullable: true
    export_date: string;
    // title: Export date
    // maxLength: 200
    // x-nullable: true
    comment: string;
    // title: Comment
    // maxLength: 1000
    // x-nullable: true
}

export interface ExpireDateChange {
    id: string;
    // title: ID
    // readOnly: true
    Document: string;
    // title: Document
    // maxLength: 50
    project: number;
    // title: Project
    // x-nullable: true
    warehouse: number;
    // title: Warehouse
    // x-nullable: true
    movingDate: string;
    // title: Movingdate
    // maxLength: 50
    Verification: string;
    // title: Verification
    // maxLength: 50
    expire_date_change_list: any;
}

export interface ExpireDateChangeDetails {
    id: string;
    // title: ID
    // readOnly: true
    // expire_date_change: number;
    // title: Expire date change
    product: number;
    // title: Product
    // x-nullable: true
    product_code: string;
    // title: Product code
    // maxLength: 200
    // x-nullable: true
    kit_number: string;
    // title: Kit number
    // maxLength: 200
    // x-nullable: true
    batch_no: string;
    // title: Batch no
    // maxLength: 200
    // x-nullable: true
    serial_no: string;
    // title: Serial no
    // maxLength: 200
    // x-nullable: true
    quantity: string;
    // title: Quantity
    // maxLength: 200
    // x-nullable: true
    existent_date: string;
    // title: Existent date
    // maxLength: 200
    // x-nullable: true
    project: string;
    // title: Project
    // maxLength: 200
    // x-nullable: true
    updated_date: string;
    // title: Updated date
    // maxLength: 200
    // x-nullable: true
    comment: string;
    // title: Comment
    // maxLength: 1000
    // x-nullable: true
}