url = document.location.href // hente bruker-ID fra url
expvar = url.split('?')[1]
userID = expvar.split('=')[1]; // lagre brukeren-ID is userID

document.querySelector('#userID').innerHTML = 'user-ID: ' + userID // vise bruker-ID i h3



function showTeamNames(doc) { // funksjon for å vise spillernavn
    for (i=0; i<doc.players.length;i++) { // hente alle spillerene i spiller-arrayen
        collectTeamStats(doc,doc.players[i]) // legge til spillerstatistikk
    }
}

function collectTeamStats(doc,playerName) { // funksjon for å vise spillerstatisikk
    db.collection('players').get().then((snapshot) => { // firebase for å hente stats til spillere i lag 
        let documents2 = snapshot.docs;
        for (k=0;k<documents2.length;k++) {
            if (playerName == documents2[k].data().name) {
                showTeamStats(documents2[k].data(),playerName)
            }
        }
    })
}

function showTeamStats(doc1, playerName) {
    let rounds = doc1.goalsInRound.length // antall runder kamper spilt
    tbodyEl = document.querySelector('#team') // henter tbody
    trEl = document.createElement('tr') //lager rad

    tdEl = document.createElement('td') // spiller navn
    tdEl.innerHTML = playerName
    trEl.appendChild(tdEl)

    tdEl = document.createElement('td') // spiller poeng i runden
    gwtot = calcPointsRound(rounds-1, doc1.goalsInRound, doc1.assistsInRound, doc1.MOTM, doc1.CSInRound)
    tdEl.innerHTML = gwtot
    trEl.appendChild(tdEl)

    tdEl = document.createElement('td') // poeng totalt
    tot = calcPoints(rounds, doc1.goalsInRound, doc1.assistsInRound, doc1.MOTM, doc1.CSInRound)
    tdEl.innerHTML = tot
    trEl.appendChild(tdEl)

    tdEl = document.createElement('td') // spiller lag
    tdEl.innerHTML = doc1.team
    trEl.appendChild(tdEl)

    tdEl = document.createElement('td') //  posisjon
    tdEl.innerHTML = posFunc(doc1.keeper)
    trEl.appendChild(tdEl)

    buttonEl = document.createElement('button') // transfer knapp
    buttonEl.innerHTML = 'Transfer'
    buttonEl.addEventListener('click', transferPlayer)
    buttonEl.param = playerName
    buttonEl.setAttribute('class', 'transferOutButton')
    trEl.appendChild(buttonEl)

    tbodyEl.appendChild(trEl) // legge til rad

    if (document.querySelector('#performance').innerText.length < 1) { // lager perfomance tabellen med itrasjon
        trEl = document.querySelector('#performance')

        tdEl = document.createElement('td') // legger inn poeng denne runden fra data i første rad i tabellen under
        tdEl.innerHTML = gwtot
        trEl.appendChild(tdEl)

        tdEl = document.createElement('td') // legger inn totale poeng fra data i første rad i tabellen under
        tdEl.innerHTML = tot
        trEl.appendChild(tdEl)
    } else {
        numlist = document.querySelector('#performance').innerHTML.split('</td><td>') // henter data fra forrige iterasjon av tabellen
        for (i=0; i<2;i++) {
            numlist[i] = numlist[i].replace('<td>','')
            numlist[i] = numlist[i].replace('</td>','')
            numlist[i] = Number(numlist[i])
        }
        numlist[0] += gwtot
        numlist[1] += tot
        trEl = document.querySelector('#performance')
        trEl.innerHTML = '<td>' + numlist[0] + '</td><td>' + numlist[1] + '</td>' // legger til ny iterasjon i tabellen
    }
}

function transferPlayer(evt) {
    y = document.getElementsByClassName('transferOutButton')
    for (button of y) {
        button.disabled = true
    }

    bodyEl = document.querySelector('body')
    h1El = document.createElement('h3')
    playerName = evt.currentTarget.param
    h1El.innerHTML = 'Transfer out: ' + playerName
    bodyEl.appendChild(h1El)

    inputEl = document.createElement('input')
    inputEl.setAttribute('onkeyup', 'searchPlayer()')
    bodyEl.appendChild(inputEl)

    ulEl = document.createElement('ul')
    db.collection('players').get().then((snapshot) => {
        let documents2 = snapshot.docs;
        for (l=0; l<Math.min(documents2.length,7); l++) {
            liEl = document.createElement('li')
            liEl.innerHTML = documents2[l].data().name
            liEl.setAttribute('class', 'playerItem')
            ulEl.appendChild(liEl)

            transInEl = document.createElement('button')
            transInEl.innerHTML = 'Transfer In'
            transInEl.addEventListener('click', transInFunc)
            transInEl.playerIn = documents2[l].data().name
            transInEl.playerOut = playerName
            liEl.appendChild(transInEl)

            bodyEl.appendChild(ulEl)
        }
    })
}

function transInFunc(evt) {
    y = document.getElementsByClassName('transferOutButton')
    for (button of y) {
        button.disabled = false
    }

    playerIn = evt.currentTarget.playerIn
    playerOut = evt.currentTarget.playerOut

    registerEl = document.createElement('button')
    registerEl.innerHTML = 'Register Transfers'
    registerEl.addEventListener('click', registerTrans)
    bodyEl.appendChild(registerEl)


    index = playersArr.indexOf(playerOut)
    playersArr[index] = playerIn
    db.collection('teams').doc(userID).update({players: playersArr});
}

function registerTrans() {
    
}

function searchPlayer() {
    let input = document.querySelector('input').value
    input = input.toLowerCase()
    let x = document.getElementsByClassName('playerItem');
    for (i = 0; i < x.length; i++) { 
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display="none";
        } else {
            x[i].style.display="list-item"; 
        }
    }
}

db = firebase.firestore();

db.collection("teams").get().then((snapshot) => { // firebase for å hente spillere i lag
    let documents1 = snapshot.docs
    for (j = 0; j < documents1.length;j++) {
        if (documents1[j].id == userID) {
            playersArr = documents1[j].data().players
            showTeamNames(documents1[j].data())
        }
    }
});