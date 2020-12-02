export class UserPermission {
  grantedDomain: string;
  operationCode: string;
  resourceCode: string;
  defaultDomain: number;
}

export class UserMenu {
  name: string;
  code: string;
  url: string;
  reourceKey: string;
  sortOrder: string;
  sysMenuId: string;
}

export class UserToken {
  access_token: string;
  email: string;
  userCode: string;
  expires_in: number;
  fullName: string;
  userName: string;
  mobileNumber: string;
  userId: number;
  loginTime: number;
  tokenExpiresIn: number;
  roleId: number;
  role: string;
  roleName: string;
  userPermissionList: UserPermission[];
  lstRoleCode: String[];
  // userMenuList: UserMenu[];
  userInfo: any;
}
