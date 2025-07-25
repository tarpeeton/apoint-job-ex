import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { Axios } from "@/lib/axios";
import { IMaterial } from '../../types/material';


interface MaterialState {
  data: IMaterial[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MaterialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const fetchMaterials = createAsyncThunk<IMaterial[]>(
  "materials/fetchMaterials",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("token");

      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1)
        .toISOString()
        .split("T")[0];
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
        .toISOString()
        .split("T")[0];

      const res = await Axios.get("/reports/reports/materials", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          sort: "name",
          start,
          end,
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err || "Xatolik yuz berdi");
    }
  }
);

const materialSlice = createSlice({
  name: "materials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMaterials.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchMaterials.fulfilled,
        (state, action: PayloadAction<IMaterial[]>) => {
          state.isLoading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchMaterials.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default materialSlice.reducer;
