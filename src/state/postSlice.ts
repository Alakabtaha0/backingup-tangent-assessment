import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PostState, PostsPage, PostData } from '../utils/types';

const initialState: PostState = {
    pages: [],
    currentPage: 1,
    numberOfPages: 1
};

const postsSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPostPages(state, action: PayloadAction<PostsPage>) {
            // Check for duplicate pages
            const index = state.pages.findIndex(page => page.page === action.payload.page);
            if (index === -1) {
                const { page, posts } = action.payload;
                state.pages.push({ posts, page });
            }
        },
        setPages(state, action: PayloadAction<number>) {
            state.numberOfPages = action.payload;
        },
        changePage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        updatePost(state, action: PayloadAction<PostData>) {
            const { id, likes } = action.payload;
            const post = state.pages.flatMap(page => page.posts).find(post => post.id === id);
            if (post) {
                post.likes = likes;
            }
        }
    }
});

export default postsSlice.reducer;

export const { setPostPages, setPages, changePage, updatePost } = postsSlice.actions;