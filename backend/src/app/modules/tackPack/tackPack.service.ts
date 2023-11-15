import { TackPack } from '@prisma/client';
import { Request } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUploadFile } from '../../../interfaces/file';
import prisma from '../../../shared/prisma';
import { ICreateTackPack } from './tackPack.interface';

// !----------------------------------Create TackPack---------------------------------------->>>
const createTackPack = async (
  profileId: string,
  req: Request
): Promise<TackPack> => {
  const file = req.file as IUploadFile;

  const filePath = file?.path?.substring(8);

  if (!filePath) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Tack Pack pdf is required');
  }

  const data = req.body as ICreateTackPack;

  const isExistStyleNo = await prisma.styles.findUnique({
    where: {
      styleNo: data.styleNo,
    },
    select: {
      styleNo: true,
    },
  });
  if (!isExistStyleNo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Style No not Found !!');
  }

  const tackPackData = {
    profileId,
    tackFile: filePath,
    styleNo: data.styleNo,
    tackPackComment: data.tackPackComment,
  };

  const result = await prisma.tackPack.create({
    data: tackPackData,
  });

  return result;
};

export const TackPackService = {
  createTackPack,
};
