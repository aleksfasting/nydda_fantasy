function addTeam() {
    teamName = prompt('team name')
    i = 1
    playerArr = []
    cont = true
    while (cont) {
        player = prompt('Player' + i)
        if (player == 'ferdig') {
            for (playerEl of playerArr) {
                db.collection('players').add({
                    name: playerEl,
                    team: teamName,
                    keeper: false
                })
            }
            cont = false
        } else {
            playerArr.push(player)
            i += 1
        }
    }
}

db = firebase.firestore();

addTeam()