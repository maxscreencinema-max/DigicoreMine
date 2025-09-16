const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const users = [];

// JWT middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Register with optional referral
app.post('/api/register', async (req, res) => {
  try {
    const { username, password, referral } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword, referral, earnings: 0, miners: 0 });
    res.status(201).send('User registered successfully');
  } catch {
    res.status(500).send('Error registering user');
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).send('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send('Invalid credentials');

  const token = jwt.sign({ username: user.username }, 'your_jwt_secret', { expiresIn: '1h' });
  res.json({ token });
});

// Dashboard data
app.get('/api/dashboard', authenticateToken, (req, res) => {
  const user = users.find(u => u.username === req.user.username);
  res.json({
    hashrate: `${(user.miners * 10 + Math.floor(Math.random() * 5))} MH/s`,
    earnings: `$${(user.earnings + Math.random() * 5).toFixed(2)}`,
    miners: user.miners,
    referral: user.referral || null,
  });
});

// Simulate mining (increase earnings/miners over time)
setInterval(() => {
  users.forEach(user => {
    user.earnings += 0.1; 
    user.miners += Math.random() < 0.1 ? 1 : 0; 
  });
}, 5000);

app.listen(3000, () => console.log('Server running on port 3000'));
