export interface LoginForm {
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginSuccessData = {
  userId: string;
  fullName: string;
  avatarUrl: string;
  roles: string[];
  accessToken: string;
};

export type ChangePasswordDTO = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type CustomerRegisterRequest = {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  phoneNumber: string;
  gender?: number;
  dateOfBirth?: string;
};

export type CustomerRegisterResponse = {
  userId: string;
  email: string;
  fullName: string;
  roles: string[];
};

export type VerifyEmailRequest = {
  token: string;
};

export type ResendVerificationRequest = {
  email: string;
};