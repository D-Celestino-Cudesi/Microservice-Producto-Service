const validarCabecera = (valorEsperado) => (req, res, next) => {
    const valorCabecera = req.headers['daniel-code'];
    if (valorCabecera === valorEsperado) {
        next();
    } else {
        res.status(403).json({ mensaje: 'Valor de cabecera incorrecto', estado: 403 });
    }
};

export default validarCabecera;