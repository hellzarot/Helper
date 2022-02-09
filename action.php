
<?php
// var_dump('test1'); oui comme hello world j'ai voulu verifier si on rentrait bien dans le fichier

 //premiere etape on inclu le fichier qui va permettre de se connecter à la bdd
 require __DIR__.'/db.php';

 // à partir de là $pdo du fichier db.php est accessible (grace au require)

 //on commence par declarer les variables qui nous seront necessaires
//var_dump($_POST);  cela permet de voir si on recoit bien les variables envoyé via le fichier app.js comportant le pseudo et le temps de la partie

 $pseudo = '';
 $temps = '';
 
 if(!empty($_POST)){ //on verifie si $_POST n'est pas vide


    
        $pseudo = filter_input(INPUT_POST, 'pseudo'); //on attribu la valeur pseudo contenu dans $_POST dans notre variable  pseudo
        $temps = filter_input(INPUT_POST, 'temps');   //on attribu la valeur temps contenu dans $_POST dans notre variable  temps
        

        if(!empty($pseudo)&& !empty($temps)){ //on controle que à la fois $pseudo et $temps contienne bien une valeur (on pourrait verifier le type de valeur)

            //on va maintenant créer une varibale $inserQuery qui va contenir la requete SQL que l'ont peut executer en base de données.
            // on insert dans la table score le champ pseudo et temps et on attribu les valeurs reciproquement contenue dans $peudo et $temps
    $insertQuery = " 
    INSERT INTO score ( 
        pseudo,
        temps
      

    ) VALUES (
        '{$pseudo}',
        '{$temps}'
    )
";

// il ne reste plus qu'à executer la requete en utilisant la varibale $pdo definie dans le fichier db.php et en executant le requete SQL contnue dans insertQuery


$envoie = $pdo->exec($insertQuery);
    


 }
//comme dans le fichier html la soumission du formulaire pour avoir le $_POST nous envoie sur cette page on fait grace à la fonction header une redirection
}
header('Location: index.html');
exit();