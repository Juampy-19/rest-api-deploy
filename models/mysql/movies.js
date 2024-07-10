import mysql from 'mysql2/promise';

const config = {
    host: 'localhost',
    user: 'root',
    password: '15963',
    database: 'moviesdb',
    port: 3306
}

const connection = await mysql.createConnection(config)

export class MovieModel {
    static async getAll ({ genre }) {
        const [movies] = await connection.query(
            'SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie;'            
        )

        //console.log(result);
        return movies;
    }

    static async getById ({ id }) {
        const [movies] = await connection.query(
            'SELECT title, year, director, duration, poster, rate, id FROM movie WHERE id = (?);', [id]
        )

        if (movies.legth === 0) return null

        return movies[0]
    }

    static async create ({ input }) {        
        const {
            genre: genreInput,
            title,
            year,
            duration,
            director,
            rate,
            poster,
        } = input

        //& insert movie
        const [uuidResult] = await connection.query('SELECT UUID() uuid;')
        const [{ uuid }] = uuidResult;
        
        try{
            await connection.query(
                'INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES (UUID_TO_BIN("{uuid}", ?, ?, ?, ?, ?, ?);',
                [title, year, director, duration, poster, rate]
            )
        } catch (e) {
            throw new Error('Error creating movie')
            // enviar la traza a un servicio interno
            // sendLog(e)
        }
        
        const [ movie ] = await connection.query(
            'SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE id = UUID_TO_BIN(?);', [uuid]
        )

        return movies[0]
    }

    static async delete ({ id }) {

    }

    static async update ({ id, input }) {

    }
}