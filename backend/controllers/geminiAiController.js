// const gemini = require('../gemini/gemini');

// const getResult=async (req,res)=>{
// try{
//     const {prompt}=req.query;
//     const result=await gemini.generate(prompt)
//     res.send(result);
//     console.log(result);
// }
// catch(err){
//     res.status(500).send({message:err.message})
// }
// }

// module.exports={getResult}