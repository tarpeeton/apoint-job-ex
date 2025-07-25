import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { Axios } from "@/lib/axios";

import {
  AuthState,
  LoginCredentials,
  LoginResponse,
  ApiError,
  User,
} from "@/types/auth";

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginCredentials,
  { rejectValue: ApiError }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    const response = await Axios.post<LoginResponse>(
      "/hr/user/sign-in?include=token",
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.token.token) {
      const token = response.data.token.token;
      const expiresTimestamp = response.data.token.expires;
      const expiresDate = new Date(expiresTimestamp * 1000);
      Cookies.set("token", token, { expires: expiresDate });
    }

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;

    if (axiosError.response?.data?.message) {
      return rejectWithValue({
        message: axiosError.response.data.message,
        status: axiosError.response.status,
      });
    }

    return rejectWithValue({
      message: "Login jarayonida xatolik yuz berdi",
      status: axiosError.response?.status,
    });
  }
});

export const logoutUser = createAsyncThunk<void, void>(
  "auth/logout",
  async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
);

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    restoreAuth: (state) => {
      const token = localStorage.getItem("token");
      const userString = localStorage.getItem("user");

      if (token && userString) {
        try {
          const user: User = JSON.parse(userString);
          state.token = token;
          state.user = user;
          state.isAuthenticated = true;
        } catch (error) {
          Cookies.remove("token");
        }
      }
    },

    clearError: (state) => {
      state.error = null;
    },

    forceLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      Cookies.remove("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.token = action.payload.token.token;
          state.isAuthenticated = true;
          state.error = null;
        }
      )

      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload?.message || "Login da bir nima xato";
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const { restoreAuth, clearError, forceLogout } = authSlice.actions;
export default authSlice.reducer;
