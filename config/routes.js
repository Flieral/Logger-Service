exports.default =
{
	routes: function(api)
	{
		return {
			get:
			[	
				/* URIs */
				{path: '/monitor'						, action: 'monitorList'},
				{path: '/monitor/:monitorHashID'		, action: 'monitorModel'},

				/* 	STATUS 	*/
				{path: '/Service/Status'					, action: 'Status'}
			],
			put:
			[

			],
			post:
			[
				/* URIs */
				{path: '/monitor/:monitorHashID'		, action: 'monitorModelEntry'}
			],
			delete:
			[
				/* URIs */
				{path: '/monitor'						, action: 'monitorListDelete'},
				{path: '/monitor/:monitorHashID'		, action: 'monitorModelDelete'}
			]
		};
	}
};
