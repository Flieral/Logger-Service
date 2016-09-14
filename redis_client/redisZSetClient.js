var configuration 	= require('../config/configuration.json')
var utility			= require('../logic/utility')
var requestHandler 	= require('./requestHandler')

module.exports = 
{
	/* Add Member Score to ZSet Table */
	createKeyModel: function(userToken, tableName, member, score)
	{
		var scoreMembers = [score, member]
		var innerDict = { "ScoreMembers" : scoreMembers }
		var encodedScoreMember = utility.base64Encoding(JSON.stringify(innerDict))
		var dict = {
			"UserToken" 	: userToken,
			"Key"			: tableName,
			"ScoreMember"	: encodedScoreMember
		}
		var queryString = utility.generateQueryString(dict)
		var url = configuration.BaseURL + 'Database/RZSet/Add?' + queryString
		return requestHandler(url)
	},

	/* Get Intersection of ZSet Tables in ZSet DestinationTable */
	getIntersectModel: function(userToken, destinationTableName, tables)
	{
		var innerDict = { "Keys" : tables }
		var encodedKeys = utility.base64Encoding(JSON.stringify(innerDict))
		var dict = {
			"UserToken" 	: userToken,
			"Key"			: encodedKeys,
			"NumKeys"		: tables.Length,
			"Destination"	: destinationTableName,
			"Aggregate"		: "MAX"
		}
		var queryString = utility.generateQueryString(dict)
		var url = configuration.BaseURL + 'Database/RZSet/InterStore?' + queryString
		return requestHandler(url)
	},

	/* Get ZSet Table Content from Start to Stop in Reverse Mode */
	getReverseModel: function(userToken, tableName, start, stop)
	{
		var dict = {
			"UserToken" : userToken,
			"Key"		: tableName,
			"Start"		: start,
			"Stop"		: stop
		}
		var queryString = utility.generateQueryString(dict)
		var url = configuration.BaseURL + 'Database/RZSet/RevRange?' + queryString
		return requestHandler(url)
	},

	/* Get ZSet Table Content by Score from Min to Max */
	getReverseWithScoreModel: function(userToken, tableName, minScore, maxScore)
	{
		var dict = {
			"UserToken" : userToken,
			"Key"		: tableName,
			"Min"		: minScore,
			"Max"		: maxScore
		}
		var queryString = utility.generateQueryString(dict)
		var url = configuration.BaseURL + 'Database/RZSet/RevRangeByScore?' + queryString
		return requestHandler(url)
	},

	/* Delete a Key by Rank from ZSet Table */
	deleteKeyModel: function(userToken, tableName, member)
	{
		var dic1 = {
			"Key"		: tableName,
			"Member"	: member
		}
		var queryString1 = utility.generateQueryString(dict1)
		var url = configuration.BaseURL + 'Database/RZSet/Rank?' + queryString1
		var index = requestHandler(url).result

		var dict = {
			"UserToken" : userToken,
			"Key"		: tableName,
			"Start"		: index,
			"Stop"		: index
		}
		var queryString = utility.generateQueryString(dict)
		var url = configuration.BaseURL + 'Database/RZSet/RemRangeByRank?' + queryString
		return requestHandler(url)
	},

	/* Delete a ZSet Table */
	deleteModel: function(userToken, tableName)
	{
		var dict = {
			"UserToken" : userToken,
			"Key"		: tableName,
			"Start"		: "0",
			"Stop"		: "-1"
		}
		var queryString = utility.generateQueryString(dict)
		var url = configuration.BaseURL + 'Database/RZSet/RemRangeByRank?' + queryString
		return requestHandler(url)
	}
}