'use strict';

const express = require('express');

const router = express.Router();

const {Note} = require('../models/note');

/* ========== GET/READ ALL ITEM ========== */
router.get('/', (req, res, next) => {
  const searchTerm = req.query;
  let re;

  if (searchTerm) {
    re = new RegExp(searchTerm, 'i');
  };

  return Note.find({$or: [{title: {$regex: re}}, {content: {$regex: re}}]})
    .sort('created')
    .then(results => {
      res.json(results);
    })
    .catch(err => console.error(err))
});

/* ========== GET/READ A SINGLE ITEM ========== */
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  return Note.findById(id)
    .then(result => {
      res.json(result)
    })
    .catch(err => {
      console.error(err);
    })
});

/* ========== POST/CREATE AN ITEM ========== */
router.post('/', (req, res, next) => {
  const {title, content} = req.body;
  const updateItem = {title, content};
  const requiredFields = ['title', 'content'];

  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in updateItem)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message)
    }
  }

  return Note.create({
    title: updateItem.title,
    content: updateItem.content
  })
    .then(note => res.location(`req.originalUrl/${note.id}`).status(201).json(note))
    .catch(err => {
      console.error(err);
    })
})


/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const updateFields = ['title', 'content'];
  const newUpdate = {};

  updateFields.forEach(field => {
    if (field in req.body) {
      newUpdate[field] = req.body[field];
    }
  })

  return Note.findByIdAndUpdate(id, {$set: newUpdate})
    .then(result => {
      return Note.findById(id)
        .then(result => {
          res.status(201).json(result)
        })
    })
    .catch(err => {
      console.error(err);
    });
});

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/:id', (req, res, next) => {
  const id = req.params.id;

  return Note.findByIdAndRemove(id)
    .then(() => res.status(204).end())
    .catch(err => {
      console.error(err);
    });
});

module.exports = router;