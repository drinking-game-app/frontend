import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/AuthReducer'



export const createComposedStore(initialState: { user: { name: string; email: string; password: string; confirm_password: string; }; toRegister: boolean; canSubmit: boolean; token: string; actionSuccess: boolean; } | undefined):any => {
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(thunk, reduxImmutableStateInvariant()),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
  );
  return store;
}