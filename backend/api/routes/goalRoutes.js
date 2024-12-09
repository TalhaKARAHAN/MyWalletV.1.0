const express = require('express');
const router = express.Router();

module.exports = (db, handleDatabaseError) => {
  // Add Goal (POST)
  router.post('/', (req, res) => {
    const { goalName, targetAmount, startDate } = req.body;
    if (!goalName || !targetAmount || !startDate) {
      return res.status(400).json({ error: 'Hedef adı, tutar ve başlangıç tarihi zorunludur.' });
    }

    const query = `INSERT INTO Goals (GoalName, TargetAmount, CurrentAmount, StartDate) VALUES (?, ?, 0, ?)`;
    db.run(query, [goalName, targetAmount, startDate], function (err) {
      if (err) {
        handleDatabaseError(res, err);
      } else {
        res.status(201).json({ goalId: this.lastID });
      }
    });
  });

  // Get All Goals (GET)
  router.get('/', (req, res) => {
    const query = `SELECT * FROM Goals`;
    db.all(query, [], (err, rows) => {
      if (err) {
        handleDatabaseError(res, err);
      } else {
        res.status(200).json(rows);
      }
    });
  });

  // Update Goal (PUT)
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { goalName, targetAmount, currentAmount, startDate } = req.body;
    if (!goalName || !targetAmount || !startDate) {
      return res.status(400).json({ error: 'Hedef adı, tutar ve başlangıç tarihi zorunludur.' });
    }

    const query = `UPDATE Goals SET GoalName = ?, TargetAmount = ?, CurrentAmount = ?, StartDate = ? WHERE GoalID = ?`;
    db.run(query, [goalName, targetAmount, currentAmount || 0, startDate, id], function (err) {
      if (err) {
        handleDatabaseError(res, err);
      } else if (this.changes > 0) {
        res.status(200).json({ message: 'Hedef başarıyla güncellendi.' });
      } else {
        res.status(404).json({ error: 'Hedef bulunamadı.' });
      }
    });
  });

  // Delete Goal (DELETE)
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM Goals WHERE GoalID = ?`;
    db.run(query, [id], function (err) {
      if (err) {
        handleDatabaseError(res, err);
      } else if (this.changes > 0) {
        res.status(200).json({ message: 'Hedef başarıyla silindi.' });
      } else {
        res.status(404).json({ error: 'Hedef bulunamadı.' });
      }
    });
  });

  return router;
};