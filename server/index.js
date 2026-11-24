import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

const CLIENT_DIST = path.resolve(__dirname, '..', 'client', 'dist', 'client', 'browser');
const DATA_DIR = path.join(__dirname, 'data');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

app.use(express.json());

// ---------- API ----------
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Contact form submissions -> stored locally (swap for email/CRM later)
app.post('/api/contact', (req, res) => {
  const { firstName, lastName, email, message } = req.body ?? {};

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  const entry = {
    firstName: String(firstName).trim(),
    lastName: String(lastName).trim(),
    email: String(email).trim(),
    message: String(message).trim(),
    receivedAt: new Date().toISOString(),
  };

  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    const existing = fs.existsSync(MESSAGES_FILE)
      ? JSON.parse(fs.readFileSync(MESSAGES_FILE, 'utf8'))
      : [];
    existing.push(entry);
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(existing, null, 2));
    res.status(201).json({ success: true, message: 'Thank you! Your message has been received.' });
  } catch (err) {
    console.error('Failed to save contact message', err);
    res.status(500).json({ error: 'Something went wrong. Please try again later.' });
  }
});

// ---------- Static Angular app ----------
if (fs.existsSync(CLIENT_DIST)) {
  app.use(express.static(CLIENT_DIST));
  // SPA fallback for non-API GET routes
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      res.sendFile(path.join(CLIENT_DIST, 'index.html'));
    } else {
      next();
    }
  });
}

app.listen(PORT, () => {
  console.log(`Awareness USA server listening on http://localhost:${PORT}`);
  if (!fs.existsSync(CLIENT_DIST)) {
    console.log('Angular build not found yet — run "npm run build" inside client/ for production, or "ng serve" for dev.');
  }
});
