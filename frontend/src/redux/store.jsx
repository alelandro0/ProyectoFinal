import  {configureStore} from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index'
import thunk from 'redux-thunk';


const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});


 
const DataProvider = ({children})=>{
return(
    
    <Provider store={store}>
        {children}
    </Provider>)
    
}
console.log('esta es la exportacion de DataProvide');
export default DataProvider;