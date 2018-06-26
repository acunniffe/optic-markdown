import {parseMarkdownFile} from "../parser/MarkdownParser";
import {addUser, getCredentials} from "./UserManagment";
import {hardcodedRegsitry, registryHost} from "./Config";
import request from "request";
import pJson from '../../package'
import fs from 'fs-extra'
import os from 'os'
export function publishPackage(filePath, callback, registry = hardcodedRegsitry) {
	setupPublishRequest(filePath, (pubReq)=> {

		if (pubReq) {
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

export function publishLocal(filePath) {

	parseMarkdownFile(filePath, (description, errors, contents) => {

		if (!!errors.length) {
			console.error('Markdown is invalid: ' + JSON.stringify(errors))
			callback()
		} else {
			const info = description.info
			console.log(`Publishing ${info.author}:${info.package}@${info.version}`)

			if (process.platform === 'darwin') {
				const outputDirectory = `${os.homedir()}/Library/Application\ Support/Optic/packages/${info.author}/${info.package}/`

				const file = outputDirectory + info.version

				fs.ensureDirSync(outputDirectory)
				fs.writeJsonSync(file, description)

				console.log('Published to '+ file)


			} else {
				console.error('Optic currently only works on macOS. Can not publish locally')
			}

		}

	})
}

export function setupPublishRequest(filePath, callback, registry = hardcodedRegsitry) {
	parseMarkdownFile(filePath, (description, errors, contents) => {

		if (!!errors.length) {
			console.error('Markdown is invalid: ' + JSON.stringify(errors))
			callback()
		} else {
			const info = description.info
			console.log(`Publishing ${info.author}:${info.package}@${info.version}`)
			const credentials = getCredentials(registry).then((creds)=> {
				if (!creds) {
					console.error('No credentials saved. Run opticmd adduser OR createuser')
					callback()
					return
				}

				const pubRequest = {
					namespace: info.author,
					packageName: info.package,
					version: info.version,
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
