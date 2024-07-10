import express, { json } from 'express';
import { createMovieRouter } from './routes/movies.js';
import { corsMiddleware } from './middlewares/cors.js';

//# En el futuro: el import del json será así:
//import movies from './movies.json' with { type: 'json' }

//# Como leer un json en ESModules
//import fs from 'node:fs';
//const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

//# Como leer un json en ESModules (recomendado)
// import { createRequire } from 'node:module';
// const require = createRequire(import.meta.url)
// const movies = require('./movies.json')

export const createApp = ({ movieModel }) => {
    const app = express();
    
    app.use(json());
    app.use(corsMiddleware());
    app.disable('x-powered-by');
    
    // app.get('/', (req, res) => {
    //     res.json({ message: 'Hola mundo'})
    // })
    
    app.use('/movies', createMovieRouter({ movieModel }));
    
    const PORT = process.env.PORT ?? 1234;
    
    app.listen(PORT, () => {
        console.log(`server listening on port http://localhost:${PORT}`);
    })
}