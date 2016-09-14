var utility			= require('../logic/utility')
var redisClient		= require('../redis_client/redisClient')
var configuration 	= require('../config/configuration.json');
var monitorRemove	= require('./monitorRemove')

module.exports = function(userToken, accountHashID, query, callback)
{
	var destTable = configuration.TableQueryTemporary + accountHashID
	var tables = []
	for (var key in query)
		if (query.hasOwnProperty(key))
		{
			if (key === configuration.ConstantMMStatusCode)
				tables.push(configuration.TableMonitorModel.StatusCode[query[key]] + accountHashID)
			else if (key === configuration.ConstantMMServiceCaller)
				tables.push(configuration.TableMonitorModel.ServiceCallerType[query[key]] + accountHashID)
			else if (key === configuration.ConstantMMModuleCaller)
				tables.push(configuration.TableMonitorModel.ModuleCallerType[query[key]] + accountHashID)
			else if (key === configuration.ConstantMMAction)
				tables.push(configuration.TableMonitorModel.ActionType[query[key]] + accountHashID)
		}

	var check = redisClient.zSetModel.getIntersectModel(userToken, destTable, tables)
	if (check !== null && typeof check === 'error')
	{
		callback(check, null)
	}
	else
	{
		var response = []
		for (var i = 0; i < check.result.Length; i++)
		{
			monitorRemove(userToken, accountHashID, check.result[i], function (error, result)
			{
				if (error)
					callback(error, null)
				else
					response.push(result.result)			
			})
		}
		callback(null, result)
	}
}