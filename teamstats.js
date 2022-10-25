
function showTeamEl(doc) {

    let tbodyEl = document.querySelector('tbody')
    let trEl = document.createElement('tr')

    let tdEl = document.createElement('td')
    tdEl.innerHTML = doc.data().name
    nameDict[doc.data().usrnm] = doc.data().name
    trEl.appendChild(tdEl)

    tdEl = document.createElement('td')
    tdEl.innerHTML = doc.data().usrnm
    trEl.appendChild(tdEl)

    db.collection('players').get().then((snapshot) => {
        let documents1 = snapshot.docs;
        gwtot = 0
        for (k=0;k<documents1.length;k++) {
            if (documents1[k].data().goalsInRound == undefined) {
                rounds = 0
            } else {
                rounds = documents1[k].data().goalsInRound.length
            }
            doc1 = documents1[k].data()
            if (doc.data().playersThisGW == undefined) {
                gwtot = 0
            } else if (doc.data().playersThisGW.includes(doc1.name)) {
                gwadd = calcPointsRound(rounds - 1, doc1.goalsInRound, doc1.assistsInRound, doc1.MOTM, doc1.CSInRound, doc1.keeper)
                gwtot += gwadd
            }
        }
        GWpts[doc.data().usrnm] = gwtot

        tdEl = document.createElement('td')
        tdEl.innerHTML = gwtot
        trEl.appendChild(tdEl)

        tdEl = document.createElement('td')
        tdEl.innerHTML = doc.data().points
        pointsDict[doc.data().usrnm] = doc.data().points
        trEl.appendChild(tdEl)

        GwSortEl = document.querySelector('#GWPTS')
        GwSortEl.gwpts = GWpts
        GwSortEl.names = nameDict
        GwSortEl.points = pointsDict
        GwSortEl.addEventListener('click', sortGW)

        totSortEl = document.querySelector('#TotPTS')
        totSortEl.gwpts = GWpts
        totSortEl.names = nameDict
        totSortEl.points = pointsDict
        totSortEl.addEventListener('click', sortTot)
    })

    tbodyEl.appendChild(trEl)
}

let db = firebase.firestore();

db.collection("teams").get().then((snapshot) => {
    let documents = snapshot.docs;
    nameDict = {}
    GWpts = {}
    pointsDict = {}
    for (j = 0; j < documents.length;j++) {
        showTeamEl(documents[j])
    }
});

function sortGW(evt) {
    GWpts = evt.currentTarget.gwpts
    pointsDict = evt.currentTarget.points
    nameDict = evt.currentTarget.names
    sortedArr = sortDict(GWpts)
    tbodyEl = document.querySelector('tbody')
    tbodyEl.innerHTML = ''
    for (i=0; i<sortedArr.length; i++) {
        tbodyEl = document.querySelector('tbody')
        trEl = document.createElement('tr')

        tdEl = document.createElement('td')
        tdEl.innerHTML = nameDict[sortedArr[i]]
        trEl.appendChild(tdEl)

        tdEl = document.createElement('td')
        tdEl.innerHTML = sortedArr[i]
        trEl.appendChild(tdEl)

        tdEl = document.createElement('td')
        tdEl.innerHTML = GWpts[sortedArr[i]]
        trEl.appendChild(tdEl)

        tdEl = document.createElement('td')
        tdEl.innerHTML = pointsDict[sortedArr[i]]
        trEl.appendChild(tdEl)

        tbodyEl.appendChild(trEl)
    }
}



function sortTot(evt) {
    GWpts = evt.currentTarget.gwpts
    pointsDict = evt.currentTarget.points
    nameDict = evt.currentTarget.names
    sortedArr = sortDict(pointsDict)
    tbodyEl = document.querySelector('tbody')
    tbodyEl.innerHTML = ''
    for (i=0; i<sortedArr.length; i++) {
        tbodyEl = document.querySelector('tbody')
        trEl = document.createElement('tr')

        tdEl = document.createElement('td')
        tdEl.innerHTML = nameDict[sortedArr[i]]
        trEl.appendChild(tdEl)

        tdEl = document.createElement('td')
        tdEl.innerHTML = sortedArr[i]
        trEl.appendChild(tdEl)

        tdEl = document.createElement('td')
        tdEl.innerHTML = GWpts[sortedArr[i]]
        trEl.appendChild(tdEl)

        tdEl = document.createElement('td')
        tdEl.innerHTML = pointsDict[sortedArr[i]]
        trEl.appendChild(tdEl)

        tbodyEl.appendChild(trEl)
    }
}



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