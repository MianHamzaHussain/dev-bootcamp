import mongoose from "mongoose";
import slugify from "../utils/slugify.js";
import geocoder from "../utils/geoCoder.js";
const Bootcamp=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please add a name'],
        unique:true,
        trim:true,
        maxlength:[50,'Name can not be more than 50 characters']
    },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
    description:{
        type:String,
        required:[true,'Please add a description'],
        maxlength:[500,'Description can not be more than 500 characters']
    },
 website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        'Please use a valid URL with HTTP or HTTPS'
      ]
    },
    phone:{
       type: String,
        maxLength:[20,'Phone number can not be longer than 20 characters']
    
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email'
      ]
    },
    address: {
      type: String,
      required: [true, 'Please add an address']
    },
     location: {
      // GeoJSON Point
      type: {
        type: String,
        enum: ['Point']
      },
      coordinates: {
        type: [Number],
        index: '2dsphere'
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String
    },
    careers:{
        type:[String],
        enum:[
            'Web Development','Mobile Development','UI/UX','Data Science','Business','Other'
        ],
      required: [true, 'Please choose  a career']
    },
      averageRating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [10, 'Rating must can not be more than 10']
    }, 
    averageCost: Number,
    photo: {
      type: String,
      default: 'no-photo.jpg',
    },
    housing: {
      type: Boolean,
      default: false
    },
    jobAssistance: {
      type: Boolean,
      default: false
    },
    jobGuarantee: {
      type: Boolean,
      default: false
    },
    acceptGi: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
   

},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
}
)


Bootcamp.pre('remove',async function(next){
  await this.model('Course').deleteMany({bootcamp:this._id})
  next()
})  
// save slug
Bootcamp.pre('save',function(next){
    this.slug=slugify(this.name)
    next()
})
// save location base on address
Bootcamp.pre('save',async function(next){
    const loc=await geocoder.geocode(this.address)
  this.location={
    type:'Point',
    coordinates:[loc[0].longitude,loc[0].latitude],
    formattedAddress:loc[0].formattedAddress,
    street:loc[0].streetName, 
  }
  next()
})
Bootcamp.virtual('courses',{
  ref:'Course',
  localField:'_id',
  foreignField:'bootcamp',
  justOne:false
})
export default mongoose.model('Bootcamp',Bootcamp)