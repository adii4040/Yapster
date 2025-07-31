import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

import { app } from './app.js'
import { connectDb } from './DB/db.js'

const port = process.env.PORT || 8080


connectDb()
    .then(() => {
        app.on('error', (err) => {
            console.log(`Connection err ${err}`)
            throw new Error
        })
        app.listen(port, () => console.log(`⚙️ Server successfully running on port:${port}`))
    })
    .catch((err) => console.log(`Error connecting database ERROR:${err}`))


