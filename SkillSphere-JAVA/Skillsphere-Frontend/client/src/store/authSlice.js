import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    role: null,
    name: null,
    id: null,
    isAuthenticated: false,
    lastCreatedConsultationId: null,
    lastCreatedWorkshopId: null, 
  },
  reducers: {
    setAuthData(state, action) {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.name = action.payload.name;  
      state.id = action.payload.id; 
      state.isAuthenticated = true;
    },
    setLastCreatedConsultationId(state, action) {
      state.lastCreatedConsultationId = action.payload; 
    },
    setLastCreatedWorkshopId(state, action) { 
      state.lastCreatedWorkshopId = action.payload;
    },
    logout(state) {
      state.token = null;
      state.role = null;
      state.name = null;
      state.id = null;
      state.isAuthenticated = false;
      state.lastCreatedConsultationId = null; 
      state.lastCreatedWorkshopId = null;
      localStorage.clear();
    },
  },
});

export const { setAuthData, logout,setLastCreatedConsultationId,setLastCreatedWorkshopId} = authSlice.actions;
export default authSlice.reducer;
