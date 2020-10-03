const errHandler = (err , req , res , next ) => {

res.status(err.status || 500).json({message : "failed !" , error : err.message})

}

export = errHandler ;