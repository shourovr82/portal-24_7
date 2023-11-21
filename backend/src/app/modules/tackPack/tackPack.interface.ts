// modules
export type ICreateTackPack = {
  styleNo: string;
  tackPackComment: string;
  tackFile: string;
};
export type IUpdateTackPack = {
  tackPackComment: string;
  tackFile?: string;
};
