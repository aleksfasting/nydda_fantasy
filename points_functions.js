let cleansheet = 3;
let goal = 3;
let assist = 2;
let motm = 4;


function calcPointsRound(i, Goals, Assists, MOTM, CS) {
    if (Goals == undefined) {
        return 0
    }
    let points = goal * Goals[i] + assist * Assists[i] + motm * MOTM[i] + cleansheet * CS[i];
    return points
}

function calcPoints(numRounds,Goals,Assists,MOTM,CS) {
    let points = 0
    for (i=0;i<numRounds;i++) {
        points += calcPointsRound(i, Goals, Assists, MOTM, CS)
    }
    return points;
}

function countFunc(Arr) {
    let num = 0;
    for (game of Arr) {
        num += game
    }
    return num
}

function posFunc(keeper) {
    if (keeper) {
        return 'Keeper'
    }
    else {
        return 'Outfield'
    }
}