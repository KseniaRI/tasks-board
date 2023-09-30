import {  legacy_createStore as createStore } from 'redux';
import tasksReducer from './tasksReducer';

const store = createStore(tasksReducer);

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;