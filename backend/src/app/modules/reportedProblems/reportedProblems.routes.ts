import { UserRoles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReportedProblemsController } from './reportedProblems.controller';
import { ReportedProblemValidation } from './reportedProblems.validations';
import routeInfoMessage from '../../middlewares/routeInfoMessage';
const router = express.Router();

// ! Create New  report problem ------------------------------->>>
router.post(
  '/',
  routeInfoMessage(),
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  validateRequest(ReportedProblemValidation.createNewProblem),
  ReportedProblemsController.createNewProblem
);
// ! Get all reported problem ----------------------------------->>>
router.get('/', routeInfoMessage(), auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN), ReportedProblemsController.getAllReportedProblems);

// ! Update reported problem ----------------------------------->>>
router.patch(
  '/update/:problemReportsId',
  routeInfoMessage(),
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  validateRequest(ReportedProblemValidation.updateReportedProblem),
  ReportedProblemsController.updateReportedProblem
);

export const ReportedProblemsRoutes = router;
