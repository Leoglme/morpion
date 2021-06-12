/*Ajout Icon X  - O font awesome*/
$('head').append('<script src="https://kit.fontawesome.com/054fdad312.js"></script>');


/*Sélection éléments du DOM*/
let boardGame = $('#grid');
let allCase = $('.row .cell');
let players = $('.scores');
let resultBox = $(".scores");
let winText = $(".win-text");
let replayBtn = $("#replay");
let XIcon = 'fas fa-times';
let OIcon = 'far fa-circle';
let currentPlayer = $("#currentPlayer");
let playerSign = "X";
let runBot = true;


players.addClass("player");
players.hasClass("player") ? currentPlayer.html(`Joueur X`) : currentPlayer.html(`Joueur O`);


$(window).on('load', function () {
    for (let i = 0; i < allCase.length; i++) {
        $(allCase)[i].setAttribute('onclick', 'focusBox(this)')
    }
})



function focusBox($element) {
    if (players.hasClass("player")) {
        playerSign = "O";
        $($element).html(`<li class="${OIcon}"></li>`);
        currentPlayer.html(`Joueur X`);
        players.addClass("active");
        $($element).attr("id", playerSign);
    } else {
        $($element).html(`<li class="${XIcon}"></li>`);
        currentPlayer.html(`Joueur O`);
        players.addClass("active");
        $($element).attr("id", playerSign);
    }
    $($element).css('pointer-events', 'none');
    selectWinner();
    let iaDelay = ((Math.random() * 500) + 200).toFixed();
    setTimeout(function () {
        Ia();
    }, iaDelay);

}

function Ia() {
    console.log(runBot);
    if (runBot){
        let arrayCase = [];
        playerSign = "O";
        /*Présence case vide*/
        for (let i = 0; i < allCase.length; i++) {
            if (allCase[i].childElementCount === 0) {
                arrayCase.push(i);
            }
        }
        /*Position random parmi les cases disponibles*/
        let randomTurn = arrayCase[Math.floor(Math.random() * arrayCase.length)];
        if (arrayCase.length > 0) {
            if (players.hasClass("player")) {
                playerSign = "X";
                $(allCase[randomTurn]).html(`<li class="${XIcon}"></li>`);
                $(allCase[randomTurn]).css('pointer-events', 'none');
                currentPlayer.html(`Joueur O`);
                players.addClass("active");
                $(allCase[randomTurn]).attr("id", playerSign);
            } else {
                $(allCase[randomTurn]).html(`<li class="${OIcon}"></li>`);
                $(allCase[randomTurn]).css('pointer-events', 'none');
                currentPlayer.html(`Joueur X`);
                players.addClass("active");
                $(allCase[randomTurn]).attr("id", playerSign);
            }
        }
        playerSign = "X";

    }else{
        return false;
    }

}

/*Résultats*/


function getIdVal(classname){
    return $($(allCase)[classname - 1]).attr('id');
}
function checkIdSign(val1, val2, val3, sign){
    if(getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign){
        return true;
    }
}
function selectWinner() {
    if (checkIdSign(1, 2, 3, playerSign) || checkIdSign(4, 5, 6, playerSign) || checkIdSign(7, 8, 9, playerSign) || checkIdSign(1, 4, 7, playerSign) || checkIdSign(2, 5, 8, playerSign) || checkIdSign(3, 6, 9, playerSign) || checkIdSign(1, 5, 9, playerSign) || checkIdSign(3, 5, 7, playerSign)) {
        runBot = false;
        Ia();
        $(boardGame).addClass("won");
        $('.win-display').html(`<p>Player ${playerSign}</p> won the game!`);
    }

}
