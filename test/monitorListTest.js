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
// 		Monitor List  Get

describe('Monitor List Test', function () {

	before(function (done) {
		url = 'http://localhost:8085/api/1'
		done()
	})

	after(function (done) {
		done()
	})

	var monitorHashIDTemp = []
	var expectedResult = []
	var testResult = []

	it('Create New Monitor Log in Specific Account (accountHashID)', function (done) {
		var Body = JSON.stringify({statusCode: 'Sample2', serviceCaller: 'Sample1', moduleCaller: 'Sample2', actionType:'Sample1', time:1234567890, logMessage:'this is success', objectInfo:'this object has not f ing info!!' })
		var accountHashID = 'testID1'
		request.post(url + '/account/' + accountHashID + '/monitor', { 'body': Body, 'headers': { 'Content-type': 'application/json' } }, function (error, response, body) {
      if (error) {
        console.log(error)
        should.not.exist(error)
      }
      body = JSON.parse(body)
      if ((response.statusCode >= 200 && response.statusCode < 300) && body.result) {
        monitorHashIDTemp.push(body.result.monitorHashID)
        done()
      }
    })
  })

	it('Create New Monitor Log in Specific Account (accountHashID)', function (done) {
		var Body = JSON.stringify({statusCode: 'Sample1', serviceCaller: 'Sample1', moduleCaller: 'Sample1', actionType:'Sample1', time:1234567890, logMessage:'this is success', objectInfo:'this object has not f ing info!!' })
		var accountHashID = 'testID1'
		request.post(url + '/account/' + accountHashID + '/monitor', { 'body': Body, 'headers': { 'Content-type': 'application/json' } }, function (error, response, body) {
      if (error) {
        console.log(error)
        should.not.exist(error)
      }
      body = JSON.parse(body)
      if ((response.statusCode >= 200 && response.statusCode < 300) && body.result) {
        monitorHashIDTemp.push(body.result.monitorHashID)
        done()
      }
    })
	})

	it('Create New Monitor Log in Specific Account (accountHashID)', function (done) {
		var Body = JSON.stringify({statusCode: 'Sample2', serviceCaller: 'Sample1', moduleCaller: 'Sample1', actionType:'Sample1', time:1234567890, logMessage:'this is success', objectInfo:'this object has not f ing info!!' })
		var accountHashID = 'testID2'
		request.post(url + '/account/' + accountHashID + '/monitor', { 'body': Body, 'headers': { 'Content-type': 'application/json' } }, function (error, response, body) {
      if (error) {
        console.log(error)
        should.not.exist(error)
      }
      body = JSON.parse(body)
      if ((response.statusCode >= 200 && response.statusCode < 300) && body.result) {
        monitorHashIDTemp.push(body.result.monitorHashID)
        done()
      }
    })
	})

	it('Create New Monitor Log in Specific Account (accountHashID)', function (done) {
		var Body = JSON.stringify({statusCode: 'Sample2', serviceCaller: 'Sample1', moduleCaller: 'Sample1', actionType:'Sample1', time:1234567890, logMessage:'this is success', objectInfo:'this object has not f ing info!!' })
		var accountHashID = 'testID1'
		request.post(url + '/account/' + accountHashID + '/monitor', { 'body': Body, 'headers': { 'Content-type': 'application/json' } }, function (error, response, body) {
      if (error) {
        console.log(error)
        should.not.exist(error)
      }
      body = JSON.parse(body)
      if ((response.statusCode >= 200 && response.statusCode < 300) && body.result) {
        monitorHashIDTemp.push(body.result.monitorHashID)
        done()
      }
    })
	})

	it('Create New Monitor Log in Specific Account (accountHashID)', function (done) {
		var Body = JSON.stringify({statusCode: 'Sample2', serviceCaller: 'Sample2', moduleCaller: 'Sample1', actionType:'Sample2', time:1234567890, logMessage:'this is success', objectInfo:'this object has not f ing info!!' })
		var accountHashID = 'testID1'
		request.post(url + '/account/' + accountHashID + '/monitor', { 'body': Body, 'headers': { 'Content-type': 'application/json' } }, function (error, response, body) {
      if (error) {
        console.log(error)
        should.not.exist(error)
      }
      body = JSON.parse(body)
      if ((response.statusCode >= 200 && response.statusCode < 300) && body.result) {
        monitorHashIDTemp.push(body.result.monitorHashID)
        done()
      }
    })
	})

	it('Get Monitor List Log from Specific Account (accountHashID) with Filter', function (done) {
		var accountHashID = 'testID1'
    request.get(url + '/account/' + accountHashID + '/monitor' + '?statusCode=Sample2&moduleCaller=Sample1&actionType=Sample1', function (error, response, body) {
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

	it('Get Monitor List Log from Specific Account (accountHashID) with Filter', function (done) {
		var accountHashID = 'testID1'
    request.get(url + '/account/' + accountHashID + '/monitor' + '?statusCode=Sample2&moduleCaller=Sample1', function (error, response, body) {
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

	it('Get Monitor List Log from Specific Account (accountHashID) with Filter', function (done) {
		var accountHashID = 'testID1'
    request.get(url + '/account/' + accountHashID + '/monitor' + '?moduleCaller=Sample1', function (error, response, body) {
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

	it('Get All Monitor List Log from Specific Account (accountHashID)', function (done) {
		var accountHashID = 'testID1'
    request.get(url + '/account/' + accountHashID + '/monitor', function (error, response, body) {
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
	
	it('Delete Specific Monitor (monitorHashID) Log from Specific Account (accountHashID)', function (done) {
		var accountHashID = 'testID1'
    request.del(url + '/account/' + accountHashID + '/monitor/' + monitorHashIDTemp[1], function (error, response, body) {
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

	it('Get Monitor List Log from Specific Account (accountHashID) with Filter', function (done) {
		var accountHashID = 'testID1'
    request.get(url + '/account/' + accountHashID + '/monitor?moduleCaller=Sample1', function (error, response, body) {
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

	it('Delete Specific Monitor (monitorHashID) Log from Specific Account (accountHashID)', function (done) {
		var accountHashID = 'testID1'
    request.del(url + '/account/' + accountHashID + '/monitor/' + monitorHashIDTemp[0], function (error, response, body) {
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

	it('Delete Specific Monitor (monitorHashID) Log from Specific Account (accountHashID)', function (done) {
		var accountHashID = 'testID1'
    request.del(url + '/account/' + accountHashID + '/monitor/' + monitorHashIDTemp[1], function (error, response, body) {
      if (error) {
        console.log(error)
        should.not.exist(error)
      }
      body = JSON.parse(body)
      if (!body.result)
        done()
      else
        done(new Error('Result is Null!'))
    })
	})

	it('Delete Specific Monitor (monitorHashID) Log from Specific Account (accountHashID)', function (done) {
		var accountHashID = 'testID2'
    request.del(url + '/account/' + accountHashID + '/monitor/' + monitorHashIDTemp[2], function (error, response, body) {
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

	it('Delete Specific Monitor (monitorHashID) Log from Specific Account (accountHashID)', function (done) {
		var accountHashID = 'testID1'
    request.del(url + '/account/' + accountHashID + '/monitor/' + monitorHashIDTemp[3], function (error, response, body) {
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

	it('Delete Specific Monitor (monitorHashID) Log from Specific Account (accountHashID)', function (done) {
		var accountHashID = 'testID1'
    request.del(url + '/account/' + accountHashID + '/monitor/' + monitorHashIDTemp[4], function (error, response, body) {
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

	it('Get Monitor List Log from Specific Account (accountHashID) with Filter', function (done) {
		var accountHashID = 'testID1'
    request.get(url + '/account/' + accountHashID + '/monitor?statusCode=Sample2', function (error, response, body) {
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
