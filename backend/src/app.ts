import "reflect-metadata"
import express, { Request, Response } from 'express'
import dotenv from "dotenv"
import cors from "cors"
import { container } from 'tsyringe'
import { connectDB } from './config/db.connection'
import { router } from './routes'
import { ErrorMiddleware } from './middlewares/error.middleware'
import { Scheduler } from "./schedulers/index.scheduler"

dotenv.config()
const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(cors())
app.use("/api", router)
app.use(ErrorMiddleware.notFound)
app.use(ErrorMiddleware.handleError)

connectDB().then(() => {
    const scheduler = container.resolve(Scheduler)
    scheduler.start()

    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}/api`)
    })
})

export default app