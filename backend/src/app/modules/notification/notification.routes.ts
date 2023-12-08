import express from 'express';

import { NotificationController } from './notification.controllers';
import auth from '../../middlewares/auth';
import { UserRoles } from '@prisma/client';
import routeInfoMessage from '../../middlewares/routeInfoMessage';

const router = express.Router();

router.get('/', routeInfoMessage(), auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN), NotificationController.getPPNotifications);

export const NotificationRoutes = router;
