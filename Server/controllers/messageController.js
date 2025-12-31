import Message from '../models/Message.js';
import Notification from '../models/Notification.js';
import User from '../models/User.js';

// @desc    Get all messages for user
// @route   GET /api/messages
// @access  Private
export const getMessages = async (req, res) => {
  try {
    const { type } = req.query; // 'sent' or 'received'
    let query = {};

    if (type === 'sent') {
      query.from = req.user._id;
    } else if (type === 'received') {
      query.to = req.user._id;
    } else {
      // Get both sent and received
      query = {
        $or: [
          { from: req.user._id },
          { to: req.user._id }
        ]
      };
    }

    const messages = await Message.find(query)
      .populate('from', 'name email avatar')
      .populate('to', 'name email avatar')
      .sort({ createdAt: -1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single message
// @route   GET /api/messages/:id
// @access  Private
export const getMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id)
      .populate('from', 'name email avatar')
      .populate('to', 'name email avatar');

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Check if user has access
    if (message.from._id.toString() !== req.user._id.toString() &&
        message.to._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Mark as read if recipient
    if (message.to._id.toString() === req.user._id.toString() && !message.read) {
      message.read = true;
      message.readAt = new Date();
      await message.save();
    }

    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Send message
// @route   POST /api/messages
// @access  Private
export const sendMessage = async (req, res) => {
  try {
    const { to, subject, content } = req.body;

    // Validation
    if (!to || !subject || !content) {
      return res.status(400).json({ message: 'Please provide recipient, subject, and content' });
    }

    // Get recipient
    const recipient = await User.findById(to);
    if (!recipient) {
      return res.status(404).json({ message: 'Recipient not found' });
    }

    const message = await Message.create({
      from: req.user._id,
      fromName: req.user.name,
      to: recipient._id,
      toName: recipient.name,
      subject,
      content
    });

    // Create notification for recipient
    await Notification.create({
      userId: recipient._id,
      type: 'message',
      message: `New message from ${req.user.name}: ${subject}`,
      relatedId: message._id,
      relatedModel: 'Message'
    });

    await message.populate('to', 'name email avatar');

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark message as read
// @route   PUT /api/messages/:id/read
// @access  Private
export const markMessageAsRead = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Check if user is the recipient
    if (message.to.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    message.read = true;
    message.readAt = new Date();
    await message.save();

    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private
export const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    // Check if user is sender or recipient
    if (message.from.toString() !== req.user._id.toString() &&
        message.to.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Message.findByIdAndDelete(req.params.id);

    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

