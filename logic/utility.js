module.exports = 
{
	generateQueryString: function(data)
	{
		var ret = [];
		for (var d in data)
			if (data[d])
				ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
		return ret.join("&");
	},

	base64Encoding: function(data)
	{
		return new Buffer(data).toString('base64');
	}
}