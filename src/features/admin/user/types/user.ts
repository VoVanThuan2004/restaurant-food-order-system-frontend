export type User = {
  _id: string;
  avatar: string;
  fullName: string;
  phoneNumber: string;
  gender: number;
  roleId: string;
  roleName: string;
  isActive: boolean;
};

export type UserForm = {
  email: string;
  fullName: string;
  password: string;
  phoneNumber: string;
  gender: number;
  roleName: string;
};

export type UserUpdateDTO = {
  fullName: string;
  phoneNumber: string;
  gender: number;
  roleName: string;
}
