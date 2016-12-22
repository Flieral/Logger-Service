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

	var monitorHashIDTemp = []
	var expectedResult = []
	var testResult = []

	it('HTTP Verbs should work: Post with JSON Payload as body', function(done) {
		var body = JSON.stringify({accountHashID: 'testID1', statusCode: 'Sample2', serviceCaller: 'Sample1', moduleCaller: 'Sample2', actionType:'Sample1', time:1234567890, logMessage:'this is success', objectInfo:'this object has not f ing info!!' })
		request.post(url + '/1/monitor', {'body': body, 'headers': {'Content-type': 'application/json'}}, function (error, response, body) {
			if (error) {
				console.log(error)
				should.not.exist(error)
			}
			body = JSON.parse(body)
			if (body.result) {
				monitorHashIDTemp.push ( body.result.monitorHashID )
				done()
			}
		})
	})
	it('HTTP Verbs should work: Post with JSON Payload as body', function(done) {
		var body = JSON.stringify({accountHashID: 'testID1', statusCode: 'Sample1', serviceCaller: 'Sample1', moduleCaller: 'Sample1', actionType:'Sample1', time:1234567890, logMessage:'this is success', objectInfo:'this object has not f ing info!!' })
		request.post(url + '/1/monitor', {'body': body, 'headers': {'Content-type': 'application/json'}}, function (error, response, body) {
			if (error) {
				console.log(error)
				should.not.exist(error)
			}
			body = JSON.parse(body)
			if (body.result) {
				monitorHashIDTemp.push ( body.result.monitorHashID )
				done()
			}
		})
	})

	it('HTTP Verbs should work: Post with JSON Payload as body', function(done) {
		var body = JSON.stringify({accountHashID: 'testID2', statusCode: 'Sample2', serviceCaller: 'Sample1', moduleCaller: 'Sample1', actionType:'Sample1', time:1234567890, logMessage:'this is success', objectInfo:'this object has not f ing info!!' })
		request.post(url + '/1/monitor', {'body': body, 'headers': {'Content-type': 'application/json'}}, function (error, response, body) {
			if (error) {
				console.log(error)
				should.not.exist(error)
			}
			body = JSON.parse(body)
			if (body.result) {
				monitorHashIDTemp.push ( body.result.monitorHashID )
				done()
			}
		})
	})

	it('HTTP Verbs should work: Post with JSON Payload as body', function(done) {
		var body = JSON.stringify({accountHashID: 'testID1', statusCode: 'Sample2', serviceCaller: 'Sample1', moduleCaller: 'Sample1', actionType:'Sample1', time:1234567890, logMessage:'this is success', objectInfo:'this object has not f ing info!!' })
		request.post(url + '/1/monitor', {'body': body, 'headers': {'Content-type': 'application/json'}}, function (error, response, body) {
			if (error) {
				console.log(error)
				should.not.exist(error)
			}
			body = JSON.parse(body)
			if (body.result) {
				monitorHashIDTemp.push ( body.result.monitorHashID )
				done()
			}
		})
	})

	it('HTTP Verbs should work: Post with JSON Payload as body', function(done) {
		var body = JSON.stringify({accountHashID: 'testID1', statusCode: 'Sample2', serviceCaller: 'Sample2', moduleCaller: 'Sample1', actionType:'Sample2', time:1234567890, logMessage:'this is success', objectInfo:'this object has not f ing info!!' })
		request.post(url + '/1/monitor', {'body': body, 'headers': {'Content-type': 'application/json'}}, function (error, response, body) {
			if (error) {
				console.log(error)
				should.not.exist(error)
			}
			body = JSON.parse(body)
			if (body.result) {

				monitorHashIDTemp.push ( body.result.monitorHashID )
				done()
			}
		})
	})

	it('Get monitorModel for test', function(done) {

		request.get(url + '/1/monitor' + '?accountHashID=testID1&statusCode=Sample2&moduleCaller=Sample1&actionType=Sample1', function (error, response, body) {

			expectedResult.push(monitorHashIDTemp[3])

			if (error) {
				console.log(error)
				should.not.exist(error)
			}
			body = JSON.parse(body)
			for(var i = 0; i < body.result.length; i++ )
				for(var j = 0; j < monitorHashIDTemp.length; j++)
					if (monitorHashIDTemp[j] === body.result[i])
						testResult.push(monitorHashIDTemp[j])

			if (utility.arrayCompare(testResult, expectedResult))
				done()
			else
				done(new Error('error'))
		})
	})

	it('Get monitorModel for test', function(done) {
		request.get(url + '/1/monitor' + '?accountHashID=testID1&statusCode=Sample2&moduleCaller=Sample1', function (error, response, body) {

			expectedResult = []
			testResult = []
			expectedResult.push(monitorHashIDTemp[3])
			expectedResult.push(monitorHashIDTemp[4])

			if (error) {
				console.log(error)
				should.not.exist(error)
			}
			body = JSON.parse(body)
			for(var i = 0; i < body.result.length; i++ )
				for(var j = 0; j < monitorHashIDTemp.length; j++)
					if (monitorHashIDTemp[j] === body.result[i])
						testResult.push(monitorHashIDTemp[j])

			if (utility.arrayCompare(testResult, expectedResult))
				done()
			else
				done(new Error('error'))
		})
	})

	it('Get monitorModel for test', function(done) {
		request.get(url + '/1/monitor' + '?accountHashID=testID1&moduleCaller=Sample1', function (error, response, body) {

			expectedResult = []
			testResult = []
			expectedResult.push(monitorHashIDTemp[1])
			expectedResult.push(monitorHashIDTemp[3])
			expectedResult.push(monitorHashIDTemp[4])

			if (error) {
				console.log(error)
				should.not.exist(error)
			}
			body = JSON.parse(body)
			for(var i = 0; i < body.result.length; i++ )
				for(var j = 0; j < monitorHashIDTemp.length; j++)
					if (monitorHashIDTemp[j] === body.result[i])
						testResult.push(monitorHashIDTemp[j])

			if (utility.arrayCompare(testResult, expectedResult)){
				done()
			}
			else
				done(new Error('error'))
		})
	})

	it('Get monitorModel for test', function(done) {

		request.get(url + '/1/monitor' + '?accountHashID=testID1', function (error, response, body) {

			expectedResult = []
			testResult = []
			expectedResult.push(monitorHashIDTemp[0])
			expectedResult.push(monitorHashIDTemp[1])
			expectedResult.push(monitorHashIDTemp[3])
			expectedResult.push(monitorHashIDTemp[4])

			if (error) {
				console.log(error)
				should.not.exist(error)
			}
			body = JSON.parse(body)
			for(var i = 0; i < body.result.length; i++ )
				for(var j = 0; j < monitorHashIDTemp.length; j++)
					if (monitorHashIDTemp[j] === body.result[i])
						testResult.push(monitorHashIDTemp[j])

			if (utility.arrayCompare(testResult, expectedResult))
				done()
			else
				done(new Error('error'))
		})
	})

	it('Delete a Monitor Model for Test', function(done) {
		request.del(url + '/1/monitor/' + monitorHashIDTemp[1] + '?accountHashID=testID1', function (error, response, body) {
			if (error)
			console.log(error)
			body = JSON.parse(body)
			if (body.result)
			done()
			else
			done(new Error('Result is Null!'))
		})
	})

	it('Get monitorModel for test', function(done) {
		request.get(url + '/1/monitor' + '?accountHashID=testID1&moduleCaller=Sample1', function (error, response, body) {

			expectedResult = []
			testResult = []
			expectedResult.push(monitorHashIDTemp[3])
			expectedResult.push(monitorHashIDTemp[4])

			if (error) {
				console.log(error)
				should.not.exist(error)
			}
			body = JSON.parse(body)
			for(var i = 0; i < body.result.length; i++ )
				for(var j = 0; j < monitorHashIDTemp.length; j++)
					if (monitorHashIDTemp[j] === body.result[i])
						testResult.push(monitorHashIDTemp[j])

			if (utility.arrayCompare(testResult, expectedResult))
				done()
			else
				done(new Error('error'))
		})
	})

	it('Delete test inserted log', function(done) {
		request.del(url + '/1/monitor/' + monitorHashIDTemp[0] + '?accountHashID=testID1', function (error, response, body) {
			if (error)
			console.log(error)
			body = JSON.parse(body)
			if (body.result)
				done()
			else
				done(new Error('Result is Null!'))
		})
	})

	it('Delete test inserted log', function(done) {
		request.del(url + '/1/monitor/' + monitorHashIDTemp[1] + '?accountHashID=testID1', function (error, response, body) {
			if (error)
			console.log(error)
			body = JSON.parse(body)
			if (body.result)
				done()
			else
				done(new Error('Result is Null!'))
		})
	})

	it('Delete test inserted log', function(done) {
		request.del(url + '/1/monitor/' + monitorHashIDTemp[2] + '?accountHashID=sherVn', function (error, response, body) {
			if (error)
			console.log(error)
			body = JSON.parse(body)
			if (body.result)
				done()
			else
				done(new Error('Result is Null!'))
		})
	})

	it('Delete test inserted log', function(done) {
		request.del(url + '/1/monitor/' + monitorHashIDTemp[3] + '?accountHashID=testID1', function (error, response, body) {
			if (error)
			console.log(error)
			body = JSON.parse(body)
			if (body.result)
				done()
			else
				done(new Error('Result is Null!'))
		})
	})

	it('Delete test inserted log', function(done) {
		request.del(url + '/1/monitor/' + monitorHashIDTemp[4] + '?accountHashID=testID1', function (error, response, body) {
			if (error)
			console.log(error)
			body = JSON.parse(body)
			if (body.result)
				done()
			else
				done(new Error('Result is Null!'))
		})
	})

	it('Get final result that should be empty', function(done) {
		request.get(url + '/1/monitor' + '?accountHashID=testID1&statusCode=Sample2', function (error, response, body) {
			if (error) {
				console.log(error)
				should.not.exist(error)
			}
			body = JSON.parse(body)
			for(var i = 0; i < body.result.length; i++ )
				for(var j = 0; j < monitorHashIDTemp.length; j++)
					if (monitorHashIDTemp[j] === body.result[i])
						done(new Error('Not empty!'))
			done()
		})
	})
})
