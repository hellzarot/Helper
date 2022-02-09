<?php
 require __DIR__.'/db.php';

// on créer une varibale contenant la requete SQL pour recuperer les meilleurs score
// pour cela on trie par le temps(par defaut il tire dans le bon sens pour nous) et on limite le resultat à 5
$sqlQuery = 'SELECT * FROM score ORDER BY temps LIMIT 5';


//on passe par $pdo en deux temps, pour preparer et pour executer notre requete et on les stoque dans la varibales $scores
$scoreStatement = $pdo->prepare($sqlQuery);
$scoreStatement->execute();
$scores = $scoreStatement->fetchAll();


// on va un peu "nettoyer" les données pour garder ce qui nous interesse
foreach($scores as $score){
    
$scoreNettoye[] = array(
    $score[pseudo] => $score[temps],
   
);
//var_dump($scoreNettoyer);
       

}

//on se sert de ce fichier php pour renvoyer une reponse en json au fichier js cela permet de communniquer entre la bdd et js via php

header('Content-Type: application/json');
echo json_encode($scoreNettoye);