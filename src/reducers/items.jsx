import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemList: []
};

const item = createSlice({
  name: "item",
  initialState,
  reducers: {
    addItem(state, action) {
      const inCartItem = state.itemList.find((data) => data._id === action.payload._id);
      const newItemData = {
        name: action.payload.name,
        quantity: action.payload.quantity,
        price: action.payload.price,
        totalItemPrice: action.payload.price,
        _id: action.payload._id
      }
      if (inCartItem) {
        inCartItem.quantity++
        inCartItem.totalItemPrice = inCartItem.price * inCartItem.quantity
      } else {
        state.itemList = [...state.itemList, newItemData];
      }
    },
    removeItem(state, action) {
      state.itemList = state.itemList.filter((data) => data._id !== action.payload);
    },
    incrementQty(state, action) {
      const item = state.itemList.find((data) => data._id === action.payload);
      if (item) {
        item.quantity++
        item.totalItemPrice = item.price * item.quantity
      };
    },
    decrementQty(state, action) {
      const inCartItem = state.itemList.find((data) => data._id === action.payload);
      if (inCartItem && inCartItem.quantity > 1) {
        inCartItem.quantity--
        inCartItem.totalItemPrice = inCartItem.price * inCartItem.quantity
      };
    },
    resetItems() {
      return initialState;
    }
  }
});

export const { addItem, removeItem, incrementQty, decrementQty, resetItems } = item.actions;
export default item.reducer;