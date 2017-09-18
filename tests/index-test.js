import expect from 'expect'
import { deleteInPath } from 'src/index';
import { cleanse } from 'src/index';
import sampleState from './state';

describe('Plain Object Store', () => {
	describe('deleteInPath', () => {
		it('deletes a nested property', () => {
			const a = { b: { c: { d: 1 } } };
			deleteInPath(a, [ 'b', 'c', 'd' ]);
			expect(a.b.c.d).toNotExist;
		});
	});

	describe('Cleanse', () => {
		let state;
		beforeEach(() => {
			state = Object.assign({}, sampleState);
		});

		it('deletes an entire branch of an object', () => {
			const newState = cleanse(state, [ 'b' ]);
			expect(newState).toEqual({});
		});

		it('deletes a specific nested entry', () => {
			const newState = cleanse(state, [
				[ 'b', [
					[ 'c', 'd' ],
					'e',
					[ 'f', 'h' ]
				]]
			]);

			expect(newState).toEqual({
				b: {
					c: {},
					f: {}
				}
			});
		});
	});
});