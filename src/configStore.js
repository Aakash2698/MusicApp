import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./Reducers";
import Api from "./service_api/index";
// confi;
// const composeEnhancers = composeWithDevTools({
//     realtime: true
// });

const middlewares = [thunk.withExtraArgument(Api)];
// if (process.env.NODE_ENV !== "production") {
//   middlewares.push(
//     createLogger({
//       colors: {
//         title: () => "inherit",
//         prevState: () => "red",
//         action: () => "#03A9F4",
//         nextState: () => "#4CAF50",
//         error: () => "#F20404",
//       },
//     })
//   );
// }

// const store = createStore(reducer, composeEnhancers(applyMiddleware(...middlewares)));
// const store = createStore(reducer, applyMiddleware(...middlewares));
const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(...middlewares)
    // other store enhancers if any
  )
);
export default store;
