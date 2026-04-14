const Newsletter = require("../models/Newsletter");

const getNewsletterSubscribers = async (req, res, next) => {
  try {
    const subscribers = await Newsletter.find().sort({ subscribedAt: -1 });
    return res.status(200).json({
      success: true,
      count: subscribers.length,
      data: subscribers,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getNewsletterSubscribers };
