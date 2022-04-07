import {applyMiddleware, createStore} from "redux";
import rootReducer, {history} from "./reducers";
import createSagaMiddleware from 'redux-saga';
import {routerMiddleware} from "connected-react-router";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(routerMiddleware(history), sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export default store;
