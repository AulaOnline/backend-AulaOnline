import express from 'express'
import cors from 'cors'
import loginController from './controlers/loginController';
const PORT = process.env.PORT || 3000
const HOSTNAME = process.env.HOSTNAME || 'http://localhost'
const app = express()

app.get('/', (req, res) => {
    res.send('Bem-vindo!')
})

app.use(cors({
    origin: ['http://localhost:3000']
}))
app.use('/login', loginController)

app.use((req, res) => {
    res.status(404)
})

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso ${HOSTNAME}:${PORT}`)
})