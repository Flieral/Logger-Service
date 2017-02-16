exports.default = {
	routes: function (api) {
		return {
			get: [
				/* URIs */
				{
					path: '/:apiVersion/account/:accountHashID/monitor',
					action: 'monitorList'
				},
				{
					path: '/:apiVersion/account/:accountHashID/monitor/:monitorHashID',
					action: 'monitorModel'
				},

				/* 	STATUS 	*/
				{
					path: '/:apiVersion/Service/Status',
					action: 'Status'
				}
			],

			post: [
				/* URIs */
				{
					path: '/:apiVersion/account/:accountHashID/monitor',
					action: 'monitorModelEntry'
				}
			],
			delete: [
				/* URIs */
				{
					path: '/:apiVersion/account/:accountHashID/monitor',
					action: 'monitorListDelete'
				},
				{
					path: '/:apiVersion/account/:accountHashID/monitor/:monitorHashID',
					action: 'monitorModelDelete'
				}
			]
		}
	}
}