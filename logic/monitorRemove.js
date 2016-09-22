var utility			= require('../logic/utility')
var redisClient		= require('../redis_client/redisClient')
var configuration 	= require('../config/configuration.json');

module.exports = function(userToken, accountHashID, monitorHashID, callback)
{
	var tableName
	var errorCheck

	/* Remove from MonitorModel:MonitorHashID */
	tableName 	= configuration.TableMAMonitorModel + monitorHashID
	redisClient.hashModel.deleteModel(userToken, tableName, function(error, result){})

	/* Remove from AccountModel:MonitorModel:AccountHashID */
	tableName 	= configuration.TableMSAccountModelMonitorModel + accountHashID
	redisClient.zSetModel.deleteKeyModel(userToken, tableName, monitorHashID, function(error, result){})

	/* Remove from MonitorModel:StatusCodeType1:AccountHashID */
	for (var i = 0; i < Object.keys(configuration.TableMonitorModel.StatusCode).length; i++)
	{

		tableName 	= configuration.TableMonitorModel.StatusCode[Object.keys(configuration.TableMonitorModel.StatusCode)[i]] + accountHashID
		redisClient.zSetModel.deleteKeyModel(userToken, tableName, monitorHashID, function(error, result){})
	}

	/* Remove from MonitorModel:ActionType1:AccountHashID */
	for (var i = 0; i < Object.keys(configuration.TableMonitorModel.Action).length; i++)
	{
		tableName 	= configuration.TableMonitorModel.Action[Object.keys(configuration.TableMonitorModel.Action)[i]] + accountHashID
		redisClient.zSetModel.deleteKeyModel(userToken, tableName, monitorHashID, function(error, result){})
	}

	/* Remove from MonitorModel:ServiceCallerType1:AccountHashID */
	for (var i = 0; i < Object.keys(configuration.TableMonitorModel.ServiceCaller).length; i++)
	{
		tableName 	= configuration.TableMonitorModel.ServiceCaller[Object.keys(configuration.TableMonitorModel.ServiceCaller)[i]] + accountHashID
		redisClient.zSetModel.deleteKeyModel(userToken, tableName, monitorHashID, function(error, result){})
	}

	/* Remove from MonitorModel:ModuleCallerType1:AccountHashID */
	for (var i = 0; i < Object.keys(configuration.TableMonitorModel.ModuleCaller).length; i++)
	{
		tableName 	= configuration.TableMonitorModel.ModuleCaller[Object.keys(configuration.TableMonitorModel.ModuleCaller)[i]] + accountHashID
		redisClient.zSetModel.deleteKeyModel(userToken, tableName, monitorHashID, function(error, result){})
	}

	/* Remove from MonitorModel: */
	tableName 	= configuration.TableMLMonitorModel
	redisClient.zSetModel.deleteKeyModel(userToken, tableName, monitorHashID, function(error, result){})

	/* Remove from MonitorModel:StatusCodeType1: */
	for (var i = 0; i < Object.keys(configuration.TableMonitorModel.StatusCode).length; i++)
	{
		tableName 	= configuration.TableMonitorModel.StatusCode[Object.keys(configuration.TableMonitorModel.StatusCode)[i]]
		redisClient.zSetModel.deleteKeyModel(userToken, tableName, monitorHashID, function(error, result){})
	}
	
	/* Remove from MonitorModel:ActionType1: */
	for (var i = 0; i < Object.keys(configuration.TableMonitorModel.Action).length; i++)
	{
		tableName 	= configuration.TableMonitorModel.Action[Object.keys(configuration.TableMonitorModel.Action)[i]]
		redisClient.zSetModel.deleteKeyModel(userToken, tableName, monitorHashID, function(error, result){})
	}

	/* Remove from MonitorModel:ServiceCallerType1: */
	for (var i = 0; i < Object.keys(configuration.TableMonitorModel.ServiceCaller).length; i++)
	{
		tableName 	= configuration.TableMonitorModel.ServiceCaller[Object.keys(configuration.TableMonitorModel.ServiceCaller)[i]]
		redisClient.zSetModel.deleteKeyModel(userToken, tableName, monitorHashID, function(error, result){})
	}

	/* Remove from MonitorModel:ModuleCallerType1: */
	for (var i = 0; i < Object.keys(configuration.TableMonitorModel.ModuleCaller).length; i++)
	{
		tableName 	= configuration.TableMonitorModel.ModuleCaller[Object.keys(configuration.TableMonitorModel.ModuleCaller)[i]]
		redisClient.zSetModel.deleteKeyModel(userToken, tableName, monitorHashID, function(error, result){})
	}

	var result = {}
	result.result =	configuration.Successful 
	callback(null, result)
}