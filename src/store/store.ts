import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import materialReduces from './slices/materialSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      materials: materialReduces,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST"],
        },
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
