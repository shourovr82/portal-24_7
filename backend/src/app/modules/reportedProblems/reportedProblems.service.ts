/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, ProblemReports } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { issueSearchableFields } from './reportedProblems.constants';
import { IIssueCreateRequest, IIssueFilterRequest, IIssueUpdateRequest } from './reportedProblems.interface';

// modules

// !----------------------------------Create New Problem---------------------------------------->>>
const createNewProblem = async (data: IIssueCreateRequest): Promise<ProblemReports> => {
  const issueDetails = {
    issueName: data?.issueName,
    emailAddress: data?.emailAddress,
    description: data?.description
  };

  const result = await prisma.problemReports.create({
    data: issueDetails
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Problem creation failed');
  }

  return result;
};
// !----------------------------------get all Reported Problems ---------------------------------------->>>
const getAllReportedProblems = async (filters: IIssueFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<ProblemReports[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.ProblemReportsWhereInput[] = [];

  // Add search term condition if provided
  if (searchTerm) {
    andConditions.push({
      OR: issueSearchableFields.map((field: any) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive'
        }
      }))
    });
  }

  // Add filterData conditions if filterData is provided
  if (Object.keys(filterData).length > 0) {
    const filterConditions = Object.keys(filterData).map(key => {
      return {
        [key]: {
          equals: (filterData as any)[key]
        }
      };
    });
    andConditions.push({ AND: filterConditions });
  }

  // Create a whereConditions object with AND conditions
  const whereConditions: Prisma.ProblemReportsWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve orders with filtering and pagination
  const result = await prisma.problemReports.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: 'desc' }
  });

  // Count total matching orders for pagination
  const total = await prisma.problemReports.count({
    where: whereConditions
  });

  // Calculate total pages
  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage
    },
    data: result
  };
};

// !----------------------------------Update Problem---------------------------------------->>>
const updateReportedProblemInformation = async (problemReportsId: string, payload: IIssueUpdateRequest): Promise<ProblemReports> => {
  const result = await prisma.$transaction(async transactionClient => {
    const existingProblem = await transactionClient.problemReports.findUnique({
      where: {
        problemReportsId
      }
    });

    if (!existingProblem) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Reported Problem Not Found!!');
    }

    const updatedIssueDetails = {
      problemStatus: payload.problemStatus
    };

    const result = await transactionClient.problemReports.update({
      where: {
        problemReportsId
      },
      data: updatedIssueDetails
    });

    return result;
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update Reported Problem Status');
  }

  return result;
};

export const ReportedProblemService = {
  createNewProblem,
  getAllReportedProblems,
  updateReportedProblemInformation
};
