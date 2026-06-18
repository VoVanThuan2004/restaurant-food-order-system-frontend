import type { RoleOptionResponse } from "./role.type";

export type User = {
  userId: string;
  fullName: string;
  roleName: string;
  avatar?: string;
};

export type UserStore = {
  userId: string;
  fullName: string;
  roles: string[];
  avatar: string;
}

export type UserProfileResponse = {
  userId: string;
  fullName: string;
  gender: number;
  dateOfBirth: string;
  phoneNumber: string;
  avatarUrl: string;
  roles: string[];
};

export type UserResponse = {
  userId: string;
  email: string;
  fullName: string;
  gender: number;
  dateOfBirth: string;
  phoneNumber: string;
  avatarUrl: string;
  roles: RoleOptionResponse[];
  active: boolean;
};

export type UserRequest = {
  email: string;
  fullName: string;
  gender: number;
  dateOfBirth: string;
  phoneNumber: string;
  roleIds: string[];
};
