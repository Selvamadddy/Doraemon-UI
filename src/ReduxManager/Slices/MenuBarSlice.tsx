import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface MenuBarStateInterface{
    isExpanded : boolean;
    selectedMenu : string; 
}

const initialState : MenuBarStateInterface = {isExpanded : true, selectedMenu : "Dashboard"}

const menuBarSlice = createSlice({
    name: 'menuBar',
    initialState,
    reducers: {
    updateMenuBarSelection(
      _state,
      action: PayloadAction<MenuBarStateInterface>
    ) {
      return action.payload;
    }
  }
})

export const { updateMenuBarSelection } = menuBarSlice.actions;
export default menuBarSlice.reducer



