const www = require('src/app');
const config = require('config');
const {port,host} = config.get("cps.serverConfig")
www.listen(port, host, ()=>{
	console.log(`server start on ${host}:${port}`);
});
