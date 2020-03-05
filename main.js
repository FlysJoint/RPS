const vicStr = ['Ha ha. You suck!', 'Better luck next time!', 'You\'ll never win!', 'I am the BEST!'];
const losStr = ['That one doesn\'t count','Hmm, I think you were lucky.', 'I\'ll get you next time!', 'Pfft! Whatever!', 'I\'m not playing any more!']
const drawStr = ['Jinx!', 'Are you telepathic?', 'Your luck will run out next time!', 'Snap!'];
const commentary = ['An uppercut...', 'Paper-thin defence...', 'Rock solid in attack...', 'Stony faced onlookers...', 'Papering over the cracks...', 'Moved up from Paperweight...', 'Stylish scissor kick...'];

let border = '*';

let difficultySet = false;
let isQuitting = false;
let finished = false;

let difficulty = '';
let pMem = [];

let cScore = 0;
let pScore = 0;

let victor = 'E';

let timer = 0;

let finalComment = '';

var Rock = {
    name: 'Rock',
    pAnim1 : 'o',
    pAnim2 : 'O',
    cAnim1 : 'o',
    cAnim2 : '0',
    top : ' ',
    id : 1,
    /*
    get id() {
      return this.id;
    }
    */
  };

  var Paper = {
    name: 'Paper',
    pAnim1 : '(_(',
    pAnim2 : '|_|',
    cAnim1 : ')_)',
    cAnim2 : '|_|',
    top : ' _ ',
    id : 2,
    /*
    get id() {
      return this.id;
    }
    */
  };

  var Scissors = {
    name: 'Scissors',
    pAnim1 : '8=',
    pAnim2 : '8<',
    cAnim1 : '=8',
    cAnim2 : '>8',
    top : '  ',
    id : 3,
    /*
    get id() {
      return this.id;
    }
    */
  };

let pPiece = Rock;
let cPiece = Paper;

// set/get objects instead of global vars
// optimise functions, repeated code, ifs, consolidate vars

function displayDiff() {
    // clear screen
    difficulty = '';
    console.log(configStr(''));
    console.log(configStr('(1) - Normal'));
    console.log(configStr('(2) - Tricky'));
    console.log(configStr('(3) - Futile'));
    console.log(configStr('(Q) - Quit  '));
    console.log(configStr(''));
}

function showScores() {
    console.log(configStr(`Current Score: Player (${pScore}) Computer (${cScore})`));
}

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

function chooseDiff(userDiff) {

    switch (userDiff) {
        case '1':
            difficultySet = true;
            difficulty = 'Normal';
            return playGame('Difficulty: Normal');
        case '2':
            difficultySet = true;
            difficulty = 'Tricky';
            return playGame('Difficulty: Tricky');
        case '3':
            difficultySet = true;
            difficulty = 'Futile';
            return playGame('Difficulty: Futile');
        case 'Q':
        case 'q':
            isQuitting = true;
            quitGame('You want to quit? Pah!');
            break;
        default:
            console.clear();
            displayTop();
            displayDiff();
            console.log(configStr('Invalid input! You have to enter 1,2,3 or Q'));
            console.log(configStr('Choose difficulty'));
            displayBottom();
            readline.question('?', handleUserResponse);
            break;
    }
}

function quitGame(quitStr) {
    console.clear();
    displayTop();
    console.log(configStr(''));  
    console.log(configStr(''));  
    console.log(configStr(''));  
    console.log(configStr(''));  
    console.log(configStr(quitStr));
    console.log(configStr(''));  
    console.log(configStr(''));  
    console.log(configStr(''));  
    displayBottom();
    readline.close();
}

function displayGame() {
console.log(configStr(''));  
console.log(configStr('Rock     Paper     Scissors'));
console.log(configStr('          _            '));  
console.log(configStr('O        |_|         8<'));
console.log(configStr('1         2           3'));  
console.log(configStr(''));  
}

function playGame(gameType) {
    console.clear();
    
    displayTop();
    console.log(configStr(`${gameType}`));
    displayGame();
     
    console.log(configStr('1, 2 or 3?'));
    displayBottom();
    readline.question('?', handleUserResponse);
}

