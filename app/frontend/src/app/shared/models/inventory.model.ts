export interface GRNDetails {
    id?: string
    // title: ID
    // readOnly: true
    created: string
    // title: Created
    modified: string
    // title: Modified
    user_created: string
    // title: User created
    // maxLength: 50
    // Updated by admin.save_model

    user_modified: string
    // title: User modified
    // maxLength: 50
    // Updated by admin.save_model

    guid: string
    // title: Guid
    // readOnly: true
    // System auto field. UUID primary key.

    is_active: boolean
    // title: Is active
    product_code: string
    // title: Product code
    // maxLength: 30
    product_id: string
    // title: Product name
    // maxLength: 30
    trc_no: string
    // title: Trc no
    // maxLength: 30
    trc_date: string
    // title: Trc date
    // required
    kit_no: string
    // title: Kit no
    // maxLength: 30
    batch_no: string
    // title: Batch no
    // maxLength: 30
    expiry: string
    // title: Expiry
    // maxLength: 30
    serial_number: string
    // title: Serial number
    // maxLength: 30
    manufacture: string
    // title: Manufacture
    // maxLength: 30
    min_temp: string,
    // title: Min temp
    // maxLength: 30
    max_temp: string,
    // title: Max temp
    // maxLength: 30
    recevied_qty: string
    // title: Recevied qty
    // maxLength: 30
    unit: string
    // title: Unit
    // maxLength: 30
    unit_price: string
    // title: Unit price
    // maxLength: 30
    base_price: string
    // title: Base price
    // maxLength: 30
    gst: string
    // title: Gst
    // maxLength: 30
    unit_net_price: string
    // title: Unit net price
    // maxLength: 30
    net_price: string
    // title: Net price
    // maxLength: 30
    ware_house: string
    // title: Ware house
    // maxLength: 30
    zone: string
    // title: Zone
    // maxLength: 30
    rack: string
    // title: Rack
    // maxLength: 30
    shelf: string
    // title: Shelf
    // maxLength: 30
    note: string
    // title: Note
    // maxLength: 90
    is_flag: boolean
    // title: Is flag
    // material_receipt: number
    // title: Material receipt
    // x-nullable: true
}

export interface MaterialReceipt {
    id?: string;
    // title: ID
    // readOnly: true
    materialReceiptCode: string
    // title: Materialreceiptcode
    // minLength: 1
    // inwardType: string;
    // title: Inwardtype
    // minLength: 1
    poNumber: string;
    // title: Ponumber
    // maxLength: 50
    poDate: string;
    // title: Podate
    supplierInvoiceNumber: string;
    // title: Supplierinvoicenumber
    // minLength: 1
    courierNo: string;
    // title: Supplierdocketno
    // minLength: 1
    supplierName: Number;
    // title: Suppliername
    // minLength: 1
    supplierAddress: string;
    // title: Supplieraddress
    // minLength: 1
    supplierPhone: string
    // title: Supplierphone
    // minLength: 1
    deliveryChallanNo: string;
    // title: Deliverychallanno
    // minLength: 1
    corgoType: string;
    // title: Corgotype
    // minLength: 1
    boxQty: string;
    // title: Boxqty
    // minLength: 1
    requestApproval: string;
    // title: Requestapproval
    // minLength: 1
    approvalOnDeviatior: string;
    // title: Approvalondeviatior
    // minLength: 1
    awb: string;
    // title: Awb
    // maxLength: 30
    sponsor: number;
    // title: Sponsor
    // x-nullable: true
    portocol: string;
    // title: Portocol
    // maxLength: 30
    project: string;
    // title: Project
    // maxLength: 30
    weight: number;
    // title: Weight
    // x-nullable: true
    size: number;
    // title: Size
    // x-nullable: true
    recipientName: Number;
    // title: Recipientname
    recipientAddress: string
    // title: Recipientaddress
    // minLength: 1
    recipientPhone: string
    // title: Recipientphone
    // minLength: 1
    isApproved: string
    // title: Isapproved
    // minLength: 1
    invoice: string;
    // title: Invoice
    // maxLength: 200
    // x-nullable: true
    invoiceIn: string;
    // title: Invoicein
    // maxLength: 50
    carrierInvoice: string;
    // title: Carrierinvoice
    // maxLength: 50
    receiveDate: string;
    // title: Receivedate
    // minLength: 1
    courier: string;
    // title: Courier
    // maxLength: 100
    // x-nullable: true
    grn_details: GRNDetails | any;
    orderNumber: string;
    // title: Ordernumber
    studyNumber: string;
    // title: Studynumber
    incoTerms: string;
    // title: Incoterms
    shippingCondition: boolean;
    // title: Shippingcondition
    storageCondition: boolean;
    // title: Storagecondition
}
//     GRNDetails: {
//     id: string
//     // title: ID
//     // readOnly: true
//     created: string
//     // title: Created
//     modified: string
//     // title: Modified
//     user_created: string
//     // title: User created
//     // maxLength: 50
//     // Updated by admin.save_model

