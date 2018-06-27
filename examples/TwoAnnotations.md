<!-- Package {"author": "ABC", "package": "DEF", "version": "0.1.10"} -->
# Test File
Contents of the test file

<!-- Schema
 {  "id": "testing",
    "type": "object"
 }
 -->

## Lens

<!-- Lens
 {
 	"name": "Import with Require",
 	"id": "import-with-require",
 	"value": {
 		"definedAs": {
 			"type": "token",
 			"at": {
 				"nodeType": "Identifier",
 				"range": {
 					"start": 7,
 					"end": 14
 				}
 			}
 		},
 		"pathTo": {
 			"type": "literal",
 			"at": {
 				"nodeType": "Literal",
 				"range": {
 					"start": 26,
 					"end": 34
 				}
 			}
 		}
 	},
 	"schema": {
 		"type": "object"
 	}
 }
 -->
```javascript
const definedAs = require('pathTo')
```


## Transformation

<!-- Transformation
 {
 	"yields": "Transformed Thing",
 	"id": "test-transform",
 	"input": "optic:abc@1.1.1/input",
 	"output": "optic:abc@1.1.1/output"
 }
 -->
```javascript
ask.forPrimitive('name', 'desc', 'string')
function transform(input, answers) {
    return input
}
```
