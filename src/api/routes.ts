import JsonWebToken from './middlewares/JsonWebToken';

import { Router } from "express";

import { store, list } from './controllers/TodoController';
import { storeValidation } from './validations/Todo';

const router = Router();

router.use('/sample-platform', JsonWebToken);
router.post('/sample-platform/store', storeValidation, store);
router.get('/sample-platform/list', list);

export default router;