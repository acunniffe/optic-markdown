import {parseMarkdownString} from "./parser/MarkdownParser";

const parseContent = process.argv[2]

parseMarkdownString(parseContent, (description, errors) => {
	console.log(JSON.stringify({description, errors}))
})