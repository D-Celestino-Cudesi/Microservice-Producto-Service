import {Categoria} from '../models/Categoria.js';
import { v4 as uuidv4 } from 'uuid';

export const getCategoria = async (req, res) => {
    try {
        const c = await Categoria.findAll({
            attributes: ['id_categoria', 'nombre', 'updatedAt', 'createdAt'],
        });
        res.json(c);
    } catch (error) {
        res.status(500).json({message: error.nessage});
    }
};
export const postCategoria = async (req, res) => {
    const {nombre} = req.body;
    const id_categoria = uuidv4();
    try {
        const newC = await Categoria.create({
            nombre, 
            id_categoria});
        res.json(newC); 
    } catch (error) {
        res.status(500).json({message: error.nessage});
    } 
};
export const putCategoria = async (req, res) => {
    try {
        const {id_categoria} = req.params;
        const {nombre} = req.body;
        const c = await Categoria.findByPk(id_categoria);
        c.nombre = nombre;
        await c.save();
        res.json(c);
    } catch (error) {
        return res.status(500).json({message: error.nessage});
    }
};
export const patchCategoria = async (req, res) => {};
export const deleteCategoria = async (req, res) => {
    const { id_categoria } = req.params;
    try {
        const deleteRows = await Categoria.destroy({
            where: {
                id_categoria: id_categoria,
            }
        });
        if (deleteRows === 0) {
            return res.status(404).json({ message: "La categoria no fue encontrada o no se puede eliminar" });
        }
        res.json({message: 'categoria eliminado correctamente'});
    } catch (error) {
        return res.status(500).json({ message: "Se produjo un error al eliminar la categoria." });
    }
};