#!/usr/bin/env node

import program from 'commander'
import prompt from 'prompt'
import {parseMarkdownFile, parseMarkdownString} from "./parser/MarkdownParser";
import {newMarkdownFile} from "./helpers/MdBuilder";
import {addUser, createUser} from "./registry/UserManagment";
import pJson from '../package.json'
import {publishPackage} from "./registry/Publish";

prompt.message = '';

program
	.usage('[options] <file>')
	.version(pJson.version)
	.option('-r, --raw', 'Parse raw text')
	.parse(process.argv);


const fileOrString = program.args[0]

if (program.args[0] === "init") {

	prompt.get(['author', 'package', 'version'], function (err, result) {
		newMarkdownFile(result.author, result['package'], result.version)
		return
	});
} else if (program.args[0] === "adduser") {

	const schema = {
		properties: {
			email: {
				required: true
			},
			password: {
				required: true,
				hidden: true
			}
		}
	};

	prompt.get(schema, function (err, result) {
		addUser(result.email, result.password)
		return
	})


} else if (program.args[0] === "createuser") {

	const schema = {
		properties: {
			email: {
				required: true,
			},
			password: {
				required: true,
				hidden: true
			},
			namespace: {
				required: true,
			}
		}
	};

	prompt.get(schema, function (err, result) {
		createUser(result.email, result.password, result.namespace)
		return
	})

} else if (program.args[0] === "publish") {
	publishPackage(program.args[1])
} else {

	if (program.raw) {

		parseMarkdownString(fileOrString || "", (description, errors) => {
			console.log(JSON.stringify({description, errors}))
		})

	} else {

		if (fileOrString) {
			parseMarkdownFile(fileOrString, (description, errors) => {
				console.log(JSON.stringify({description, errors}))
			})
		} else {
			console.warn("No file specified")
		}

	}

}