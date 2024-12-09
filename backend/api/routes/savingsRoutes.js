const express = require('express');
const router = express.Router();

module.exports = (db, handleDatabaseError) => {
  // Birikim ekleme (POST)
  router.post('/', (req, res) => {
    const { month, amount, type, description } = req.body;
    if (!month || !amount || isNaN(amount)) {
      return res.status(400).json({ error: 'Geçerli bir ay ve miktar belirtilmelidir.' });
    }

    const query = `
      INSERT INTO Savings (Month, Amount, Type, Description) 
      VALUES (?, ?, ?, ?)
    `;
    db.run(query, [month, amount, type || 'Genel', description || ''], function (err) {
      if (err) {
        handleDatabaseError(res, err);
      } else {
        res.status(201).json({ savingsId: this.lastID });
      }
    });
  });

  // Tüm birikimleri getirme (GET)
  router.get('/', (req, res) => {
    const query = `SELECT * FROM Savings`;
    db.all(query, [], (err, rows) => {
      if (err) {
        handleDatabaseError(res, err);
      } else {
        res.status(200).json(rows);
      }
    });
  });

  // Birikim güncelleme (PUT)
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { month, amount, type, description } = req.body;

    if (!month || !amount || isNaN(amount)) {
      return res.status(400).json({ error: 'Geçerli bir ay ve miktar belirtilmelidir.' });
    }

    const query = `
      UPDATE Savings
      SET Month = ?, Amount = ?, Type = ?, Description = ?
      WHERE SavingsID = ?
    `;
    db.run(query, [month, amount, type || 'Genel', description || '', id], function (err) {
      if (err) {
        handleDatabaseError(res, err);
      } else if (this.changes === 0) {
        res.status(404).json({ error: 'Birikim bulunamadı.' });
      } else {
        res.status(200).json({ message: 'Birikim başarıyla güncellendi.' });
      }
    });
  });

  // Birikim silme (DELETE)
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Savings WHERE SavingsID = ?`;
    db.run(query, [id], function (err) {
      if (err) {
        handleDatabaseError(res, err);
      } else if (this.changes === 0) {
        res.status(404).json({ error: 'Birikim bulunamadı.' });
      } else {
        res.status(200).json({ message: 'Birikim başarıyla silindi.' });
      }
    });
  });

  return router;
};
