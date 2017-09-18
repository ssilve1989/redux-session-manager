/**
 * Deletes the reference to a value specified by the path
 * @param {object} obj - source object
 * @param {Array} path - the path of keys to the target of deletion
 */
export function deleteInPath(obj, path) {
	let ref = obj
	for(let i = 0; i < path.length - 1; i++) {
		ref = ref[ path[ i ] ]
	}
	delete ref[ path[ path.length - 1 ] ]
	return obj
}

/**
 *
 * @param {object} state
 * @param {array} exclude
 */
export function cleanse(state, exclude = []) {
	state = Object.assign({}, state)

	exclude.forEach(exclusion => {
		if(Array.isArray(exclusion)) {
			// It is a key-value pair representation.
			// Meaning the first value will be the reducer name
			// and the second value will be an array of key paths
			const reducer  = exclusion[ 0 ]
			const keyPaths = exclusion[ 1 ]

			// If its not an array, inform the caller
			if(!Array.isArray(keyPaths)) {
				throw TypeError(`Expected value to be an array, instead received ${typeof keyPaths}`)
			}

			keyPaths.forEach(keyPath => {
				// Each element in the array could either be a string representing a single property
				// or an array representing a path to the property
				if(typeof keyPath === 'string') {
					delete state[ reducer ][ keyPath ]
				}
				else if(Array.isArray(keyPath)) {
					deleteInPath(state[ reducer ], keyPath)
				}
			})
		}
		else if(typeof exclusion === 'string') {
			delete state[ exclusion ]
		}
	})
	return state
}

const persistState = options => createStore => (reducers, initialState={}, ...rest) => {
	let persistedState, finalState
	try {
		persistedState = JSON.parse(sessionStorage.getItem(options.name));
		finalState     = Object.assign({}, initialState, persistedState)
	} catch(e) {
		console.warn('Unable to retrieve state from session storage', e)
	}

	const store = createStore(reducers, finalState, ...rest)
	store.subscribe(() => {
		const state = cleanse(store.getState(), options.exclude)
		try {
			sessionStorage.setItem(options.name, JSON.stringify(state))
		} catch(e) {
			console.warn('Unable to save state to session storage', e)
		}
	})
	return store
}

export default persistState