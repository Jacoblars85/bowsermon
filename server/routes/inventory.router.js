const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')


router.get('/consumable', (req, res) => {

    const query = `
    SELECT "id",
 		"item_name",
 		"item_type",
        "item_hp",
        "item_stamina",
        "item_speed",
        "item_pic",
        "item_cost",
        "item_color"
    FROM "items"
        WHERE "item_type" = 'consumable';
  `;

    pool.query(query)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('ERROR: Get all consumable items', err);
            res.sendStatus(500)
        })
});

router.get('/held', (req, res) => {

    const query = `
    SELECT "id",
 		"item_name",
 		"item_type",
        "item_hp",
        "item_stamina",
        "item_speed",
        "item_damage",
        "item_pic",
        "item_cost",
        "item_color"
    FROM "items"
        WHERE "item_type" = 'held';
  `;

    pool.query(query)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('ERROR: Get all held items', err);
            res.sendStatus(500)
        })
});

router.get('/all/items', (req, res) => {

    const query = `
    SELECT "id",
 		"item_name",
 		"item_type",
        "item_hp",
        "item_stamina",
        "item_speed",
        "item_damage",
        "item_pic",
        "item_cost",
        "item_color"
    FROM "items";
  `;

    pool.query(query)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('ERROR: Get all held items', err);
            res.sendStatus(500)
        })
});


router.get('/user/inventory', (req, res) => {

    const query = `
    SELECT "user_inventory"."id" as "id",
            "user_inventory"."user_id" as "user_id",
            "user_inventory"."items_id" as "items_id",
            "user_inventory"."number" as "number",
            "items"."item_name",
            "items"."item_hp",
            "items"."item_stamina",
            "items"."item_pic",
            "items"."item_type",
            "items"."item_speed",
            "items"."item_damage",
            "items"."item_cost",
            "items"."item_color"
    FROM "user_inventory"
        INNER JOIN "items"
    ON "user_inventory"."items_id" = "items"."id"
        WHERE "user_id" = $1 AND "user_inventory"."number" > 0 
        ORDER BY "items_id" ASC;
  `;

  const sqlValues = [req.user.id];

    pool.query(query, sqlValues)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('ERROR: Get all users inventory', err);
            res.sendStatus(500)
        })
});

router.get('/user/held', (req, res) => {

    const query = `
    SELECT "user_inventory"."id" as "id",
            "user_inventory"."user_id" as "user_id",
            "user_inventory"."items_id" as "items_id",
            "user_inventory"."number" as "number",
            "items"."item_name",
            "items"."item_hp",
            "items"."item_stamina",
            "items"."item_pic",
            "items"."item_type",
            "items"."item_speed",
            "items"."item_damage",
            "items"."item_cost",
            "items"."item_color"
    FROM "user_inventory"
        INNER JOIN "items"
    ON "user_inventory"."items_id" = "items"."id"
        WHERE "user_id" = $1 AND "user_inventory"."number" > 0 AND "items"."item_type" = 'held'
        ORDER BY "items_id" ASC;
  `;

  const sqlValues = [req.user.id];

    pool.query(query, sqlValues)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('ERROR: Get all users inventory', err);
            res.sendStatus(500)
        })
});

router.get('/user/consumable', (req, res) => {

    const query = `
    SELECT "user_inventory"."id" as "id",
            "user_inventory"."user_id" as "user_id",
            "user_inventory"."items_id" as "items_id",
            "user_inventory"."number" as "number",
            "items"."item_name",
            "items"."item_hp",
            "items"."item_stamina",
            "items"."item_pic",
            "items"."item_type",
            "items"."item_speed",
            "items"."item_damage",
            "items"."item_cost",
            "items"."item_color"
    FROM "user_inventory"
        INNER JOIN "items"
    ON "user_inventory"."items_id" = "items"."id"
        WHERE "user_id" = $1 AND "user_inventory"."number" > 0 AND "items"."item_type" = 'consumable'
        ORDER BY "items_id" ASC;
  `;

  const sqlValues = [req.user.id];

    pool.query(query, sqlValues)
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => {
            console.log('ERROR: Get all users inventory', err);
            res.sendStatus(500)
        })
});


