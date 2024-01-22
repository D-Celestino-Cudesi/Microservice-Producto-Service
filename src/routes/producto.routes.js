import { Router } from 'express';
import fileUpload from "express-fileupload"
import validarCabecera from '../middlewares/validarCabecera.js';
import { getProducto, postProducto, putProducto, patchProducto, deleteProducto } from '../controllers/producto.controller.js';
const router = new Router();

router.get('/productos', validarCabecera('autorisarIngreso'), getProducto);
router.post('/producto', validarCabecera('autorisarIngreso'), fileUpload({
    useTempFiles: true,
}), postProducto);
router.put('/producto/:id_producto', validarCabecera('autorisarIngreso'), fileUpload({
    useTempFiles: true,
}), putProducto);
router.patch('/producto/:id_producto', validarCabecera('autorisarIngreso'), patchProducto);
router.delete('/producto/:id_producto', validarCabecera('autorisarIngreso'), deleteProducto);

export default router;