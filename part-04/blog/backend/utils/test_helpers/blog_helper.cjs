// const { listWithSeveralBlogs } = require("../tests/blogsData.cjs");

// total likes for a list of blogs
const totalLikes = (blogs) => {
    return blogs.reduce((acc, curr) => {
        return acc + curr.likes;
    }, 0);
};

// list of most liked posts
const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return 0;
    }
    const maxLikes = blogs.reduce((acc, curr) => {
        return acc > curr.likes ? acc : curr.likes;
    }, 0);

    const topLiked = blogs.filter((blog) => blog.likes === maxLikes);

    return topLiked;
};

// list of authors with most blogs
const mostActiveAuthor = (blogs) => {
    if (blogs.length === 0) {
        return 0;
    }

    const authorsData = blogs.reduce((acc, curr) => {
        const author = curr.author;

        if (acc[author]) {
            acc[author] += 1;
        } else {
            acc = { ...acc, [author]: 1 };
        }
        return acc;
    }, {});

    const maxBlogs = Math.max(...Object.values(authorsData));

    const authorsList = [];
    for (author in authorsData) {
        if (authorsData[author] === maxBlogs) {
            authorsList.push({ author: author, blogs: authorsData[author] });
        }
    }
    return authorsList;
};

// list of authors with highest total Likes
const mostLikedAuthor = (blogs) => {
    const authorsData = blogs.reduce((acc, curr) => {
        const author = curr.author;

        if (acc[author]) {
            acc[author] += curr.likes;
        } else {
            acc = { ...acc, [author]: curr.likes };
        }
        return acc;
    }, {});

    const maxLikes = Math.max(...Object.values(authorsData));

    const authorsList = [];
    for (author in authorsData) {
        if (authorsData[author] === maxLikes) {
            authorsList.push({ author: author, blogs: authorsData[author] });
        }
    }

    return authorsList;
};

module.exports = {
    totalLikes,
    favoriteBlog,
    mostActiveAuthor,
    mostLikedAuthor,
};
