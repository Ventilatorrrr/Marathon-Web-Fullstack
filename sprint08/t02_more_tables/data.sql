USE ucode_web;

-- Insert races
INSERT INTO races (name) VALUES
('Human'),
('Kree'),
('Asgardian'),
('Flora Colossus'),
('Android');

-- Insert powers
INSERT INTO powers (name, type) VALUES
('bloody fist', 'attack'),
('iron shield', 'defense'),
('thunder strike', 'attack'),
('gamma smash', 'attack'),
('healing touch', 'defense');

-- Insert teams
INSERT INTO teams (name) VALUES
('Avengers'),
('Hydra'),
('Guardians of the Galaxy');

-- Assign races
UPDATE heroes SET race_id = (SELECT id FROM races WHERE name = 'Human') WHERE name IN ('Iron Man', 'Captain America', 'Black Widow');
UPDATE heroes SET race_id = (SELECT id FROM races WHERE name = 'Asgardian') WHERE name = 'Thor';
UPDATE heroes SET race_id = (SELECT id FROM races WHERE name = 'Human') WHERE name = 'Hulk';
UPDATE heroes SET race_id = (SELECT id FROM races WHERE name = 'Human') WHERE name = 'Doctor Strange';
UPDATE heroes SET race_id = (SELECT id FROM races WHERE name = 'Kree') WHERE name = 'Mantis';
UPDATE heroes SET race_id = (SELECT id FROM races WHERE name = 'Flora Colossus') WHERE name = 'Groot';
UPDATE heroes SET race_id = (SELECT id FROM races WHERE name = 'Human') WHERE name = 'Rocket';
UPDATE heroes SET race_id = (SELECT id FROM races WHERE name = 'Android') WHERE name = 'Vision';

-- Assign powers
INSERT INTO heroes_powers (hero_id, power_id, power_points)
SELECT h.id, p.id, 200 FROM heroes h, powers p WHERE h.name = 'Captain America' AND p.name = 'iron shield';

INSERT INTO heroes_powers (hero_id, power_id, power_points)
SELECT h.id, p.id, 150 FROM heroes h, powers p WHERE h.name = 'Thor' AND p.name = 'thunder strike';

INSERT INTO heroes_powers (hero_id, power_id, power_points)
SELECT h.id, p.id, 180 FROM heroes h, powers p WHERE h.name = 'Hulk' AND p.name = 'gamma smash';

INSERT INTO heroes_powers (hero_id, power_id, power_points)
SELECT h.id, p.id, 50 FROM heroes h, powers p WHERE h.name = 'Mantis' AND p.name = 'healing touch';

INSERT INTO heroes_powers (hero_id, power_id, power_points)
SELECT h.id, p.id, 110 FROM heroes h, powers p WHERE h.name = 'Iron Man' AND p.name = 'bloody fist';

-- Additional assignments to show many-to-many
INSERT INTO heroes_powers (hero_id, power_id, power_points)
SELECT h.id, p.id, 110 FROM heroes h, powers p WHERE h.name = 'Hulk' AND p.name = 'bloody fist';

INSERT INTO heroes_powers (hero_id, power_id, power_points)
SELECT h.id, p.id, 200 FROM heroes h, powers p WHERE h.name = 'Vision' AND p.name = 'iron shield';

INSERT INTO heroes_powers (hero_id, power_id, power_points)
SELECT h.id, p.id, 180 FROM heroes h, powers p WHERE h.name = 'Thor' AND p.name = 'gamma smash';

INSERT INTO heroes_powers (hero_id, power_id, power_points)
SELECT h.id, p.id, 110 FROM heroes h, powers p WHERE h.name = 'Mantis' AND p.name = 'bloody fist';

-- Assign heroes to teams
-- Iron Man and Captain America in Avengers
INSERT INTO heroes_teams (hero_id, team_id)
SELECT h.id, t.id FROM heroes h, teams t WHERE h.name = 'Iron Man' AND t.name = 'Avengers';

INSERT INTO heroes_teams (hero_id, team_id)
SELECT h.id, t.id FROM heroes h, teams t WHERE h.name = 'Captain America' AND t.name = 'Avengers';

-- Vision, Gamora, Nebula in both Avengers and Hydra
INSERT INTO heroes_teams (hero_id, team_id)
SELECT h.id, t.id FROM heroes h, teams t WHERE h.name = 'Vision' AND t.name = 'Avengers';

INSERT INTO heroes_teams (hero_id, team_id)
SELECT h.id, t.id FROM heroes h, teams t WHERE h.name = 'Vision' AND t.name = 'Hydra';

INSERT INTO heroes_teams (hero_id, team_id)
SELECT h.id, t.id FROM heroes h, teams t WHERE h.name = 'Nebula' AND t.name = 'Hydra';

INSERT INTO heroes_teams (hero_id, team_id)
SELECT h.id, t.id FROM heroes h, teams t WHERE h.name = 'Gamora' AND t.name = 'Hydra';

INSERT INTO heroes_teams (hero_id, team_id)
SELECT h.id, t.id FROM heroes h, teams t WHERE h.name = 'Nebula' AND t.name = 'Avengers';

INSERT INTO heroes_teams (hero_id, team_id)
SELECT h.id, t.id FROM heroes h, teams t WHERE h.name = 'Gamora' AND t.name = 'Avengers';


