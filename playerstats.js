
function showPlayerEl(doc) { // Funksjon for å vise spillerne i tabell
    
    let tbodyEl = document.querySelector('tbody')
    let trEl = document.createElement('tr')
    trEl.setAttribute('class', 'listItem')
    trEl.pos = posFunc(doc.data().keeper)

    let tdEl = document.createElement('td') // for spillernavn
    tdEl.innerHTML = doc.data().name
    trEl.appendChild(tdEl)

    if (doc.data().goalsInRound != undefined) {
        let rounds = doc.data().goalsInRound.length

        tdEl = document.createElement('td') // for poeng i siste kampen
        ptsGWEl = calcPointsRound(rounds-1,doc.data().goalsInRound,doc.data().assistsInRound,doc.data().MOTM,doc.data().CSInRound)
        tdEl.innerHTML = ptsGWEl
        ptsGW[doc.id] = ptsGWEl
        trEl.appendChild(tdEl)

        tdEl = document.createElement('td') // for poeng totalt
        ptsTOTEl = calcPoints(rounds, doc.data().goalsInRound, doc.data().assistsInRound, doc.data().MOTM, doc.data().CSInRound)
        tdEl.innerHTML = ptsTOTEl
        ptsTOT[doc.id] = ptsTOTEl
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
    } else {
        for (i=0;i<6;i++) {
            tdEl = document.createElement('td')
            tdEl.innerHTML = 0
            trEl.appendChild(tdEl)
        }
    }

    tdEl = document.createElement('td') // posisjonen til spilleren
    tdEl.innerHTML = posFunc(doc.data().keeper)
    trEl.appendChild(tdEl)

    tdEl = document.createElement('td') // lagnavn
    tdEl.innerHTML = doc.data().team
    trEl.appendChild(tdEl)

    tbodyEl.appendChild(trEl) // legge alt til i rad
}

function sortGW(evt) {
    GWpts = evt.currentTarget.gwpts
    sortedArr = sortDict(GWpts)
    tbodyEl = document.querySelector('tbody')
    tbodyEl.innerHTML = ''
    for (i=0; i<sortedArr.length; i++) {
        db.collection('players').doc(sortedArr[i]).get().then((snapshot) => {
            doc = snapshot

            let rounds = doc.data().goalsInRound.length
            trEl = document.createElement('tr')
            trEl.setAttribute('class', 'listItem')
            trEl.pos = posFunc(doc.data().keeper)

            tdEl = document.createElement('td')
            tdEl.innerHTML = doc.data().name
            trEl.appendChild(tdEl)

            tdEl = document.createElement('td') // for poeng i siste kampen
            ptsGWEl = calcPointsRound(rounds-1,doc.data().goalsInRound,doc.data().assistsInRound,doc.data().MOTM,doc.data().CSInRound)
            tdEl.innerHTML = ptsGWEl
            ptsGW[doc.id] = ptsGWEl
            trEl.appendChild(tdEl)

            tdEl = document.createElement('td') // for poeng totalt
            ptsTOTEl = calcPoints(rounds, doc.data().goalsInRound, doc.data().assistsInRound, doc.data().MOTM, doc.data().CSInRound)
            tdEl.innerHTML = ptsTOTEl
            ptsTOT[doc.id] = ptsTOTEl
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

            tdEl = document.createElement('td')
            tdEl.innerHTML = doc.data().team
            trEl.appendChild(tdEl)

            tbodyEl.appendChild(trEl)

        })
    }
}

function sortTOT(evt) {
    ptsTOT = evt.currentTarget.ptstot
    sortedArr = sortDict(ptsTOT)
    tbodyEl = document.querySelector('tbody')
    tbodyEl.innerHTML = ''
    for (i=0; i<sortedArr.length; i++) {
        db.collection('players').doc(sortedArr[i]).get().then((snapshot) => {
            doc = snapshot

            let rounds = doc.data().goalsInRound.length
            trEl = document.createElement('tr')
            trEl.setAttribute('class', 'listItem')
            trEl.pos = posFunc(doc.data().keeper)

            tdEl = document.createElement('td')
            tdEl.innerHTML = doc.data().name
            trEl.appendChild(tdEl)

            tdEl = document.createElement('td') // for poeng i siste kampen
            ptsGWEl = calcPointsRound(rounds-1,doc.data().goalsInRound,doc.data().assistsInRound,doc.data().MOTM,doc.data().CSInRound)
            tdEl.innerHTML = ptsGWEl
            ptsGW[doc.id] = ptsGWEl
            trEl.appendChild(tdEl)

            tdEl = document.createElement('td') // for poeng totalt
            ptsTOTEl = calcPoints(rounds, doc.data().goalsInRound, doc.data().assistsInRound, doc.data().MOTM, doc.data().CSInRound)
            tdEl.innerHTML = ptsTOTEl
            ptsTOT[doc.id] = ptsTOTEl
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

            tdEl = document.createElement('td')
            tdEl.innerHTML = doc.data().team
            trEl.appendChild(tdEl)

            tbodyEl.appendChild(trEl)

        })
    }
}

let db = firebase.firestore();

db.collection("players").get().then((snapshot) => {
    let documents = snapshot.docs;
    ptsGW = {}
    ptsTOT = {}
    for (j = 0; j < documents.length;j++) {
        showPlayerEl(documents[j])
    }
    sortGWEl = document.querySelector('#GWPTS')
    sortGWEl.gwpts = ptsGW
    sortGWEl.addEventListener('click', sortGW)

    sortTOTEl = document.querySelector('#TotPTS')
    sortTOTEl.ptstot = ptsTOT
    sortTOTEl.addEventListener('click', sortTOT)

    filterKeepEl = document.querySelector('#keeperbutton')
    filterKeepEl.addEventListener('click', filterKeepers)

    filterOutEl = document.querySelector('#outfieldbutton')
    filterOutEl.addEventListener('click', filterOutfield)
});

function sortDict(dict) {
    valuesArr = []
    keysArr = Object.keys(dict)
    for (i=0;i<keysArr.length;i++) {
        valuesArr.push(dict[keysArr[i]])
    }
    for (i=0; i<valuesArr.length; i++) {
        for (j=0; j<valuesArr.length; j++) {
            if (valuesArr[j] < valuesArr[i]) {
                saveVal = valuesArr[j]
                valuesArr[j] = valuesArr[i]
                valuesArr[i] = saveVal

                saveKey = keysArr[j]
                keysArr[j] = keysArr[i]
                keysArr[i] = saveKey
            }
        }
    }
    return keysArr
}

function filterKeepers() {
    a = document.getElementsByClassName('listItem')
    for (i=0;i<a.length;i++) {
        if (a[i].pos == 'Outfield') {
            a[i].style.display = 'none'
        } else {
            a[i].style.display = 'table-row'
        }
    }
}

function filterOutfield() {
    a = document.getElementsByClassName('listItem')
    console.log('hello')
    for (i=0;i<a.length;i++) {
        if (a[i].pos == 'Keeper') {
            a[i].style.display = 'none'
        } else {
            a[i].style.display = 'table-row'
        }
    }
}