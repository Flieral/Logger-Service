var configuration = require('../config/configuration.json')
var utility       = require('../public/utility')

module.exports = function(redisClient, accountHashID, filter, callback) {
  var destinationTableName = configuration.TableMAMonitorModel + configuration.TableTemporary + utility.generateUniqueHashID()
  var filterKeys = Object.keys(filter)
  var monitorModelTables = Object.keys(configuration.TableMonitorModel)
  if(filterKeys.length == 0) {
    var tableName = configuration.TableMSAccountModelMonitorModel + accountHashID
    redisClient.zrangebyscore(tableName, '-inf', '+inf' , 'WITHSCORE', function(err , replies) {
      if(err)
      callback(err, null)
      callback(null, replies)
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
      if (err)
      callback(err, null)
      redisClient.zrangebyscore(tableName, '0', '-1' , 'WITHSCORE', function(err , replies) {
        if(err)
        callback(err, null)
        result = replies
        redisClient.zremrangebyrank(redisClient, 0, -1, function(err, replies) {
          if (err)
          callback(err, null)
          callback(null, result)
        })
      })
    })
  }
}
