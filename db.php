<?php

// L'objet PDO permet de se connecter à la base de données "memorygame"
// et le stocker dans la variable $pdo
$config = parse_ini_file(__DIR__ . '/.htpasswd');
//var_dump('testpdo'); si vous voulez verifier que votre fichier action.php rentre bien dans db.php
$pdo = new PDO(
    'mysql:dbname=memorygame;host=localhost;charset=UTF8', // dsn
    'julien', // nom de l'utilisateur pour se connecter à la base de données
    $config["mdp"], // mot de passe de l'utilisateur (ici je le rend invisible en utilisant le fichier .htpasswd qui n'est pas push sur git, à l'interieur il suffit de mettre : mdp = ton mot de passe  )
    [PDO::ATTR_ERRMODE=>PDO::ERRMODE_WARNING] // option pour voir les erreurs
);

