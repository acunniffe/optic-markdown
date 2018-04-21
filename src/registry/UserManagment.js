import keytar from 'keytar'
import request from 'request'
import {registryHost, hardcodedRegsitry} from "./Config";

const serviceName = (registry) => `optic:`+registry

export async function addUser(email, password, registry = hardcodedRegsitry) {
	console.log(`Updated credentials for ${registry}`)
	await keytar.deletePassword(serviceName(registry), email)
	return await keytar.setPassword(serviceName(registry), email, password)
}

export async function getCredentials(registry) {
	const credentials =  await keytar.findCredentials(serviceName(registry))
	if (credentials[credentials.length-1]) {
		return {email: credentials[credentials.length-1].account, password: credentials[credentials.length-1].password}
	}
	return undefined
}

export function createUser(email, password, namespace, callback = ()=> {}, registry = hardcodedRegsitry) {
	console.log('Working...')
	const body = JSON.stringify({email, password, namespace})

	request({url: `${registryHost}/users/create`, method: 'POST', body }, (err, response, body)=> {

		if (!response) {
			console.error('No response from server. Please try again')
			callback(false)
		}

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