import expect from 'expect';
import Immutable from 'immutable';
import sampleState from './state';
import { cleanse } from 'src/immutable';

describe('Immutable State', () => {
	let state;
	beforeEach(() => {
		state = Immutable.fromJS(sampleState);
	});
	describe('Cleanse', () => {
		it('deletes an entire branch of an object', () => {
			const newState = cleanse(state, ['b']);
			expect(newState.toJS()).toEqual({});
		});

		it('deletes a specific nested entry', () => {
			const newState = cleanse(state, [
				['b', [
					['c', 'd'],
					'e',
					['f', 'h']
				]]
			]);

			expect(newState.toJS()).toEqual({
				b: {
					c: {},
					f: {}
				}
			});
		});
	});
});