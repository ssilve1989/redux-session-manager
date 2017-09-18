import expect from 'expect'
import Immutable from 'immutable'
import { sampleState } from './store'
import { cleanse } from 'src/immutable'
import { compose, createStore } from 'redux'
import { combineReducers } from 'redux-immutable';
import persistState from '../src/immutable'

describe('Immutable State', () => {
	let state
	beforeEach(() => {
		state = Immutable.fromJS(sampleState)
	})
	describe('Cleanse', () => {
		it('deletes an entire branch of an object', () => {
			const newState = cleanse(state, [ 'b' ])
			expect(newState.toJS()).toEqual({})
		})

		it('deletes a specific nested entry', () => {
			const newState = cleanse(state, [
				[ 'b', [
					[ 'c', 'd' ],
					'e',
					[ 'f', 'h' ]
				] ]
			])

			expect(newState.toJS()).toEqual({
				b: {
					c: {},
					f: {}
				}
			})
		})
	});

	describe('Store', () => {
		const createPersistentStore = compose(persistState({ name: 'TestImmutable' }))(createStore)
		const reducers = combineReducers({
			app: (state = Immutable.List(), action) => {
				switch(action.type) {
					case 'SAMPLE' :
						return state.push(action.payload);
					default:
						return state;
				}
			}
		});
		beforeEach(() => {
			sessionStorage.clear();
		});

		it('serializes the correct state', () => {
			const store = createPersistentStore(reducers)

			store.dispatch({ type: 'SAMPLE', payload: 2 });

			expect(store.getState().get('app').toJS()).toEqual([ 2 ]);
			expect(JSON.parse(sessionStorage.getItem('TestImmutable'))).toEqual({
				app: [ 2 ]
			});
		});

		it('deserializes the correct state', () => {
			const preloadedState = Immutable.Map({ app : [ 4 ]});
			sessionStorage.setItem('TestImmutable', JSON.stringify(preloadedState));
			const store = createPersistentStore(reducers);

			expect(store.getState().toJS()).toEqual(preloadedState.toJS());
		});
	});
});