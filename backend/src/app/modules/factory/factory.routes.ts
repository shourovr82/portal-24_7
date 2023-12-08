import { UserRoles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { FactoryController } from './factory.controller';
import { FactoryValidation } from './factory.validations';
import routeInfoMessage from '../../middlewares/routeInfoMessage';

const router = express.Router();

// ! Get all factory----------------------------------->>>
router.get('/', routeInfoMessage(), auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN), FactoryController.getAllFactories);
// ! Create New  factory ------------------------------->>>
router.post(
  '/create-factory',
  validateRequest(FactoryValidation.createFactory),
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FactoryController.createNewFactory
);
// ! Get all factory----------------------------------->>>
router.get(
  '/get-all-factory-names',
  routeInfoMessage(),
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FactoryController.getAllFactoryName
);

// ! Get all Orders Length----------------------------------->>>
router.get('/count', routeInfoMessage(), auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN), FactoryController.getAllFactoriesLength);

// ! Get Single factory----------------------------------->>>
router.get('/:factoryId', routeInfoMessage(), auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN), FactoryController.getSingleFactory);
// ! Update factory----------------------------------->>>
router.patch(
  '/update-factory/:factoryId',
  routeInfoMessage(),
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  validateRequest(FactoryValidation.updateFactory),
  FactoryController.updateFactoryInformation
);

export const FactoryRoutes = router;
