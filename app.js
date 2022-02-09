document.addEventListener('DOMContentLoaded', () => {

    //creation depuis la sprite sheet fourni, un tableau permettant d'utiliser la partie de l'image contenant le fruit et l'associant au nom du fruit 
    //const fruits = {'pommeR':0, 'banane':100,'orange':200, 'citronV':300, 'grenande':400, 'abricot':500, 'citronJ':600, 'fraise':700, 'pommeV':800, 'peche':900, 'raisin':1000, 'pasteque':1100, 'prune':1200, 'poire':1300, 'ceriseR':1400, 'framboise':1500, 'mangue':1600, 'ceriseJ':1700}
     const fruits = {'pommeR':0, 'banane':100,'orange':200}  //c'est la liste un peu plus courte pour "tester rapidement"

    //d'apres le tableau fruits on va créer un autre tableau contenant le nom du fruit, l'image à utiliser et la position sur l'image pour afficher uniquement le bon fruit
    const listeFruits=[]
    for (var fruit in fruits) {
        listeFruits.push({ name :fruit,
            img: 'images/cards.png',
            position: fruits[fruit],
           })
      }
      //ici on créer la constante carteFruits un tableau qui contient endouble expemlpaire chaque carte de fruit
      const carteFruits= listeFruits.concat(listeFruits)

      //et mainteanat on va trier de maniere aleatoire ce tableau pour rendre le jeux aleatoire.

      carteFruits.sort( ()=> 0.5 - Math.random() )

//on declare nos varibale pour ne pas créer d'erreur de variable utilisé avant d'etre declarée
    const grille = document.querySelector('.grille')
    const resultDisplay = document.querySelector('#resultat')
    var cardsChosen = []
    var cardsChosenID = []
    var cardsWon = []
    var victoire = false


//ici seront presente les fonctions 


//la fonction barreProgression est la fonction qui va  créer la barre de progression et modifier son  style au fur et à mesure que le temps du compteur s'ecoule
// il faut multiplier par 10 le compteur pour que cela soit en seconde
//la barre de progression va se bloquer si le joueur gagne la partie
//sinon la barre de progression va de 1 à 100% pour indique rla fin du temps de jeu

        var i = 0;
function barreProgression() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("barre");
    var width = 0;
    var id = setInterval(frame, compteur*10);
    function frame() {
      if(victoire===false){
         if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
        
      }
      }
     
    }
  }
}
    
    
 
 

    //fonction de creation du tableau

    //on créer une fonction createBoard qui va créer la grille de jeux
    //celle ci en plus de créer un element image il lui donne l'attribt src avec comme valeur une image "blanche" pour masquer la ca

    function createBoard() {
      //quand la fonction createBoard est appelé on appelle la fonction barreProgression pour que le jeu se lance sans decalage entre la barre de progression 
        barreProgression()
        //console.log(carteFruits.length);
       // pour chaque carte de fruit on créer un nouvelle element image apparenté à l'elemnet  de classe grille, on lui donne l'attribut srcavec la valeur image "vblanche" ainsi q'une id
       //on ecoute le click sur une carte pour lancer la fonction flipcard
        for (let i = 0; i < carteFruits.length; i++) {
            var card = document.createElement('img')
            card.setAttribute('src', 'images/blank.jpg')
            card.setAttribute('data-id', i)
            card.addEventListener('click', flipcard)
            grille.appendChild(card)
        }
        
        
    }

      //founction de retournement des cartes

      //ici la fonction va definir les 2 cartes que l'on  choisi de cliquer et créer un tableau cardsChosen contenant le non du fruit
      //et affiche via une modification du style de la carte une nouvelle image et la bonne position pour afficher le bon fruit
      // si le tableau contient les deux cartes on lance la fonction pour verifier si les deux cartes sont identique ou non

      function flipcard() {
        var cardId = this.getAttribute('data-id')
        cardsChosen.push(carteFruits[cardId].name)
        cardsChosenID.push(cardId)
        this.removeAttribute('src')
        this.style.backgroundImage = "url(./images/cards.png)";
        this.style.backgroundPosition = '0px '+carteFruits[cardId].position+'px'; 
        console.log(cardsChosen);
        if (cardsChosen.length ===2) {
            setTimeout(checkForMatch, 500)
        }

    }

    //fonction pour verifier si les deux cartes choisies sont identiques

    //on defini les deux cartes choisies
    //si les deux cartes choisies ont la meme valeur(à savoir le meme nom) alors on envoie une alerte avec le message de reussite et on change l'image  des deux cartes et onajoute au tableau des victoire le nombre de carte trouvé
    //si les deux cartes ne sont pas identique alors on remet l'image 'mystere"
    //on test ensuite si on a reussi à trouver toute les paires de cartes, si oui alors on ecrit en html au joueur qu'il a gagner et peut sauvegarder son score
    //on passe aussi la valeur victoire à true pour stopper les compteurs

    function checkForMatch() {
        var cards = document.querySelectorAll('img')
        const optionOneId = cardsChosenID[0]
        const optionTwoId = cardsChosenID[1]
        if (cardsChosen[0] === cardsChosen[1]) {
            alert('Bravo tu as trouvé une pair de fruits')
            cards[optionOneId].setAttribute('src', 'images/youpi.jpg')
            cards[optionTwoId].setAttribute('src', 'images/youpi.jpg')
            cardsWon.push(cardsChosen)
        }
        else {
            alert('Desolé mauvaise pioche, essaies de nouveau')
            cards[optionOneId].setAttribute('src', 'images/blank.jpg')
            cards[optionTwoId].setAttribute('src', 'images/blank.jpg')
            
        }
        cardsChosen = []
        cardsChosenID = []
        resultDisplay.textContent = cardsWon.length
        if(cardsWon.length === carteFruits.length/2) {
            resultDisplay.textContent = 'Woua felicitation tu  as gagné, enregirstre ton Score'
            victoire = true


        }


    }

  // ici on attribut le compteur initial , c'est le nombre de seconde que dure le jeu
  //on en fait une copie qu'on va decrementer pour faire le compteur à rebour

    var compteurInitial = 180;
    var compteur = compteurInitial

    // la fonction ici est la fonction qui sert de compteur pour le jeu
    //tant que la victoire n'est pas à true alors le compteur affiche le temps qui s'ecoule
    // une fois que le compteur est à zero alors le joueur a perdu et on l'affiche  et il a une alerte
    //par contre si le joueur gagne alors la victoire bloque le compteur pour pouvoir etre enregistrer à la bonne valeur
 
    tempsCompeur = setInterval(function(){
      if(victoire===false){
        if(compteur>0)
        { 
            --compteur; // décrémente le compteur
            document.getElementById("temps").innerHTML = compteur + "sec" ;
            
        }
        else
        {
            clearInterval(tempsCompeur);
            document.getElementById("temps").innerHTML= 'fin du jeux, tu as perdu!';
            alert('PERDU!!!!')
        }
      }
        
    }, 1000);

    //la fonction DoSubmit permet de ne valider le formulaire d'enovoi uniquement si le joueur a bien gagné la partie
    //et rajoute le temps que le joueur a mit pour gagner à l'input invisible du formulaire


    var formulaireSoumission = document.getElementById("formulaireVictoire")
   
    formulaireSoumission.addEventListener('click', DoSubmit)
    

  function DoSubmit(){
    if(victoire ===true){
       document.formulaireVictoire.temps.value = compteurInitial-compteur;
    }
      }

    

   //cette fonction asynchrone permet de recuperer les informations des scores stocké en bdd via à l'appel fech sur le fichier php qui nous renvoie un json
   //pour cela on passe par des promesses
   //cela permet de d'attendre d'avoir recuperer les valeurs pour faire le calcul, comme le fichier app aura fait les calculs avant d'avoir recuperer  les info de l'API
   //il faut faire une  boucle sur une boucle pour acceder aux valeurs key2 et value2 qui sont le pseudo du joeur et le temps mit pour terminer la partie
   // on test aussi si data existe, si il existe pas c'est que aucun joeur n'a encore enregistrer de score, on met donc un message comme quoi le joueur sera le premier
   // si data existe alors  on créer des elements p contenant les scores et on met en parent l'element meilleurResultat


    async function fetchAsync () {
        
        let response = await fetch('http://localhost/Memory%20Game/api.php');
        //console.log(response)
        let data = await response.json();
        //console.log(data)

        if(data){
          for (const [key, value] of Object.entries(data)) {
            for (const [key2, value2] of Object.entries(value)) {
                //console.log(`${value2}`);
                var p = document.createElement("p");
                var t = document.createTextNode(key2+": "+value2);
                p.appendChild(t);
                document.getElementById("meilleurResultat").appendChild(p); 
            }
          }
        }
        else{
          var p = document.createElement("p");
                var t = document.createTextNode("Sois le premier à inscrire ton nom ici");
                p.appendChild(t);
                document.getElementById("meilleurResultat").appendChild(p);
        }
        return data;
      }


//on appelle les fonction pour que le jeu se lance et aussi pour que les scores soit recuperés
  
createBoard()
fetchAsync ()
      
 
})