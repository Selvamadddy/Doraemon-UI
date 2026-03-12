import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type ProfileSettingModel from "../../../Components/Settings/Model/ProfileSettingModel";

const initialState: ProfileSettingModel = {
    id: 0,
    name: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    profileImage: ""
  };

const userDetailSlice = createSlice({
  name: "userDetail",
  initialState,
  reducers: {

    AddUserDetail(_, action: PayloadAction<ProfileSettingModel>) {
        return action.payload;
    }
  }
});

export const {AddUserDetail} = userDetailSlice.actions;
export default userDetailSlice.reducer;