let words = [];
let word;
let lives;
let end;
let letters_guessed = []
let sticks = []
let playBtn;
let cuvant;

$( document ).ready(function() {
    sticks = document.getElementsByClassName('stick');
    for (let i = 0; i < sticks.length; i++) {
        sticks[i].style.display = 'none';
    }   

    head = document.getElementById('head');
    body = document.getElementById('body');
    arm1 = document.getElementById('arm1');
    arm2 = document.getElementById('arm2');
    leg1 = document.getElementById('leg1');
    leg2 = document.getElementById('leg2');

    sticks = []

    sticks[0] = head; sticks[1] = body; sticks[2] = arm1; sticks[3] = arm2;
    sticks[4] = leg1; sticks[5] = leg2;

    playBtn = document.getElementById('play');
    cuvant = document.getElementById('cuvant');

    cuvant.style.display = 'none';
});

function startGame() {

    for (let i = 0; i < sticks.length; i++) {
        sticks[i].style.display = 'none';
    }   

    if (words.length == 0)
        $.getJSON("cuvinte.json", function(json) {
            // Initialize the game
            initGame(json);
            write();
        });
    else {
        initGame(null);
        write();
    }

}

function guess(letter) {
    // Add 'litere incercate'
    document.getElementById('incercate').innerHTML = document.getElementById('incercate').innerHTML + ' ' + letter;

    // Check for correct letters
    let ok = false;
    for (let i = 0; i < word.length; i++) {
        if (word[i] == letter) {
            letters_guessed[i] = 1;
            ok = true;
        } 
    }

    if (!ok) {
        sticks[6 - lives].style.display = 'block';
        lives--;
        //document.getElementById('vieti').innerHTML = 'Vieti ramase: ' + lives;
    }
    write();
    checkWin();
}

// Write the word to an HTML element
function write() {
    let to_write = [];
    let container = document.getElementById('cuvant');

    for (let i = 0; i < word.length; i++) {
        if (letters_guessed[i] == 1) {
            to_write[i] = word[i];
        } else {
            to_write[i] = '_';
        }
    }
    container.innerHTML = to_write.join(" ");
}

function getLetter() {
    // Check the game didn't end
    if (!end) {
        // Get the letter and clear the textbox
        let letter = document.getElementById('litera').value;
        document.getElementById('litera').value = '';

        if (letter.length == 0) {
            alert('Nu ai introdus o litera!');
            return;
        } else if (letter.length > 1) {
            alert('Trebuie sa introduci o singura litera!')
            return;
        }
        

        if (lives > 1) {
            guess(letter);
        } else {
            // Reset the game
            lives--;
            //document.getElementById('vieti').innerHTML = 'Vieti ramase: ' + lives;
            document.getElementById('play').innerHTML = 'Play again';
            end = true;
            cuvant.style.display = 'none';
            playBtn.style.display = 'inline';
            alert('Ai pierdut');
        }
    }
}

function checkWin() {
    let guessed = true;
    for (let i = 0; i < letters_guessed.length; i++) {
        if (letters_guessed[i] == 0) {
            guessed = false;
        }
    }
    if (guessed) {
        cuvant.style.display = 'none';
        playBtn.style.display = 'inline';
        end = true;
        alert('Ai castigat');
    }
}

// Initialize the game
function initGame(json) {

    if (json != null)
        $.each( json, function( key, val ) {
            words.push(val);
        });

    word = words[Math.floor(Math.random() * words.length)];
    lives = 6;
    end = false;
    letters_guessed.length = word.length;

    for (let i = 0; i < letters_guessed.length; i++) {
        letters_guessed[i] = 0;
    }
    letters_guessed[0] = 1;
    letters_guessed[letters_guessed.length] = 1;

    for (let i = 0; i < letters_guessed.length; i++) {
        if (word[0] == word[i]) {
            letters_guessed[i] = 1;
        }
    }

    document.getElementById('incercate').innerHTML = '';
    //document.getElementById('vieti').innerHTML = 'Vieti ramase: ' + lives;

    playBtn.style.display = 'none';
    cuvant.style.display = 'inline';
}