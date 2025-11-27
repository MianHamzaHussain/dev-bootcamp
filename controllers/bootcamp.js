import Bootcamp from "../models/Bootcamp.js"
import ErrorResponse from "../utils/errorResponse.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import geocoder from "../utils/geoCoder.js";



//@desc create bootcamp
//@route POST /api/v1/bootcamps
//@access private
const createBootcamp=asyncHandler(async(req,res,next)=>{

   
        const data=req.body;
        const bootcamp=await Bootcamp.create(data)
            res.status(201).json({
    data:bootcamp,
    success:true,
            }
)
    }
)



//desc get all bootcamps
//@route GET /api/v1/bootcamps
//@access public
const getBootcamps=asyncHandler(async(req,res,next)=>{
   
   

            res.status(200).json(res.advanceResults
)
    } 

)


//desc get single bootcamp
//@route GET /api/v1/bootcamps/:id
//@access public
const getBootcamp=asyncHandler(async(req,res,next)=>{

    const id=req.params.id;
        const bootcamp=await Bootcamp.findById(id)
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with id of ${id}`,404))
           
    
}
            res.status(200).json({
    data:bootcamp,
    success:true,
            }
)
    
 })


//desc update bootcamp
//@route PUT /api/v1/bootcamps/:id
//@access public
const updateBootcamp= asyncHandler(async(req,res,next)=>{
  
    const id=req.params.id;
        const bootcamp=await Bootcamp.findByIdAndUpdate(id,req.body,{
            new:true,
            runValidators:true
        })
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with id of ${id}`,404)
    )
}
            res.status(200).json({
    data:bootcamp,
    success:true,
            }
)
  
})

//desc delete bootcamp
//@route DELETE /api/v1/bootcamps/:id
//@access public
const deleteBootcamp=asyncHandler(async(req,res,next)=>{

    const id=req.params.id;
        const bootcamp=await Bootcamp.findById(id)
      
        if(!bootcamp){
            return next(new ErrorResponse(`Bootcamp not found with id of ${id}`,404)
    )}

    bootcamp.remove()

            res.status(204).json({
    
 
            }
)


})

//desc get all bootcamps
//@route GET /api/v1/bootcamps/radius/:zipcode/:distance
//@access public
const getBootcampsInRadius=asyncHandler(async(req,res,next)=>{
    const {zipcode,distance}=req.params;
    // Get lat/lng from geocoder
const loc = await geocoder.geocode(zipcode);
const lat = loc[0].latitude;
const lng = loc[0].longitude;

// Calc radius using radians
// Divide dist by radius of Earth
// Earth Radius = 3,963 mi / 6,378 km
const radius = distance / 3963;

const bootcamps = await Bootcamp. find({

    location: {$geoWithin: { $centerSphere: [[lng, lat], radius] } }
})
    res.status(200).json({
    data:bootcamps,
    success:true,
            })
});

export {createBootcamp,getBootcamps,getBootcamp,updateBootcamp,deleteBootcamp,getBootcampsInRadius}