// This is where we actually build the store, using Redux Library.abs
// For the most part we don't have to change this file.
// There's going to be some boilerplate here
import {compose, applyMiddleware, Store, createStore} from 'redux';
import thunk from 'redux-thunk';
import {state} from './reducers';
import { persistStore, persistReducer, persistCombineReducers } from 'redux-persist'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import storage from 'redux-persist/lib/storage'
import {loginReducer} from './reducers'
// This line lets us use Redux dev tools, take from redux dev tools documentation
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// Apply redux thunk "middleware". In Redux, middleware takes place between an action being dispatched
// and it hitting the reduccer. We use thunk as boilerplate in case we need any asyncrhnous
// action dispatching
const persistConfig = {
    key: 'root',
    stateReconciler: hardSet,
    storage,
    whitelist:['user']
  }
const enhancer = composeEnhancers(
    applyMiddleware(thunk)
)


//actually build the store, our global state
export const store : Store<any> = createStore(
    state,
    enhancer
)
// const persistedReducer = persistReducer(persistConfig, loginReducer);


// export const store = createStore(persistedReducer, enhancer);
// export const persistor = persistStore(store)
    
  