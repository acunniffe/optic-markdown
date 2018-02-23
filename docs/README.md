# Optic Markdown
> Human & Machine Readable Docs

___

## Motivation 
Most of the world's programming knowledge is kept in unstructured formats that are great for humans and useless to machines. This is unfavorable because there are many practical development tasks that could be automated if computers only knew what to do. Optic Markdown has been designed from the ground up to store programming knowledge in a way that makes it accessible to be both humans and their tools of automation.

Combining your documentation with Optic's annotations will bring your work to life. Text will become code generators, static analyzers and other tools that you can use to automate your work and enforce important conventions. 

We've built Optic Markdown for use with our own products, but the entire spec and our suite of tooling is licensed under /INSERT HERE/

Design Principles:
 * Be invisible
 * Maintain full markdown interoperability
 * Follow the form of the doccumentation

## Getting Started 
The specification relies on annotations stored in normal markdown. These annotations are wrapped in comments so they do not affect the presentation of your existing documentation. 

Here's an example: 
```markdown
<!-- DEPENDENCIES 
 optic:restful
 jswizard:express-js@4.16.0
  -->
## Normal Markdown 
text about the above header
```


If you have worked with markdown before, you should be ready to go. If you are unfamilier with markdown, we suggest you take a look at this [great introduction from Github](https://guides.github.com/features/mastering-markdown/).

### Tooling
 * Your favorite text editor 
 * Optic Markdown Cli `npm install optic-markdown-cli -g`


# How Optic Works
Optic provides a clean API for reading and manipulating source code. 

expand on this....

## The Compile Phase


# Writing Optic Markdown


## Lenses
Lenses are the most important part of Optic Markdown. They describe individual blocks of code such as an API Route, data model, page, reducer, mapview, etc. A Lens takes example code and compiles it into a code generator, parser, and mutator used by Optic API to interface with source code. 

> Design Goal: Remain human friendly by creating a robust notation for building code generators and parsers while avoiding AST Trees and template syntax. 

A simple lens for requireJS might look like this in markdown:
````markdown
<!-- 
lens-def
name="import using require"
"definedAs" <=> definedAs
"pathTo".containing <=> pathTo
-->
```javascript
const definedAs = require('pathTo')
```
````

Notice how the example code is just ordinary Javascript; this is typical of all lenses and keeps your documentation clean. 

Optic annotations are automatically connected to the code snippets they appear directly above. So in this case our lens for `import using require` is attached to the example code in this block. 

Before we discuss the rest of the annotation let's examine what happens when we compile this lens and add it to an Optic project. 




## Schemas 

## Containers

## Objects

## Publishing Information
If you intend to publish an Optic Pacakge to the registry you must provide the following meta information within the Markdown file. 

* **Author** - Your username or an organization's username. Only usernames you control are applicable and you will be required to authenticate yourself during the publishing process. 

* **Package Name** - The name of your package. Must be unique within the author's namespace. 

* **Version** - The [semantic version](https://semver.org/) of this package. Republishing versions is supported locally, but not on a private or public registry. 


## Dependencies 
You may find yourself wanting to reference/include funtionality from other packages. Optic supports dependencies to be declared from within markdown. The preffered style is to place the following annotation at the top of your file.  

References follow the following format `author:package-name@version`. If you want to default to the latest package you can leave out `@version`. 

```markdown
<!-- DEPENDENCIES 
 optic:restful
 jswizard:express-js@4.16.0
  -->
```




























