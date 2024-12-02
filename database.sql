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
	("name", "profile_pic", "hp", "stamina", "speed", "unique_attack", "unique_damage", "unique_stamina", "battle_pic")
	VALUES 
	('Goomba', 'images/Masthead_Goomba.png', 30, 50, 80, 'charge', 40, 10, 'images/Masthead_Goomba.png'),
	('Koopa Troopa', 'images/koopaTroopaProfilePic.webp', 60, 60, 55, 'shell smash', 35, 10, 'images/koopaTroopaBattlePic.webp'),
	('Dry Bones', 'images/Drybones.webp', 50, 70, 50, 'bone swing', 50, 15, 'images/Drybones.webp'),
	('Shy Guy', 'images/ShyGuyProfilePic.webp', 85, 40, 10, 'slap', 55, 15, 'images/shyGuyBattlePic.webp'),
	('Boo', 'images/BooProfilePic.webp', 40, 60, 60, 'lick', 50, 20, 'images/BooProfilePic.webp'),
	('Hammer Bro', 'images/hammerBroProfilePic.webp', 55, 60, 50, 'hammer bash', 45, 10, 'images/Hammer_BroBattlePic.webp'),
	('Chain Chomp', 'images/ChainChompProfilePic.webp', 20, 25, 65, 'chomp', 65, 10, 'images/chainChompBattlePic2.png'),
	('Roy', 'images/RoyProfilePic.webp', 55, 35, 20, 'fireball', 75, 15, 'images/RoyBattlePic.webp'),
	('Morton', 'images/MortonProfilePic.webp', 100, 25, 5, 'body slam', 45, 10, 'images/MortonBattlePic.webp'),
	('Toad', '', 100, 55, 70, 'headbutt', 10, 10, 'images/Toad_Portal.webp'),
	('Toadett', '', 160, 50, 60, 'slap', 15, 10, 'images/ToadetteBattlePic.png'),
	('Toadsworth', '', 180, 50, 30, 'cane wack', 20, 15, 'images/ToadsworthBattlePic.webp'),
	('Diddy Kong', '', 170, 50, 85, 'banana shot', 55, 10, 'images/diddyKongBattleKong.webp'),
	('Rosalina', '', 190, 60, 60, 'ice blast', 35, 10, 'images/RosalinaBattlePic.webp'),
	('Daisy', '', 210, 50, 50, 'arm bar', 50, 10, 'images/daisyBattlePic.png'),
	('Yoshi', '', 240, 100, 75, 'stomp', 20, 10, 'images/YoshiBattlePic.webp'),
	('Donkey Kong', '', 300, 70, 10, 'giant punch', 35, 10, 'images/donkeyKongBattlePic.webp'),
	('Luigi', '', 80, 60, 85, 'punch', 150, 25, 'images/LuigiBattlePic.png'),
	('Mario', '', 250, 150, 50, 'upper cut', 40, 20, 'images/MarioBattlePic.png'),
	('Waluigi', '', 180, 100, 100, 'stab', 35, 10, 'images/waluigiBattlePic.webp'),
	('Wario', '', 280, 65, 10, 'belly flop', 45, 10, 'images/warioBattlePic.png'); 
	
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
	  
