import { Router } from 'express';
import validarCabecera from '../middlewares/validarCabecera.js';
import { getCategoria, postCategoria, putCategoria, patchCategoria, deleteCategoria } from '../controllers/categoria.controller.js';
const router = new Router();

router.get('/categorias', validarCabecera('autorisarIngreso'), getCategoria);
router.post('/categoria', validarCabecera('autorisarIngreso'), postCategoria);
router.put('/categoria/:id_categoria', validarCabecera('autorisarIngreso'), putCategoria);
router.patch('/categoria/:id_categoria', validarCabecera('autorisarIngreso'), patchCategoria);
router.delete('/categoria/:id_categoria', validarCabecera('autorisarIngreso'), deleteCategoria);

export default router;