var utility			= require('../logic/utility')
var redisClient		= require('../redis_client/redisClient')
var configuration 	= require('../config/configuration.json');

module.exports = function(userToken, accountHashID, payload, callback)
{
	var tableName
	var errorCheck
	var valueTime = utility.getUnixTimeStamp()
	var monitorHashID = configuration.TableMAMonitorModel + utility.generateUniqueHashID()

	/* Add to MonitorModel:MonitorHashID */
	tableName 	= configuration.TableMAMonitorModel + monitorHashID
	errorCheck 	= redisClient.hashModel.createModel(userToken, tableName, payload)
	if (errorCheck !== null && typeof errorCheck === 'error')
		callback(errorCheck, null)

	/* Add to AccountModel:MonitorModel:AccountHashID */
	tableName 	= configuration.TableMonitorModel.TableMSAccountModelMonitorModel + accountHashID
	errorCheck 	= redisClient.zSetModel.createKeyModel(userToken, tableName, monitorHashID, valueTime)
	if (errorCheck !== null && typeof errorCheck === 'error')
		callback(errorCheck, null)

	/* Add to MonitorModel:StatusCodeType1:AccountHashID */
	tableName 	= configuration.TableMonitorModel.StatusCode[payload[configuration.ConstantMMStatusCode]] + accountHashID
	errorCheck 	= redisClient.zSetModel.createKeyModel(userToken, tableName, monitorHashID, valueTime)
	if (errorCheck !== null && typeof errorCheck === 'error')
		callback(errorCheck, null)

	/* Add to MonitorModel:ActionType1:AccountHashID */
	tableName 	= configuration.TableMonitorModel.ActionType[payload[configuration.ConstantMMAction]] + accountHashID
	errorCheck 	= redisClient.zSetModel.createKeyModel(userToken, tableName, monitorHashID, valueTime)
	if (errorCheck !== null && typeof errorCheck === 'error')
		callback(errorCheck, null)

	/* Add to MonitorModel:ServiceCallerType1:AccountHashID */
	tableName 	= configuration.TableMonitorModel.ServiceCallerType[payload[configuration.ConstantMMServiceCaller]] + accountHashID
	errorCheck 	= redisClient.zSetModel.createKeyModel(userToken, tableName, monitorHashID, valueTime)
	if (errorCheck !== null && typeof errorCheck === 'error')
		callback(errorCheck, null)

	/* Add to MonitorModel:ModuleCallerType1:AccountHashID */
	tableName 	= configuration.TableMonitorModel.ModuleCallerType[payload[configuration.ConstantMMModuleCaller]] + accountHashID
	errorCheck 	= redisClient.zSetModel.createKeyModel(userToken, tableName, monitorHashID, valueTime)
	if (errorCheck !== null && typeof errorCheck === 'error')
		callback(errorCheck, null)

	/* Add to MonitorModel: */
	tableName 	= configuration.TableMonitorModel.TableMLMonitorModel
	errorCheck 	= redisClient.zSetModel.createKeyModel(userToken, tableName, monitorHashID, valueTime)
	if (errorCheck !== null && typeof errorCheck === 'error')
		callback(errorCheck, null)

	/* Add to MonitorModel:StatusCodeType1: */
	tableName 	= configuration.TableMonitorModel.StatusCode[payload[configuration.ConstantMMStatusCode]]
	errorCheck 	= redisClient.zSetModel.createKeyModel(userToken, tableName, monitorHashID, valueTime)
	if (errorCheck !== null && typeof errorCheck === 'error')
		callback(errorCheck, null)

	/* Add to MonitorModel:ActionType1: */
	tableName 	= configuration.TableMonitorModel.ActionType[payload[configuration.ConstantMMAction]]
	errorCheck 	= redisClient.zSetModel.createKeyModel(userToken, tableName, monitorHashID, valueTime)
	if (errorCheck !== null && typeof errorCheck === 'error')
		callback(errorCheck, null)

	/* Add to MonitorModel:ServiceCallerType1: */
	tableName 	= configuration.TableMonitorModel.ServiceCallerType[payload[configuration.ConstantMMServiceCaller]]
	errorCheck 	= redisClient.zSetModel.createKeyModel(userToken, tableName, monitorHashID, valueTime)
	if (errorCheck !== null && typeof errorCheck === 'error')
		callback(errorCheck, null)

	/* Add to MonitorModel:ModuleCallerType1: */
	tableName 	= configuration.TableMonitorModel.ModuleCallerType[payload[configuration.ConstantMMModuleCaller]]
	errorCheck 	= redisClient.zSetModel.createKeyModel(userToken, tableName, monitorHashID, valueTime)
	if (errorCheck !== null && typeof errorCheck === 'error')
		callback(errorCheck, null)

	var result
	result.result =	configuration.Successful 
	callback(null, result)
}