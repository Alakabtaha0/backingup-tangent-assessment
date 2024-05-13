import React, { useState, useEffect } from 'react';
import '../styles/posts.css';
import Post from './Post';
import { PostData, RootState } from '../utils/types';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setPages, setPostPages } from '../state/postSlice';
import { fetchPosts } from '../utils/apiCalls';


const Posts = () => {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const currentPage = useSelector((state: RootState) => state.posts.currentPage);
    const postPages = useSelector((state: RootState) => state.posts.pages);
    const dispatch = useDispatch();

    useEffect(() => {
        // Flag to track whether the component is still mounted
        let isMounted = true;

        // Check if posts for the current page exist in the Redux store
        const getPostsFromStore = postPages.find((page: any) => page.page === currentPage);

        // If posts exist in the store, update the state with these posts
        if (getPostsFromStore) {
            setPosts(getPostsFromStore.posts);
            setLoading(false);
        } else {
            // If posts do not exist in the store, fetch posts from the API
            setLoading(true);
            fetchPosts(currentPage).then((posts) => {
                if (isMounted) {
                    setPosts(posts.posts);
                    // Update the Redux store with the total number of pages
                    dispatch(setPages(Math.ceil(posts.total / 10)));
                    // Update the Redux store with the posts for the current page
                    dispatch(setPostPages({ page: currentPage, posts: posts.posts }));
                    setLoading(false);
                }
            }).catch((err) => {
                if (isMounted) {
                    // If an error occurs and the component is still mounted, log the error and stop loading
                    console.error(err);
                    setLoading(false);
                }
            });
        }

        // Cleanup function to set isMounted to false when the component unmounts
        return () => {
            isMounted = false;
        };
    }, [currentPage, postPages, dispatch]);


    return (
        <div className='display-box'>
            <div className='card-box'>
                {
                    loading ? <h1>Loading...</h1> : (
                        posts.map((post) => {
                            // Return the post component
                            return (
                                <Post
                                    key={post.id}
                                    id={post.id}
                                    username={post.username}
                                    caption={post.caption}
                                    image={post.image}
                                />
                            );
                        })
                    )
                }
            </div>

        </div>
    )
}

export default Posts;