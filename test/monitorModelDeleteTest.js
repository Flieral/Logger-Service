'use strict'
var request = require('request')
var fs = require('fs')
var os = require('os')
var should = require('should')
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

	it('Entry a Monitor Model For Test', function(done) {
		var body = JSON.stringify({accountHashID: 'mohammad', statusCode: 'Sample2', serviceCaller: 'Sample1', moduleCaller: 'Sample1', actionType:'Sample1', time:1234567890, logMessage:'this is success', objectInfo:'this object has not f ing info!!' })
		request.post(url + '/1/monitor', {'body': body, 'headers': {'Content-type': 'application/json'}}, function (error, response, body) {
			if (error) 
				console.log(error)
			body = JSON.parse(body)
			if(body.result) {
				monitorHashID = body.result.monitorHashID
				done()
			}
			else 
				done(new Error('Result is Null!'))
		})
	})

	it('Delete a Monitor Model for Test', function(done) {
		request.del(url + '/1/monitor/' + monitorHashID + '?accountHashID=mohammad', function (error, response, body) {
			if(error) 
				console.log(error)
			body = JSON.parse(body)
			if (body.result) 
				done()
			else
				done(new Error('Result is Null!'))
		})
	})
})