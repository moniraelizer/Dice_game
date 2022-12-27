//On commence par définir des variables essentielles pour le jeu.
// (scores) ==> est le score global d'un joueur durant le jeu. Le joueur gagne la partie quand il atteint  100 comme score
// (roundscore) ==> est le score temporaire d'un joueur. il a la possibilité de déverser son roundscore dans le score global. 
// (activePlayer) ==> est une instance pour travailler sur le joueur en activité. c'est à dire celui qui joue. 
// gaming est un booléen simple qui nous permettra d'initialiser le jeu.

let scores, roundScore, activePlayer, gaming;

init();


// Pour créer le jeu on commencera par créer le boutton de lancement du dé. Pourt ce fait on va  créer une fonction. cette fonction permettra
// de générer d'abord un nombre aléatoire entre 1 et 6 (à l'image du dé). Ensuite, on essaira d'afficger le résultat en image dans le jeu et
// l'ajouter dans le roundScore du joueur actif. on fait de sorte que si le joueur jour "1" il passe son tour.

// Fonction "ROLL DICE"

document.querySelector("#roll-the-dice").addEventListener("click", function () {
    if (gaming) {
        // 1. Création d'un nombre aléatoire
        let dice = Math.floor(Math.random() * 6) + 1;

        // 2. l'affichage du résultat
        let diceDOM = document.querySelector(".dice");
        diceDOM.style.display = "block";
        diceDOM.src = "./img/die-" + dice + ".svg";

        // 3. Update the round score IF the rolled number was NOT a 1
        if (dice !== 1) {
            // On met à jour le résultat roundScore qui est la somme des nombre issu de la variable dice
            roundScore += dice;
            document.getElementById(
                "round-" + activePlayer
            ).textContent = roundScore;
        } else {
            // Next player
            nextPlayer();
            alert("Désolé vous avez tapé le nombre 1, vous passez votre tour !");
        }
    }
});


/* Le boutton Hold permet de passer le tour. cela peut se faire sous deux conditions :
   - si le joueur joue "1". Mais cela implique la supression immédiate de son roundScore
   - si il clique volontairement sur le boutton "HOLD"
*/


// Fonction "HOLD"

document.querySelector("#take-a-turn").addEventListener("click", function () {
    if (gaming) {
        // On ajoute le score temporaire au score globale
        scores[activePlayer] += roundScore;


        document.querySelector("#score-" + activePlayer).textContent =
            scores[activePlayer];

        // On vérifie la possible victoire d'un joueur
        if (scores[activePlayer] >= 100) {
            document.querySelector("#name-" + activePlayer).textContent = "Winner!";
            document.querySelector(".dice").style.dispaly = "none";

            document
                .querySelector(".player-" + activePlayer + "-panel")
                .classList.add("winner");
            document
                .querySelector(".player-" + activePlayer + "-panel")
                .classList.remove("active");

            gaming = false;
        } else {
            // Next player
            nextPlayer();
        }
    }
});



// fonction pour passer le tour
function nextPlayer() {
    roundScore = 0;
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

    document.getElementById("round-0").textContent = 0;
    document.getElementById("round-1").textContent = 0;
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    document.querySelector(".dice").style.display = "none";
}

// Fonction pour initialiser le jeu
document.querySelector(".btn-new").addEventListener("click", init);

function init() {
    // Reseting score vars
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gaming = true;

    document.querySelector(".dice").style.display = "none";
    // Reseting allscores
    document.getElementById("score-0").textContent = "0";
    document.getElementById("score-1").textContent = "0";
    document.getElementById("round-0").textContent = "0";
    document.getElementById("round-1").textContent = "0";
    // Reseting Player Names
    document.getElementById("name-0").textContent = "Player 1";
    document.getElementById("name-1").textContent = "Player 2";
    // Removing classes from panels
    document.querySelector(".player-0-panel").classList.remove("winner");
    document.querySelector(".player-1-panel").classList.remove("winner");
    document.querySelector(".player-0-panel").classList.remove("active");
    document.querySelector(".player-1-panel").classList.remove("active");
    document.querySelector(".player-0-panel").classList.add("active");
}
