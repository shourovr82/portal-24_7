import { UserRoles } from '@prisma/client';
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ItemController } from './item.controller';
import { ItemValidation } from './item.validations';
import routeInfoMessage from '../../middlewares/routeInfoMessage';

const router = express.Router();

// ! Create New  item ------------------------------->>>
router.post(
  '/',
  routeInfoMessage(),
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  validateRequest(ItemValidation.createItem),
  ItemController.createNewItem
);
// ! Get all item----------------------------------->>>
router.get('/', routeInfoMessage(), auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN), ItemController.getAllItems);
// ! Get all item Names----------------------------------->>>
router.get('/get-all-item-names', auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN), ItemController.getAllItemNames);

// ! Get Single item----------------------------------->>>
router.get('/:itemId', routeInfoMessage(), auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN), ItemController.getSingleItem);
// ! Update item----------------------------------->>>
router.post(
  '/update/:itemId',
  routeInfoMessage(),
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  validateRequest(ItemValidation.updateItem),
  ItemController.updateItemInformation
);

export const ItemRoutes = router;
