import { Router } from 'express';
import { sendEmail} from '../controllers/emailController.js';
import validarCabecera from '../middlewares/validarCabecera.js';
const router = new Router();

router.post('/send', validarCabecera('autorisarIngreso'), sendEmail);

export default router;
