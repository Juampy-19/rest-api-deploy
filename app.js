const express = require('express');
const crypto = require('node:crypto');
const movies = require('./movies.json');
const { validateMovie, validationPartialMovie } = require('./schemas/movies');

const app = express();

app.use(express.json())
app.disable('x-powered-by');

app.get('/', (req, res) => {
    res.json({ message: 'Hola mundo'})
})

//& Todos los recursos que sean MOVIES se identifican con /movies
app.get('/movies', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*') // para arreglar los CORS

    const { genre } = req.query
    if (genre) {
        const filteredMovies = movies.filter(
            //movie => movie.genre.includes(genre) // asi detecta el genero bien escrito
            movie => movie.genre.some(g => g.toLowerCase() === genre.toLocaleLowerCase()) // asi detecta aunque se escriba en minuscula o mayuscula
        )
        return res.json(filteredMovies)
    }
    res.json(movies)
})

//& Filtrado por id
app.get('/movies/:id', (req, res) => { //path-to-regexp
    const { id } = req.params
    const movie = movies.find(movie => movie.id === id)
    if (movie) return res.json(movie)

    res.status(404).json({ message: 'Movie not found' })
})

//& Crear una película
app.post('/movies', (req, res) => {    
    const result = validateMovie(req.body)   
    
    if (result.error) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    }

    movies.push(newMovie)

    res.status(201).json(newMovie)
})

//& Modificar algun campo de una película
app.patch('/movies/:id', (req, res) => {
    const result = validationPartialMovie(req.body);
    
    if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message)})
    }

    const { id } = req.params;
    const movieIndex = movies.findIndex(movie => movie.id === id);

    if (movieIndex === -1) {
        return res.status(404).json({ message: 'Movie not found' })
    }

    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }

    movies[movieIndex] = updateMovie

    return res.json(updateMovie)

})

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`);
})