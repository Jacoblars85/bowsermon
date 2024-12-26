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
	('dragon 1', 30, 50, 80, 'fire blast', 40, 10, '', '', ''),
	('dragon yellow', 50, 70, 50, 'thunder', 50, 15, '', '', ''),
	('flam', 60, 60, 55, 'fireball', 35, 10, '', '', ''),
	('flam 2', 85, 40, 10, 'freeze', 55, 15, '', '', ''),
	('slime 1', 40, 60, 60, 'poison ball', 50, 20, '', '', ''),
	('slime 2', 55, 60, 50, 'leaf storm', 45, 10, '', '', ''),
	('slime 3', 20, 25, 65, 'icebeam', 65, 10, '', '', ''),
	('slime 4', 55, 35, 20, 'ember', 75, 15, '', '', ''),
	('snake 1', 100, 25, 5, 'posion bite', 45, 10, '', '', ''),
	('snake 2', 100, 55, 40, 'bite', 10, 10, '', '', ''),
	('snake 3', 60, 50, 60, 'flair bite', 30, 30, '', '', ''),
	('snake 4', 80, 50, 30, 'frostbite', 40, 40, '', '', ''),
	('eye 1', 70, 50, 70, 'blink', 10, 10, '', '', ''),
	('eye 2', 80, 60, 60, 'hypnosis', 10, 10, '', '', ''),
	('skull blue', 10, 50, 50, 'charge', 90, 90, '', '', ''),
	('skull', 40, 100, 75, 'bash', 35, 35, '', '', ''),
	('spirit 1', 30, 70, 10, 'ember', 110, 110, '', '', ''),
	('spirit 2', 80, 60, 45, 'ice ball', 25, 25, '', '', ''),
	('octapus 1', 50, 150, 50, 'water ball', 50, 50, '', '', ''),
	('octapus 2', 80, 100, 60, 'strangle', 10, 10, '', '', ''),
	('lantern red', 80, 65, 10, 'flamethrower', 60, 60, '', '', ''),
	('lantern green', 80, 65, 60, 'leaf slice', 10, 10, '', '', ''),
	('mushroom 1', 80, 65, 50, 'spore', 20, 20, '', '', ''),
	('mushroom 2', 60, 65, 10, 'solar beam', 80, 80, '', '', ''); 

	
INSERT INTO "basic_attacks" 
	("attack", "damage", "stamina")
	VALUES 
	('tackle', 5, 5),
	('poke', 1, 1);
	
	
INSERT INTO "levels" 
	("name", "enemy_id")
	VALUES 
	('lands', 10),
	('lands', 11),
	('forest', 12),
	('forest', 13),
	('mountain', 14),
	('bridge', 15),
	('mountain', 16),
	('lake', 17),
	('lake', 18),
	('castle', 19),
	('berg', 20),
	('skull', 21);
	
	
INSERT INTO "items" 
	("name", "type", "hp", "stamina", "speed", "attack", "pic", "cost", "color")
	VALUES 
	('healing pot', 'consumable', 25, 0, 0, 0, '', 10, '#FF0100'),
	('stamina pot', 'consumable', 0, 30, 0, 0, '', 10, '#00D400'),
	('speed pot', 'consumable', 0, 50, 10, 0, '', 40, '#FF9A1E'),
	('mega pot', 'consumable', 40, 40, 0, 0, '', 50, '#FFD42A'),
	('beef', 'consumable', 30, 40, 0, 0, '', 50, '#FFD42A'),
	('med kit', 'consumable', 75, 0, 0, 0, '', 70, '#FF0100'),
	('heart', 'consumable', 100, 100, 0, 0, '', 120, '#FEF202'),

	('fire', 'held', 10, 0, 0, 5, '', 100, '#000000'),
	('shield', 'held', 20, 0, 0, 0, '', 150, '#000000'),
	('feather', 'held', 0, 10, 5, 0, '', 80, '#000000'),
	('boots', 'held', 0, 10, 10, 0, '', 150, '#000000'),
	('cloud', 'held', 0, 30, 0, 0, '', 80, '#000000'),
	('boomerang', 'held', 0, 0, 0, 5, '', 100, '#000000'),
	('hammer', 'held', 0, 0, 0, 10, '', 150, '#000000'),
	('gold', 'held', 20, 0, 0, 10, '', 200, '#000000'),
	('super', 'held', 10, 15, 10, 10, '', 250, '#000000');
	
	
INSERT INTO "rewards" 
	  ("name", "pic", "cost")
	  VALUES
	  ('character mystery box', 'images/mysterBoxPic.webp', 15),
	  ('held item mystery box', 'images/1200px-ItemBoxMK8.webp', 75),
	  ('consumable item mystery box', 'images/1200px-ItemBoxMK8.webp', 25),
	  ('item mystery box', 'images/1200px-ItemBoxMK8.webp', 50);
	  
