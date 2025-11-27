import express from "express"
import bootcampRoutes from "./routes/bootcamp.js"
import courseRoutes from "./routes/course.js"
import connectDB from "./config/db.js";
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";
import colors from "colors"




//connect db 
connectDB();

const app=express();
//body parser
app.use(express.json());
app.use(logger)
app.use('/api/v1/bootcamps',bootcampRoutes)
app.use('/api/v1/courses',courseRoutes)

app.use(errorHandler)
const server=app.listen(process.env.PORT||5000,console.log(`Server running on  port ${process.env.PORT||5000}`.yellow))
process.on('unhandledRejection',(err)=>{
    console.log(`Error:${err.message}`.red.bold)
    server.close(()=>process.exit(1))
})
