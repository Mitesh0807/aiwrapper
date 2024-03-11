import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

interface ResponseItem {
  prompt: string;
  response: string;
}

export const fetchResponse = createAsyncThunk<ResponseItem, string>(
  'fetchResponse',
  async (payload:string, {getState, rejectWithValue}) => {

    
  const isNewChat = getState()?.data?.isNewChat;
  const chatId = getState()?.data?.chatId;
    
//     //? New
    const newChatBody = {
    "chatFlag" : isNewChat,
    "prompt": payload,
    "user_id": localStorage.getItem("userId"),
}

//   //? Existing
  const existingChatBody = {
  "chatFlag" : isNewChat,
    "prompt": payload,
    "chatID": chatId,
    }

    const body = isNewChat ? newChatBody: existingChatBody

    console.log(body);
    

    try {
      const response = await api.post("/chatHistory/chat", body);

      console.log(response.data);
      
      return { prompt: payload, response: response?.data?.promptResponse, chatId: response.data?._id, chatType : body?.chatFlag };
    } catch (error) {
      console.error("Error fetching data:", error);
      return rejectWithValue(error);
    }
  }
);

export const getUserId = createAsyncThunk<ResponseItem, string>(
  'getUserId',
  async (payload:string) => {
    console.log(payload);
    try {
      const response = await api.post("/user/add",payload);
      console.log(response.data);
      return response.data.response._id;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
);

//! full chat history sidebar
export const getChatHistory = createAsyncThunk ('getChatHistory',
async ()=>{
  console.log(localStorage.getItem('userId'));
  
  try {
    const resposne = await api.post("/chatHistory/getHistory",
    {
       user_id : localStorage.getItem('userId')      
    })
    console.log(resposne);
    return resposne.data
  } catch (error) {
    console.log(error);
  }
})

//! get chat history by id
export const getChatHistoryById = createAsyncThunk('getChatHistoryById',
async (id:string, {rejectWithValue})=>{

  console.log(id);

  const payload = {
    chat_id : id,
  }
  try {
    console.log(id);
    const response = await api.post('/chatHistory/getDetails',payload)
    return response?.data
  } catch (error) {
    console.log(error);
    console.log(rejectWithValue);
  }
})

const dataSlice = createSlice({
  name: "data",
  initialState: {
    isNewChat: true,
    responseData: [] as ResponseItem[],
    chatId:"",
    chatHistoryData: [],
    isAnimate: true,
  },
  reducers: {
    enableNewChat :(state)=>{
      state.isNewChat = true;
    },
    
    disabledNewChat: (state)=>{
      state.isNewChat = false;
    },
    clearChatHistory: (state)=>{
      state.responseData = [];
    },
    enableAnimation: (state)=>{
      state.isAnimate = true;
    },
    disableAnimation:(state)=>{
      state.isAnimate = false;
    }  
  },
  extraReducers: (builder) => {
    builder.addCase(fetchResponse.fulfilled, (state, action) => {
      console.log(action.payload)
      state.responseData.push(action.payload);
    });
    builder.addCase(getUserId.fulfilled,(_,action)=>{
      localStorage.setItem("userId",action.payload)
    })
    builder.addCase(getChatHistoryById.fulfilled,(state,action)=>{
      console.log(action.payload);
      
      const chatHistory = action?.payload?.reqsponse;
      
      console.log(chatHistory);
      state.chatId = chatHistory[0]?.chatID;
      state.isNewChat = false;

      const arr = []
      
      chatHistory.forEach((chat) => {
      arr.push({ 
      prompt: chat.promptDetails, 
      response: chat?.promptResponse, 
      chatId: chat?.chatID, 
      chatType: false 
    })

    state.responseData = arr
    });

    console.log(state.responseData);
      
    })
    builder.addCase(getChatHistory.fulfilled,(state,action)=>{
      state.chatHistoryData = action?.payload?.response
    })
  }
});

export const { enableNewChat,disabledNewChat,clearChatHistory,enableAnimation,disableAnimation} = dataSlice.actions

export default dataSlice.reducer;
