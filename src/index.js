import app from "./app.js";
import { sequelize } from "./database/database.js";

import './models/Producto.js'
import './models/Categoria.js'

async function main() {
    await sequelize.sync({ alter: false });
    app.listen(3000);
    console.log("Server on port 3000");
}

main();