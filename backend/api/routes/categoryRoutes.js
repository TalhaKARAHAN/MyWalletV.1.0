module.exports = (db, handleDatabaseError) => {
  const express = require('express');
  const router = express.Router();

  // GET - Tüm kategorileri al
  router.get('/', (req, res) => {
      const query = 'SELECT * FROM Categories';
      db.all(query, [], (err, rows) => {
          if (err) {
              handleDatabaseError(res, err);
          } else {
              res.status(200).json(rows);
          }
      });
  });

  // POST - Yeni kategori ekle
  router.post('/', (req, res) => {
      const { categoryName, type } = req.body; // categoryName ve type alınır
      if (!categoryName || !type) {
          return res.status(400).json({ error: 'Kategori adı (categoryName) ve tipi (type) zorunludur.' });
      }

      const query = 'INSERT INTO Categories (CategoryName, Type) VALUES (?, ?)';
      db.run(query, [categoryName, type], function (err) {
          if (err) {
              handleDatabaseError(res, err);
          } else {
              res.status(201).json({ categoryId: this.lastID }); // Eklenen kategori ID'si döndürülür
          }
      });
  });

  return router;
};
