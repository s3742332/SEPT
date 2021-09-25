import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import personReducer from "./personReducer";
import securityReducer from "./securityReducer";
import userReducer from "./userReducer";
import bookReducer from "./bookReducer";
import transactionReducer from "./transactionReducer";
import cartReducer from "./cartReducer";

export default combineReducers({
  errors: errorReducer,
  person: personReducer,
  security: securityReducer,
  user: userReducer,
  book: bookReducer,
  transaction: transactionReducer,
  cart: cartReducer
});

