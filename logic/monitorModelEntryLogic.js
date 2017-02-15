var configuration = require('../config/configuration.json')
var utility       = require('../public/utility')

module.exports = function(redisClient, accountHashID, payload, callback) {
  var tableName
  var timestamp
  var multi = redisClient.multi()
  var monitorHashID = utility.generateUniqueHashID()

  var modelAccessTableName = configuration.TableMAMonitorModel + monitorHashID
  multi.hmset(modelAccessTableName,
    configuration.ConstantMMTime, payload.time,
    configuration.ConstantMMServiceCaller, payload.serviceCaller,
    configuration.ConstantMMStatusCode, payload.statusCode,
    configuration.ConstantMMModuleCaller, payload.moduleCaller,
    configuration.ConstantMMAction, payload.actionType,
    configuration.ConstantMMLogMessage, payload.logMessage,
    redisClient.print
  )

  timestamp = payload['time']

  tableName = configuration.TableMSAccountModelMonitorModel + accountHashID
  multi.zadd(tableName, timestamp, monitorHashID, redisClient.print)

  tableName = configuration.TableMonitorModel.statusCode[payload['statusCode']] + accountHashID
  multi.zadd(tableName, timestamp, monitorHashID, redisClient.print)

  tableName = configuration.TableMonitorModel.serviceCaller[payload['serviceCaller']] + accountHashID
  multi.zadd(tableName, timestamp, monitorHashID, redisClient.print)

  tableName = configuration.TableMonitorModel.moduleCaller[payload['moduleCaller']] + accountHashID
  multi.zadd(tableName, timestamp, monitorHashID, redisClient.print)

  tableName = configuration.TableMonitorModel.actionType[payload['actionType']] + accountHashID
  multi.zadd(tableName, timestamp, monitorHashID, redisClient.print)

  multi.zadd(configuration.TableMAMonitorModel, timestamp, monitorHashID, redisClient.print)

  multi.zadd(configuration.TableMonitorModel.statusCode[payload['statusCode']], timestamp, monitorHashID, redisClient.print)

  multi.zadd(configuration.TableMonitorModel.serviceCaller[payload['serviceCaller']], timestamp, monitorHashID, redisClient.print)

  multi.zadd(configuration.TableMonitorModel.moduleCaller[payload['moduleCaller']], timestamp, monitorHashID, redisClient.print)

  multi.zadd(configuration.TableMonitorModel.actionType[payload['actionType']], timestamp, monitorHashID, redisClient.print)

  if (payload.objectInfo != null)
  multi.hset(modelAccessTableName, configuration.ConstantMMObjectInfo, payload.objectInfo, redisClient.print)

  multi.exec(function(err, replies) {
    if (err) {
      callback(err, null)
      return
    }
    var res = {}
    res.monitorHashID = monitorHashID
    res.accountHashID = accountHashID
    callback(null, res)
  })
}
