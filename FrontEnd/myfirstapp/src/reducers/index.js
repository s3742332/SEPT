import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import securityReducer from "./securityReducer";
import userReducer from "./userReducer";
import bookReducer from "./bookReducer";
import transactionReducer from "./transactionReducer";
import cartReducer from "./cartReducer";
import reviewReducer from "./reviewReducer";

export default combineReducers({
  errors: errorReducer,
  security: securityReducer,
  user: userReducer,
  book: bookReducer,
  transaction: transactionReducer,
  cart: cartReducer,
  review: reviewReducer
});

