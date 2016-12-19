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

	it('Entry a Monitor Model For Test', function(done) {
		var body = JSON.stringify({accountHashID: 'mrwooj', statusCode: 'Sample2', serviceCaller: 'Sample2', moduleCaller: 'Sample1', actionType:'Sample1', time:1234567890, logMessage:'this is success', objectInfo:'this object had info but it has not now!!' })
		request.post(url + '/1/monitor', {'body': body, 'headers': {'Content-type': 'application/json'}}, function (error, response, body) {
			if (error) 
				console.log(error)
			body = JSON.parse(body)
			if(body.result) 
				done()
			else 
				done(new Error('Result is Null!'))
		})
	})
})