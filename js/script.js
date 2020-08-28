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


function randomNumber16() {

    // questo sarà il nostro array
    var randomDB = [];
    var i = 0;

    while (i < 16) {

        // verifico che il numero random non sia già stato creato, cercandolo nell'array
        var pushToArray = (arr, numb) => {
            // findIndex ritorna -1 se l'elemento non è presente nell'array
            var index = arr.findIndex((e) => e === numb);

            if (index === -1) {
                arr.push(numb);
                return false;
            } else {
                return true;
            }
        };

        do {
            var randomNum = Math.floor(Math.random() * 100) + 1;
        } while (pushToArray(randomDB, randomNum));

        i++

    }

    return randomDB;
}

console.log(randomNumber16());