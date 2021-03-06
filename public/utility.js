var uuid = require('node-uuid')

module.exports = {
	generateQueryString: function(data) {
		var ret = [];
		for (var d in data)
		if (data[d])
		ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
		return ret.join("&");
	},

	base64Encoding: function(data) {
		return new Buffer(data).toString('base64');
	},

	generateUniqueHashID: function() {
		return uuid.v1()
	},

	objectCompare(obj1, obj2) {
		//Loop through properties in object 1
		for (var p in obj1) {
			//Check property exists on both objects
			if (obj1.hasOwnProperty(p) !== obj2.hasOwnProperty(p)) return false

			switch (typeof (obj1[p])) {
				//Deep compare objects
				case 'object':
					if (!this.objectCompare(obj1[p], obj2[p])) return false
					break
				//Compare function code
				case 'function':
					if (typeof (obj2[p]) == 'undefined' || (p != 'compare' && obj1[p].toString() != obj2[p].toString())) return false
					break
				//Compare values
				default:
					if (obj1[p] != obj2[p]) return false
			}
		}
		//Check object 2 for any extra properties
		for (var p in obj2)
			if (typeof (obj1[p]) == 'undefined') return false
		return true
	},

	arrayCompare(arr1, arr2) {
		var check = 0
		if (arr1.length == arr2.length) {
			for (var i = 0; i < arr1.length; i++)
			for (var j = 0; j < arr2.length; j++)
			if (arr1[i] == arr2[j]) {
				check++
				break
			}
			if (check == arr1.length)
			return true
		}
		return false
	}
}
