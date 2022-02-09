-- Permet de construire la base de donnée via des requete SQL


SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `score`;
CREATE TABLE `score` (
  `id` int(100) unsigned NOT NULL AUTO_INCREMENT,   -- on crée un id(pas vraiment utile ici) qui ne peut  etre nul et s'incremente de maniere automatique
  `pseudo` varchar(32) COLLATE utf8_roman_ci NOT NULL, -- on crée pseudo qui est un varchar de 32 caracteres et ne peut etre nul
  `temps` time NOT NULL, -- temps est de type time et ne peut etre nul
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_roman_ci;