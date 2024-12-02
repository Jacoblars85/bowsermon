const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])

    // new stuff to add basic character to new user
    .then(result => {
      // ID IS HERE!
      // console.log('New user Id:', result.rows[0].id);
      const createdUserId = result.rows[0].id

      // Now handle the user_characters reference:
      const insertNewUserQuery = `
        INSERT INTO "user_characters" 
          ("user_id", "character_id", "starter_1")
          VALUES
          ($1, 1, TRUE) 
          RETURNING user_id;
      `;
      const insertNewUserValues = [createdUserId]
      // SECOND QUERY ADDS user_id to user_characeters
      pool.query(insertNewUserQuery, insertNewUserValues)
        .then(result => {
          // ID IS HERE!
          // console.log('New user Id:', result.rows[0].user_id);
          const createdUserId = result.rows[0].user_id

          // Now handle the user_characters reference:
          const insertNewUserQuery = `
          INSERT INTO "user_inventory" 
            ("user_id", "items_id", "number")
            VALUES
            ($1, 1, 0),
            ($1, 2, 0),
            ($1, 3, 0),
            ($1, 4, 0),
            ($1, 5, 0),
            ($1, 6, 0),
            ($1, 7, 0),
            ($1, 8, 0),
            ($1, 9, 0),
            ($1, 10, 0),
            ($1, 11, 0),
            ($1, 12, 0),
            ($1, 13, 0),
            ($1, 14, 0),
            ($1, 15, 0)
            RETURNING user_id;;
        `;
          const insertNewUserValues = [createdUserId]

          pool.query(insertNewUserQuery, insertNewUserValues)

          .then(result => {
            // ID IS HERE!
            // console.log('New user Id:', result.rows[0].user_id);
            const createdUserId = result.rows[0].user_id
  
            // Now handle the user_characters reference:
            const insertNewUserQuery = `
            INSERT INTO "user_rewards" 
              ("user_id", "reward_id", "number")
              VALUES
              ($1, 1, 1),
              ($1, 2, 0),
              ($1, 3, 0),
              ($1, 4, 0);
          `;
            const insertNewUserValues = [createdUserId]
  
            pool.query(insertNewUserQuery, insertNewUserValues)
            // was here for basic
            .then(() => res.sendStatus(201))
          }).catch(err => {
            // catch for third query
            console.log(err);
            res.sendStatus(500)
          })
        }).catch(err => {
          // catch for third query
          console.log(err);
          res.sendStatus(500)
        })
    }).catch(err => {
      // catch for second query
      console.log(err);
      res.sendStatus(500)
    })
    // for the first query
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

router.get('/rewards', (req, res) => {

  const query = `
  SELECT "user_rewards"."id" as "id",
  "user_rewards"."user_id" as "user_id",
  "user_rewards"."reward_id" as "reward_id",
  "user_rewards"."number" as "number",
  "rewards"."name",
  "rewards"."pic"
FROM "user_rewards"
INNER JOIN "rewards"
ON "user_rewards"."reward_id" = "rewards"."id"
WHERE "user_id" = $1 AND "user_rewards"."number" > 0;
`;

const sqlValues = [req.user.id];

  pool.query(query, sqlValues)
      .then(result => {
          res.send(result.rows);
      })
      .catch(err => {
          console.log('ERROR: Get all rewards for user', err);
          res.sendStatus(500)
      })
});


router.get('/all/rewards', (req, res) => {

  const query = `
  SELECT "id",
  "name",
  "pic",
  "cost"
FROM "rewards";
`;

  pool.query(query)
      .then(result => {
          res.send(result.rows);
      })
      .catch(err => {
          console.log('ERROR: Get all rewards', err);
          res.sendStatus(500)
      })
});


router.put("/change", (req, res) => {
  // console.log('req.body', req.body.newName);
  const sqlText = `
  UPDATE "user"
    SET "username" = ($1)
    WHERE "id" = $2;
    `;

  const sqlValues = [req.body.newName, req.user.id];

  pool
    .query(sqlText, sqlValues)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Error in user.router PUT changing name,", err);
      res.sendStatus(500);
    });
});


