const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route 
 */
router.get('/view', (req, res) => {
    const queryText = `SELECT * FROM "users" WHERE "groupname"=$1 ORDER BY "admin_level" DESC;`;
    pool.query(queryText, [req.user.groupname])
        .then((result) => res.send(result.rows))
        .catch(() => res.sendStatus(500));
});

/**
 * POST route to create new fleet
 */
router.post('/create', (req, res, next) => {
    const groupname = req.body.groupname;
    const password = req.body.password;
    const queryText = `INSERT INTO "public"."groups"("name", "password") VALUES($1, $2) RETURNING "public"."groups".name;`;
    pool.query(queryText, [groupname, password])
        .then((result) => res.send(result.rows[0]))
        .catch(() => res.sendStatus(500));
});

/**
 * PUT route for tagging fleet creator as admin
 */
router.put('/create/:id', (req, res) => {
    const queryText = `UPDATE "public"."users" SET "groupname"=$1, "admin_level"=1 WHERE "id"=$2;`;
    pool.query(queryText, [req.body.name, req.params.id])
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(500))
});

/**
 * PUT route for tagging fleet id to user on fleet join
 */
router.put('/join', (req, res) => {
    const queryText = `UPDATE "public"."users" SET "groupname"=$1, "admin_level"=0 WHERE "id"=$2`
    pool.query(queryText, [req.body.groupname, req.body.currentUser])
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(500))
});

/**
 * PUT route for removing user from fleet
 */
router.put('/remove', (req, res) => {
    const queryText = `UPDATE "users" SET "groupname"=0, "admin_level"=0 WHERE "id" = $1;`;
    pool.query(queryText, [req.body.id])
        .then(() => res.sendStatus(201))
        .catch(() => res.sendStatus(500))
});

module.exports = router;