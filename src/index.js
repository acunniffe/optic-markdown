import {parseMarkdown} from "./parser/MarkdownParser";
import {parse} from "./parser/stages/ParseStage";

parse('./examples/Importing-JS.md', (desc, errors)=> {
	console.log(JSON.stringify(desc))
	console.log(errors)
})