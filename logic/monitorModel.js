var utility			= require('../logic/utility')
var redisClient		= require('../redis_client/redisClient')
var configuration 	= require('../config/configuration.json');

module.exports = function(userToken, accountHashID, monitorHashID, callback)
{
	/* Get a Hash Model from MonitorModel:MonitorHashID */
	var destTable = configuration.TableMAMonitorModel + monitorHashID
	redisClient.hashModel.getModel(userToken, destTable, function(error, result){ callback(error, result)})
}