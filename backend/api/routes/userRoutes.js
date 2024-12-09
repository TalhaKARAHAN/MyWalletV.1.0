const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || 'fallback_secret_key';

// Rate Limiting (Opsiyonel)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 5, // Her IP için 5 giriş denemesi
  message: 'Çok fazla giriş denemesi yaptınız. Lütfen 15 dakika sonra tekrar deneyin.',
});

module.exports = (db, handleDatabaseError) => {
  // Register Route
  router.post('/user/register', (req, res) => {
    const { ad, eposta, sifre } = req.body;

    if (!ad || !eposta || !sifre) {
      return res.status(400).json({ error: 'Ad, e-posta ve şifre gereklidir.' });
    }

    const checkEmailQuery = `SELECT * FROM Kullanici WHERE Eposta = ?`;
    db.get(checkEmailQuery, [eposta], (err, user) => {
      if (err) {
        handleDatabaseError(res, err);
      } else if (user) {
        return res.status(409).json({ error: 'Bu e-posta zaten kullanılıyor.' });
      } else {
        bcrypt.hash(sifre, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: 'Şifre hashleme sırasında hata oluştu.' });
          }
          const insertQuery = `INSERT INTO Kullanici (Ad, Eposta, Sifre) VALUES (?, ?, ?)`;
          db.run(insertQuery, [ad, eposta, hash], function (err) {
            if (err) {
              handleDatabaseError(res, err);
            } else {
              res.status(201).json({ message: 'Kayıt başarılı.', userId: this.lastID });
            }
          });
        });
      }
    });
  });

  // Login Route
  router.post('/user/login', loginLimiter, (req, res) => {
    const { eposta, sifre } = req.body;

    if (!eposta || !sifre) {
      return res.status(400).json({ error: 'E-posta ve şifre gereklidir.' });
    }

    const query = `SELECT * FROM Kullanici WHERE Eposta = ?`;
    db.get(query, [eposta], (err, user) => {
      if (err) {
        handleDatabaseError(res, err);
      } else if (!user) {
        return res.status(401).json({ error: 'E-posta veya şifre hatalı.' });
      } else {
        bcrypt.compare(sifre, user.Sifre, (err, isMatch) => {
          if (err) {
            return res.status(500).json({ error: 'Şifre doğrulama sırasında hata oluştu.' });
          } else if (!isMatch) {
            return res.status(401).json({ error: 'E-posta veya şifre hatalı.' });
          } else {
            const token = jwt.sign(
              { id: user.KullaniciID, eposta: user.Eposta },
              SECRET_KEY,
              { expiresIn: '1h' }
            );
            res.status(200).json({ message: 'Giriş başarılı.', token });
          }
        });
      }
    });
  });

  return router;
};
