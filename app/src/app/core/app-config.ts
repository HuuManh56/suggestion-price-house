export const CONFIG: any = {
  // TODO: khai báo path để tạo ra URL
  API_PATH: {
    /********************OAUTH SERVICE*****************/
    restUtt: "/rest",
    /********************File SYSTEM****************/
    fileStorage: "/file",
    /********************UTT ESS SYSTEM*****************/
    user: "/utt-ess/users",
    person: "/department-manager/person",
    
    departments: "/department-manager/department",

    bill: "/bill/bill-service-type",
    billWaterElectric: "/bill/bill-water-electrict",
    billOrther:"/bill/bill-orther",
    departmentss: "/departments",
    positions: "/positions",
    employees: "/employees",
    statistical: "/statistical",
    statisticalPerson :"/statistical-person",
    report: "/report"
  }
};

export const DEFAULT_MODAL_OPTIONS: any = {
  size: "lg",
  backdrop: "static"
};
export const SMALL_MODAL_OPTIONS: any = {
  size: "md",
  keyboard: true
};
export const MEDIUM_MODAL_OPTIONS: any = {
  size: "md",
  keyboard: true,
  draggable: true
};
export const LARGE_MODAL_OPTIONS: any = {
  size: "lg",
  backdrop: "static",
  windowClass: "modal-xxl",
  keyboard: false
};
export const PERMISSION_CODE: any = {
  // action tac dong
  "action.view": "VIEW",
  "action.insert": "INSERT",
  "action.update": "UPDATE",
  "action.delete": "DELETE",
  "action.import": "IMPORT",
  "action.export": "EXPORT",

  "resource.familyRelationship": "FAMILY_RELATIONSHIP",
  "resource.financial": "FINANCIAL"
};

export const APP_CONSTANTS = {
  SYS_CAT_TYPE_CODE: {
    YEARS: "YEARS",
    SEMESTER: "HK",
    COURSE: "K",
    CRITERION_LEVEL: "CRITERION_LEVEL"
  }
} as any;
export enum ACTION_FORM {
  SEARCH = "SEARCH",
  INSERT = "INSERT",
  UPDATE = "UPDATE",
  IMPORT = "IMPORT",
  VIEW = "VIEW",
  DELETE = "DELETE",
  CONFIG = "CONFIG",
  CRITERION_UPDATE = "CRITERION_UPDATE",
  CRITERION_CHILD_UPDATE = "CRITERION_CHILD_UPDATE"
}
export enum RESOURCE {
  SYS_PROPERTY = "SYS_PROPERTY",
  SYS_CAT = "SYS_CAT",
  SYS_CAT_TYPE = "SYS_CAT_TYPE",
  SYS_CAT_CHILD = "SYS_CAT_CHILD",
  CRITERION = "CRITERION",
  EVALUATE = "EVALUATE",
  STUDENT_EVALUATE = "STUDENT_EVALUATE",
  STUDENTS = "STUDENTS",
  COMMENTARY = "COMMENTARY",
  AVERAGE_SCORE = "AVERAGE_SCORE",
  USER = "USER",
  USER_INFO = "USER_INFO",
  BILL = "BILL"
}
