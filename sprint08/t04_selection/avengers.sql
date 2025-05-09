USE ucode_web;

-- 1. Найсильніший герой
SELECT h.name AS hero_name, SUM(hp.power_points) AS total_power
FROM heroes h
JOIN heroes_powers hp ON h.id = hp.hero_id
GROUP BY h.id
ORDER BY total_power DESC, h.id ASC
LIMIT 1;

-- 2. Найслабший герой
SELECT h.name AS hero_name, SUM(hp.power_points) AS total_defense
FROM heroes h
JOIN heroes_powers hp ON h.id = hp.hero_id
JOIN powers p ON hp.power_id = p.id
WHERE p.type = 'defense'
GROUP BY h.id
ORDER BY total_defense ASC, h.id ASC
LIMIT 1;

-- 3. Авенджери без подвійного агента
SELECT h.name AS hero_name, SUM(hp.power_points) AS total_power
FROM heroes h
JOIN heroes_teams ht ON h.id = ht.hero_id
JOIN teams t ON ht.team_id = t.id
JOIN heroes_powers hp ON h.id = hp.hero_id
WHERE t.name = 'Avengers'
  AND h.id NOT IN (
    SELECT hero_id
    FROM heroes_teams
    GROUP BY hero_id
    HAVING COUNT(DISTINCT team_id) > 1
  )
GROUP BY h.id
ORDER BY total_power DESC;

-- 4. Сила команд Avengers і Hydra
SELECT t.name AS team_name, SUM(hp.power_points) AS total_power
FROM teams t
JOIN heroes_teams ht ON t.id = ht.team_id
JOIN heroes h ON ht.hero_id = h.id
JOIN heroes_powers hp ON h.id = hp.hero_id
WHERE t.name IN ('Avengers', 'Hydra')
GROUP BY t.name
ORDER BY total_power ASC;
