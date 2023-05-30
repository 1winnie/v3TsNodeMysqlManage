interface AdminObjItf{
    username?:string,
    nickName?:string,
    email?:string,
    password?:string,
    note?:string,
    status?:number,
    id?:number
}
interface AdminRoleFormData {
    userRoles: RoleObjItf[];
    roleLists: RoleObjItf[];
    adminId: number;
  }