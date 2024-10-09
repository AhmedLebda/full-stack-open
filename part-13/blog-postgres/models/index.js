const Blog = require("./blog");
const UserBlog = require("./user_blog");
const User = require("./user");

Blog.belongsTo(User);
User.hasMany(Blog, { as: "created_blogs" });

User.belongsToMany(Blog, { through: UserBlog, as: "reading_list" });
Blog.belongsToMany(User, { through: UserBlog, as: "liked_by" });
module.exports = {
	Blog,
	User,
	UserBlog,
};
