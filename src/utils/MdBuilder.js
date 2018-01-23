import fs from 'fs'

export function newMarkdownFile(author, packageId, version) {
	const combined = author+":"+packageId+"@"+version
	const newFilePath = process.cwd() +`/${packageId}.md`

	fs.writeFile(newFilePath, contents(author, packageId, version), (err)=> {
		if(err) {
			return console.log(err);
		}

		console.log("Created Optic Markdown file at "+newFilePath);
	})

}

function contents(author, packageId, version) {
	return `<!-- metadata author=${author} name=${packageId} version=${version} --> \n\n#${packageId}`
}