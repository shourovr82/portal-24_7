import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { issueFilterableFields } from './reportedProblems.constants';
import { ReportedProblemService } from './reportedProblems.service';

// !----------------------------------Create New Problem ---------------------------------------->>>
const createNewProblem = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await ReportedProblemService.createNewProblem(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reported a problem to Admin successfully',
    data: result
  });
});
// !----------------------------------get all Reported Problem---------------------------------------->>>
const getAllReportedProblems = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, issueFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await ReportedProblemService.getAllReportedProblems(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reported Problem retrieved successfully',
    meta: result.meta,
    data: result.data
  });
});

// !----------------------------------Update Reported Problem ---------------------------------------->>>
const updateReportedProblem = catchAsync(async (req: Request, res: Response) => {
  const { problemReportsId } = req.params;
  const payload = req.body;
  const result = await ReportedProblemService.updateReportedProblemInformation(problemReportsId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reported Problem Updated successfully!!!!',
    data: result
  });
});

export const ReportedProblemsController = {
  createNewProblem,
  getAllReportedProblems,
  updateReportedProblem
};
