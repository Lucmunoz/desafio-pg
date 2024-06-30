import db from '../database/db_connect.js'

export const findAll = async () => {
  try {
    const result = await db('SELECT * FROM posts;')
    return result
  } catch (error) {
    throw new Error(`Error al obtener los posts: ${error.message}`)
  }
}

export const create = async (titulo, img, descripcion) => {
  try {
    const result = await db('INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES (DEFAULT, $1, $2, $3 ,0) RETURNING *;', [titulo, img, descripcion])
    return result
  } catch (error) {
    throw new Error(`Error al crear el post: ${error.message}`)
  }
}
