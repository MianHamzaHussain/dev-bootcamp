import express from "express"
import bootcampRoutes from "./routes/bootcamp.js"
import courseRoutes from "./routes/course.js"
import connectDB from "./config/db.js";
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";
import colors from "colors"
import expressFileUpload from "express-fileupload"
import url from "url"
import path from "path"





const fileUrl=url.fileURLToPath(import.meta.url)

const dirName=path.dirname(fileUrl)



//connect db 
connectDB();

const app=express();
//body parser
app.use(express.json());
app.use(expressFileUpload())
app.use(logger)
app.use('/api/v1/bootcamps',bootcampRoutes)
app.use('/api/v1/courses',courseRoutes)

app.use(errorHandler)
app.use(express.static(path.join(dirName,'public')))

const server=app.listen(process.env.PORT||5000,console.log(`Server running on  port ${process.env.PORT||5000}`.yellow))
process.on('unhandledRejection',(err)=>{
    console.log(`Error:${err.message}`.red.bold)
    server.close(()=>process.exit(1))
})
