var utility			= require('../logic/utility')
var redisClient		= require('../redis_client/redisClient')
var configuration 	= require('../config/configuration.json');

/*
	payload = {
		Time: timeX					-> Required, Unix Timestamp in Milliseconds
		StatusCode: SampleX			-> Required, Based on config/configuration JSON file
		ServiceCaller: SampleX		-> Required, Based on config/configuration JSON file
		ModuleCaller: SampleX		-> Required, Based on config/configuration JSON file
		Action: SampleX				-> Required, Based on config/configuration JSON file
		LogMessage: logMessageX		-> Required, Any Arbitary UTF8 String
		ObjectInfo: objectInfoX		-> Optional, But if user didn't set, REST should set it to string "null"
	}
*/
module.exports = function(userToken, accountHashID, payload, callback)
{
	var tableName
	var errorCheck
	var valueTime = payload[configuration.ConstantMMTime]
	var monitorHashID = utility.generateUniqueHashID()

	/* Add to MonitorModel:MonitorHashID */
	tableName 	= configuration.TableMAMonitorModel + monitorHashID
	redisClient.hashModel.createModel(userToken, tableName, payload, function(error, result){})

	/* Add to AccountModel:MonitorModel:AccountHashID */
	tableName 	= configuration.TableMSAccountModelMonitorModel + accountHashID
	redisClient.zSetModel.createKeyModel(userToken, tableName, monitorHashID, valueTime, function(error, result){})

	/* Add to MonitorModel:StatusCodeType1:AccountHashID */
	tableName 	= configuration.TableMonitorModel.StatusCode[payload[configuration.ConstantMMStatusCode]] + accountHashID
	redisClient.zSetModel.createKeyModel(userToken, tableName, monitorHashID, valueTime, function(error, result){})

	/* Add to MonitorModel:ActionType1:AccountHashID */
	tableName 	= configuration.TableMonitorModel.Action[payload[configuration.ConstantMMAction]] + accountHashID
	redisClient.zSetModel.createKeyModel(userToken, tableName, monitorHashID, valueTime, function(error, result){})

	/* Add to MonitorModel:ServiceCallerType1:AccountHashID */
	tableName 	= configuration.TableMonitorModel.ServiceCaller[payload[configuration.ConstantMMServiceCaller]] + accountHashID
	redisClient.zSetModel.createKeyModel(userToken, tableName, monitorHashID, valueTime, function(error, result){})

	/* Add to MonitorModel:ModuleCallerType1:AccountHashID */
	tableName 	= configuration.TableMonitorModel.ModuleCaller[payload[configuration.ConstantMMModuleCaller]] + accountHashID
	redisClient.zSetModel.createKeyModel(userToken, tableName, monitorHashID, valueTime, function(error, result){})

	/* Add to MonitorModel: */
	tableName 	= configuration.TableMLMonitorModel
	redisClient.zSetModel.createKeyModel(userToken, tableName, monitorHashID, valueTime, function(error, result){})

	/* Add to MonitorModel:StatusCodeType1: */
	tableName 	= configuration.TableMonitorModel.StatusCode[payload[configuration.ConstantMMStatusCode]]
	redisClient.zSetModel.createKeyModel(userToken, tableName, monitorHashID, valueTime, function(error, result){})

	/* Add to MonitorModel:ActionType1: */
	tableName 	= configuration.TableMonitorModel.Action[payload[configuration.ConstantMMAction]]
	redisClient.zSetModel.createKeyModel(userToken, tableName, monitorHashID, valueTime, function(error, result){})

	/* Add to MonitorModel:ServiceCallerType1: */
	tableName 	= configuration.TableMonitorModel.ServiceCaller[payload[configuration.ConstantMMServiceCaller]]
	redisClient.zSetModel.createKeyModel(userToken, tableName, monitorHashID, valueTime, function(error, result){})

	/* Add to MonitorModel:ModuleCallerType1: */
	tableName 	= configuration.TableMonitorModel.ModuleCaller[payload[configuration.ConstantMMModuleCaller]]
	redisClient.zSetModel.createKeyModel(userToken, tableName, monitorHashID, valueTime, function(error, result){})

	var result = {}
	result.result =	monitorHashID
	callback(null, result)
}