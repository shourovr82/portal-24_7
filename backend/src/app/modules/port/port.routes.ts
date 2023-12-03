import { UserRoles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { PortController } from './port.controller';
import { PortValidation } from './port.validations';
import routeInfoMessage from '../../middlewares/routeInfoMessage';

const router = express.Router();

// ! Create New  Port ------------------------------->>>
router.post(
  '/',
  routeInfoMessage(),
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  validateRequest(PortValidation.createPort),
  PortController.createNewPort
);
// ! Get all Port----------------------------------->>>
router.get('/', routeInfoMessage(), auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN), PortController.getAllPorts);
// ! Get all Port Names----------------------------------->>>
router.get('/get-all-port-names', routeInfoMessage(), auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN), PortController.getAllPortNames);

// ! Get Single Port----------------------------------->>>
router.get('/single/:portId', routeInfoMessage(), auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN), PortController.getSinglePort);
// ! Update Port----------------------------------->>>
router.patch(
  '/update/:portId',
  routeInfoMessage(),
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  validateRequest(PortValidation.updatePort),
  PortController.updatePortInformation
);

export const PortRoutes = router;
