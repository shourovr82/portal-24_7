// modules
export type ICreateTackPack = {
  styleNo: string;
  tackPackComment: string;
  oldFilePath?: string;
};
export type IUpdateTackPack = {
  tackPackComment: string;
  tackFile?: string;
};
