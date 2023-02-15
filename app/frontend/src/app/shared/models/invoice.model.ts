export interface InvoiceCreation {
    id: string;
    // title: ID
    // readOnly: true
    consignee: string;
    // title: Consignee
    // maxLength: 200
    // x-nullable: true
    importerOfRecord: string;
    // title: Importerofrecord
    // maxLength: 100
    customsBroker: number;
    // title: Customsbroker
    invoice: string;
    // title: Invoice
    // maxLength: 200
    // x-nullable: true
    invoiceDate: string;
    // title: Invoicedate
    // maxLength: 100
    initial: string;
    // title: Initial
    // maxLength: 100
    // x-nullable: true
    protocol: string;
    // title: Protocol
    // maxLength: 100
    // x-nullable: true
    incoterms: string;
    // title: Incoterms
    // maxLength: 100
    // x-nullable: true
    shipmentsContains: string;
    // title: Shipmentscontains
    // maxLength: 100
    totalQuantity: string;
    // title: Totalquantity
    // maxLength: 100
    subTotal: string;
    // title: Subtotal
    // maxLength: 100
    countryOfOrigin: string;
    // title: Countryoforigin
    // maxLength: 1000
    manufacturer: string;
    // title: Manufacturer
    // maxLength: 100
    // x-nullable: true
    carrier: string;
    // title: Carrier
    // maxLength: 100
    // x-nullable: true
    service: string;
    // title: Service
    // maxLength: 100
    // x-nullable: true
    hawb: string;
    // title: Hawb
    // maxLength: 100
    // x-nullable: true
    dispatchDate: string;
    // title: Dispatchdate
    // maxLength: 100
    deliveryDate: string;
    // title: Deliverydate
    // maxLength: 100
    consignment: string;
    // title: Consignment
    // maxLength: 100
    // x-nullable: true
    marks: string;
    // title: Marks
    // maxLength: 100
    // x-nullable: true
    quantity: string;
    // title: Quantity
    // maxLength: 100
    // x-nullable: true
    netWeight: string;
    // title: Netweight
    // maxLength: 100
    grossWeight: string;
    // title: Grossweight
    // maxLength: 100
    dimension: string;
    // title: Dimension
    // maxLength: 100
    // x-nullable: true
    invoice_creation_list: any;
    note: string;
    // title: Note
    // x-nullable: true
    exporter: string;
    // title: Exporter
    // maxLength: 100
    // x-nullable: true
}

export interface InvoiceCreationDetails {
    id: string;
    // title: ID
    // readOnly: true
    description: string;
    // title: Description
    // maxLength: 1000
    // x - nullable: true
    expiry_date: string;
    // title: Expiry date
    // maxLength: 100
    // x - nullable: true
    batch: string;
    // title: Batch
    // maxLength: 100
    // x - nullable: true
    quantity: string;
    // title: Quantity
    // maxLength: 100
    // x - nullable: true
    country_of_origin: string;
    // title: Country of origin
    // maxLength: 100
    // x - nullable: true
    tariff_no: string;
    // title: Tariff no
    // maxLength: 100
    // x - nullable: true
    value_per_unit: string;
    // title: Value per unit
    // maxLength: 100
    // x - nullable: true
    sub_total: string;
    // title: Sub total
    // maxLength: 100
    // x - nullable: true

}
