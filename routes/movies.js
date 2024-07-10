import { Router } from "express";
import { MovieController } from "../controllers/movies.js";

export const createMovieRouter = ({ movieModel }) => {
    const moviesRouter = Router();

    const movieController = new MovieController({ movieModel })

    //& Todos los recursos que sean MOVIES se identifican con /movies
    moviesRouter.get('/', movieController.getAll)

    //& Filtrado por id
    moviesRouter.get('/:id', movieController.getBy)

    //& Crear una película
    moviesRouter.post('/', movieController.create)

    //& Eliminar una película
    moviesRouter.delete('/:id', movieController.delete)

    //& Modificar algun campo de una película
    moviesRouter.patch('/:id', movieController.patch)

    return moviesRouter
}