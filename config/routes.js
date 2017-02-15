exports.default = {
	routes: function (api) {
		return {
			get: [
				/* URIs */
				{
					path: '/:apiVersion/account/:accountHashId/monitor',
					action: 'monitorList'
				},
				{
					path: '/:apiVersion/account/:accountHashId/monitor/:monitorHashID',
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
					path: '/:apiVersion/account/:accountHashId/monitor',
					action: 'monitorModelEntry'
				}
			],
			delete: [
				/* URIs */
				{
					path: '/:apiVersion/account/:accountHashId/monitor',
					action: 'monitorListDelete'
				},
				{
					path: '/:apiVersion/account/:accountHashId/monitor/:monitorHashID',
					action: 'monitorModelDelete'
				}
			]
		}
	}
}