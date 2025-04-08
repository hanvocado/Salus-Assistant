import { configureStore } from '@reduxjs/toolkit'
import foodApi from './features/dish/foodApi'
import salusApi from './features/dish/salusApi'
export const store = configureStore({
  reducer: {
    [foodApi.reducerPath]: foodApi.reducer,
    [salusApi.reducerPath]: salusApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(foodApi.middleware)
      .concat(salusApi.middleware),


})