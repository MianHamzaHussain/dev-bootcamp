import express from "express"
import bootcampRoutes from "./routes/bootcamp.js"
import courseRoutes from "./routes/courses.js"
import connectDB from "./config/db.js";
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";
import colors from "colors"
import expressFileUpload from "express-fileupload"
import url from "url"
import path from "path"
import mongoSanitize from "express-mongo-sanitize"
import helmet from "helmet"
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import cors from "cors";
import xss from "express-xss-sanitizer"





const fileUrl=url.fileURLToPath(import.meta.url)

const dirName=path.dirname(fileUrl)



//connect db 
connectDB();

const app=express();
//body parser
app.use(express.json());
// file uload
app.use(expressFileUpload())

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

app.use(logger)


// Prevent XSS attacks
app.use(xss());

// rate limniting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);
// prevent http pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(dirName ,'public')));

app.use('/api/v1/bootcamps',bootcampRoutes)
app.use('/api/v1/courses',courseRoutes)

app.use(errorHandler)

const server=app.listen(process.env.PORT||5000,console.log(`Server running on  port ${process.env.PORT||5000}`.yellow))
process.on('unhandledRejection',(err)=>{
    console.log(`Error:${err.message}`.red.bold)
    server.close(()=>process.exit(1))
})
