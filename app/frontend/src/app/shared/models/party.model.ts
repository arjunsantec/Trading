export interface Billingaddress {
    id?: string;
    address: string;
    state: string;
    country: string;
    pinCode: string;
}

export interface POC {
    id?: string;
    personAddress: string;
    personName:string;
    personEmailID:string;
}


export interface Shippingaddress {
    id?: string;
    address: string;
    state: string;
    shippingGSTNo: string;
}

export interface Bankdetails {
    id?: string;
    bankName: string;
    accNo: string;
    branch: string;
    ifsc: string;
    mirc: string;
    swift: string;
}

export interface PartyMaster {
    id?: string;
    // title: ID
    // readOnly: true
    partyName: string;
    // title: Partyname
    // maxLength: 100
    // minLength: 1
    // company: number;
    partyCode:	string;
    companyAddress:string;
    // title: Partycode
    // maxLength: 250
    // minLength: 1
    taxNo: string;
    // title: Taxno
    // maxLength: 50
    phoneNumber: string;
    // title: Phonenumber
    // maxLength: 50
    partyType: string;
    // title: Partytype
    // maxLength: 100
    // orgType: string;
    status:string;
    // title: Orgtype
    // maxLength: 100
    state: string;
    // title: State
    // maxLength: 250
    // minLength: 1
    // x-nullable: true
    country: string;
    // title: Country
    // maxLength: 250
    // minLength: 1
    // x-nullable: true
    email: string;
    // title: Email
    // maxLength: 100
    // minLength: 1
    // x-nullable: true
    stateCode: string;
    // title: Statecode
    // maxLength: 250
    countryCode: string;
    // title: Countrycode
    // maxLength: 250
    // billingAddress: string;
    // title: Billingaddress
    // maxLength: 4000
    // minLength: 1
    shippingAddress: string;
    POC:string;
    // title: Shippingaddress
    // maxLength: 4000
    // minLength: 1
    // bankDetails: string;
    // title: Bankdetails
    // maxLength: 4000
    // minLength: 1
    // creditLimit: number;
    // // title: Creditlimit
    // debitLimit:	number;
    // // title: Debitlimit
    // creditAmount: number;
    // // title: Creditamount
    // debitAmount: number;
    // title: Debitamount
    approvalStatus:	string;
    // title: Approvalstatus
    // maxLength: 100
    approvalBy:	string;
    // title: Approvalby
    // maxLength: 100
    approvalDate: string;
    // title: Approvaldate
    // maxLength: 100
    zipCode: string;
    // title: Zipcode
    // maxLength: 50
}
export interface UnitMaster {
    id: any;
    PrimaryUnit: string;
    // title: Primaryunit
    // minLength: 1
    SecondaryUnit: string;
    // title: Secondaryunit
    // minLength: 1
    ConversionFactors: string;
    // title: Conversionfactors
    // minLength: 1
    ConversionTotal: string
    // title: Conversiontotal
    // minLength: 1
}