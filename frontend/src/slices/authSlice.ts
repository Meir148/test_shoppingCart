import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  token: localStorage.getItem('token') || null,
  isAuthenticated: false,
  error: null as string | null 
};


export const loginUser = createAsyncThunk<
  string, 
  { username: string; password: string }, 
  { rejectValue: string } 
>(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      return token;
    } catch (error) {
      return rejectWithValue('Invalid credentials');
    }
  }
);

// export const registerUser = createAsyncThunk(
//   'auth/register',
//   async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/register', { username, password });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue('Registration failed');
//     }
//   }
// );
export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { username, password });
      return response.data;
    } catch (error) {
     
      if (axios.isAxiosError(error) && error.response) {
        console.error('Registration failed:', error.response.data); 
        return rejectWithValue(error.response.data.message || 'Registration failed');
      } else {
        console.error('Network error or unexpected error', error);
        return rejectWithValue('Registration failed');
      }
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state: any, action) => {
        state.error = action.payload;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.error = null;
      })
      .addCase(registerUser.rejected, (state: any, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
