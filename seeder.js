import mongoose from "mongoose";
import Bootcamp from "./models/Bootcamp.js";
import colors from "colors"
import url from "url"
import path from "path"
import fs from "fs/promises"
import Course from "./models/Course.js";
  

const fileName=url.fileURLToPath(import.meta.url)
const dirName=path.dirname(fileName)

const main=async()=>{
await mongoose.connect('mongodb://127.0.0.1:27017/devcamper',{
       
    })

}
main()


const importBootcamp=async()=>{
    try {
        console.log('test',dirName)
        const data=await fs.readFile(path.join(dirName,'_data/bootcamps.json'),'utf8')
         const coursesData=await fs.readFile(path.join(dirName,'_data/courses.json'),'utf8')
        const bootcamps=JSON.parse(data)
        const courses=JSON.parse(coursesData)
        await Bootcamp.create(bootcamps)
          await Course.create(courses)
         console.log(data)
         process.exit()
        
    } catch (error) {
        console.log(error)
    
    }
}

const destroyBootcamp=async()=>{
    try {
      
        await Bootcamp.deleteMany()
        await Course.deleteMany()
         process.exit()
        
    } catch (error) {
        console.log(error)
    
    }
}

if (process.argv[2]==='-i'){
    importBootcamp()
 
}


if (process.argv[2]==='-d'){
    destroyBootcamp()
 

 
}