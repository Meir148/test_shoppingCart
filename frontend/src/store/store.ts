import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import cartAndProductReducer from '../slices/cartSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    cartAndProduct: cartAndProductReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// custom hooks
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
