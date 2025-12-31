import News from '../models/News.js';

// @desc    Get all news
// @route   GET /api/news
// @access  Public
export const getNews = async (req, res) => {
  try {
    const { category, limit } = req.query;
    const query = {};

    if (category) query.category = category;

    let newsQuery = News.find(query).sort({ createdAt: -1 });

    if (limit) {
      newsQuery = newsQuery.limit(parseInt(limit));
    }

    const news = await newsQuery;

    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single news
// @route   GET /api/news/:id
// @access  Public
export const getNewsItem = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    // Increment views
    news.views += 1;
    await news.save();

    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create news
// @route   POST /api/news
// @access  Private/Admin
export const createNews = async (req, res) => {
  try {
    const { title, content, category, image } = req.body;

    // Validation
    if (!title || !content) {
      return res.status(400).json({ message: 'Please provide title and content' });
    }

    const news = await News.create({
      title,
      content,
      category: category || 'General',
      image: image || '',
      author: req.user.name,
      authorId: req.user._id
    });

    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update news
// @route   PUT /api/news/:id
// @access  Private/Admin
export const updateNews = async (req, res) => {
  try {
    const { title, content, category, image } = req.body;

    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    if (title) news.title = title;
    if (content) news.content = content;
    if (category) news.category = category;
    if (image !== undefined) news.image = image;

    const updatedNews = await news.save();

    res.json(updatedNews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete news
// @route   DELETE /api/news/:id
// @access  Private/Admin
export const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    await News.findByIdAndDelete(req.params.id);

    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

