var configuration 	= require('../config/configuration.json')
var requestHandler 	= require('./requestHandler')

module.exports = 
{
	/* Create a KeyValue Hash Table */
	createModel: function(userToken, tableName, keyValue)
	{
		var fieldValues = []
		for (var key in keyValue)
		{
			if (keyValue.hasOwnProperty(key))
			{
				fieldValues.push(key)
				fieldValues.push(keyValue[key])
			}
		}

		var innerDict = { "FieldValues" : fieldValues }
		var encodedFieldValue = utility.base64Encoding(innerDict.toString())
		var dict = {
			"UserToken" : userToken,
			"Key"		: tableName,
			"FieldValue": encodedFieldValue
		}
		var queryString = utility.generateQueryString(dict)
		var url = configuration.BaseURL + 'Database/RHash/MSet?' + queryString
		return requestHandler(url)
	},

	/* Get a Hash Table Content */
	getModel: function(userToken, tableName)
	{
		var dict = {
			"UserToken" : userToken,
			"Key"		: tableName
		}
		var queryString = utility.generateQueryString(dict)
		var url = configuration.BaseURL + 'Database/RHash/GetAll?' + queryString
		return requestHandler(url)
	},

	/* Get Hash Table Content of Given Key Tables */
	getComplexModel: function(userToken, keyArray)
	{
		var innerDict = {
			"Keys"		: keyArray
		}
		var encodedKeys = utility.base64Encoding(innerDict.toString())
		var dict = {
			"UserToken" : userToken,
			"Key"		: encodedKeys
		}
		var queryString = utility.generateQueryString(dict)
		var url = configuration.BaseURL + 'Database/RHash/Complex?' + queryString
		return requestHandler(url)
	},

	/* Delete a Hash Table */
	deleteModel: function(userToken, tableName)
	{
		var dict = {
			"UserToken" : userToken,
			"Key"		: tableName
		}
		var queryString = utility.generateQueryString(dict)
		var url = configuration.BaseURL + 'Database/RHash/DelAll?' + queryString
		return requestHandler(url)
	},

	/* Delete Hash Table of Given Key Tables */
	deleteComplexModel: function(userToken, keyArray)
	{
		var innerDict = {
			"Keys"		: keyArray
		}
		var encodedKeys = utility.base64Encoding(innerDict.toString())
		var dict = {
			"UserToken" : userToken,
			"Key"		: encodedKeys
		}
		var queryString = utility.generateQueryString(dict)
		var url = configuration.BaseURL + 'Database/RHash/ComplexDel?' + queryString
		return requestHandler(url)
	}
}