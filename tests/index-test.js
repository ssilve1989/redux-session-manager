import expect from 'expect'
import persistState, { cleanse, deleteInPath } from 'src/index'
import { reducers, sampleState } from './store'
import { compose, createStore } from 'redux'

describe('Plain Object', () => {
	describe('deleteInPath', () => {
		it('deletes a nested property', () => {
			const a = { b: { c: { d: 1 } } }
			deleteInPath(a, [ 'b', 'c', 'd' ])
			expect(a.b.c.d).toNotExist
		})
	})

	describe('Cleanse', () => {
		let state
		beforeEach(() => {
			state = Object.assign({}, sampleState)
		})

		it('deletes an entire branch of an object', () => {
			const newState = cleanse(state, [ 'b' ])
			expect(newState).toEqual({})
		})

		it('deletes a specific nested entry', () => {
			const newState = cleanse(state, [
				[ 'b', [
					[ 'c', 'd' ],
					'e',
					[ 'f', 'h' ]
				] ]
			])

			expect(newState).toEqual({
				b: {
					c: {},
					f: {}
				}
			})
		})
	})

	describe('Store', () => {
		let createPersistentStore
		beforeEach(() =>{
			createPersistentStore = compose(persistState({ name: 'Test', }))(createStore)
			sessionStorage.clear()
		})

		it('serializes the correct state', () => {
			const store = createPersistentStore(reducers)
			store.dispatch({ type: 'SAMPLE_ACTION', payload: 2 })

			expect(store.getState().app).toEqual([ 2 ])
			expect(JSON.parse(sessionStorage.getItem('Test'))).toEqual({
				app: [ 2 ]
			})
		})

		it('excludes part of state', () => {
			const createPersistentStore = compose(persistState({ name: 'Test', exclude: ['app'] }))(createStore)
			const store = createPersistentStore(reducers)
			store.dispatch({ type: 'SAMPLE_ACTION', payload: 2 });
			expect(store.getState().app).toEqual([ 2 ]);
			expect(JSON.parse(sessionStorage.getItem('app'))).toNotExist();

		})

		it('deserializes the correct state', () => {
			sessionStorage.setItem('Test', JSON.stringify({ app: [ 4 ]}))
			const store = createPersistentStore(reducers)
			expect(store.getState()).toEqual({ app : [ 4 ]})
		})
	})
})