const userController = {};
const UserCreator = require('./class/user_creator')
userController.getUserRouteStatus = async(req,res)=>{
	return res.sendStatus(200)
}

userController.createUser = async (req,res)=>{
	try{
		await UserCreator.create(req.body)
		return res.sendStatus(201)
	}catch(err){
		return res.sendStatus(400)
	}
}
module.exports = userController;
