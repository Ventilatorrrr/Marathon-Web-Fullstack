USE ucode_web;

-- races table
CREATE TABLE IF NOT EXISTS races (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL UNIQUE
);

-- powers table
CREATE TABLE IF NOT EXISTS powers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL UNIQUE,
    type ENUM('attack', 'defense') NOT NULL
);

-- teams table
CREATE TABLE IF NOT EXISTS teams (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL UNIQUE
);

-- heroes_powers table
CREATE TABLE IF NOT EXISTS heroes_powers (
    hero_id INT,
    power_id INT,
    power_points INT NOT NULL,
    PRIMARY KEY (hero_id, power_id),
    FOREIGN KEY (hero_id) REFERENCES heroes(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (power_id) REFERENCES powers(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- heroes_teams table
CREATE TABLE IF NOT EXISTS heroes_teams (
    hero_id INT,
    team_id INT,
    PRIMARY KEY (hero_id, team_id),
    FOREIGN KEY (hero_id) REFERENCES heroes(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (team_id) REFERENCES teams(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- Add race_id to existing heroes table
ALTER TABLE heroes
ADD COLUMN race_id INT,
ADD FOREIGN KEY (race_id) REFERENCES races(id)
    ON DELETE SET NULL
    ON UPDATE CASCADE;
