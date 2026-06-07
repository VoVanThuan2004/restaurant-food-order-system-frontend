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
  password: string;
  newPassword: string;
  confirmNewPassword: string;
};
