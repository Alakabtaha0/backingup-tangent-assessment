import { APIResponse, PostData } from './types';


/**
 * Update the like status of a post.
 *
 * This function sends a POST request to the server to increment or decrement the like count of a post.
 * If the post is liked, it sends a request to like the post. If the post is unliked, it sends a request to unlike the post.
 *
 * @param {number} id - The unique identifier of the post.
 * @param {boolean} liked - The new like status of the post. Pass `true` to like the post and `false` to unlike it.
 * @returns {Promise<PostData>} Returns the updated post data
 * @throws {Error} Throws an error if the request fails.
 */
export const postLike = async (id: number, liked: boolean): Promise<PostData> => {
    try {
        const response = await fetch(`http://localhost:4321/api/posts/${id}/${liked ? 'like' : 'unlike'}`, {
            method: 'POST'
        });
        const data = await response.json();
        return data.post;
    } catch (err) {
        console.error(err);
        throw new Error('Failed to update post');
    }
}



/**
 * Fetch posts from the API.
 *
 * This function retrieves posts from the API based on the specified page number.
 * It calculates the offset for pagination, fetches the posts, and returns all the posts and the total number of posts in the API.
 *
 * @param {number} page - The page number to fetch.
 * @returns {Promise<APIResponse>} A promise that resolves to an object containing the posts and the total number of posts.
 * @throws {Error} Throws an error if the fetch operation fails.
 */
export const fetchPosts = async (page: number): Promise<APIResponse> => {
    // Fetch posts from the API 

    const offset = (page - 1) * 10;
    const response = await fetch(`http://localhost:4321/api/posts?limit=10&offset=${offset}`);

    if (!response.ok) throw new Error('Failed to fetch posts');

    const data = await response.json();
    return { posts: data.posts, total: data.total };
}
