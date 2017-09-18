import Immutable from 'immutable'

/**
 *
 * @param {Immutable.Map} state
 * @param {object} exclude
 */
export function cleanse(state, exclude = []) {
	return state.withMutations(state => {
		exclude.forEach(exclusion => {
			if(Array.isArray(exclusion)) {
				const reducer  = exclusion[ 0 ]
				const keyPaths = exclusion[ 1 ]

				if(!Array.isArray(keyPaths)) {
					throw TypeError(`Expected value to be an array, instead received ${typeof keyPaths}`)
				}

				keyPaths.forEach(keyPath => {
					if(typeof keyPath === 'string') {
						state = state.deleteIn([ reducer, keyPath ])
					}
					else if(Array.isArray(keyPath)) {
						state = state.deleteIn([ reducer, ...keyPath ])
					}
				})
			}
			else if(typeof exclusion === 'string') {
				state = state.delete(exclusion)
			}
		})
	})
}

const persistState = options => createStore => (reducers, initialState=Immutable.Map(), ...rest) => {
	let persistedState

	try {
		persistedState = Immutable.fromJS(JSON.parse(sessionStorage.getItem(options.name)))
		initialState = initialState.merge(persistedState)
	} catch(e) {
		console.warn('Unable to retrieve state from session storage', e)
	}

	const store = createStore(reducers, initialState, ...rest)
	store.subscribe(() => {
		const state = cleanse(store.getState(), options.exclude)
		try {
			sessionStorage.setItem(options.name, JSON.stringify(state.toJS()))
		} catch(e) {
			console.warn('Unable to persist state to session storage', e)
		}
	})
	return store
}

export default persistState