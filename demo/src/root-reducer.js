import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import analytics from './reducers/analytics';

export default (history) => combineReducers({
  router: connectRouter(history),
  analytics
})