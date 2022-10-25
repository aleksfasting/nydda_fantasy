db = firebase.firestore()

bytteLagNavn()


function bytteLagNavn() {
db.collection('teams').get().then((snapshot) => {
    doc = snapshot.docs;
    j = 0
    for (i = 0; i<doc.length; i++) {
        //if (doc[i].data().playersThisGW == undefined) {continue}
        if (doc[i].data().players.includes('Viggo seiersgren Jensen')) {
            ind = doc[i].data().players.indexOf('Viggo seiersgren Jensen')
            console.log(ind)
        }
    }
})
}

function deadlineDay() {
    console.log('hello')
    db.collection('teams').get().then((snapshot) => {
        doc = snapshot.docs
        for (i=0;i<doc.length;i++) {
            deadlineDayPoints(doc[i].data().players, doc[i].data().points, doc[i].id)
        }
        for (i=0;i<doc.length;i++) {
            playerArrSave = doc[i].data().players
            ID = doc[i].id
            db.collection('teams').doc(ID).update({
                playersThisGW: playerArrSave
            })
        }
    })
}

function deadlineDayPoints(players, points, ID) {
    for (player of players) {
        db.collection('players').get().then((snapshot) => {
            ptsGW = points
            doc1 = snapshot.docs
            
            for (j=0;j<doc1.length;j++) {
                if (doc1[j].data().goalsInRound == undefined) {
                    rounds = 0
                } else {
                    rounds = doc1[j].data().goalsInRound.length
                }
                if (player == doc1[j].data().name) {
                    ptsGW += calcPointsRound(
                        rounds,
                        doc1[j].data().goalsInRound, 
                        doc1[j].data().assistsInRound,
                        doc1[j].data().MOTM,
                        doc1[j].data().CSInRound
                        )
                }
            }
            db.collection('teams').doc(ID).update({
                points: ptsGW,
                transfersLeft: 2
            })
        })
    }
}



/*  Funksjoner:
bytteLagNavn(); deadlineDay()
*/