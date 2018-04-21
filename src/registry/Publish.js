import {parseMarkdownFile} from "../parser/MarkdownParser";
import {addUser, getCredentials} from "./UserManagment";
import {hardcodedRegsitry, registryHost} from "./Config";
import request from "request";
import pJson from '../../package'
export function publishPackage(filePath, callback, registry = hardcodedRegsitry) {
	setupPublishRequest(filePath, (pubReq)=> {

		if (pubReq) {
			// console.log(pubReq)

			const body = JSON.stringify(pubReq)

			request({url: `${registryHost}/packages/create`, method: 'POST', body}, (err, response, body) => {

				if (response.statusCode === 200) {
					console.log(`Package published as ${pubReq.namespace}:${pubReq.packageName}@${pubReq.version}`)
				} else {
					console.error('Package could not be published ' + JSON.parse(body).error)
				}

			})
		}

	}, registry)
}

export function setupPublishRequest(filePath, callback, registry = hardcodedRegsitry) {
	parseMarkdownFile(filePath, (description, errors, contents) => {

		if (!!errors.length) {
			console.error('Markdown is invalid: ' + JSON.stringify(errors))
			callback()
		} else {
			const metadata = description.metadata
			console.log(`Publishing ${metadata.author}:${metadata.name}@${metadata.version}`)
			const credentials = getCredentials(registry).then((creds)=> {
				if (!creds) {
					console.error('No credentials saved. Run optic-md adduser OR createuser')
					callback()
					return
				}

				const pubRequest = {
					namespace: metadata.author,
					packageName: metadata.name,
					version: metadata.version,
					email: creds.email,
					password: creds.password,
					mdVersion: pJson.version,
					contents

				}

				callback(pubRequest)

			})
		}

	})
}