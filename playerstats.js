
function showPlayerEl(doc) { // Funksjon for å vise spillerne i tabell
    let rounds = doc.data().goalsInRound.length // antall runder kamper spilt
    let tbodyEl = document.querySelector('tbody')
    let trEl = document.createElement('tr')

    let tdEl = document.createElement('td') // for spillernavn
    tdEl.innerHTML = doc.data().name
    trEl.appendChild(tdEl)

    tdEl = document.createElement('td') // for poeng i siste kampen
    tdEl.innerHTML = calcPointsRound(rounds-1,doc.data().goalsInRound,doc.data().assistsInRound,doc.data().MOTM,doc.data().CSInRound)
    trEl.appendChild(tdEl)

    tdEl = document.createElement('td') // for poeng totalt
    tdEl.innerHTML = calcPoints(rounds, doc.data().goalsInRound, doc.data().assistsInRound, doc.data().MOTM, doc.data().CSInRound)
    trEl.appendChild(tdEl)

    tdEl = document.createElement('td') // for antall mål
    tdEl.innerHTML = countFunc(doc.data().goalsInRound)
    trEl.appendChild(tdEl)

    tdEl = document.createElement('td') // antall assists
    tdEl.innerHTML = countFunc(doc.data().assistsInRound)
    trEl.appendChild(tdEl)

    tdEl = document.createElement('td') // antall clean sheets
    tdEl.innerHTML = countFunc(doc.data().CSInRound)
    trEl.appendChild(tdEl)

    tdEl = document.createElement('td') // antall Man of the Match
    tdEl.innerHTML = countFunc(doc.data().MOTM)
    trEl.appendChild(tdEl)

    tdEl = document.createElement('td') // posisjonen til spilleren
    tdEl.innerHTML = posFunc(doc.data().keeper)
    trEl.appendChild(tdEl)

    tdEl = document.createElement('td') // lagnavn
    tdEl.innerHTML = doc.data().team
    trEl.appendChild(tdEl)

    tbodyEl.appendChild(trEl) // legge alt til i rad
}

let db = firebase.firestore();

db.collection("players").get().then((snapshot) => {
    let documents = snapshot.docs;
    for (j = 0; j < documents.length;j++) {
        showPlayerEl(documents[j])
    }
});