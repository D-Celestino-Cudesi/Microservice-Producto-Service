import { Producto } from '../models/Producto.js';
import { Categoria } from "../models/Categoria.js";
import { deleteImage, uploadImage } from "../config/cloudinary.js";
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs-extra';

export const getProducto = async (req, res) => {
    try {
        const productos = await Producto.findAll({
            include: [{
                model: Categoria,
                attributes: ['nombre'],
            }],
            attributes: ['id_producto', 'nombre', 'img', 'codigo', 'precio', 'stock', 'descripcion'],
        });
        res.json(productos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const postProducto = async (req, res) => {
    const { codigo, nombre, precio, stock, descripcion, id_categoria } = req.body;
    const id_producto = uuidv4();
    try {
        let imgURL = null;
        let ipImg = null;
        if (req.files?.img) {
            const resultado = await uploadImage(req.files.img.tempFilePath);
            imgURL = resultado.secure_url;
            ipImg = resultado.public_id;
            await fs.unlink(req.files.img.tempFilePath);
        }
        const newProducto = await Producto.create({
            codigo,
            id_producto,
            nombre,
            precio,
            stock,
            descripcion,
            id_categoria,
            img: imgURL,
            public_id: ipImg
        });
        res.json(newProducto);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
export const putProducto = async (req, res) => {
    const { id_producto } = req.params;
    const { codigo, nombre, precio, stock, descripcion, id_categoria } = req.body;
    try {
        const p = await Producto.findByPk(id_producto);
        if (!p) {
            return res.status(404).json({ message: "El producto no fue encontrado" });
        }
        if (req.files?.img) {
            if (p.img && p.public_id) {
                await deleteImage(p.public_id);
            }
            const resultado = await uploadImage(req.files.img.tempFilePath);
            p.img = resultado.secure_url;
            p.public_id = resultado.public_id;
            await fs.unlink(req.files.img.tempFilePath);
        }
        p.codigo = codigo;
        p.nombre = nombre;
        p.precio = precio;
        p.stock = stock;
        p.descripcion = descripcion;
        p.id_categoria = id_categoria;
        await p.save();
        res.json({ message: 'Producto actualizado correctamente' });
    } catch (error) {
        return res.status(500).json({ message: "Se produjo un error al actualizar el producto." });
    }
};
export const patchProducto = async (req, res) => { 
    const {id_producto} = req.params;
    const { nombre, descripcion, precio} = req.body;
    try {
        const p = await Producto.findByPk(id_producto);
        if (!p){
            return res.status(404).json({ message: "El producto no fue encontrado" });
        }
        if (nombre) {
            p.nombre = nombre;
        }
        if (descripcion) {
            p.descripcion = descripcion;
        }
        if (precio) {
            p.precio = precio;
        }
        await p.save();
        res.json(p);
    } catch (error) {
        return res.status(500).json({ message: "Se produjo un error al actualizar el producto" });
    }
};
export const deleteProducto = async (req, res) => {
    const { id_producto } = req.params;
    try {
        const p = await Producto.findByPk(id_producto);
        if (!p) {
            return res.status(404).json({ message: "El producto no fue encontrado o no se pudo eliminar." });
        }
        if (p.img && p.public_id) {
            await deleteImage(p.public_id);
        }
        await p.destroy();
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Se produjo un error al eliminar el producto", estado: 200});
    }
};