import assert from 'assert'
import {setupPublishRequest} from "../../registry/Publish";

describe('setup publish requests', function () {
	it('fails for invalid markdown', (done)=> {
		setupPublishRequest('examples/Importing-JS.md', (pubReq)=> {
			assert(!pubReq)
			done()
		})
	})

	it('prepares a request for valid markdown', (done)=> {
		setupPublishRequest('examples/ShowConfirmAlert.md', (pubReq)=> {
			assert(pubReq)
			assert(pubReq.namespace === 'aidan')
			assert(pubReq.packageName === 'showConfirm')
			assert(pubReq.version === '0.1.0')
			assert(pubReq.email)
			assert(pubReq.password)
			assert(pubReq.contents)
			done()
		}, 'test-registry')
	})

});
