var utility			= require('../logic/utility')
var redisClient		= require('../redis_client/redisClient')
var configuration 	= require('../config/configuration.json');

module.exports = function(userToken, accountHashID, monitorHashID, callback)
{
	var tableName
	var errorCheck
	var monitorHashID = configuration.TableMAMonitorModel + monitorHashID

	/* Remove from MonitorModel:MonitorHashID */
	tableName 	= configuration.TableMAMonitorModel + monitorHashID
	errorCheck 	= redisClient.hashModel.deleteModel(userToken, tableName)
	if (errorCheck !== null && typeof errorCheck === 'error')
		callback(errorCheck, null)

	/* Remove from AccountModel:MonitorModel:AccountHashID */
	tableName 	= configuration.TableMonitorModel.TableMSAccountModelMonitorModel + accountHashID
	errorCheck 	= redisClient.zSetModel.deleteKeyModel(userToken, tableName, monitorHashID)
	if (errorCheck !== null && typeof errorCheck === 'error')
		callback(errorCheck, null)

	/* Remove from MonitorModel:StatusCodeType1:AccountHashID */
	for (var i = 0; i < Object.keys(configuration.TableMonitorModel.StatusCode).length; i++)
	{
		tableName 	= configuration.TableMonitorModel.StatusCode[i] + accountHashID
		errorCheck 	= redisClient.zSetModel.deleteKeyModel(userToken, tableName, monitorHashID)
		if (errorCheck !== null && typeof errorCheck === 'error')
			callback(errorCheck, null)
	}

	/* Remove from MonitorModel:ActionType1:AccountHashID */
	for (var i = 0; i < Object.keys(configuration.TableMonitorModel.ActionType).length; i++)
	{
		tableName 	= configuration.TableMonitorModel.ActionType[i] + accountHashID
		errorCheck 	= redisClient.zSetModel.deleteKeyModel(userToken, tableName, monitorHashID)
		if (errorCheck !== null && typeof errorCheck === 'error')
			callback(errorCheck, null)
	}

	/* Remove from MonitorModel:ServiceCallerType1:AccountHashID */
	for (var i = 0; i < Object.keys(configuration.TableMonitorModel.ServiceCallerType).length; i++)
	{
		tableName 	= configuration.TableMonitorModel.ServiceCallerType[i] + accountHashID
		errorCheck 	= redisClient.zSetModel.deleteKeyModel(userToken, tableName, monitorHashID)
		if (errorCheck !== null && typeof errorCheck === 'error')
			callback(errorCheck, null)
	}

	/* Remove from MonitorModel:ModuleCallerType1:AccountHashID */
	for (var i = 0; i < Object.keys(configuration.TableMonitorModel.ModuleCallerType).length; i++)
	{
		tableName 	= configuration.TableMonitorModel.ModuleCallerType[i] + accountHashID
		errorCheck 	= redisClient.zSetModel.deleteKeyModel(userToken, tableName, monitorHashID)
		if (errorCheck !== null && typeof errorCheck === 'error')
			callback(errorCheck, null)
	}

	/* Remove from MonitorModel: */
	tableName 	= configuration.TableMonitorModel.TableMLMonitorModel
	errorCheck 	= redisClient.zSetModel.deleteKeyModel(userToken, tableName, monitorHashID)
	if (errorCheck !== null && typeof errorCheck === 'error')
		callback(errorCheck, null)

	/* Remove from MonitorModel:StatusCodeType1: */
	for (var i = 0; i < Object.keys(configuration.TableMonitorModel.StatusCode).length; i++)
	{
		tableName 	= configuration.TableMonitorModel.StatusCode[i]
		errorCheck 	= redisClient.zSetModel.deleteKeyModel(userToken, tableName, monitorHashID)
		if (errorCheck !== null && typeof errorCheck === 'error')
			callback(errorCheck, null)
	}
	
	/* Remove from MonitorModel:ActionType1: */
	for (var i = 0; i < Object.keys(configuration.TableMonitorModel.ActionType).length; i++)
	{
		tableName 	= configuration.TableMonitorModel.ActionType[i]
		errorCheck 	= redisClient.zSetModel.deleteKeyModel(userToken, tableName, monitorHashID)
		if (errorCheck !== null && typeof errorCheck === 'error')
			callback(errorCheck, null)
	}

	/* Remove from MonitorModel:ServiceCallerType1: */
	for (var i = 0; i < Object.keys(configuration.TableMonitorModel.ServiceCallerType).length; i++)
	{
		tableName 	= configuration.TableMonitorModel.ServiceCallerType[i]
		errorCheck 	= redisClient.zSetModel.deleteKeyModel(userToken, tableName, monitorHashID)
		if (errorCheck !== null && typeof errorCheck === 'error')
			callback(errorCheck, null)
	}

	/* Remove from MonitorModel:ModuleCallerType1: */
	for (var i = 0; i < Object.keys(configuration.TableMonitorModel.ModuleCallerType).length; i++)
	{
		tableName 	= configuration.TableMonitorModel.ModuleCallerType[i]
		errorCheck 	= redisClient.zSetModel.deleteKeyModel(userToken, tableName, monitorHashID)
		if (errorCheck !== null && typeof errorCheck === 'error')
			callback(errorCheck, null)
	}

	var result
	result.result =	configuration.Successful 
	callback(null, result)
}