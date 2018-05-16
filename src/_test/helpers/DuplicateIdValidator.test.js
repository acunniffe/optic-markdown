import assert from 'assert'
import {collectDuplicateIdErrors} from "../../helpers/DuplicateIdValidator";
import {DuplicateIdsFoundInMarkdown} from "../../Errors";
import equals from 'deep-equal'

describe('Duplicate Id Validator', ()=> {

	it('finds no errors for unique sdk objects', ()=> {

		const objs = [{id: 'test'}, {id: 'test2'}, {id: 'test3'}]

		assert(!collectDuplicateIdErrors(objs).length)
	})

	it('collects errors for duplicates', ()=> {
		const objs = [{id: 'test'}, {id: 'test2'}, {id: 'test2'}, {id: 'test3'}, {id: 'test3'}]
		assert(collectDuplicateIdErrors(objs).length === 2)
		assert(equals(collectDuplicateIdErrors(objs)[0], DuplicateIdsFoundInMarkdown("test2")))
		assert(equals(collectDuplicateIdErrors(objs)[1], DuplicateIdsFoundInMarkdown("test3")))
	})

})