const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route to display open tasks
 */
router.get('/opentasks', (req, res) => {
    const queryText = `SELECT * FROM "tasks" WHERE "groupname"=$1 AND "complete"=FALSE AND "username"='none' ORDER BY "due" ASC nulls first, "id" ASC;`;
    pool.query(queryText, [req.user.groupname])
        .then((result) => res.send(result.rows))
        .catch(error => res.sendStatus(500))
});

/**
 * GET route to display my tasks
 */
router.get('/mytasks', (req, res) => {
    const queryText = `SELECT * FROM "tasks" WHERE "username"=$1 AND "complete"=false ORDER BY "due" ASC nulls first, "id" ASC;`;
    pool.query(queryText, [req.user.username])
        .then((result) => res.send(result.rows))
        .catch(error => res.sendStatus(500))
});

/**
 * GET route to display all tasks
 */
router.get('/alltasks', (req, res) => {
    const queryText = `SELECT * FROM "tasks" WHERE "tasks".groupname=$1 ORDER BY "complete" DESC, "due" ASC nulls first, "id" ASC;`;
    pool.query(queryText, [req.user.groupname])
        .then((result) => res.send(result.rows))
        .catch(error => res.sendStatus(500))
});

/**
 * GET route to display task detail
 */
router.get('/detail/:id', (req, res) => {
    const queryText = `SELECT * FROM "tasks" WHERE "tasks".id=$1;`;
    pool.query(queryText, [req.params.id])
        .then((result) => res.send(result.rows))
        .catch(error => res.sendStatus(500))
});

/**
 * POST route for new tasks
 */
router.post('/', (req, res, next) => {
    const queryText = `INSERT INTO "tasks"("groupname", "title", "detail", "username", "due") VALUES($1, $2, $3, $4, $5);`;
    pool.query(queryText, [req.body.groupname, req.body.title, req.body.detail, req.body.username, req.body.due])
        .then(() => res.sendStatus(201))
        .catch(error => console.log('Error in POST!:', error))
});

/**
 * PUT route for marking tasks as complete
 */
router.put('/complete', (req, res) => {
    const queryText = `UPDATE "tasks" SET "complete"=NOT "complete", "username"=$1 WHERE "id"=$2;`;
    pool.query(queryText, [req.user.username, req.body.id])
        .then(() => res.sendStatus(201))
        .catch(error => res.sendStatus(500))
});

/**
 * PUT route for editing tasks
 */
router.put('/edit', (req, res) => {
    const queryText = `UPDATE "tasks" SET "title"=$1, "detail"=$2, "due"=$3 WHERE "id"=$4;`;
    pool.query(queryText, [req.body.title, req.body.detail, req.body.due, req.body.id])
        .then(() => res.sendStatus(201))
        .catch(error => res.sendStatus(500))
});

/**
 * PUT route for claiming tasks
 */
router.put('/claim', (req, res) => {
    const queryText = `UPDATE "tasks" SET "username"=$1 WHERE "id"=$2;`;
    pool.query(queryText, [req.user.username, req.body.id])
        .then(() => res.sendStatus(201))
        .catch(error => res.sendStatus(500))
});

/**
 * DELETE route for deleting task
 */
router.delete('/delete/:id', (req, res) => {
    const queryText = `DELETE FROM "tasks" WHERE "id"=$1;`;
    pool.query(queryText, [req.params.id])
        .then(() => res.sendStatus(201))
        .catch(error => res.sendStatus(500))
})

module.exports = router;