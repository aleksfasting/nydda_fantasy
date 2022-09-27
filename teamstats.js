
function showTeamEl(doc) {
    let tbodyEl = document.querySelector('tbody')
    let trEl = document.createElement('tr')

    let tdEl = document.createElement('td')
    tdEl.innerHTML = doc.data().name
    trEl.appendChild(tdEl)

    tdEl = document.createElement('td')
    tdEl.innerHTML = doc.data().usrnm
    trEl.appendChild(tdEl)


    db.collection('players').get().then((snapshot) => {
        let documents1 = snapshot.docs;
        gwtot = 0
        tot = 0
        for (k=0;k<documents1.length;k++) {
            if (documents1[k].data().goalsInRound == undefined) {
                rounds = 0
            } else {
                rounds = documents1[k].data().goalsInRound.length
            }
            doc1 = documents1[k].data()
            if (doc.data().players.includes(doc1.name)) {
                gwtot += calcPointsRound(rounds - 1, doc1.goalsInRound, doc1.assistsInRound, doc1.MOTM, doc1.CSInRound)
                tot += calcPoints(rounds, doc1.goalsInRound, doc1.assistsInRound, doc1.MOTM, doc1.CSInRound)
            }
        }
        tdEl = document.createElement('td')
        tdEl.innerHTML = gwtot
        trEl.appendChild(tdEl)

        tdEl = document.createElement('td')
        tdEl.innerHTML = tot
        trEl.appendChild(tdEl)
    })

    tbodyEl.appendChild(trEl)
}

let db = firebase.firestore();

db.collection("teams").get().then((snapshot) => {
    let documents = snapshot.docs;
    for (j = 0; j < documents.length;j++) {
        showTeamEl(documents[j])
    }
});