var redisClient = require('directory_to_redisClient').getClient()
var configuration 	= require('../config/configuration.json')

module.exports = function(monitorHashID, callback) {
	var monitorTable = configuration.TableMAMonitorModel + monitorHashID
	redisClient.hgetall(monitorTable, function(err, replies) {
    if (err)
			callback(err, null)
		else
			callback(null, replies)
})
}
