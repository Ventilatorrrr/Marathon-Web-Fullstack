USE ucode_web;

SELECT h.id, h.name AS hero_name
FROM heroes h
JOIN heroes_teams ht ON h.id = ht.hero_id
WHERE
  -- Входить у 2+ команд
  (SELECT COUNT(*) FROM heroes_teams WHERE hero_id = h.id) >= 2
  -- Не Human
  AND (h.race_id IS NULL OR h.race_id != (SELECT id FROM races WHERE name = 'Human'))
  -- Має 'a' у імені
  AND h.name LIKE '%a%'
  -- Tankman або Healer
  AND h.class_role IN ('tankman', 'healer')
ORDER BY h.id
LIMIT 1;
