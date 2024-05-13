import { checkLiked } from "./validation";

describe("checkLiked()", () => {
    beforeEach(() => {
        // Clear localStorage before each test to ensure isolation
        localStorage.clear();
    });

    test('should return true if the post is liked', () => {
        // Arrange
        const id = 1;
        localStorage.setItem(`liked-${id}`, 'true');

        // Act
        const result = checkLiked(id);

        // Assert
        expect(result).toBe(true);
    });

    test('should return false if the post is not liked', () => {
        // Arrange
        const id = 2;

        // Act
        const result = checkLiked(id);

        // Assert
        expect(result).toBe(false);
    });

    test('should return false if there is no entry in localStorage', () => {
        // Arrange
        const id = 3;

        // Act
        const result = checkLiked(id);

        // Assert
        expect(result).toBe(false);
    });
});