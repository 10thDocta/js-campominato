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
let nMin = 0;
let nMax = 0;

// chiedo quale difficoltà l'utente preferisce tramite prompt
const difficoltà = parseInt(prompt("Scegli la difficoltà tra 0 e 2"), 10);
// uso lo switch per settare il range (nMin e nMax) in base alla risposta dell'utente
switch (difficoltà) {
    case 0:
        nMin = 1;
        nMax = 100;
        break;

    case 1:
        nMin = 1;
        nMax = 80;
        break;

    case 2:
        nMin = 1;
        nMax = 50;
        break;

    // test
    case 9:
        nMin = 1;
        nMax = 10;
        nBomb = 2;
        break;

    default:
        break;
}


// number = numero di cicli da eseguire
// boolean = true se è per generare numeri random e false per l'utente
// nMin e nMax = per impostare il range dei numeri entro i quali il gioco è valido
// arrRandom = ho impostato un valore di default [] e serve per comparare se il numero inserito dall'utente è presente nel randomNumberDB, nel caso per far terminare il gioco 
function theGame(number, boolean, nMin, nMax, arrRandom = []) {

    // questo sarà il nostro array
    const numberDB = [];
    //contatore per il punteggio e decretare se l'utente ha vinto
    let counter = 0;

    let i = 0;
    // ciclo in base al valore passato tramite l'argomento 'number'
    while (i < number) {

        // verifico che il numero random non sia già presente, cercandolo nell'array
        const pushToArray = (arr, numb) => {
            // findIndex ritorna -1 se l'elemento non è presente nell'array
            const index = arr.findIndex((e) => e === numb);

            // se findIndex ritorna -1, il numero non è presente nell'array e lo aggiungo, ritornando false, così da concludere il ciclo do while
            if (index === -1) {
                arr.push(numb);
                if (!boolean) { counter++; }
                return false;
            } else {
                if (!boolean) { alert('inserisci un numero che non hai già usato'); }
                return true;
            }
        };

        // se boolean è true è per generare i numeri random
        if (boolean) {
            let randomNum = 0;
            do {
                randomNum = Math.floor(Math.random() * (nMax - nMin) + 1) + nMin;
            } while (pushToArray(numberDB, randomNum));
        }

        // se boolean è false è per generare verificare i numeri inseriti dall'utente 
        else {
            let userNumber = 0;
            do {
                // ottengo un numero dall'utente tramite prompt
                userNumber = parseInt(prompt(`Inserisci un numero tra ${nMin} e ${nMax}`), 10);
                // se il numero dall'utente è presente nell'array dei numeri random il gioco termina e l'utente perde
                const endGame = arrRandom.findIndex((e) => e === userNumber);
                if (endGame !== -1) { alert(`Hai perso. Il tuo punteggio è ${counter}`); return undefined; }

                // se il contatore è uguale a number(numero di cicli da eseguire nel while) l'utente non ha mai pestato una mina e vince il gioco
                if (counter == number - 1) { counter++; alert(`Hai VINTO. Il tuo punteggio è ${counter}`); return undefined; }

            } while (pushToArray(numberDB, userNumber));
        }

        // incremento 'i' per avanzare nel ciclo while
        i++
    }

    // ritorno il database di numeri random non uguali
    return numberDB.sort((a, b) => a - b);
}


const randomNumberDB = theGame(nBomb, true, nMin, nMax);
console.log(randomNumberDB);

theGame(nMax - nBomb, false, nMin, nMax, randomNumberDB);



