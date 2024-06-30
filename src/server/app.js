import express from 'express'
import cors from 'cors'
import { findAll, create } from './models/likeme.models.js'

const app = express()

const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(express.json())

app.get('/posts', async (req, res) => {
  try {
    const result = await findAll()
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(error.message)
  }
})

app.post('/posts', async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body
    const result = await create(titulo, url, descripcion)
    return res.status(201).json({ message: `Post creado con exito. Datos ingresados: ${result}` })
  } catch (error) {
    res.status(400).json(error)
  }
})

app.all('*', (req, res) => {
  res.status(404).json({ status: false, message: 'NOT FOUND' })
})

app.listen(PORT, () => { console.log('Servidor Escuchando...') })

export default app
