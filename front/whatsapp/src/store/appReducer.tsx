import authReducer from "./authReducer";
import  {combineReducers} from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import productReducer from "./productReducer";

const persistConfig = {
    key: 'root',
    storage: storage
  }
  
  const rootReducer = combineReducers({
    auth : authReducer,
    prod:productReducer
  })

export default persistReducer(persistConfig,rootReducer);
