const express = require('express');
const router = express.Router();

module.exports = (db, handleDatabaseError) => {
  // Yeni bütçe ekleme (POST)
  router.post('/', (req, res) => {
    const { month, budgetLimit } = req.body;
    if (!month || !budgetLimit) {
      return res.status(400).json({ error: 'Ay ve bütçe limiti zorunludur.' });
    }

    const query = `INSERT INTO Budget (Month, BudgetLimit, CurrentExpenses) VALUES (?, ?, 0)`;
    db.run(query, [month, budgetLimit], function (err) {
      if (err) {
        handleDatabaseError(res, err);
      } else {
        res.status(201).json({ budgetId: this.lastID });
      }
    });
  });

  // Tüm bütçeleri görüntüleme (GET)
  router.get('/', (req, res) => {
    const query = `SELECT * FROM Budget`;
    db.all(query, [], (err, rows) => {
      if (err) {
        handleDatabaseError(res, err);
      } else {
        res.status(200).json(rows);
      }
    });
  });

  // Tek bir bütçeyi görüntüleme (GET)
  router.get('/:id', (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM Budget WHERE BudgetID = ?`;
    db.get(query, [id], (err, row) => {
      if (err) {
        handleDatabaseError(res, err);
      } else if (row) {
        res.status(200).json(row);
      } else {
        res.status(404).json({ error: 'Bütçe bulunamadı.' });
      }
    });
  });

  // Bütçe güncelleme (PUT)
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { month, budgetLimit, currentExpenses } = req.body;
    if (!month || !budgetLimit) {
      return res.status(400).json({ error: 'Ay ve bütçe limiti zorunludur.' });
    }

    const query = `UPDATE Budget SET Month = ?, BudgetLimit = ?, CurrentExpenses = ? WHERE BudgetID = ?`;
    db.run(query, [month, budgetLimit, currentExpenses || 0, id], function (err) {
      if (err) {
        handleDatabaseError(res, err);
      } else if (this.changes > 0) {
        res.status(200).json({ message: 'Bütçe başarıyla güncellendi.' });
      } else {
        res.status(404).json({ error: 'Bütçe bulunamadı.' });
      }
    });
  });

  // Bütçe silme (DELETE)
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Budget WHERE BudgetID = ?`;
    db.run(query, [id], function (err) {
      if (err) {
        handleDatabaseError(res, err);
      } else if (this.changes > 0) {
        res.status(200).json({ message: 'Bütçe başarıyla silindi.' });
      } else {
        res.status(404).json({ error: 'Bütçe bulunamadı.' });
      }
    });
  });

  return router;
};
