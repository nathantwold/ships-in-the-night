const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route 
 */
router.get('/', (req, res) => {
    
});

/**
 * POST route to create new fleet
 */
router.post('/', (req, res, next) => {  
    const groupname = req.body.groupname;
    const password = req.body.password;
    const queryText = `INSERT INTO "public"."groups"("name", "password") VALUES($1, $2) RETURNING "public"."groups".id;`;
    pool.query(queryText, [groupname, password])
      .then((result) => res.send(result.rows[0]))
      .catch(() => res.sendStatus(500));
  });

/**
 * PUT route 
 */
router.put('/:id', (req, res) => {
    console.log(req.body, req.params);
    const queryText = `UPDATE "public"."users" SET "group_id"=$1, "admin_level"=1 WHERE "id"=$2`
    pool.query(queryText, [req.body.id, req.params.id])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500))
});

module.exports = router;