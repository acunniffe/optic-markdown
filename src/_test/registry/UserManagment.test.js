import assert from 'assert'
import {addUser, createUser, getCredentials} from "../../registry/UserManagment";

describe('user management', ()=> {

	it('can save and retrieve credentials for a registry', (done)=> {

		addUser('test@gmail.com', 'password', 'test-registry').then(()=> {

			getCredentials('test-registry').then((creds)=> {
				assert(creds)
				assert(creds.email === 'test@gmail.com')
				assert(creds.password === 'password')
				done()
			})

		})

	})

	it('will return undefined if no credentials exist', (done)=> {

		getCredentials('test-registry2').then((creds)=> {
			assert(!creds)

			done()
		})

	})

	// describe.only('creating a user', ()=> {
	// 	it('a can create a user', (done)=> {
	// 		createUser('testaccofunt123@gmail.com', 'passAASS21!'+Math.random(), 'namespfacetest', (results)=> {
	//
	// 			done()
	// 		})
	//
	//
	// 	})
	// })



})