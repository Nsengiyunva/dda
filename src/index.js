import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
// import { reducer as FormReducer } from 'redux-form'
import createSagaMiddleware from 'redux-saga'
import { logger } from 'redux-logger'
import reducer from './_reducers'
import * as serviceWorker from './serviceWorker';
import './index.scss'
import rootSaga from './_sagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  applyMiddleware( logger, sagaMiddleware )
)
sagaMiddleware.run( rootSaga )


ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>, document.getElementById('root')
)
serviceWorker.unregister()
