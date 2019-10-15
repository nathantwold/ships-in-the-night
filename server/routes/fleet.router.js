const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route 
 */
router.get('/', (req, res) => {
    
});

/**
 * POST route 
 */
router.post('/', (req, res, next) => {  
    const groupname = req.body.groupname;
    const password = req.body.password;
    const queryText = `INSERT INTO "groups" (name, password) VALUES ($1, $2) RETURNING id;`;
    pool.query(queryText, [groupname, password])
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(500));
  });

/**
 * PUT route 
 */
router.get('/', (req, res) => {
    
});

module.exports = router;