function chooseAnswer(response) {
        switch(response) {
            case 1:
            case '1':
                pPiece = Rock;
                break;
            case 2:
            case '2':
                pPiece = Paper;
                break;
            case 3:
            case '3':
                pPiece = Scissors;
                break;
            default:
                console.log(configStr('Player choice error'));
    
        } 

        // computer choice on easy mode
        let c = Math.floor((Math.random() * 3) + 1);

        // finds the most common player response within a random amount of previous answers
        pMem.unshift(pPiece.id);

        let mostCommon = '';
        
        let longTermMem = Math.floor((Math.random() * pMem.length) + 1);

        let rocks = 0;
        let papers = 0;
        let scissorss = 0;

        for (let i = 0; i < longTermMem; i++) {
// this needs to be consolidated
            switch (pMem[i]) {
                case '1':
                    rocks++;
                    break;
                case '2':
                    papers++;
                    break;
                case '3':
                    scissorss++;
                    break;
            }
            
            switch (Math.max(rocks, papers, scissorss)) {
                case rocks:
                    mostCommon = '1';
                    break;
                case papers:
                    mostCommon = '2';
                    break;
                case scissorss:
                    mostCommon = '3';
                    break;
            }
        }

        // picks computer response based on difficulty (random if easy, best guess if hard and whatever beats the player if impossible)
        let difficultyCheck = c; // could let easy come this way too as it it's random, right?

        if (difficulty === 'Tricky'){
            difficultyCheck = mostCommon;
        }
        else if (difficulty === 'Futile') {
            difficultyCheck = pPiece.id;
        }
        
        switch (difficultyCheck) {
            case 1:
            case '1':
                cPiece = Paper;
                break;
            case 2:
            case '2':
                cPiece = Scissors;
                break;
            case 3:
            case '3':
                cPiece = Rock;
                break;
            default:
                console.log(configStr('Invalid Piece ID'));
                break;
        }
}

function playAgain(response) {

    if (response === 'y' || response === 'Y') {
        startGame();
    }
    else if (response === 'n' || response === 'N'){
        console.log(configStr(''));  
        quitGame('Yeah! You better run!');
    }
    else {
        console.clear();
        displayTop();
        console.log(configStr(''));
        console.log(configStr(''));
        console.log(configStr(''));
        console.log(configStr(''));
        console.log(configStr('Y/N?'));
        console.log(configStr(''));
        console.log(configStr(''));
        console.log(configStr(''));
        displayBottom();
        readline.question('?', handleUserResponse);
    }   
}

function checkQuit() {
    if(!isQuitting) {
        finished = true;
        console.log(configStr('Play again?'));
        console.log(configStr('Y/N'));
        displayBottom();
        readline.question('?', handleUserResponse);
    }
}

function handleUserResponse(response) {
    
    if (!difficultySet && !finished) {
        chooseDiff(response);
    }
    else if (difficultySet && !finished) {  
        if (response != '1' && response != '2' && response != '3') {
            console.clear();
            displayTop();
            displayGame();
            console.log(configStr('Play properly or not at all!'));
            console.log(configStr('You have to enter 1,2 or 3!'));
            displayBottom();
            readline.question('?', handleUserResponse);
        }   
        else {
            chooseAnswer(response);
            countdown();
            setTimeout(fight, 4500);
        }
    }
    else if (isQuitting) {
        quitGame();
    }
    else if (finished) {
        playAgain(response);
    }
}

function fight() {

timer = 0;

let endStr = Math.floor(Math.random() * 4);

switch (pPiece.name + cPiece.name) {
    case 'RockRock':
    case 'PaperPaper':
    case 'ScissorsScissors':
        victor = pPiece.pAnim2 + '  ' + cPiece.cAnim2;// need to pass this same gap to top
        finalComment = drawStr[endStr];
        break;
    case 'RockPaper':
    case 'PaperScissors':
    case 'ScissorsRock':
        victor = cPiece.cAnim2;
        cScore++;
        finalComment = vicStr[endStr];
        break;
    case 'RockScissors':
    case 'PaperRock':
    case 'ScissorsPaper':
        victor = pPiece.pAnim2;
        
        if (endStr !== 0) {
            pScore++;
        }
        if (pScore >= cScore + 5) {
            isQuitting = true;
            quitGame(losStr[3]);
            endStr = 4;
        }
        finalComment = losStr[endStr];
        break;
}

    // the warriors approach... // how to deal with different sized pieces (and paper being partially on line above)// ternary statements with 2 line anim for paper
    // make this section a bit slower

    // do this automatically like config so space and dots use same numbers

let dotBuffer = '..........';
let edgeBuffer = '';

for (let f = 0; f <= 5; f++) {
    timer += 500;
    switch (f % 2) {
        case 0:
            setTimeout(playAnim, timer, configStr(`${edgeBuffer}${pPiece.pAnim1}${dotBuffer}${cPiece.cAnim1}${edgeBuffer}`), (3 + f));
            break;
        case 1:
            setTimeout(playAnim, timer, configStr(`${edgeBuffer}${pPiece.pAnim2}${dotBuffer}${cPiece.cAnim2}${edgeBuffer}`), (3 + f));
            break;
        default:
            console.log('Error: 3rd binary case');
            break;
    }
    
    dotBuffer = dotBuffer.slice(0, -2);
    spaceBuffer = dotBuffer.slice(0, -2);
    edgeBuffer += '.';
}

    // fisticuffs
const dustArr = ['@', '  @', '@', '@  ', '@', '\`@\'', '.@.']

    for (let d = 0; d < 7; d++){
        timer += 500;
        setTimeout(playAnim, timer, configStr(dustArr[d]), 9);
    }
  
    // the victor emerges
    setTimeout(playAnim, 6500, configStr(`${victor}`), 10);
    }

