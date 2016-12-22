'use strict'
var request = require('request')
var fs = require('fs')
var os = require('os')
var should = require('should')
var utility = require('../public/utility')
let path = require('path')
var api
var url

describe('Server: Web', function () {

  before(function (done) {
    url = 'http://localhost:8085/api'
    done()
  })

  after(function (done) {
    done()
  })

  var monitorHashID
  var Body = {accountHashID: 'mohammad', statusCode: 'Sample2', serviceCaller: 'Sample1', moduleCaller: 'Sample1', actionType:'Sample1', time:1234567890, logMessage:'this is success', objectInfo:'this object has not f ing info!!'}
  
  it ('HTTP Verbs should work: Post with JSON Payload as body', function(done) {
    request.post(url + '/1/monitor', {'body': JSON.stringify(Body), 'headers': {'Content-type': 'application/json'}}, function (error, response, body) {
      if (error) {
        console.log(error)
      }
      body = JSON.parse(body)
      if (body.result) {
        monitorHashID = body.result.monitorHashID
        done()
      }
    })
  })

  it ('Get with accountHashID', function(done) {
    request.get(url + '/1/monitor/' + monitorHashID + '?accountHashID=mohammad', function (error, response, body) {
      if (error){
        console.log(error)
        should.not.exist(error)
      }
      body = JSON.parse(body)
      body.result.accountHashID = 'mohammad'
      if (utility.objectCompare(body.result , Body)) {
        done()
      }
    })
  })

  it('Delete test inserted log', function(done) {
    request.del(url + '/1/monitor/' + monitorHashID + '?accountHashID=mohammad', function (error, response, body) {
      if (error)
      console.log(error)
      body = JSON.parse(body)
      if (body.result)
        done()
      else
        done(new Error('Result is Null!'))
    })
  })
})
