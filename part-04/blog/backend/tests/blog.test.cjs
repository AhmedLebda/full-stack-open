const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper.cjs");
const blogsData = require("./blogsData.cjs");

describe("Total Likes", () => {
    test("of empty list equal to 0", () => {
        const result = listHelper.totalLikes(blogsData.emptyBlogList);
        assert.equal(result, 0);
    });

    test("when list has only one blog equals the likes of that", () => {
        const result = listHelper.totalLikes(blogsData.listWithOneBlog);
        assert.equal(result, 5);
    });

    test("of a bigger list is calculated right", () => {
        const result = listHelper.totalLikes(blogsData.listWithSeveralBlogs);
        assert.equal(result, 36);
    });
});

describe("Favorite Blogs", () => {
    test("of one value is the value itself", () => {
        const result = listHelper.favoriteBlog(blogsData.listWithOneBlog);
        assert.deepStrictEqual(result, blogsData.listWithOneBlog);
    });

    test("of many is calculated right"),
        () => {
            const result = listHelper.favoriteBlog(
                blogsData.listWithSeveralBlogs
            );
            assert.deepStrictEqual(result, blogsData.listWithSeveralBlogs[2]);
        };

    test("of empty array is zero", () => {
        const result = listHelper.favoriteBlog(blogsData.emptyBlogList);
        assert.deepStrictEqual(result, 0);
    });
});
