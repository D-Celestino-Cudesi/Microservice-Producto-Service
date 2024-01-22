import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { Producto } from './Producto.js'

export const Categoria = sequelize.define('categorias', {
    id_categoria: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
    {
        timestamps: true,
    });

Categoria.hasMany(Producto, {
    foreignKey: 'id_categoria',
    sourceKey: 'id_categoria',

});
Producto.belongsTo(Categoria, {
    foreignKey: 'id_categoria',
    targetId: 'id_categoria',

});