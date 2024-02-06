import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

interface ResponseItem {
  prompt: string;
  response: string;
}

export const fetchResponse = createAsyncThunk<ResponseItem, string>(
  'fetchResponse',
  async (payload:string) => {
    try {
      const response = await api.post("/generate", {
        search: payload,
      });
      return { prompt: payload, response: response.data };
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState: {
    responseData: [] as ResponseItem[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchResponse.fulfilled, (state, action) => {
      state.responseData.push(action.payload);
    });
  }
});

export default dataSlice.reducer;