router.put("/buy/item", (req, res) => {
    // console.log('req.body', req.body);

    const sqlText = `
    UPDATE "user_inventory"
    SET "number" = "number" + $1
      WHERE "user_id" = $2 AND "items_id" = $3;
      `;

    const insertValue = [req.body.amountNum, req.user.id, req.body.itemId]

    pool.query(sqlText, insertValue)
        .then((result) => {
            const insertNewUserQuery = `
                    UPDATE "user"
                      SET "coins" = "coins" - $1
                      WHERE "id" = $2
                      RETURNING "coins";
                      `;
            
            const insertValue = [req.body.totalCoins, req.user.id]

            pool.query(insertNewUserQuery, insertValue)
                .then(result => {
                    res.sendStatus(201);
                })
        }).catch(err => {
            // catch for second query
            console.log('in the second', err);
            res.sendStatus(500)
        })
        .catch((err) => {
            console.log("Error in inventory.router /buy PUT,", err);
            res.sendStatus(500);
        });
});


router.put("/sell/item/:id", (req, res) => {
//  console.log('req.body', req.body);

    const sqlText = `
        UPDATE "user_inventory"
        SET "number" = "number" - $1
          WHERE "user_id" = $2 AND "items_id" = $3;
          `;

    const insertValue = [req.body.amountNum, req.user.id, req.params.id]

    pool.query(sqlText, insertValue)
        .then((result) => {
            const insertNewUserQuery = `
            UPDATE "user"
            SET "coins" = "coins" + $1
            WHERE "id" = $2
            RETURNING "coins";
            `;
            
            const insertValue = [req.body.totalCoins, req.user.id]

            pool.query(insertNewUserQuery, insertValue)
                .then(result => {
                    res.sendStatus(201);
                })
        }).catch(err => {
            // catch for second query
            console.log('in the second', err);
            res.sendStatus(500)
        })
        .catch((err) => {
            console.log("Error in inventory.router /sell PUT,", err);
            res.sendStatus(500);
        });
});

router.put("/use/item/:id", (req, res) => {
    // console.log(req.body);
    const sqlText = `
            UPDATE "user_inventory"
            SET "number" = "number" - 1
              WHERE "user_id" = $1 AND "id" = $2;
              `;

    const insertValue = [req.user.id, req.params.id]

    pool.query(sqlText, insertValue)
        .then(result => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log("Error in inventory.router /use PUT,", err);
            res.sendStatus(500);
        });
});

router.put("/equip/item", (req, res) => {
    //  console.log('req.body', req.body);
        
    const sqlText = `
        UPDATE "user_inventory"
        SET "number" = "number" - 1
            WHERE "user_id" = $1 AND "items_id" = $2;
            `;

    const insertValue = [req.user.id, req.body.itemId]

    pool.query(sqlText, insertValue)
    .then((result) => {
let insertNewUserQuery;

if (req.body.oldItemId != 1) {
    insertNewUserQuery = `
          UPDATE "user_inventory"
        SET "number" = "number" + 1
            WHERE "user_id" = $1 AND "items_id" = $2;
        `;
} else {
    insertNewUserQuery = `
          UPDATE "user_inventory"
        SET "number" = "number"
            WHERE "user_id" = $1 AND "items_id" = $2;
        `;
}
        const insertValue = [req.user.id, req.body.oldItemId]

        pool.query(insertNewUserQuery, insertValue)
        .then(result => {
        const insertNewUserQuery = `
        UPDATE "user_characters"
        SET "item_id" = $1
        WHERE "user_id" = $2 AND "id" = $3
        `;
        
        const insertValue = [req.body.itemId, req.user.id, req.body.characterID]

        pool.query(insertNewUserQuery, insertValue)
        .then(result => {
            res.sendStatus(201);
        })
        })
    
        .catch(err => {
            // catch for third query
            console.log('in the third', err);
            res.sendStatus(500)
    })
    .catch(err => {
        // catch for second query
        console.log('in the second', err);
        res.sendStatus(500)
    })
    .catch((err) => {
        console.log("Error in inventory.router /equip PUT,", err);
        res.sendStatus(500);
    });
});
});

router.put("/remove/item", (req, res) => {
    //  console.log('req.body', req.body);
    
        const sqlText = `
        UPDATE "user_inventory"
        SET "number" = "number" + 1
            WHERE "user_id" = $1 AND "items_id" = $2;
              `;
    
        const insertValue = [req.user.id, req.body.oldItemId]
    
        pool.query(sqlText, insertValue)
            .then((result) => {
                const insertNewUserQuery = `
                UPDATE "user_characters"
                SET "item_id" = NULL
                WHERE "user_id" = $1 AND "id" = $2
                `;
                
                const insertValue = [req.user.id, req.body.characterID]
    
                pool.query(insertNewUserQuery, insertValue)
                    .then(result => {
                        res.sendStatus(201);
                    })
            }).catch(err => {
                // catch for second query
                console.log('in the second', err);
                res.sendStatus(500)
            })
            .catch((err) => {
                console.log("Error in inventory.router /sell PUT,", err);
                res.sendStatus(500);
            });
    });




module.exports = router;
