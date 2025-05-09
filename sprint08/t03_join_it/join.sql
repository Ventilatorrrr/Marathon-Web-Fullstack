USE ucode_web;

-- team name
SELECT heroes.name AS hero_name, teams.name AS team_name
FROM heroes
LEFT JOIN heroes_teams ON heroes.id = heroes_teams.hero_id
LEFT JOIN teams ON heroes_teams.team_id = teams.id;

-- powers
SELECT heroes.name AS hero_name, powers.name AS power_name
FROM powers
LEFT JOIN heroes_powers ON powers.id = heroes_powers.power_id
LEFT JOIN heroes ON heroes_powers.hero_id = heroes.id;

-- powers and teams
SELECT heroes.name AS hero_name, powers.name AS power_name, teams.name AS team_name
FROM heroes
JOIN heroes_powers ON heroes.id = heroes_powers.hero_id
JOIN powers ON heroes_powers.power_id = powers.id
JOIN heroes_teams ON heroes.id = heroes_teams.hero_id
JOIN teams ON heroes_teams.team_id = teams.id;