// delete the users account
router.delete("/", (req, res) => {

  const sqlText = `
    DELETE FROM "user_inventory"
      WHERE "user_id" = $1;
      `;

  const sqlValues = [req.user.id];

  pool
    .query(sqlText, sqlValues)
    .then(result => {

      // Now handle the user_characters reference:
      const insertNewUserQuery = `
      DELETE FROM "user_characters"
        WHERE "user_id" = $1;
        `

        const sqlValues = [req.user.id];

      // SECOND QUERY DELETES user_id from user_characeters
      pool.query(insertNewUserQuery, sqlValues)
        .then(result => {

          // Now handle the user_characters reference:
          const insertNewUserQuery = `
        DELETE FROM "user"
          WHERE "id" = $1;`

          const sqlValues = [req.user.id];

          // Third QUERY DELETES user from user table
          pool.query(insertNewUserQuery, sqlValues)

            // was here for basic
            .then((result) => {
              res.sendStatus(201);
            })
        }).catch(err => {
          // catch for third query
          console.log('in the third', err);
          res.sendStatus(500)
        })
    }).catch(err => {
      // catch for second query
      console.log('in the second', err);
      res.sendStatus(500)
    })
    .catch((err) => {
      console.log("Error in user.router DELETE, deleting account", err);
      res.sendStatus(500);
    });
});


router.put("/won/battle", (req, res) => {

  const sqlText = `
  UPDATE "user"
        SET "coins" = "coins" + 10, "level_${req.body.levelId}_completed" = TRUE, "xp_level" = "xp_level" + $1
        WHERE "id" = $2;
    `;

    const sqlValues = [req.body.xp, req.user.id];

  pool.query(sqlText, sqlValues)
        .then(result => {
          res.sendStatus(201);
        })
    .catch((err) => {
      console.log("Error in user.router /won/battle PUT,", err);
      res.sendStatus(500);
    });
});


router.put("/level/up", (req, res) => {

  const sqlText = `
  UPDATE "user"
        SET "coins" = "coins" + 10, "level_${req.body.levelId}_completed" = TRUE, "xp_level" = "xp_level" + $1, "rewards_received" = "rewards_received" + 1
        WHERE "id" = $2;
    `;

    const sqlValues = [req.body.xp, req.user.id];

  pool.query(sqlText, sqlValues)
        .then(result => {
          const sqlText = `
          UPDATE "user_rewards"
                SET "number" = "number" + 1
                WHERE "user_id" = $1 AND "reward_id" = $2;
            `;
        
            const sqlValues = [req.user.id, req.body.rewardId];
        
          pool.query(sqlText, sqlValues)
                .then(result => {
          res.sendStatus(201);
        })
        .catch((err) => {
          console.log("Error in user.router /level/up PUT,", err);
          res.sendStatus(500);
        })
      })
    .catch((err) => {
      console.log("Error in user.router /level/up PUT,", err);
      res.sendStatus(500);
    });
});


// user watched credits and turns it to true
router.put("/credits", (req, res) => {
  // console.log('are we here?');
  const sqlText = `
  UPDATE "user"
    SET "credit_video_completed" = true, "coins" = "coins" + 15
    WHERE "id" = $1;
    `;

  const sqlValues = [req.user.id];

  pool
    .query(sqlText, sqlValues)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Error in user.router PUT changing credits to true,", err);
      res.sendStatus(500);
    });
});

router.put("/reward/open", (req, res) => {

  const sqlText = `
  UPDATE "user_rewards"
        SET "number" = "number" - 1
        WHERE "reward_id" = $1 AND "user_id" = $2
    `;

    const sqlValues = [req.body.rewardId, req.user.id];

  pool.query(sqlText, sqlValues)
        .then(result => {
          res.sendStatus(201);
        })
    .catch((err) => {
      console.log("Error in user.router /reward/open PUT,", err);
      res.sendStatus(500);
    });
});




module.exports = router;
