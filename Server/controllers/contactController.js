import Contact from '../models/Contact.js';

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const contact = await Contact.create({
      name,
      email,
      subject,
      message
    });

    res.status(201).json({
      message: 'Thank you for your message! We will get back to you soon.',
      contact
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all contact submissions (Admin only)
// @route   GET /api/contact
// @access  Private/Admin
export const getContacts = async (req, res) => {
  try {
    const { replied } = req.query;
    const query = {};

    if (replied !== undefined) {
      query.replied = replied === 'true';
    }

    const contacts = await Contact.find(query).sort({ createdAt: -1 });

    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark contact as replied
// @route   PUT /api/contact/:id/replied
// @access  Private/Admin
export const markAsReplied = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    contact.replied = true;
    contact.repliedAt = new Date();
    await contact.save();

    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

