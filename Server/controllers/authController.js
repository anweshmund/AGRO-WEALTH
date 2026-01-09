import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js';

// ================= REGISTER =================
export const register = async (req, res) => {
  try {
    const { name, email, password, role, phone, location } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role, // stored in DB
      phone: phone || '',
      location: location || ''
    });

    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body; // role is ignored on backend

    // Debug: log incoming credentials shape (not password) to backend console
    console.log('LOGIN attempt:', {
      email,
      hasPassword: typeof password === 'string' && password.length > 0
    });

    if (!email || !password) {
      console.log('LOGIN failed: missing email or password');
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });
    console.log('LOGIN user lookup result:', {
      found: !!user,
      emailSearched: email
    });

    if (!user) {
      console.log('LOGIN failed: user not found for email', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    console.log('LOGIN password match:', isMatch);

    if (!isMatch) {
      console.log('LOGIN failed: password mismatch for email', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    console.log('LOGIN success for email', email, 'role', user.role);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role, // role comes from DB
      token
    });

  } catch (error) {
    console.error('LOGIN error:', error);
    res.status(500).json({ message: error.message });
  }
};

// ================= GET CURRENT USER =================
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
