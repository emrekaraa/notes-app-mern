function paginatedResults(model) {
  // middleware function
  return async (req, res, next) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;
    const direction = req.query.direction ? req.query.direction : "asc";

    // calculating the starting and ending index
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalElementCount = await model.countDocuments().exec();

    const results = {};

    if (endIndex < totalElementCount) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    results.totalElementCount = totalElementCount;
    results.totalPages = Math.ceil(results.totalElementCount / limit);
    results.activePage = page;

    try {
      results.data = await model
        .find({})
        .sort({ createdAt: direction })
        .limit(limit)
        .skip(startIndex)
        .exec();
      res.paginatedResults = results;
      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

module.exports = paginatedResults;
