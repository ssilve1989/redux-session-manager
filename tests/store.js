import { combineReducers } from 'redux';

export const sampleState = Object.freeze({
	b: {
		c: {
			d: 1
		},
		e: {
			x: 123
		},
		f: {
			h: 243
		}
	}
})

export const reducer = (state=[], action) => {
	switch(action.type) {
	case 'SAMPLE_ACTION' : {
		return state.concat(action.payload)
	}
	default: return state;
	}
}

export const combinedReducers = combineReducers({ app: reducer });