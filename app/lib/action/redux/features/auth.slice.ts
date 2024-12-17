import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  accessToken: string;
  isAuth: boolean;
}

const initialState: AuthState = {
  accessToken: '',
  isAuth: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState>) => {
      // Stockage dans localStorage côté client
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth', JSON.stringify(action.payload));
      }
      return { ...action.payload };
    },
    removeAuth: () => {
      // Suppression du localStorage côté client
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth');
      }
      return initialState;
    },
    // Nouveau reducer pour hydrater l'état depuis localStorage
    hydrateAuth: (state) => {
      if (typeof window !== 'undefined') {
        const storedAuth = localStorage.getItem('auth');
        if (storedAuth) {
          return JSON.parse(storedAuth);
        }
      }
      return state;
    }
  }
});

export const { setAuth, removeAuth, hydrateAuth } = authSlice.actions;

export default authSlice.reducer;
