
export interface PostData {
    id: number;
    username: string;
    caption: string;
    image: string;
    likes: number;
}

export interface PostProps {
    id: number;
    username: string;
    caption: string;
    image: string;
}

export interface PostsPage {
    posts: PostData[],
    page: number
}

export interface PostState {
    pages: PostsPage[],
    currentPage: number,
    numberOfPages: number
}

export interface APIResponse {
    posts: PostData[],
    total: number
}

export type RootState = {
    posts: PostState
}
