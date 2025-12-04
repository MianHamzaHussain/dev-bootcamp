import express from "express"
import connectDB from "./config/db.js";
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";
import colors from "colors"
import fileUpload from "express-fileupload"
import url from "url"
import path from "path"
import mongoSanitize from "express-mongo-sanitize"
import helmet from "helmet"
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import cors from "cors";
import xss from "express-xss-sanitizer"

// Route files
import bootcamps from './routes/bootcamps.js';
import courses from './routes/courses.js';  
import auth from './routes/auth.js';
import users from './routes/users.js';
import reviews from './routes/reviews.js';





const fileUrl=url.fileURLToPath(import.meta.url)

const dirName=path.dirname(fileUrl)


// Connect to database
connectDB();





const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(logger());
}

// File uploading
app.use(fileUpload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(dirName, 'public')));

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/reviews', reviews);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  // server.close(() => process.exit(1));
});
