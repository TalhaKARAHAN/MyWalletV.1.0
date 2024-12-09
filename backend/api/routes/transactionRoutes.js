const express = require('express');
const router = express.Router();

module.exports = (db, handleDatabaseError) => {
  // İşlem ekleme
  router.post('/', (req, res) => {
    const { AccountID, CategoryID, Amount, Date, Description } = req.body;
    if (!AccountID || !CategoryID || !Amount || !Date) {
      return res.status(400).json({ error: 'Zorunlu alanlar eksik.' });
    }

    const query = `
      INSERT INTO Transactions (AccountID, CategoryID, Amount, Date, Description) 
      VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [AccountID, CategoryID, Amount, Date, Description || null], function (err) {
      if (err) {
        handleDatabaseError(res, err);
      } else {
        res.status(201).json({ transactionId: this.lastID });
      }
    });
  });

  // Tüm işlemleri getirme
  router.get('/', (req, res) => {
    const query = `
      SELECT Transactions.*, Accounts.AccountName, Categories.CategoryName 
      FROM Transactions 
      LEFT JOIN Accounts ON Transactions.AccountID = Accounts.AccountID
      LEFT JOIN Categories ON Transactions.CategoryID = Categories.CategoryID`;
    db.all(query, [], (err, rows) => {
      if (err) {
        handleDatabaseError(res, err);
      } else {
        res.status(200).json(rows);
      }
    });
  });

  // İşlem silme
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Transactions WHERE TransactionID = ?`;
    db.run(query, [id], function (err) {
      if (err) {
        handleDatabaseError(res, err);
      } else {
        res.status(200).json({ message: 'İşlem başarıyla silindi.' });
      }
    });
  });

  return router;
};
