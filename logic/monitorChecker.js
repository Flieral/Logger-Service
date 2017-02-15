var configuration = require('../config/configuration.json')

module.exports = function (redisClient, accountHashID, monitorHashID, callback) {
  var tableName = configuration.TableMSAccountModelMonitorModel + accountHashID
  redisClient.zscore(tableName, monitorHashID, function (err, replies) {
    if (err) {
      callback(err, null)
      return
    }
    if (replies != null && replies != undefined) {
      callback(new Error(configuration.message.log.notExist), null)
      return
    }
    else {
      callback(null, configuration.message.log.exist)
      return
    }
  })
}
