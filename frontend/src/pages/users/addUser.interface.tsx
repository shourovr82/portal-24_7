import { FileType } from "rsuite/esm/Uploader";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Inputs = {
  firstName: string;
  lastName: string;
  profileImage: FileType | undefined;
  email: string;
  password: string;
  role: string | null;
  userStatus?: string | null;
};
export type ILogin = {
  email: string;
  password: string;
};
export type IStatusChange = {
  problemStatus: string;
};
export type IAddReportToAdmin = {
  issueName: string;
  emailAddress: string;
  description: string;
};

export type IUser = {
  user: any;
  name?: string;
  email?: string;
  _id?: string;
  image?: string;
  accessToken?: string;
};
export enum IUserRoles {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPERADMIN = "SUPERADMIN",
}

export type IUserDetails = {
  userId: string;
  role: IUserRoles;
  profileId: string;
  email: string;
  profileImage: string;
  firstName: string;
  lastName: string;
  iat: number;
  exp: number;
};

export type RootState = {
  auth: IUser | null | undefined;
};
