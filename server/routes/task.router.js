const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route to display open tasks
 */
router.get('/opentasks', (req, res) => {
    const queryText = `SELECT * FROM "tasks" WHERE "tasks".groupname = $1 AND "tasks".complete = false;`;
    pool.query(queryText, [req.user.groupname])
        .then((result) => res.send(result.rows))
        .catch(error => res.sendStatus(500))
});

/**
 * GET route to display my tasks
 */
router.get('/mytasks', (req, res) => {
    const queryText = `SELECT * FROM "tasks" WHERE "tasks".user_id = $1 AND "tasks".complete = false;`;
    pool.query(queryText, [req.user.id])
        .then((result) => res.send(result.rows))
        .catch(error => res.sendStatus(500))
});

/**
 * GET route to display all tasks
 */
router.get('/alltasks', (req, res) => {
    const queryText = `SELECT * FROM "tasks" WHERE "tasks".groupname = $1;`;
    pool.query(queryText, [req.user.groupname])
        .then((result) => res.send(result.rows))
        .catch(error => res.sendStatus(500))
});

/**
 * POST route 
 */
router.post('/', (req, res, next) => {
    const queryText = `INSERT INTO "public"."tasks"("groupname", "title", "detail") VALUES($1, $2, $3);`;
    pool.query(queryText, [req.body.groupname, req.body.title, req.body.detail])
        .then(() => res.sendStatus(201))
        .catch(error => res.sendStatus(500))
});

/**
 * PUT route for tagging fleet id to user on fleet join
 */
// router.put('/', (req, res) => {

// });

module.exports = router;