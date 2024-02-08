import api from "@/utils/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface ApiData {
    id: string;
    apiType: string;
    apiName: string;
    apiKey: string;
    apiPurpose?: string;
}


const userId = localStorage.getItem('userId');


export const getAllApiKeys = createAsyncThunk<string, ApiData>('getAllApiKeys', async (payload) => {
    console.log(payload);
    try {
        const response = await api.get(`/user/getAllApi/${userId}`)
        console.log(response.data);

        return response.data
    } catch (error) {
        console.log(error);
    }
})

export const addApiKey = createAsyncThunk<string, ApiData>('addApiKey', async (payload) => {
    console.log(payload);
    const data = payload
    payload.id = "65c35b1f73dc212cb9b9c78d"
    // console.log(data);

    try {
        const response = await api.post("/user/addAPI", payload)
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
})

export const deleteApiKey = createAsyncThunk<string, ApiData>('deleteApiKey', async (payload) => {
    console.log(payload);
    const data = {
        id: payload,
        userId: userId
    }
    try {
        console.log(data);
        const response = await api.delete("/user/deleteApiID", { data })
        console.log(response.data);
        // return response.data
    } catch (error) {
        console.log(error);
    }
})

export const findApiKeyById = createAsyncThunk<string, ApiData>('updateApiKey', async (payload) => {
    console.log(payload);
    try {

        return { msg: "ok" }
        // const response = await api.post("", payload)
        // console.log(response);
        // return response.data
    } catch (error) {
        console.log(error);
    }
})

export const updateApiKey = createAsyncThunk<string, ApiData>('updateApiKey', async (payload) => {
    console.log(payload);
    try {

        return { msg: "ok" }
        // const response = await api.post("", payload)
        // console.log(response);
        // return response.data
    } catch (error) {
        console.log(error);
    }
})



const apiSlice = createSlice({
    name: 'allApi',
    initialState: {
        allApiData: []
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(addApiKey.fulfilled, (state, action) => {
            console.log(state);
            console.log(action.payload);

        })
        builder.addCase(getAllApiKeys.fulfilled, (state, action) => {
            state.allApiData = action.payload;
        })
    }
})


export default apiSlice.reducer