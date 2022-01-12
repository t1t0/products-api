import app from './app'
import './database'

const PORT = 5000

app.listen(PORT, () => {
    console.log(`Server listen on http://localhost:${PORT}`)
})