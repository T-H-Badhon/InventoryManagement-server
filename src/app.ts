import express from 'express'
import cors from 'cors'
import router from './app/routes'
import notFound from './app/middlewares/NotFound'
import globalErrorHandler from './app/middlewares/GlobalErrorHandler'

const app = express()

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Restrict allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Restrict allowed headers
    credentials: true, // Include credentials (cookies, authorization headers, etc.)
  }),
)
app.use(express.json())

app.use('/api/v1', router)

app.get('/api/v1/scanner/:id', async (req, res) => {
  try {
    const response = await fetch(
      'https://products-test-aci.onrender.com/product/' + req.params.id,
    )
    const data = await response.json()

    res.json(data)
  } catch (error) {
    res.status(500).send('Error fetching data from external API')
  }
})

app.get('/', (req, res) => {
  res.send('server is running')
})

app.use(globalErrorHandler)
app.use(notFound)
export default app
