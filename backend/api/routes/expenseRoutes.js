const express = require('express');
const router = express.Router();

module.exports = (db, handleDatabaseError) => {
  // Yeni gelir/gider ekleme (POST)
  router.post('/', (req, res) => {
    const { kullaniciID, tarih, miktar, kategoriID, aciklama, tip } = req.body;
    if (!kullaniciID || !tarih || !miktar || !kategoriID || !tip) {
      return res.status(400).json({ error: 'Gerekli alanlar eksik: KullaniciID, Tarih, Miktar, KategoriID, Tip.' });
    }

    const query = `
      INSERT INTO GelirGider (KullaniciID, Tarih, Miktar, KategoriID, Aciklama, Tip)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.run(query, [kullaniciID, tarih, miktar, kategoriID, aciklama || '', tip], function (err) {
      if (err) {
        handleDatabaseError(res, err);
      } else {
        res.status(201).json({ expenseId: this.lastID });
      }
    });
  });

  // Tüm gelir/giderleri görüntüleme (GET)
  router.get('/', (req, res) => {
    const query = `SELECT * FROM GelirGider`;
    db.all(query, [], (err, rows) => {
      if (err) {
        handleDatabaseError(res, err);
      } else {
        res.status(200).json(rows);
      }
    });
  });

  // Tek bir gelir/gideri görüntüleme (GET)
  router.get('/:GelirGiderID', (req, res) => {
    const { GelirGiderID } = req.params;  // Parametreyi almak
    const query = `SELECT * FROM GelirGider WHERE GelirGiderID = ?`;
    db.get(query, [GelirGiderID], (err, row) => {
      if (err) {
        handleDatabaseError(res, err);
      } else if (row) {
        res.status(200).json(row);
      } else {
        res.status(404).json({ error: 'Gelir/Gider bulunamadı.' });
      }
    });
  });

  // Gelir/gider güncelleme (PUT)
  router.put('/:GelirGiderID', (req, res) => {
    const { GelirGiderID } = req.params;  // Parametreyi almak
    const { kullaniciID, tarih, miktar, kategoriID, aciklama, tip } = req.body;
    if (!kullaniciID || !tarih || !miktar || !kategoriID || !tip) {
      return res.status(400).json({ error: 'Gerekli alanlar eksik: KullaniciID, Tarih, Miktar, KategoriID, Tip.' });
    }

    const query = `
      UPDATE GelirGider 
      SET KullaniciID = ?, Tarih = ?, Miktar = ?, KategoriID = ?, Aciklama = ?, Tip = ?
      WHERE GelirGiderID = ?
    `;
    db.run(query, [kullaniciID, tarih, miktar, kategoriID, aciklama || '', tip, GelirGiderID], function (err) {
      if (err) {
        handleDatabaseError(res, err);
      } else if (this.changes > 0) {
        res.status(200).json({ message: 'Gelir/Gider başarıyla güncellendi.' });
      } else {
        res.status(404).json({ error: 'Gelir/Gider bulunamadı.' });
      }
    });
  });

  // Gelir/gider silme (DELETE)
  router.delete('/:GelirGiderID', (req, res) => {
    const { GelirGiderID } = req.params;  // Parametreyi almak
    const query = `DELETE FROM GelirGider WHERE GelirGiderID = ?`;
    db.run(query, [GelirGiderID], function (err) {
      if (err) {
        handleDatabaseError(res, err);
      } else if (this.changes > 0) {
        res.status(200).json({ message: 'Gelir/Gider başarıyla silindi.' });
      } else {
        res.status(404).json({ error: 'Gelir/Gider bulunamadı.' });
      }
    });
  });

  return router;
};
