var configuration = require('../config/configuration.json')
var utility       = require('../public/utility')

module.exports = function(redisClient, accountHashID, filter, callback) {
  var destinationTableName = configuration.TableMAMonitorModel + configuration.TableTemporary + utility.generateUniqueHashID()
  var filterKeys = Object.keys(filter)
  var monitorModelTables = Object.keys(configuration.TableMonitorModel)
  if(filterKeys.length == 0) {
    var tableName = configuration.TableMSAccountModelMonitorModel + accountHashID
    redisClient.zrange(tableName, '0', '-1' , 'WITHSCORES', function(err , replies) {
      if (err) {
        callback(err, null)
        return
      }
      callback(null, replies)
      return
    })
  }
  else {
    var result = {}
    var args = []
    args.push(destinationTableName)
    args.push(filterKeys.length)
    for(var i = 0; i < filterKeys.length; i++) {
      var key = configuration.TableMonitorModel[filterKeys[i]]
      args.push(key[filter[filterKeys[i]]] + accountHashID)
    }
    args.push('AGGREGATE')
    args.push('MAX')
    redisClient.zinterstore(args, function(err, replies) {
      if (err) {
        callback(err, null)
        return
      }
      redisClient.zrange(destinationTableName, '0', '-1' , 'WITHSCORES', function(err , replies) {
        if (err) {
          callback(err, null)
          return
        }
        result = replies
        redisClient.zremrangebyrank(destinationTableName, '0', '-1', function(err, replies) {
          if (err) {
            callback(err, null)
            return
          }
          callback(null, result)
          return
        })
      })
    })
  }
}
