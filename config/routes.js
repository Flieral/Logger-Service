exports.default =
{
	routes: function(api)
	{
		return {
			get:
			[	
				/* URIs */
				{path: '/:apiVersion/monitor'						, action: 'monitorList'},
				{path: '/:apiVersion/monitor/:monitorHashID'		, action: 'monitorModel'},

				/* 	STATUS 	*/
				{path: '/:apiVersion/Service/Status'					, action: 'Status'}
			],
			put:
			[

			],
			post:
			[
				/* URIs */
				{path: '/:apiVersion/monitor/:monitorHashID'		, action: 'monitorModelEntry'}
			],
			delete:
			[
				/* URIs */
				{path: '/:apiVersion/monitor'						, action: 'monitorListDelete'},
				{path: '/:apiVersion/monitor/:monitorHashID'		, action: 'monitorModelDelete'}
			]
		};
	}
};
