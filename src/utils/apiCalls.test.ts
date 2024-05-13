import { postLike, fetchPosts } from "./apiCalls";

describe("postLike", () => {
    test("should update the like status of a post", async () => {
        // Arrange
        const id = 1;
        const liked = true;
        const expected = { id, liked };
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ post: expected })
            })
        ) as jest.Mock;
        // Act
        const result = await postLike(id, liked);
        // Assert
        expect(result).toEqual(expected);
    });

    test("should throw an error if the request fails", async () => {
        // Arrange
        const id = 1;
        const liked = true;
        global.fetch = jest.fn(() => Promise.reject("Failed to fetch")) as jest.Mock;
        // Act
        const action = async () => await postLike(id, liked);
        // Assert
        await expect(action).rejects.toThrow("Failed to update post");
    });
});