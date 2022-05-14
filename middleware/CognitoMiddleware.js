var cognitoUser = userPool.getCurrentUser();

if (cognitoUser != null) {
	cognitoUser.getSession(function(err, result) {
		if (result) {
			console.log('You are now logged in.');

			// Add the User's Id Token to the Cognito credentials login map.
			AWS.config.credentials = new AWS.CognitoIdentityCredentials({
				IdentityPoolId: 'YOUR_IDENTITY_POOL_ID',
				Logins: {
					'cognito-idp.<region>.amazonaws.com/<YOUR_USER_POOL_ID>': result.getIdToken().getJwtToken()
				}
			});
		}
	});
}