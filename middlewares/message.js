module.exports.errorMessage = (res,message)=>{
    return res.status(400).json({status:false,message:`${message}`});
}

module.exports.succesMessage = (res,message)=>{
    return res.status(200).json({status:true,message:message})
}