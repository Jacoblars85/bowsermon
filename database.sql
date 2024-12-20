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
	"rewards_received" INT DEFAULT 1
);

	
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
	("name", "hp", "stamina", "speed", "unique_attack", "unique_damage", "unique_stamina", "profile_pic", "battle_pic")
	VALUES 
	('Draggle', 30, 50, 80, 'charge', 40, 10, '', 'data:image/png;base64,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'),
	('', 60, 60, 55, 'shell smash', 35, 10, ''),
	('', 50, 70, 50, 'bone swing', 50, 15, '', ''),
	('', 85, 40, 10, 'slap', 55, 15, ''),
	('', 40, 60, 60, 'lick', 50, 20, '', ''),
	('', 55, 60, 50, 'hammer bash', 45, 10, '', ''),
	('', 20, 25, 65, 'chomp', 65, 10, '', ''),
	('', 55, 35, 20, 'fireball', 75, 15, '', ''),
	('', 100, 25, 5, 'body slam', 45, 10, '', ''),
	('', 100, 55, 70, 'headbutt', 10, 10, '', ''),
	('', 160, 50, 60, 'slap', 15, 10, '', ''),
	('', 180, 50, 30, 'cane wack', 20, 15, '', ''),
	('', 170, 50, 85, 'banana shot', 55, 10, '', ''),
	('', 190, 60, 60, 'ice blast', 35, 10, '', ''),
	('', 210, 50, 50, 'arm bar', 50, 10, '', ''),
	('', 240, 100, 75, 'stomp', 20, 10, ''),
	('', 300, 70, 10, 'giant punch', 35, 10, '', ''),
	('', 80, 60, 85, 'punch', 150, 25, '', ''),
	('', 250, 150, 50, 'upper cut', 40, 20, '', ''),
	('', 180, 100, 100, 'stab', 35, 10, '', ''),
	('', 280, 65, 10, 'belly flop', 45, 10, '', ''); 
	
INSERT INTO "basic_attacks" 
	("attack", "damage", "stamina")
	VALUES 
	('kick', 5, 5),
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
	  
