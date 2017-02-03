exports.config = {

	apiServerUrl: 'http://localhost:7878',

	sessionService: {
		sessionTimeout: 300,
		keepAliveInterval: 10,
		sessionKeepAliveUrl: 'http://localhost:7878/keepAlive',
		sessionCookies: ['OAuth', 'bizToken']
	},

	httpService: {
		defaultHeaders: {
			'Content-Type': 'application/json',
			'publicClientId': '12345678'
		},
		headersToSendFromPreviousResponse: [
			{
				headerNameInPreviousResponse: 'CCPToken',
				headerNameToSendInRequest: 'CCPToken'
			}
		],
		sendSessionCookieValuesInRequestHeaders: true,
		cookieValuesHeaders: [
			{
				headerName: 'Authorization',
				headerValue: 'Bearer {OAuth}'
			},
			{
				headerName: 'bizToken',
				headerValue: '{bizToken}' 
			}
		]
	},


	contentService: {
  		staticBaseUrl: "http://localhost:3000/assets",
  		bundles: {
  			static_test: {
  				businessId : "BUSIDSTATICTEST",
  				locale: "en_US"
  			}
  		}
	},

	customConfig: {
		logoutUrl: 'http://localhost:9001/logout'
	}

}