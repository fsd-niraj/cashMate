import { combineReducers } from "redux";
import auth from "../auth"
import item from "../items"

export default combineReducers({
  auth, item
})