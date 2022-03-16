const userController = {};

userController.getUserRouteStatus = async(req,res)=>{
	return res.sendStatus(200)
}

module.exports = userController;
