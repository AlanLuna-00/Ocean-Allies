const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const typeRoute = require('./typeRoute');
const pokemonsRoute = require('./pokemonsRoute');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/type', typeRoute);
router.use('/pokemon', pokemonsRoute);

module.exports = router;
