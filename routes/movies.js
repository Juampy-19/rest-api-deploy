import { Router } from "express";
import { MovieController } from "../controllers/movies.js";

export const moviesRouter = Router();

//& Todos los recursos que sean MOVIES se identifican con /movies
moviesRouter.get('/', MovieController.getAll)

//& Filtrado por id
moviesRouter.get('/:id', MovieController.getBy)

//& Crear una película
moviesRouter.post('/', MovieController.create)

//& Eliminar una película
moviesRouter.delete('/:id', MovieController.delete)

//& Modificar algun campo de una película
moviesRouter.patch('/:id', MovieController.patch)