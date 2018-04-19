import keytar from 'keytar'
import request from 'request'
import {registryHost, hardcodedRegsitry} from "./Config";

const serviceName = (registry) => `optic:`+registry

export async function addUser(email, password, registry = hardcodedRegsitry) {
	console.log(`Updated credentials for ${registry}`)
	return await keytar.setPassword(serviceName(registry), email, password)
}

export async function getCredentials(registry) {
	const credentials =  await keytar.findCredentials(serviceName(registry))
	if (credentials[0]) {
		return {email: credentials[0].account, password: credentials[0].password}
	}
	return undefined
}

export function createUser(email, password, namespace, callback, registry = hardcodedRegsitry) {
	const body = JSON.stringify({email, password, namespace})

	request({url: `${registryHost}/users/create`, method: 'POST', body }, (err, response, body)=> {

		if (response.statusCode === 200) {
			console.log(`User created for ${email} with namespace '${namespace}'`)
			addUser(email, password)
			callback(true)
		} else {
			console.error('User creation failed: '+ JSON.parse(body).error)
			callback(false)
		}

	})

}