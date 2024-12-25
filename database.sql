DROP TABLE IF EXISTS user_inventory;

DROP TABLE IF EXISTS user_characters;

DROP TABLE IF EXISTS user_rewards;

DROP TABLE IF EXISTS "user";

DROP TABLE IF EXISTS levels;

DROP TABLE IF EXISTS items;

DROP TABLE IF EXISTS rewards;

DROP TABLE IF EXISTS characters;

DROP TABLE IF EXISTS basic_attacks;



CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (16) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "xp_level" DEC DEFAULT 1,
	"coins" INT DEFAULT 30,
	"level_1_completed" BOOLEAN DEFAULT FALSE,
	"level_2_completed" BOOLEAN DEFAULT FALSE,
	"level_3_completed" BOOLEAN DEFAULT FALSE,
	"level_4_completed" BOOLEAN DEFAULT FALSE,
	"level_5_completed" BOOLEAN DEFAULT FALSE,
	"level_6_completed" BOOLEAN DEFAULT FALSE,
	"level_7_completed" BOOLEAN DEFAULT FALSE,
	"level_8_completed" BOOLEAN DEFAULT FALSE,
	"level_9_completed" BOOLEAN DEFAULT FALSE,
	"level_10_completed" BOOLEAN DEFAULT FALSE,
	"credit_video_completed" BOOLEAN DEFAULT FALSE,
	"level_11_completed" BOOLEAN DEFAULT FALSE,
	"level_12_completed" BOOLEAN DEFAULT FALSE, 
	"rewards_received" INT DEFAULT 1);
	
CREATE TABLE "characters" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(20),
	"profile_pic" VARCHAR(100),
	"hp" INT,
	"stamina" INT,
	"speed" INT,
	"unique_attack" VARCHAR(50),
	"unique_damage" INT,
	"unique_stamina" INT,
	"battle_pic" VARCHAR(100));
	
CREATE TABLE "items" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(100),
	"type" VARCHAR(100),
	"hp" INT,
	"stamina" INT, 
	"speed" INT,
	"attack" INT,
	"pic" VARCHAR(100),
	"cost" INT,
	"color" VARCHAR(25));
	
CREATE TABLE "rewards" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(100),
	"pic" VARCHAR(100),
	"cost" INT);
	
CREATE TABLE "user_characters" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL REFERENCES "user" ON DELETE CASCADE,
	"character_id" INT NOT NULL REFERENCES "characters" ON DELETE CASCADE,
	"starter_1" BOOLEAN DEFAULT FALSE,
	"starter_2" BOOLEAN DEFAULT FALSE,
	"starter_3" BOOLEAN DEFAULT FALSE,
	"nickname" VARCHAR(20) DEFAULT NULL,
	"new" BOOLEAN DEFAULT TRUE,
	"xp_level" DEC DEFAULT 1,
	"merged_level" DEC DEFAULT 1,
	"item_id" INT DEFAULT NULL REFERENCES "items" ON DELETE CASCADE);
	
CREATE TABLE "basic_attacks" (
	"id" SERIAL PRIMARY KEY,
	"attack" VARCHAR(10),
	"damage" INT,
	"stamina" INT);
	
CREATE TABLE "levels" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(20),
	"enemy_id" INT NOT NULL REFERENCES "characters" ON DELETE CASCADE);
	
CREATE TABLE "user_inventory" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL REFERENCES "user" ON DELETE CASCADE,
	"items_id" INT NOT NULL REFERENCES "items" ON DELETE CASCADE,
	"number" INT);
	
CREATE TABLE "user_rewards" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT NOT NULL REFERENCES "user" ON DELETE CASCADE,
	"reward_id" INT NOT NULL REFERENCES "rewards" ON DELETE CASCADE,
	"number" INT);
	
	
	

