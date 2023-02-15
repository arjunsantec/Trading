export interface PriceSetting {
    id?:string,
    // title: ID
    // readOnly: true
    project:number,
    // title: Project
    currency:string;
    shelfRate:string,
    // title: ShelfRate
    // maxLength: 250
    // x-nullable: true
    palletRate:string,
    // title: PalletRate
    // maxLength: 50
    // minLength: 1
    // x-nullable: true
    fridgeRate:string;
    paddonsRate:string,
    // title: PaddonsRate
    // maxLength: 100
    // minLength: 1
    // x-nullable: true
    boxRate:string,
    // title: BoxRate
    // maxLength: 250
    // minLength: 1
    // x-nullable: true
    pricingDate:string,
    // title: PricingDate
    // maxLength: 250
    // minLength: 1
    // x-nullable: true
}