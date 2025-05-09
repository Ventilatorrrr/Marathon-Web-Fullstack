CREATE DATABASE IF NOT EXISTS ucode_web;

CREATE USER IF NOT EXISTS 'klytovchenko'@'localhost' IDENTIFIED BY 'securepass';

GRANT ALL PRIVILEGES ON ucode_web.* TO 'klytovchenko'@'localhost';

FLUSH PRIVILEGES;
