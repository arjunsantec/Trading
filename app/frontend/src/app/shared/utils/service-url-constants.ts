import { environment } from './../../../environments/environment.prod';

export class ServiceUrlConstants {
  public static BASE_URL = environment.BASE_SERVICE_URL;

  // Authentication URL
  public static SIGN_IN = '/security/api/v1/token/';
  public static REFRESH_TOKEN = '/security/api/v1/token/refresh/';
  public static SIGN_UP = '/security/api/v1/usermanager/';

  // Security
  // USER URL
  public static USER_CRUD = '/security/api/v1/usermanager/';

  // Company
  // App settings URL
  public static APP_SETTINGS_CRUD = '/company/api/v1/AppSettings/';
  // Company URL
  public static COMPANY_CRUD = '/company/api/v1/Company/';
  // Company User URL
  public static COMPANY_USER_CRUD = '/company/api/v1/CompanyUser/';
  // Department URL
  public static DEPARTMENT_CRUD = '/company/api/v1/Department/';

  // Master
  // Product Category URL
  public static PRODUCT_CATEGORY_CRUD = '/master/api/v1/ProductCategory/';
  // Product Sub Category URL
  public static PRODUCT_SUB_CATEGORY_CRUD = '/master/api/v1/ProductSubCategory/';
  // Party Master URL
  public static PARTY_MASTER_CRUD = '/master/api/v1/PartyMaster/';
  // Unit Master URL
  public static UNIT_MASTER_CRUD = '/master/api/v1/UnitMaster/';
  // Product Master URL
  public static PRODUCT_MASTER_CRUD = '/master/api/v1/ProductMaster/';
  // PRODUCT FILE UPLOAD URL
  public static PRODUCT_FILE_UPLOAD = '/master/api/v1/ProductImageUpload/';

  // Inventory
  // GRN Details URL
  public static GRN_DETAILS_CRUD = '/inventory/api/v1/GRNDetails/';
  // Material Receipt URL
  public static MATERIAL_RECEIPT_CRUD = '/inventory/api/v1/MaterialReceipt/';
  // Product Tagging
  public static PRODUCT_TAGGING_CRUD = '/inventory/api/v1/ProductTagging/';
  public static PRODUCT_TAGGING_PRODUCT = '/inventory/api/v1/get_tagging_product_list';
  // Goods Acceptance 
  public static GOODS_ACCEPTANCE_CREATION_CRUD = '/inventory/api/v1/GoodsAcceptance/';
  // GoodsAcceptanceDetails
  public static GOODS_ACCEPTANCE_DETAILS_CREATION_CRUD = '/inventory/api/v1/GoodsAcceptanceDetails/';

  // WAREHOUSE MODEL
  //wareshousecreation
  public static WAREHOUSE_CREATION_CRUD = '/warehouse/api/v1/WareHouseCreation/';
  //storageZoneCreation
  public static STORAGE_ZONE_CRUD = '/warehouse/api/v1/StorageZoneCreation/';
  // ZoneLevel
  public static ZONE_LEVEL_CRUD = '/warehouse/api/v1/ZoneLevelCreation/';
  // Shelf Creation
  public static SHELF_CREATION_CRUD = '/warehouse/api/v1/ShelfCreation/';
  // RackToRackTransfer
  public static RACK_TO_RACK_TRANSFER_CRUD = '/warehouse/api/v1/RackToRackTransfer/';
  // ZoneToZoneTransfer
  public static ZONE_TO_ZONE_TRANSFER_CRUD = '/warehouse/api/v1/ZoneToZoneTransfer/';
  // PALLET_CREATION
  public static PALLET_CREATION_CRUD = '/warehouse/api/v1/PalletCreation/';
  // REFRIGERATION
  public static REFRIGERATION_CRUD = '/warehouse/api/v1/Refrigeration/';
  // STORAGE TYPE CREATION
  public static STORAGE_TYPE_CREATION_CRUD = '/warehouse/api/v1/StorageTypeCreation/';

