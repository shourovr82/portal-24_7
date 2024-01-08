import { z } from 'zod';
import { ZodIssueNames, ZodIssueStatus } from './reportedProblems.constants';

const createNewProblem = z.object({
  body: z
    .object({
      issueName: z.enum([...ZodIssueNames] as [string, ...string[]], {
        required_error: 'Issue Name is Required',
        invalid_type_error: 'Issue Name must be in string'
      }),
      emailAddress: z.string({
        required_error: 'emailAddress is required',
        invalid_type_error: 'emailAddress must be in String'
      }),
      description: z.string({
        required_error: 'description is required',
        invalid_type_error: 'description must be in String'
      })
    })
    .refine(data => {
      const keys = Object.keys(data);
      if (keys.length === 0) {
        throw new Error('All Required Data must be provided in the request body');
      }
      return true;
    })
});

const updateReportedProblem = z.object({
  body: z
    .object({
      problemStatus: z.enum([...ZodIssueStatus] as [string, ...string[]], {
        required_error: 'problemStatus is Required',
        invalid_type_error: 'problemStatus must be in string'
      })
    })
    .refine(data => {
      const keys = Object.keys(data);
      if (keys.length === 0) {
        throw new Error('All Required Data must be provided in the request body');
      }
      return true;
    })
});

export const ReportedProblemValidation = {
  createNewProblem,
  updateReportedProblem
};