INSERT INTO "characters" 
	("name", "hp", "stamina", "speed", "unique_attack", "unique_damage", "unique_stamina", "profile_pic", "battle_pic_back", "battle_pic_front")
	VALUES 
	('dragon 1', 30, 50, 80, 'fire blast', 40, 10, '', '', 'data:image/png;base64,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'),
	('dragon yellow', 50, 70, 50, 'wing attack', 50, 15, '', '', ''),
	('flam', 60, 60, 55, 'fireball', 35, 10, '', 'data:image/png;base64,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', ''),
	('flam 2', 85, 40, 10, '', 55, 15, '', '', ''),
	('slime 1', 40, 60, 60, '', 50, 20, '', '', ''),
	('slime 2', 55, 60, 50, '', 45, 10, '', '', ''),
	('slime 3', 20, 25, 65, '', 65, 10, '', '', ''),
	('slime 4', 55, 35, 20, '', 75, 15, '', '', ''),
	('snake 1', 100, 25, 5, '', 45, 10, '', '', ''),
	('snake 2', 100, 55, 40, '', 10, 10, '', '', ''),
	('snake 3', 60, 50, 60, '', 30, 30, '', '', ''),
	('snake 4', 80, 50, 30, '', 40, 40, '', '', ''),
	('eye 1', 70, 50, 70, '', 10, 10, '', '', ''),
	('eye 2', 80, 60, 60, '', 10, 10, '', '', ''),
	('skull blue', 10, 50, 50, '', 90, 90, '', '', ''),
	('skull', 40, 100, 75, '', 35, 35, '', '', ''),
	('spirit 1', 30, 70, 10, '', 110, 110, '', '', ''),
	('spirit 2', 80, 60, 45, '', 25, 25, '', '', ''),
	('octapus 1', 50, 150, 50, '', 50, 50, '', '', ''),
	('octapus 2', 80, 100, 60, '', 10, 10, '', '', ''),
	('lantern red', 80, 65, 10, '', 60, 60, '', '', ''),
	('lantern green', 80, 65, 60, '', 10, 10, '', '', ''),
	('mushroom 1', 80, 65, 50, '', 20, 20, '', '', ''),
	('mushroom 2', 60, 65, 10, '', 80, 80, '', '', ''); 

	
INSERT INTO "basic_attacks" 
	("attack", "damage", "stamina")
	VALUES 
	('tackle', 5, 5),
	('poke', 1, 1);
	
	
INSERT INTO "levels" 
	("name", "enemy_id")
	VALUES 
	('bowser lands', 10),
	('bowser lands', 11),
	('outside forest', 12),
	('forest', 13),
	('mountain', 14),
	('bridge', 15),
	('mountain', 16),
	('lake', 17),
	('lake', 18),
	('peach castle', 19),
	('wario berg', 20),
	('wario skull', 21);
	
	
INSERT INTO "items" 
	("name", "type", "hp", "stamina", "speed", "attack", "pic", "cost", "color")
	VALUES 
	('healing mushroom', 'consumable', 25, 0, 0, 0, 'images/redMushroomPic.webp', 10, '#FF0100'),
	('stamina mushroom', 'consumable', 0, 30, 0, 0, 'images/greenMushroomPic.webp', 10, '#00D400'),
	('propeller mushroom', 'consumable', 0, 50, 10, 0, 'images/propelerMushroomPic.webp', 40, '#FF9A1E'),
	('mega mushroom', 'consumable', 40, 40, 0, 0, 'images/megaMushroomPic.webp', 50, '#FFD42A'),
	('mega healing mushroom', 'consumable', 75, 0, 0, 0, 'images/bigRedMushroomPic.webp', 70, '#FF0100'),
	('golden mushroom', 'consumable', 100, 100, 0, 0, 'images/goldMushroomPic.webp', 120, '#FEF202'),
	('fire flower', 'held', 10, 0, 0, 5, 'images/fireFlowerPic.webp', 100, '#000000'),
	('shield', 'held', 20, 0, 0, 0, 'images/linkShieldPic.png', 150, '#000000'),
	('feather', 'held', 0, 10, 5, 0, 'images/featherPic.webp', 80, '#000000'),
	('boots', 'held', 0, 10, 10, 0, 'images/bootsPic.webp', 150, '#000000'),
	('cloud flower', 'held', 0, 30, 0, 0, 'images/cloudFlowerPic.webp', 80, '#000000'),
	('boomerang', 'held', 0, 0, 0, 5, 'images/boomarangPic.webp', 100, '#000000'),
	('hammer', 'held', 0, 0, 0, 10, 'images/hammerPic.png', 150, '#000000'),
	('gold flower', 'held', 20, 0, 0, 10, 'images/goldFlowerPic.webp', 200, '#000000'),
	('super star', 'held', 10, 15, 10, 10, 'images/starPic.webp', 250, '#000000');
	
	
INSERT INTO "rewards" 
	  ("name", "pic", "cost")
	  VALUES
	  ('character mystery box', 'images/mysterBoxPic.webp', 15),
	  ('held item mystery box', 'images/1200px-ItemBoxMK8.webp', 75),
	  ('consumable item mystery box', 'images/1200px-ItemBoxMK8.webp', 25),
	  ('item mystery box', 'images/1200px-ItemBoxMK8.webp', 50);
	  
