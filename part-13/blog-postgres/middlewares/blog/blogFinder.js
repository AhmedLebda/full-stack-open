const { Blog } = require("../../models/index");
const { AssociatedDataError } = require("../../util/error_classes");

const blogFinder = async (req, _res, next) => {
	const blog = await Blog.findByPk(req.params.id);
	if (!blog) throw new AssociatedDataError("Blog not found");
	req.blog = blog;
	next();
};

module.exports = blogFinder;
