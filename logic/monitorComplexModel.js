var utility			= require('../logic/utility')
var redisClient		= require('../redis_client/redisClient')
var configuration 	= require('../config/configuration.json');

/*
	query = {
		StatusCode: SampleX
		ServiceCaller: SampleX
		ModuleCaller: SampleX
		Action: SampleX
		Time:{
			From: fromX
			To: ToX
		}
	}
*/
module.exports = function(userToken, accountHashID, query, callback)
{
	var destTable = configuration.TableQueryTemporary + utility.generateUniqueHashID() + accountHashID
	var timeFlag = false
	var tables = []
	for (var key in query)
		if (query.hasOwnProperty(key))
		{
			if (key === configuration.ConstantMMTime)
				timeFlag = true
			else if (key === configuration.ConstantMMStatusCode)
				tables.push(configuration.TableMonitorModel.StatusCode[query[key]] + accountHashID)
			else if (key === configuration.ConstantMMServiceCaller)
				tables.push(configuration.TableMonitorModel.ServiceCaller[query[key]] + accountHashID)
			else if (key === configuration.ConstantMMModuleCaller)
				tables.push(configuration.TableMonitorModel.ModuleCaller[query[key]] + accountHashID)
			else if (key === configuration.ConstantMMAction)
				tables.push(configuration.TableMonitorModel.Action[query[key]] + accountHashID)
		}

	/* Save Intersection of Some Tables */
	redisClient.zSetModel.getIntersectModel(userToken, destTable, tables, function(error, result)
	{
		if (error)
			callback(error, null)
		else
		{
			redisClient.zSetModel.getModel(userToken, destTable, "0", "-1", function(error, result)
			{
				if (error)
					callback(error, null)
				else
				{
					if (timeFlag)
					{
						/* Filter DestTable Based on Time Score */
						redisClient.zSetModel.getWithScoreModel(userToken, destTable, query.Time.From, query.Time.To, function(error, result)
						{
							if (error)
								callback(error, null)
							else
							{
								if (result.result.length === 0)
									callback(null, result)
						
								var arr = result.result.map(function (i){
									return configuration.TableMAMonitorModel + i;
								})
								/* Get Array of JSON Models According to Result of Intersection Part*/
								redisClient.hashModel.getComplexModel(userToken, arr, function(error, result)
								{
									if (error)
										callback(error, null)
									else
									{
										/* Delete Temp Table of Result of Intersection */
										redisClient.zSetModel.deleteModel(userToken, destTable, function(error, result){})
										callback(null, result)
									}
								})
							}
						})
					}
					else
					{
						if (result.result.length === 0)
							callback(null, result)
	
						var arr = result.result.map(function (i){
							return configuration.TableMAMonitorModel + i;
						})
						/* Get Array of JSON Models According to Result of Intersection Part*/
						redisClient.hashModel.getComplexModel(userToken, arr, function(error, result)
						{
							if (error)
								callback(error, null)
							else
							{
								/* Delete Temp Table of Result of Intersection */
								redisClient.zSetModel.deleteModel(userToken, destTable, function(error, result){})
								callback(null, result)
							}
						})
					}
				}
			})
		}
	})
}