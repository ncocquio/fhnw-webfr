const redux = require('redux');
const logFactory = require('redux-logger');
const thunk = require('redux-thunk').default;

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */
function counterReducer(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

function waitingReducer(state = false, action) {
    switch (action.type) {
        case 'WAITING':
            return true;
        case 'NOT_WAITING':
            return false;
        default:
            return state;
    }
}

const reducers = redux.combineReducers({
    counter: counterReducer,
    waiting: waitingReducer
});

const logger = logFactory.createLogger({
    colors: false
});

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = redux.createStore(reducers, redux.applyMiddleware(thunk, logger));

function incrementAsync() {
    return (dispatch) => {
        dispatch({ type: 'WAITING' });
        setTimeout(() => {
            dispatch({ type: 'NOT_WAITING' });
            dispatch({ type: 'INCREMENT' });
        }, 2000);
    }
}

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.

store.subscribe(() => {
    console.log('\n');
    console.log(store.getState());
    console.log('\n');
});

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch(incrementAsync());
// 1
store.dispatch(incrementAsync());
// 2
store.dispatch({ type: 'DECREMENT' });
// 1