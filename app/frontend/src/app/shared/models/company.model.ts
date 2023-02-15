export interface AppSettings {
    id?: string;
    appKey: string;
    // title: Appkey
    // minLength: 1
    appValue: string;
    // title: Appvalue
    // minLength: 1
}

export interface Company {
    id?: string;
    companyName: string;
    // title: companyName
    // minLength: 1
    city?: string;
    // title: City
    // maxLength: 100
    // x-nullable: true
    pinCode: string;
    // title: Pincode
    // minLength: 1
    stateCode: number;
    // title: Statecode
    stateName: string;
    // title: Statename
    // minLength: 1
    taxNo: string;
    // title: Gstno
    // panNo: string;
    // title: Panno
    vatNo: string;
    // title: Cinno
    email?: string;
    // title: Email
    // maxLength: 50
    // minLength: 1
    phoneNo: string;
    // title: Phoneno
    // minLength: 1
    isHeadOffice: any;
    // title: Isheadoffice
    registeredAddress: string;
    // title: Registeredaddress
    corporateAddress: string;
    // title: Corporateaddress
    organizationType: string;
    // title: Organizationtype
    // minLength: 1
    businessCategory: string;
    // title: Businesscategory
    // minLength: 1
    description?: string;
    // title: Description
    // minLength: 1
    // x-nullable: true
    images: string;
    // title: Images
    // readOnly: true
    countryCode: string;
    // title: Countrycode
    countryName: string;
    // title: Countryname
    // minLength: 1

}

export interface CompanyUser {
    id?: string;
    user: number;
    // title: User
    company: Company;
}

export interface Department {
    id: any;
    // id?: string;
    departmentName: string;
    // title: Departmentname
    // minLength: 1
    contactEmail: string;
    // title: Contactemail
    phoneNumber: string;
    // title: Phonenumber
    headOfDepartment: number;
    // title: Headofdepartment

}