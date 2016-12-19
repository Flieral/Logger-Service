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
    var args = []
    args.push(destinationTableName)
    args.push(filterKeys.length)
    for(var i = 0; i < filterKeys.length; i++) {
      var key = configuration.TableMonitorModel[filterKeys[i]]
      args.push(key[filter[filterKeys[i]]] + accountHashID)
    }
    args.push('AGGREGATE')
    args.push('MAX')
    redisClient.multi()
    .zinterstore(args)
    .zremrangebyrank(destinationTableName, 0, -1)
    .exec(function(err, replies) {
      if(err)
      callback(err, null)
      callback(null, replies)
    })
  }
}
