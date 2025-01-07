// redux/reducer/rootReducer.ts

import { combineReducers } from 'redux';
import authReducer from './authReducer'; // Import authReducer

const rootReducer = combineReducers({
  auth: authReducer,  // Auth state will be handled by authReducer
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;  // To use in useSelector hook
