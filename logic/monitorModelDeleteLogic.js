var redisClient     = require('../public/redisClient.js').getClient()
var configuration   = require('../config/configuration.json')

module.exports = function (accountHashID, monitorHashID, callback) {
  multi = redisClient.multi()
  var monitorTable = configuration.TableMAMonitorModel + monitorHashID
  multi.hdel(monitorTable,
    configuration.CosntantMMTime,
  configuration.CosntantMMStatusCode,
  configuration.CosntantMMServiceCaller,
  configuration.CosntantMMModuleCaller,
  configuration.CosntantMMAction,
  configuration.CosntantMMLogMessage,
  configuration.CosntantMMObjectInfo
  )
  var monitorModelTablesKeys = Object.keys(configuration.TableMonitorModel)
  for(var i = 0; i < monitorModelTablesKeys.length; i++) {
    var monitorModelOptionTablesKeys = Object.keys(configuration.TableMonitorModel[monitorModelTablesKeys[i]])
    for (var j = 0; j < monitorModelOptionTablesKeys.length; j++) {
      var opt = configuration.TableMonitorModel[monitorModelTablesKeys[i]]
      var enum = Object.keys(opt)
      multi.zrem(opt[enum[j]] + accountHashID, monitorHashID)
      multi.zrem(opt[enum[j]], monitorHashID)
    }
  }
  multi.zrem(configuration.TableMAMonitorModel, monitorHashID)
  multi.exec(function (err, replies) {
    if (err)
      callback(err, null)
    callback(null, replies)
  })
}