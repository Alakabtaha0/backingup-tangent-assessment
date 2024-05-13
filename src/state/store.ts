import { configureStore } from '@reduxjs/toolkit';
import postsSlice from './postSlice';

export const store = configureStore({
    reducer: {
        posts: postsSlice,
    }
});

