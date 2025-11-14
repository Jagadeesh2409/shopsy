const db = require('../db/db')

const upload = async(req,res)=>{

    const type = req.body.type
    const path = req.file.path
    const userId = req.user.id
  
   const [id] = await db('uploads').insert({type,image_url:path})
   const exist = await db('users').where({id:userId}).first()

   if(exist.profileId!=null){
    await db('uploads').where({id:exist.profileId}).del()
   }
   await db('users').update({profileId:id}).where({id:userId})

   return res.status(200).json({message:"success"})
}

module.exports = upload