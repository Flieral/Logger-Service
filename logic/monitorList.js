var configuration = require ('../config/configuration.json')
var redisClient = require('../public/redisClient.js').getClient()
var utility = require('../logic/utility.js')

module.exports = function(accountHashID, filter, callback) {
  var destinationTableName = configuration.TableMAMonitorModel + configuration.TableTemporary + utility.generateUniqueHashID()
  var filterKeys = Object.keys(filter)
  var monitorModelTables = Object.keys(configuration.TableMonitorModel)
  if(filterKeys.length == 0) {
    var tableName = configuration.TableMSAccountModelMonitorModel + accountHashID
    redisClient.zrangebyscore(tableName, 0, -1 ,'WITHSCORE', function(err , replies) {
      if(err)
      callback(err, null)
      callback(null, replies)
    } )
  }
  else {
    var args = []
    args.push(destinationTableName)
    args.push(filterKeys.length)
    for(var i = 0; i < filterKeys.length; i++)
    for(var j = 0; j < monitorModelTables.length; j++)
    if(monitorModelTables[j] === filterKeys[i]) {
      var enums = Object.keys(monitorModelTables[j])
      for(var k = 0; k < enums.length; k++)
      if(enums[k] === filter[filterKeys[i]]) {
        var r = configuration.TableMonitorModel[filterKeys[i]]
        args.push(r[enums[k]])
      }
    }
    args.push('AGGREGATE')
    args.push('MAX')
    redisClient.multi()
    .zinterstore(args)
    .zremrangebyrank(destinationTableName, 0, -1)
    .exec(fucntion(err, replies) {
      if(err)
      callback(err, null)
      callback(null, replies)
    })
  }
}
