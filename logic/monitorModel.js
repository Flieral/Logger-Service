var utility			= require('../logic/utility')
var redisClient		= require('../redis_client/redisClient')
var configuration 	= require('../config/configuration.json');

module.exports = function(userToken, accountHashID, monitorHashID, callback)
{
	var destTable = configuration.TableMAMonitorModel + monitorHashID
	var res = redisClient.hashModel.getModel(userToken, destTable)
	if (res !== null && typeof res === 'error')
		callback(res, null)
	else
		callback(null, res)
}