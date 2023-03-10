import axios from 'axios';
import { createAsyncThunk, AnyAction, AsyncThunk } from '@reduxjs/toolkit';
import { IUser } from './../types/IUser';

interface IUserApi {
  getAllUsers: AsyncThunk<IUser[], undefined, {rejectValue: string}>;
  error: any;
}
export const userApi = (): IUserApi => {

  const allUsers = () =>
    createAsyncThunk<IUser[], undefined, {rejectValue: string}>(
      'users/allUsers',
      async (_, { rejectWithValue }) => {
        return await axios
          .get('http://localhost:3100/user/allUsers')
          .then((res) => res.data)
          .catch((err) => rejectWithValue(err));
      }
    );

  // const createUser = () =>
  //   createAsyncThunk<IUser[], undefined, {rejectValue: string}>(
  //     'users/createUser',
  //     async (_, { rejectWithValue }) => {
  //       return await axios
  //         .get('http://localhost:3100/user/createUser')
  //         .then((res) => res.data)
  //         .catch((err) => rejectWithValue(err));
  //     }
  //   );

  // const updateUser = () =>
  //   createAsyncThunk<IUser[], undefined, {rejectValue: string}>(
  //     'users/updateUser',
  //     async (_, { rejectWithValue }) => {
  //       return await axios
  //         .get('http://localhost:3100/user/updateUser')
  //         .then((res) => res.data)
  //         .catch((err) => rejectWithValue(err));
  //     }
  //   );

  // const deleteUser = () =>
  //   createAsyncThunk<IUser[], undefined, {rejectValue: string}>(
  //     'users/deleteUser',
  //     async (_, { rejectWithValue }) => {
  //       return await axios
  //         .get('http://localhost:3100/user/deleteUser')
  //         .then((res) => res.data)
  //         .catch((err) => rejectWithValue(err));
  //     }
  //   );

  const isError = (action: AnyAction) => {
    return action.type.endsWith('rejected');
  };

  return {
    getAllUsers: allUsers(),
    // createUser: createUser(),
    // updateUser: updateUser(),
    // deleteUser: deleteUser(),
    error: isError,
  };
};
