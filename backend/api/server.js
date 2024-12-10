const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Rotalar
const userRoutes = require('./routes/userRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const goalRoutes = require('./routes/goalRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const savingsRoutes = require('./routes/savingsRoutes');
const accountRoutes = require('./routes/accountRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Veritabanı Bağlantısı
const dbPath = process.env.DATABASE_PATH || path.resolve(__dirname, '../database/EndMyWallet.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(`Veritabanına bağlanırken hata oluştu: ${err.message}`);
  } else {
    console.log(`SQLite veritabanına başarıyla bağlandı: ${dbPath}`);
  }
});

// Ortak bir hata yönetim fonksiyonu
const handleDatabaseError = (res, err) => {
  console.error(`Veritabanı hatası: ${err.message}`);
  res.status(500).json({ error: 'Veritabanı hatası', details: err.message });
};

// Test Route
app.get('/api/test', (req, res) => {
  console.log('Test endpoint hit');
  res.status(200).send('Test route is working!');
});

// Rotaları Yükleme
app.use('/api/users', userRoutes(db, handleDatabaseError));
app.use('/api/budgets', budgetRoutes(db, handleDatabaseError));
app.use('/api/goals', goalRoutes(db, handleDatabaseError));
app.use('/api/expenses', expenseRoutes(db, handleDatabaseError));
app.use('/api/categories', categoryRoutes(db, handleDatabaseError));
app.use('/api/savings', savingsRoutes(db, handleDatabaseError));
app.use('/api/accounts', accountRoutes(db, handleDatabaseError));
app.use('/api/transactions', transactionRoutes(db, handleDatabaseError));

// Genel hata yönetimi middleware’i
app.use((err, req, res, next) => {
  console.error(`Genel bir hata yakalandı: ${err.message}`);
  res.status(500).json({ error: 'Genel sunucu hatası', details: err.message });
});

// Bilinmeyen rotalar için middleware
app.use((req, res) => {
  res.status(404).json({ error: 'Bilinmeyen bir rota talep ettiniz', route: req.originalUrl });
});


router.post('/user/login', (req, res) => {
  console.log("Login request received");
  // Daha fazla log ekleyin
});

// Sunucu Başlatma
module.exports = app;
