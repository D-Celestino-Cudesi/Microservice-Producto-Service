import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Producto = sequelize.define('productos', {
    id_producto: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    precio: {
        type: DataTypes.DOUBLE(11, 2),
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    img: {
        type: DataTypes.STRING,
    },
    public_id: {
        type: DataTypes.STRING,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        timestamps: true,
    });


