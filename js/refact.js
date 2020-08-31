// Il computer deve generare 16 numeri casuali tra 1 e 100.
// I numeri non possono essere duplicati

// In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.
// L’utente non può inserire più volte lo stesso numero.

// Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero.
// La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.

// Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.

// BONUS: (da fare solo se funziona tutto il resto)
// all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali:
// con difficoltà 0 => tra 1 e 100
// con difficoltà 1 =>  tra 1 e 80
// con difficoltà 2 => tra 1 e 50

/* --------------------------------------- */



// setto le variabili che possono essere modificate  
let nBomb = 16;
let nMax = 0;

// chiedo quale difficoltà l'utente preferisce tramite prompt
const difficoltà = parseInt(prompt("Scegli la difficoltà tra 0 e 2"), 10);
// uso lo switch per settare il range (nMin e nMax) in base alla risposta dell'utente
switch (difficoltà) {
    case 0:
        nMax = 100;
        break;

    case 1:
        nMax = 80;
        break;

    case 2:
        nMax = 50;
        break;

    // test
    case 9:
        nMax = 10;
        nBomb = 6;
        break;

    default:
        nMax = 100;
        break;
}


/* --------------------------------------------------- */

// funzione per mischiare in moodo random un array
function shuffleArray(array) {
    let curId = array.length;
    // There remain elements to shuffle
    while (curId !== 0) {
        // Pick a remaining element
        let randId = Math.floor(Math.random() * curId);
        curId -= 1;
        // Swap it with the current element.
        let tmp = array[curId];
        array[curId] = array[randId];
        array[randId] = tmp;
    }
    return array;
}

// generatore di DB di N numeri sequenziali
function genNumberArray(number) {
    const randomNumberDB = [];

    for (let i = 1; i <= number; i++) {
        randomNumberDB.push(i);
    }
    return randomNumberDB;
}

// bombDB sarà un array di "nMax" numeri random di soli "nBomb" elementi
const bombDB = shuffleArray(genNumberArray(nMax)).slice(0, nBomb);
console.log(bombDB.sort((a, b) => a - b));


const pushToArray = (arr, numb) => {
    // findIndex ritorna -1 se l'elemento non è presente nell'array
    const index = arr.findIndex((e) => e === numb);

    // se findIndex ritorna -1, il numero non è presente nell'array e lo aggiungo, ritornando false, così da concludere il ciclo do while
    if (index === -1) {
        arr.push(numb);
        return true;
    } else {
        return false;
    }
};

const userNumberDB = [];
const maxLoop = nMax - nBomb;
let counter = 0;

let i = 0;
while (i < maxLoop) {

    let valid = true;
    const userNumber = parseInt(prompt(`Inserisci un numero tra 1 e ${nMax}`), 10);

    // se l'untete inserisce qualcosaa che non sia un numero il gioco finisce
    if (isNaN(userNumber)) {
        i = maxLoop;
        alert("Sei uscito dal gioco");
        valid = false;
    }

    if (userNumber > nMax || userNumber <= 0) {
        alert("Inserisci il numero nel range indicato");
        valid = false;
    }

    if (bombDB.includes(userNumber)) {
        i = maxLoop;
        alert(`Hai perso. Il tuo punteggio è ${counter}`);
        valid = false;
    }

    if (valid) {
        if (pushToArray(userNumberDB, userNumber)) {
            i++;
            counter++;
        } else {
            alert('inserisci un numero che non hai già usato');
        }
    }


    if (counter === maxLoop) {
        alert(`Hai VINTO! Il tuo punteggio è ${counter}`)
    }

    console.log(userNumberDB)
}