//     user_modified: string
//     // title: User modified
//     // maxLength: 50
//     // Updated by admin.save_model

//     guid: string
//     // title: Guid
//     // readOnly: true
//     // System auto field. UUID primary key.

//     is_active: boolean
//     // title: Is active
//     product_code: string
//     // title: Product code
//     // maxLength: 30
//     product_name: string
//     // title: Product name
//     // maxLength: 30
//     trc_no: string
//     // title: Trc no
//     // maxLength: 30
//     trc_date: string
//     // title: Trc date
//     kit_no: string
//     // title: Kit no
//     // maxLength: 30
//     batch_no: string
//     // title: Batch no
//     // maxLength: 30
//     expiry: string
//     // title: Expiry
//     // maxLength: 30
//     serial_number: string
//     // title: Serial number
//     // maxLength: 30
//     manufacture: string
//     // title: Manufacture
//     // maxLength: 30
//     temp: string
//     // title: Temp
//     // maxLength: 30
//     recevied_qty: string
//     // title: Recevied qty
//     // maxLength: 30
//     unit: string
//     // title: Unit
//     // maxLength: 30
//     unit_price: string
//     // title: Unit price
//     // maxLength: 30
//     base_price: string
//     // title: Base price
//     // maxLength: 30
//     gst: string
//     // title: Gst
//     // maxLength: 30
//     unit_net_price: string
//     // title: Unit net price
//     // maxLength: 30
//     net_price: string
//     // title: Net price
//     // maxLength: 30
//     ware_house: string
//     // title: Ware house
//     // maxLength: 30
//     zone: string
//     // title: Zone
//     // maxLength: 30
//     rack: string
//     // title: Rack
//     // maxLength: 30
//     shelf: string
//     // title: Shelf
//     // maxLength: 30
//     note: string
//     // title: Note
//     // maxLength: 90
//     is_flag: boolean
//     // title: Is flag
//     material_receipt: number
//     // title: Material receipt
//     // x-nullable: true
// }]

export interface ProductTagging {
    id?: string,
    // title: ID
    // readOnly: true
    product: number,
    // title: Product
    // x-nullable: true
    trc_no: string,
    // title: Trc no
    // maxLength: 30
    trc_date: string,
    // title: Trc date
    kit_no: string,
    // title: Kit no
    // maxLength: 100
    batch_no: string,
    // title: Batch no
    // maxLength: 50
    expiry: string,
    // title: Expiry
    // maxLength: 30
    serial_number: string,
    // title: Serial number
    // maxLength: 30
    manufacture: string,
    // title: Manufacture
    // maxLength: 30
    min_temp: string,
    max_temp: string,
    // title: Temp
    // maxLength: 30
    recevied_qty: string,
    // title: Recevied qty
    // maxLength: 50
    available_qty: string,
    price: string,
    // title: Available qty
    // maxLength: 50
    ware_house: string,
    // title: Ware house
    // x-nullable: true
    zone: string,
    // title: Zone
    // x-nullable: true
    rack: string,
    // title: Rack
    // x-nullable: true
    level: string,
    // title: Level
    // x-nullable: true
    shelf: string,
    // title: Shelf
    // x-nullable: true
    project: number;
    // title: Project
    // x - nullable: true
    storage_type: string;
    // title: Storage type
    // maxLength: 200
    // x - nullable: true
    type_name: string;
    // title: Type name
    // maxLength: 200
    // x - nullable: true
    load_date: string;
    // title: Load date
    // maxLength: 200
    // x - nullable: true
    unload_date: string;
    // title: Unload date
    // maxLength: 200
    // x - nullable: true
}

