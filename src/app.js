import express from "express";
import cors from 'cors';
import morgan from "morgan";

//CARPETAS DE LAS RUTAS DEL API REST
import productoRoute from '../src/routes/producto.routes.js'
import categoriaRoute from '../src/routes/categoria.routes.js'

const app = express();
app.use(express.json());
app.use(morgan());
app.use(cors());


//RUTAS DE LAS TABLAS
app.use('/api', productoRoute);  // API PRODUCTO
app.use('/api', categoriaRoute); // API CATEGORIA

export default app;