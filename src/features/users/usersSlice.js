import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { client } from "../../api/client";

const usersAdaptor = createEntityAdapter();
const initialState = usersAdaptor.getInitialState();

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await client.get("/fakeApi/users");
  return response.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, usersAdaptor.setAll);
  },
});

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdaptor.getSelectors((state) => state.users);

export default usersSlice.reducer;