  //Products from ProductTagging
  public static TAGGINGZONELIST = '/inventory/api/v1/get_tag_product_list';

  //all products from tagging list

  public static TAGGINGPRODUCTLIST = '/inventory/api/v1/get_all_product_list';

  //Batch List from ProductTagging
  public static TAGGINGBATCH = '/inventory/api/v1/get_tag_batch_list';

  // STUDY MANAGE MODEL
  // STUDY_MATERIAL_RETURN
  public static STUDY_MATERIAL_RETURN_CRUD = '/studymanage/api/v1/StudyMaterialReturn/';
  // STUDY_MATERIAL_DISTRUCTION
  public static STUDY_MATERIAL_DISTRUCTION_CRUD = '/studymanage/api/v1/StudyMaterialDestruction/';
  // STUDY_MATERIAL_DELIVERY
  public static STUDY_MATERIAL_DELIVERY_CRUD = '/studymanage/api/v1/StudyMaterialDelivery/';
  // SITE_PATIENT_DELIVERY
  public static SITE_PATIENT_DELIVERY_CRUD = '/studymanage/api/v1/SitePatientDelivery/';
  // NURSE TO PATIENT
  public static NURSE_TO_PATIENT_CRUD = '/studymanage/api/v1/NurseToPatient/';
  // SITE TO SITE
  public static SITE_TO_SITE_CRUD = '/studymanage/api/v1/SiteToSite/';
  // STUDY_MATERIAL_EXPORTED
  public static STUDY_MATERIAL_EXPORTED_CRUD = '/studymanage/api/v1/StudyMaterialExported/';
  // EXPIRE DATE CHANGE
  public static EXPIRE_DATE_CHANGE_CRUD = '/studymanage/api/v1/ExpireDateChange/';

  // PROJECT MODEL
  // PROJECT FORM
  public static PROJECT_CRUD = '/sales/api/v1/ProjectCreation/';
  // KIT_CREATION
  public static KIT_CREATION_CRUD = '/sales/api/v1/ProformaKitCreation/';
  // CMTRF
  public static CTMRF_CRUD = '/sales/api/v1/CMTRFCreation/';
  // BATCH PRODUCT TAGGING LIST 
  public static BATCH_PRODUCT_TAGGING_LIST_CRUD = '/sales/api/v1/BatchProductTaggingList'
  // FILE UPLOAD PROJECT
  public static PROJECT_FILE_UPLOAD = '/sales/api/v1/ProjectFileUpload/';

  // DASHBOARD
  // Count Project
  public static COUNT_PROJECT_CRUD = '/dashboard/api/v1/CountProject';
  // Count Warehouse
  public static COUNT_WAREHOUSE_CRUD = '/dashboard/api/v1/CountWarehouse';
  // Count Rack
  public static COUNT_RACK_CRUD = '/dashboard/api/v1/CountRack';
  // Count Shelf 
  public static COUNT_SHELF_CRUD = '/dashboard/api/v1/CountShelf';
  // Count Closed Shelf  
  public static COUNT_CLOSED_SHELF_CRUD = '/dashboard/api/v1/CountShelfClosed';

  // REPORT ENGINE
  public static REPORT_ENGINE_CRUD = '/ReportEngineMain/api/v1/ReportEngineMain/';
  // REPORT ENGINE BY ID
  public static REPORT_ENGINE_ID_CRUD = '/ReportEngineMain/api/v1/get_report';

  // Price Settings
  public static PRICE_SETTING_CRUD = '/Finance/api/v1/PriceSetting/';

  // INVOICE
  // INVOICE MAIN PAGE
  public static INVOICE_CREATION_CRUD = '/Invoice/api/v1/InvoiceCreation/';
  // BATCH NUMBER LIST
  public static BATCH_NUMBER_LIST_CRUD = '/Invoice/api/v1/BatchNumberList';
  // QUANTITY COUNT
  public static QUANTITY_COUNT_CRUD = '/Invoice/api/v1/QuantityCount';

}
