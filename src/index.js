import program from 'commander'
import {parseMarkdown} from "./parser/MarkdownParser";

program
	.usage('[options] <file>')
	.version('0.1.0')
	.parse(process.argv);


const file = program.args[0]

parseMarkdown(file, (description, errors)=> {
	if (description) {
		console.log(JSON.stringify(description))
	} else {
		console.error(errors)
	}
})