const express = require('express');
const router = express.Router();

module.exports = (db, handleDatabaseError) => {
  // Hesap ekleme
  router.post('/', (req, res) => {
    const { AccountName, Description, Currency, InitialBalance, CurrentBalance } = req.body;
    if (!AccountName || !Currency || InitialBalance === undefined || CurrentBalance === undefined) {
      return res.status(400).json({ error: 'Hesap adı, para birimi, başlangıç bakiyesi ve mevcut bakiye zorunludur.' });
    }

    const query = `INSERT INTO Accounts (AccountName, Description, Currency, InitialBalance, CurrentBalance) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [AccountName, Description || null, Currency, InitialBalance, CurrentBalance], function (err) {
      if (err) {
        handleDatabaseError(res, err);
      } else {
        res.status(201).json({ accountId: this.lastID });
      }
    });
  });

  // Tüm hesapları getirme
  router.get('/', (req, res) => {
    const query = `SELECT * FROM Accounts`;
    db.all(query, [], (err, rows) => {
      if (err) {
        handleDatabaseError(res, err);
      } else {
        res.status(200).json(rows);
      }
    });
  });

  // Hesap ID'sine göre hesap bilgilerini getirme
  router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Accounts WHERE AccountID = ?';
    db.get(query, [id], (err, row) => {
      if (err) {
        handleDatabaseError(res, err);
      } else if (!row) {
        res.status(404).json({ error: 'Hesap bulunamadı.' });
      } else {
        res.status(200).json(row);
      }
    });
  });

  // Hesap güncelleme
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { AccountName, Description, Currency, InitialBalance, CurrentBalance } = req.body;

    if (!AccountName || !Currency || InitialBalance === undefined || CurrentBalance === undefined) {
      return res.status(400).json({ error: 'Hesap adı, para birimi, başlangıç bakiyesi ve mevcut bakiye zorunludur!' });
    }

    const query = `
      UPDATE Accounts 
      SET AccountName = ?, Description = ?, Currency = ?, InitialBalance = ?, CurrentBalance = ?
      WHERE AccountID = ?
    `;
    db.run(query, [AccountName, Description || null, Currency, InitialBalance, CurrentBalance, id], function (err) {
      if (err) {
        console.error("Database error during update:", err); // Daha fazla debug için
        handleDatabaseError(res, err);
      } else if (this.changes === 0) {
        res.status(404).json({ error: 'Hesap bulunamadı.' });
      } else {
        res.status(200).json({ message: 'Hesap başarıyla güncellendi.' });
      }
    });
  });

  // Hesap silme
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Accounts WHERE AccountID = ?`;
    db.run(query, [id], function (err) {
      if (err) {
        handleDatabaseError(res, err);
      } else if (this.changes === 0) {
        res.status(404).json({ error: 'Hesap bulunamadı.' });
      } else {
        res.status(200).json({ message: 'Hesap başarıyla silindi.' });
      }
    });
  });

  return router;
};