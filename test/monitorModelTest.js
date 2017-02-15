'use strict'

var request = require('request')
var fs = require('fs')
var os = require('os')
var should = require('should')
var utility = require('../public/utility')
let path = require('path')
var api
var url

// Tests Included:
//    Monitor Model Entry
//    Monitor Model Get
//    Monitor Model Delete

describe('Server: Web', function () {

  before(function (done) {
    url = 'http://localhost:8085/api/1'
    done()
  })

  after(function (done) {
    done()
  })

  var accountHashID = 'mohammad'

  var monitorHashID
  var Body = {statusCode: 'Sample2', serviceCaller: 'Sample1', moduleCaller: 'Sample1', actionType:'Sample1', time:1234567890, logMessage:'this is success', objectInfo:'this object has not f ing info!!'}
  
  it ('Create New Monitor Log in Specific Account (accountHashID)', function(done) {
    request.post(url + '/account/' + accountHashID + '/monitor', {'body': JSON.stringify(Body), 'headers': {'Content-type': 'application/json'}}, function (error, response, body) {
      if (error) {
        console.log(error)
        should.not.exist(error)
      }
      body = JSON.parse(body)
      if ((response.statusCode >= 200 && response.statusCode < 300) && body.result) {
        monitorHashID = body.result.monitorHashID
        done()
      }
    })
  })

  it ('Get Specific Monitor (monitorHashID) Log from Specific Account (accountHashID)', function(done) {
    request.get(url + '/account/' + accountHashID + '/monitor/' + monitorHashID, function (error, response, body) {
      if (error){
        console.log(error)
        should.not.exist(error)
      }
      body = JSON.parse(body)
      if (utility.objectCompare(body.result , Body)) {
        done()
      }
    })
  })

  it('Delete Specific Monitor (monitorHashID) Log from Specific Account (accountHashID)', function(done) {
    request.del(url + '/account/' + accountHashID + '/monitor/' + monitorHashID, function (error, response, body) {
      if (error) {
        console.log(error)
        should.not.exist(error)
      }
      body = JSON.parse(body)
      if ((response.statusCode >= 200 && response.statusCode < 300) && body.result)
        done()
      else
        done(new Error('Result is Null!'))
    })
  })

})
