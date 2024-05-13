/**
 * Check if a post is liked by the user.
 * This function checks the local storage for an item with the key `liked-{id}`.
 * If the item exists, it returns `true`, indicating that the post is liked.
 * If the item does not exist, it returns `false`, indicating that the post is not liked.
 *
 * @param {number} id - The unique identifier of the post.
 * @returns {boolean} `true` if the post is liked, `false` otherwise.
 */
export const checkLiked = (id: number): boolean => {
    // Check if the post is liked, if it is return true otherwise return false
    const liked = localStorage.getItem(`liked-${id}`);
    if (!liked) {
        return false;
    }
    return true;
}
