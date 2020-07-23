import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {createStore , applyMiddleware, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import burgerBuilder from './store/reducers/burgerBuilder'
import order from './store/reducers/order'
import thunk from 'redux-thunk'
import authReducer from './store/reducers/auth'
import createSagaMiddleware from 'redux-saga'
import {watchAuth} from '../src/store/saga'

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilder,
    order: order,
    auth: authReducer
})

const logger = store =>{
    return next =>{
        return action =>{
            console.log('[Middleware] dispatching', action);
            const result = next(action);
            console.log('[Middleware] next state', store.getState())
            return result
        }
    }
}

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(logger,thunk, sagaMiddleware))
sagaMiddleware.run(watchAuth)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
