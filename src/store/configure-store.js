 import {createStore,combineReducers,applyMiddleware} from 'redux'
 import thunk from 'redux-thunk'
import workSpaceReducer from '../reducers/workSpace-reducer'

 const configure = () =>{

    const store = createStore(combineReducers({
        workSpace : workSpaceReducer
    }),applyMiddleware(thunk))

    return store

 }


 export default configure
