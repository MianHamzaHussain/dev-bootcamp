const advanceResults=(model,populate)=>async(req,res,next)=>{
{
   let query
   // coopying query
   let reqQuery={...req.query}
//non query fields 
   const nonQueryFields=['select','sort']
   nonQueryFields.forEach((f)=> delete reqQuery[f])
 
    let queryStr=JSON.stringify(reqQuery);

    // adding $ for lt gt etc
    queryStr=queryStr.replace(/\b(lt|gt|lte|gte|in)\b/g,(match)=>`$${match}`)
   
    query=  model.find(JSON.parse(queryStr))


     // if select is passed
       if (req?.query?.select){

    const fields=req?.query?.select?.split(',').join(' ')
    query=query.select(fields)
         
   }

   // if sort pass else sort on createdAt
    if (req?.query?.sort){

    const sortBy=req?.query?.sort?.split(',').join(' ')
    query=query.sort(sortBy)
         
   }
   else{
    query=query.sort('-createdAt')
   }
   // if populate is passed
   if (populate){
    query=query.populate(populate)
   }
 

   const page=parseInt(req.query.page,10)||1
   const limit=parseInt(req.query.limit,10)||1
   const startIndex=(page-1)*limit
   const endIndex=page*limit
   const total=await model.countDocuments()
   query=query.skip(startIndex).limit(limit)
    
   const pagination={}
   if (endIndex<total){
    pagination.next={
        page:page+1,
        limit
    }
   }
   if (startIndex>0){
    pagination.prev={
        page:page-1,
        limit
    }
   }

   const results=await query
   
 res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results
  };

  next();

    }


}

export default advanceResults;