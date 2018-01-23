# Optic Markdown
> Human & Machine Readable Docs

___

## Motivation 
Most of the world's programming knowledge is kept in unstructured formats that are great for humans and useless to machines. This is unfavorable because there are many practical development tasks that could be automated if computers only knew what to do. Optic Markdown has been designed from the ground up to store programming knowledge in a way that makes it accessible to be both humans and their tools for automation.

Combining your documentation with Optic's annotations will bring it to life. Static text will become code generators and static analyzers that you can use to automate your work and enforce important conventions. 

We've built Optic Markdown for use with our own products, but the entire spec and our suite of tooling is licensed under /INSERT HERE/

Design Principles:
 * Be invisible
 * Maintain full markdown interoperability
 * Abstractions should follow the form of the doccumentation


 ### Getting Started
Install the `optic-md-cli` package form NPM 
 ```javascript
 npm install optic-md-cli -g
 ```

The Cli will be useful for creating, installing and debugging Optic Markdown: 

**Creating new documentation:**
 ```javascript 
 optic-md init
 ``` 

 **Validate documentation:**
 ```javascript
 optic-md validate path/to/file.md
 ```

 **Installing documentation to Optic:**
  ```javascript
 optic-md install path/to/file.md
 ```