function configStr(str) {
    const scrSize = 52;

    let buffer = '';
    for (let i = 0; i < ((scrSize - str.length) / 2) - (border.length); i++) {
       buffer += ' ';
    }
    return (str.length % 2 === 0) ? `${border}${buffer}${str}${buffer}${border}` : border + buffer + str + buffer.slice(0, -1) + border;
}

function pundit(stage) { // put pundit into anim function

    switch (stage) {
        case 1:
            // blank at start
            return configStr('');
        case 2:
            // at end of countdown
            return configStr('The warriors approach...');
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
            // commentary during dust up but not too quick
            let rand = Math.floor(Math.random() * commentary.length);
            return configStr(commentary[rand]);
        case 10:
            // final comment at the end
            return configStr(finalComment);
        default:
            return `Unexpected case: ${stage}`;
    }    
}

    function playAnim(anim, stage) {
        console.clear();
        
        displayTop();
        switch (stage) {
            case 1:
            case 2:
                console.log(configStr(''));
                break;
            case 3:
                console.log(configStr(`${pPiece.top}          ${cPiece.top}`));
                break;
            case 4:
                console.log(configStr(`${pPiece.top}        ${cPiece.top}`));
                break;
            case 5:
                console.log(configStr(`${pPiece.top}      ${cPiece.top}`));
                break;
            case 6:
                console.log(configStr(`${pPiece.top}    ${cPiece.top}`));
                break;
            case 7:
                console.log(configStr(`${pPiece.top}  ${cPiece.top}`));
                break;
            case 8:
                console.log(configStr(`${pPiece.top}${cPiece.top}`));
                break;
            case 9:
                console.log(configStr(''));
                break;
            case 10:
                Rock.top = '';
                Scissors.top = '';
                if (pPiece === Paper && cPiece === Paper) {
                    console.log(configStr(`${pPiece.top}  ${cPiece.top}`)); // need paper only anim here // needs a 2 space gap if paper draws
                }
                else if (pPiece === Scissors || cPiece === Scissors) {
                    console.log(configStr(''));
                }
                else {
                    console.log(configStr(`${pPiece.top}${cPiece.top}`));
                }
                break;
            default:
                console.log('Unexpected case: stage number');
                break;
        }
        
        console.log(anim);
        console.log(configStr(''));
        console.log(pundit(stage));
        console.log(configStr(''));
        
        if (stage < 10) {
            console.log(configStr(''));
            console.log(configStr(''));
            console.log(configStr(''));
            displayBottom();
        }
        else {
            showScores();
            checkQuit();
        }
    }
    
    function countdown() {

        setTimeout(playAnim, 0,    configStr('Ready'), 1);
        setTimeout(playAnim, 500,  configStr(''), 1);
        setTimeout(playAnim, 1000, configStr('3'), 1);
        setTimeout(playAnim, 1200, configStr('.'), 1);
        setTimeout(playAnim, 1400, configStr(''), 1);
        setTimeout(playAnim, 1600, configStr('.'), 1);
        setTimeout(playAnim, 1800, configStr(''), 1);
        setTimeout(playAnim, 2000, configStr('2'), 1);
        
        setTimeout(playAnim, 2200, configStr('.'), 1);
        setTimeout(playAnim, 2400, configStr(''), 1);
        setTimeout(playAnim, 2600, configStr('.'), 1);
        setTimeout(playAnim, 2800, configStr(''), 1);
        setTimeout(playAnim, 3000, configStr('1'), 1);
        
        setTimeout(playAnim, 3200, configStr('.'), 1);
        setTimeout(playAnim, 3400, configStr(''), 1);
        setTimeout(playAnim, 3600, configStr('.'), 1);
        setTimeout(playAnim, 3800, configStr(''), 1);
        setTimeout(playAnim, 4000, configStr('GO!!!'), 2);
    }
    
function displayTop() {
    console.log('****************************************************');
    console.log(configStr(''));
    console.log(configStr('A Tech Returner Rock, Paper, Scissors Game'));
    displayBottom();
}

function displayBottom() {
    console.log(configStr(''));
    console.log('****************************************************');
}

function startGame() {
    console.clear();
    difficultySet = false;
    finished = false;
    Rock.top = ' ';
    //Paper.top = ' _ ';
    Scissors.top = '  ';

    displayTop();
    displayDiff();
    console.log(configStr(''));
    console.log(configStr('Choose your difficulty'));
    displayBottom();
    readline.question('?', handleUserResponse);
}

startGame();