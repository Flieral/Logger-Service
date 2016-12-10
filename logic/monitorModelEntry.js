var configuration = require ('../config/configuration.json')
var redisClient = require ('../publoc/redisClient.js').getClient()
var utility = require('../logic/utility.js')

module.exports = function(payload, callback) {
  var multi = redisClient.multi()
  var tableName = null
  var accountHashID = null
  var timestamp = null
  var monitorHashID = utility.generateUniqueHashID()
  var modelAccessTableName = configuration.TableMAMonitorModel + monitorHashID
  multi.hmset(modelAccessTableName,
    configuration.ConstantMMTime, payload.time,
    configuration.ConstantMMServiceCaller, payload.serviceCaller,
    configuration.ConstantMMStatusCode, payload.statusCode,
    configuration.ConstantMMModuleCaller, payload.moduleCaller,
    configuration.ConstantMMAction, payload.action,
    configuration.ConstantMMLogMessage, payload.logMessage,
    configuration.ConstantMMObjectInfo, payload.objectInfo
  )

  accountHashID = payload[accountHashID]
  timestamp = playload[time]

  tableName = configuration.TableMSAccountModelMonitorModel + accountHashID
  multi.zadd(tableName, monitorHashID, timestamp)

  tableName =configuration.TableMonitorModel.statusCode[payload[statusCode]] + accountHashID
  multi.zadd(tableName, monitorHashID, timestamp )

  tableName =configuration.TableMonitorModel.serviceCaller[payload[serviceCaller]] + accountHashID
  multi.zadd(tableName, monitorHashID, timestamp)

  tableName =configuration.TableMonitorModel.moduleCaller[payload[moduleCaller]] + accountHashID
  multi.zadd(tableName, monitorHashID, timestamp)

  tableName =configuration.TableMonitorModel.action[payload[action]] + accountHashID
  multi.zadd(tableName, monitorHashID, timestamp )

  multi.hmset(modelAccessTableName, configuration.CosntantMMLogMessage, payload.logMessage)
  
  if (payload.objectInfo != null)
    multi.hset(modelAccessTableName, configuration.CosntantMMobjectInfo, payload.objectInfo)

  multi.exec(function(err, replies) {
    if (err)
    callback(err, null)
    callback(null, configuration.message.log.successful)
  })
}
