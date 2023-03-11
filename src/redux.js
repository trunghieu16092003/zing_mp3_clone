import rootReducer from "./store/reducers/rootReducer";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";

// dùng để viết các hàm bất đồng bộ
const reduxConfig = () => {
    const store = createStore(rootReducer, applyMiddleware(thunk))
    const persistor = persistStore(store)

    return {store , persistor}
}

export default reduxConfig

