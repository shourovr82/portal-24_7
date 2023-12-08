import { UserRoles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { PPSubmissionController } from './ppSubmission.controller';
import { PPSubmissionValidation } from './ppSubmission.validations';
import routeInfoMessage from '../../middlewares/routeInfoMessage';

const router = express.Router();

// ! Create New  PPSubmission ------------------------------->>>
router.post(
  '/submission-date',
  routeInfoMessage(),
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  validateRequest(PPSubmissionValidation.createPPSubmission),
  PPSubmissionController.createNewPPSubmission
);

// ! Update PPSubmission----------------------------------->>>
router.post(
  '/submit-pp-date',
  routeInfoMessage(),
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  validateRequest(PPSubmissionValidation.updatePPSubmission),
  PPSubmissionController.updatePPSubmissionInformation
);

export const PPSubmissionRoutes = router;
