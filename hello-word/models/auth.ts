export type LoginFields = {
  email: string;
  password: string;
};

export type RegisterFields = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type VerifyEmailFields = {
  code: string;
};
