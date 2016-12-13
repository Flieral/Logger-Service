var redisClient   = require('../../public/redisClient').getClient()
var configuration = require('../config/configuration.json')
var utility       = require('../../public/utility')
var monitorModelDelete = require('./monitorModelDeleteLogic')

module.exports = function(accountHashID, filter, callback) {
  var destinationTableName = configuration.TableMAMonitorModel + configuration.TableTemporary + utility.generateUniqueHashID()
  var filterKeys = Object.keys(filter)
  var monitorModelTables = Object.keys(configuration.TableMonitorModel)
  if (filterKeys.length == 0) {
    var tableName = configuration.TableMSAccountModelMonitorModel + accountHashID
    redisClient.zrange(tableName, 0, -1 , function(err, replies) {
      if (err)
        callback(err, null)
      for (var i = 0; i < tableName.length + 1; i++) {
        if (i == replies.length)
          callback(null, configuration.message.log.removed)
        monitorModelDelete(accountHashID, replies[i], function(err, replies) {
          if(err)
            callback(err, null)
        })
      }
    })
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
    redisClient.zinterstore(args, function(err, replies) {
      if (err)
        callback(err, null)
      redisClient.zrange(destinationTableName, 0, -1, function(err, replies) {
        if (err)
          callback(err, null)
        for (var i = 0; i < replies.length + 1; i++) {
          if (i == replies.length)
            callback(null, configuration.message.log.removed)
          monitorModelDelete(accountHashID, replies[i], function(err, replies) {
            if(err)
              callback(err, null)
          })
        }
      })
    })
  }
}