import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface CartState {
  items: Product[];
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: [],
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'cartAndProduct/fetchProducts',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:5000/api/products/',{

        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to load products');
    }
  }
);

const cartAndProductSlice = createSlice({
  name: 'cartAndProduct',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingProduct = state.items.find(item => item.id === product.id);
      if (!existingProduct) {
        state.items.push(product);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setCart: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
    },
    updateCartProduct: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const product = state.items.find(item => item.id === id);
      if (product) {
        product.stock = quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { addToCart, removeFromCart, setCart, clearCart, updateCartProduct } = cartAndProductSlice.actions;

export default cartAndProductSlice.reducer;
