export interface ZoneCreation {
    id: string
    // title: ID
    // readOnly: true
    wareHouse: Number
    // title: Warehouse
    zoneName: string
    // title: Zonename
    // maxLength: 50
    zoneCode: string
    // title: Zonecode
    // maxLength: 50
    barCode: string
    minTemp:string
    maxTemp:string
    // title: Barcode
    // maxLength: 50
}

export interface WareHouseCreation {

    id: string
    // title: ID
    // readOnly: true
    wareHouseName: string
    // title: Warehousename
    // maxLength: 150
    wareHouseCode: string
    // title: Warehousecode
    // maxLength: 150
    wareHouseAddress: string
    //     title: Warehouseaddress
    //     maxLength: 150
}


export interface zoneLevelCreation {
    id: string
    // title: ID
    // readOnly: true
    storageZone: number
    // title: Storagezone
    zone_level_list: any;
    rackName:string
    rackCode:string;
}

export interface zoneLevels {
    id?: string;
    zone_level_creation: number
    // title: Zone level creation
    levelName: string
    // title: Levelname
    // maxLength: 50
    levelCode: string
    // title: Levelcode
    // maxLength: 50
    minWeight: string
    // title: Minweight
    // maxLength: 50
    maxWeight: string
    // title: Maxweight
    // maxLength: 50
    minTemp: string
    // title: Mintemp
    // maxLength: 50
    maxTemp: string
    // title: Maxtemp
    // maxLength: 50
    barCode: string
    // title: Barcode
    // maxLength: 50
    description: string
    // title: Description
    // maxLength: 1000
    // x-nullable: true
    ratePerLevel: string
    // title: Rateperlevel
    // maxLength: 50
    currencyType: string;
    // title: Currencytype
    // maxLength: 50
}

export interface ShelfCreation {
    id: string,
    // title: ID
    // readOnly: true
    storageZone: number;
    rackName:number;
    zoneLevel: string,
    // title: Zonelevel
    shelf_creation_list: any,
}

export interface shelf_creation_list {
    id?: string;
    // title: ID
    // readOnly: true
    shelf_creation: number,
    // title: Shelf creation
    shelfName: string,
    // title: Shelfname
    // maxLength: 50
    shelfCode: string,
    // title: Shelfcode
    // maxLength: 50
    minWeight: string,
    // title: Minweight
    // maxLength: 50
    maxWeight: string,
    // title: Maxweight
    // maxLength: 50
    minTemp: string,
    // title: Mintemp
    // maxLength: 50
    maxTemp: string,
    // title: Maxtemp
    // maxLength: 50
    ratePerShelf: string,
    // title: Ratepershelf
    // maxLength: 50
    length: string,
    // title: Length
    // maxLength: 200
    // x-nullable: true
    width: String,
    // title: Width
    // maxLength: 200
    // x-nullable: true
    height: string,
    // title: Height
    // maxLength: 200
    // x-nullable: true
    // barCode: string,
    status:string;
    // title: Barcode
    // maxLength: 50
    description: string
    // title: Description
    // maxLength: 1000
    // x-nullable: true
    currencyType: string;
    // title: Currencytype
    // maxLength: 50
}


export interface GoodsAcceptance{
    id: string,
    // title: ID
    // readOnly: true
    supplierName:number,
    // title: Suppliername
    // maxLength: 50
    supplierAddress:string,
    // title: Supplieraddress
    // maxLength: 50
    supplierPhone:string,
    // title: Supplierphone
    // maxLength: 50
    recipientName:Number,
    // title: Receipentname
    // maxLength: 50
    recipientAddress:string,
    // title: Receipentaddress
    // maxLength: 50
    recipientPhone:string,
    // title: Receipentphone
    // maxLength: 50
    Invoice:string,
    // title: Invoice
    // maxLength: 50
    invoiceIn:string,
    // title: Invoicein
    // maxLength: 50
    carrierInvoice:string,
    // title: Carrierinvoice
    // maxLength: 50
    Awb:string,
    // title: Awb
    // maxLength: 50
    sponsor: number;
    // title: Sponsor
    // x-nullable: true
    Protocol:string,
    // title: Protocol
    // maxLength: 50
    Project: number,
    // title: Project
    // maxLength: 50
    Weight:string,
    // title: Weight
    // maxLength: 50
    Size:string,
    // title: Size
    // maxLength: 50
    BoxQuantity:string,
    // title: Boxquantity
    // maxLength: 50
    goods_acceptance_list:any,
    receiveDate: string;
    // title: Receivedate
    // minLength: 1
    studyNumber:string,
    // title: Studynumber
    // minLength: 1
    orderNumber:string,
    // title: Ordernumber
    // minLength: 1
    courier: string;

    status:string;
    // title: Courier
    // maxLength: 100
    // x-nullable: true
}

export interface acceptanceList{
        id?: string;

