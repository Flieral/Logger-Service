
var Input =
{
  accountHashID:
  {
    required : true
  },
  monitorHashID:
  {
    required: true
  }
}

exports.monitorModelDelete =
{
  name: 'monitorModelDelete',
  description: 'Delete Monitor Model',
  inputs: Input,

  run: function(api, data, next)
  {
    monitorModelDelete(data.accountHashID, data.monitorHashID, function (error, result) {
      if (error) {
        data.response.error = error.error;
        next(error);
      }
      else {
        data.response.result = result.result;
        next();
      }
    })
  }
}