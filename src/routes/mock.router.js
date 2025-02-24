import { Router} from 'express';
import mockingController from '../controllers/mocking.controller.js';


const router = Router();

router.get('/mockingpets', mockingController.getPetMocking)

router.get('/mockingusers', mockingController.getUserMocking)
router.post('/generatedata', mockingController.generateData)

export default router;