        product_id:string,
        // title: Productname
        // maxLength: 50
        productCode:string,
        // title: Productcode
        // maxLength: 50
        Quantity:string,
        // title: Quantity
        // maxLength: 50
        rejectedQuantity:string,
        // title: Rejectedquantity
        // maxLength: 50
        acceptedQuantity:string,
        // title: Acceptedquantity
        // maxLength: 50
        kitNumber:string,
        // title: Kitnumber
        // maxLength: 50
        batchNumber:string,
        // title: Batchnumber
        // maxLength: 50
        serialNumber:string,
        // title: Serialnumber
        // maxLength: 50
        Validity:string,
        // title: Validity
        // maxLength: 50
        Manufacturer:string,
        // title: Manufacturer
        // maxLength: 50
        minTemp:string,
        // title: Tempindegree
        // maxLength: 50
        maxTemp:string,
        Note:string,
        // title: Note
        // maxLength: 50
        trc_no: string
        // title: Trc no
        // maxLength: 30
        trc_date: string
        ware_house: string
        // title: Ware house
        // maxLength: 30
        zone: string
        // title: Zone
        // maxLength: 30
        // rack: string
        // title: Rack
        // maxLength: 30
        // shelf: string
}





export interface rackToRackTransfer {
    id: string,
    // title: ID
    // readOnly: true
    document: string;
    project: number;
    // title: Project
    // x-nullable: true
    // title: Zonelevel
    rack_to_rack_list: any,
}


export interface rackToRackTransferList {
    id: string,
    // title: ID
    // readOnly: true
    product: string,
    // title: Shelf creation
    kitNumber: string,
    // title: Shelfname
    // maxLength: 50
    batchNumber: string,
    // title: Shelfcode
    // maxLength: 50
    serialNumber: string,
    // title: Minweight
    // maxLength: 50
    quantity: string,
    // title: Maxweight
    // maxLength: 50
    fromRack: string,
    // title: Mintemp
    // maxLength: 50
    fromShelf: string,
    // title: Maxtemp
    // maxLength: 50
    toRack: string,
    // title: Ratepershelf
    // maxLength: 50
    toShelf: string,
    fromZone:string,
    fromRackLevel:string
    // title: Length
    // maxLength: 200
    // x-nullable: true
}

export interface zoneTozoneTransfer {
    id: string,
    // title: ID
    // readOnly: true
    document: string;
    transferDate: string;
    invoice:string;
    wareHouse:string;
    fromZone: string,
    // title: Mintemp
    // maxLength: 50
    toZone: string,
    // title: Ratepershelf
    // maxLength: 50
    
    // project: string,
    // title: Zonelevel
    zone_to_zone_list: any,
}


export interface zone_to_zone_list {
    id: string,
    // title: ID
    // readOnly: true
    product:string,
    // title: Product
    // x-nullable: true
    kitNumber:string,
    // title: KitNumber
    // maxLength: 200
    // x-nullable: true
    batchNumber:string,
    // title: BatchNumber
    // maxLength: 200
    // x-nullable: true
    serialNumber:string,
    // title: SerialNumber
    // maxLength: 200
    // x-nullable: true
    trc_number:string,
    // title: Trc number
    // maxLength: 200
    // x-nullable: true
    trc_date:string,
    // title: Trc date
    // maxLength: 200
    // x-nullable: true
    expiry_date:string,
    // title: Expiry date
    // maxLength: 200
    // x-nullable: true
    manufacturer:string,
    // title: Manufacturer
    // maxLength: 200
    // x-nullable: true
    min_temp:string,
    // title: Min temp
    // maxLength: 200
    // x-nullable: true
    max_temp:string,
    // title: Max temp
    // maxLength: 200
    // x-nullable: true
    received_qty:string,
    // title: Received qty
    // maxLength: 200
    // x-nullable: true
    available_qty:string,
    // title: Available qty
    // maxLength: 200
    // x-nullable: tru

}

export interface PalletCreation {
    id: string;
    // title: ID
    // readOnly: true
    palletNumber: string;
    // title: Palletnumber
    // minLength: 1
    palletType: string;
    // title: Pallettype
    // minLength: 1
}

export interface Refrigeration {
    id: string;
    // title: ID
    // readOnly: true
    refrigeratorNumber: string;
    // title: Refrigeratornumber
    // minLength: 1
    refrigeratorType: string;
    // title: Refrigeratortype
    // minLength: 1
}

export interface StorageTypeCreation {
    id: string;
    // title: ID
    // readOnly: true
    storageType: string;
    storage_type_creation_list: any;
}

export interface storage_type_creation_list {
    id: string;
    // title: ID
    // readOnly: true
    name: string;
    code: string;
    unitRate: string;
    currency: string;
    warehouse: number;
    zone: number;
    rack: number;
    level: number;
    shelf: number;
    minTemp: string;
    maxTemp: string;
    length: string;
    width: string;
    height: string;
    maxStorage: string;
}