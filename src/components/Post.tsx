import React, { useState } from 'react'
import '../styles/post.css';
import { PostProps, RootState } from '../utils/types';
import heartRegular from '../assets/heart-regular.svg';
import heartSolid from '../assets/heart-solid.svg';
import { updatePost } from '../state/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { checkLiked } from '../utils/validation';
import { postLike } from '../utils/apiCalls';

const Post: React.FC<PostProps> = ({ id, username, caption, image }) => {
    const [isLiked, setIsLiked] = useState<boolean>(() => checkLiked(id));
    const numberOfLikes = useSelector((state: RootState) => state.posts.pages.flatMap((page: any) => page.posts).find((post: any) => post.id === id)?.likes);
    const dispatch = useDispatch();


    /**
     * Handle the like/unlike action for a post.
     *
     * This function updates the local storage to keep track of liked posts,
     * sends a post request to update the like status on the server,
     * and updates the Redux store with the new post data.
     * It also toggles the `isLiked` state to reflect the new like status.
     */
    const handleLikePost = () => {
        // Save/Delete the liked post in local storage
        if (!isLiked) {
            localStorage.setItem(`liked-${id}`, 'true');
        } else {
            localStorage.removeItem(`liked-${id}`);
        }

        // Due to the async nature of isLiked, we need to pass the opposite value
        postLike(id, !isLiked)
            .then((newPost) => {
                // Dispatch the updated post to the Redux store
                dispatch(updatePost(newPost));
            })
            .catch((err) => {
                // Log any errors that occur during the request
                console.error(err);
            });

        // Toggle the isLiked state
        setIsLiked(!isLiked);
    };




    return (
        <div key={id} className='layout-box'>
            <div className='image-sect'>
                <img src={image} alt='test' />
            </div>
            <div className='like-sect'>
                <img src={isLiked ? heartSolid : heartRegular} onClick={handleLikePost} alt='heart-svg' />
                <h6>{numberOfLikes} Likes</h6>
            </div>
            <div className='description-sect'>
                <p><span>{username}:</span>{caption}</p>
            </div>
        </div>
    )
}

export default Post