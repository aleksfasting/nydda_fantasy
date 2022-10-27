/*
Her viser jeg hvilke elementer som har klasser og id:

User-id overskriften har id 'userID'
tbody til den store tabellen har id 'team'
tbody til den lille tabellen har id 'performance'
Transferknappene har class '.transferOutButton'
Div-boksen som kommer opp når man trykker på transfer knappene har id '#transdiv'
Knappene 'transfer in' har klasse '.transInButtons'
Div-boksen med knappen 'register transfers' som kommer opp når man trykker på 'transfer' in knappene har id '#registerdiv'
Knappen 'register transfers' har id '#registerButton'
*/

url = document.location.href // hente bruker-ID fra url
expvar = url.split('?')[1]
userID = expvar.split('=')[1]; // lagre brukeren-ID is userID

countDownDate = new Date("Nov 4, 2022 11:00:00").getTime();

resetButton = document.querySelector('#resetbutton')
resetButton.innerHTML = 'Reset'
resetButton.addEventListener('click',refresh)

function refresh() {document.location = url}



// Update the count down every 1 second
x = setInterval(function() {

  // Get today's date and time
  now = new Date().getTime();

  // Find the distance between now and the count down date
  distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  days = Math.floor(distance / (1000 * 60 * 60 * 24));
  hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  seconds = Math.floor((distance % (1000 * 60)) / (1000))

  // Display the result in the element with id="demo"
  document.querySelector("#userID").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + 's';

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    document.querySelector("#userID").innerHTML = "DEADLINE";
  }
}, 1000);


function showTeamNames(doc) { // funksjon for å vise spillernavn
    for (i=0; i<doc.players.length;i++) { // hente alle spillerene i spiller-arrayen
        collectTeamStats(doc,doc.players[i],doc.transfersLeft) // legge til spillerstatistikk
    }

    gwpts = 0
    tallet = 0
    for (i=0; i<doc.players.length;i++) {
        performanceStats(doc,doc.playersThisGW[i])
    }
    
    trEl2 = document.querySelector('#performance')

    tdEl = document.createElement('td')
    tdEl.innerHTML = doc.points
    trEl2.appendChild(tdEl)
}

function performanceStats(doc,playerGW) {
    db.collection('players').get().then((snapshot) => {
        dok = snapshot.docs
        for (p=0;p<dok.length;p++) {
            if (dok[p].data().name == playerGW) {
                dok = dok[p].data()
                if (dok.goalsInRound != undefined) {
                    rounds = dok.goalsInRound.length // antall runder kamper spilt
                } else {
                    rounds = 0
                }
                
                gwpts += calcPointsRound(rounds-1, dok.goalsInRound, dok.assistsInRound, dok.MOTM, dok.CSInRound, dok.keeper)
                tallet++
                if (tallet == 5) {
                    trEl2.querySelector('#performance')
                    tdEl = document.createElement('td')
                    tdEl.innerHTML = gwpts
                    trEl2.appendChild(tdEl)
                }
            }
        }
    })
}

function collectTeamStats(doc,playerName,transfersLeft) { // funksjon for å vise spillerstatisikk
    db.collection('players').get().then((snapshot) => { // firebase for å hente stats til spillere i lag 
        doc2 = snapshot.docs;
        for (k=0;k<doc2.length;k++) {
            if (playerName == doc2[k].data().name) {
                showTeamStats(doc2[k].data(),playerName,transfersLeft)
            }
        }
    })
}

function showTeamStats(doc1, playerName,transfersLeft) {
    if (doc1.goalsInRound != undefined) {
        rounds = doc1.goalsInRound.length // antall runder kamper spilt
    } else {
        rounds = 0
    }

    tbodyEl = document.querySelector('#team') // henter tbody
    trEl = document.createElement('tr') //lager rad

    tdEl = document.createElement('td') // spiller navn
    tdEl.innerHTML = playerName
    trEl.appendChild(tdEl)

    tdEl = document.createElement('td') // poeng totalt
    tot = calcPoints(rounds, doc1.goalsInRound, doc1.assistsInRound, doc1.MOTM, doc1.CSInRound, doc1.keeper)
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
    buttonEl.transfersLeft = transfersLeft
    buttonEl.setAttribute('class', 'transferOutButton')
    trEl.appendChild(buttonEl)

    tbodyEl.appendChild(trEl) // legge til rad
}

function transferPlayer(evt) {
    y = document.getElementsByClassName('transferOutButton')
    for (button of y) {
        button.disabled = true
    }
    resetButton.disabled = false

    transDivEl = document.querySelector('#transdiv') // henter divboksen for transfers med id-en transdiv
    h3El = document.createElement('h3')
    h3El.setAttribute("class", "transferH3")
    playerName = evt.currentTarget.param // henter parameter for navn
    transfersLeft = evt.currentTarget.transfersLeft

    h3El.innerHTML = 'Transfer:  <br>' + playerName
    transDivEl.appendChild(h3El)

    inputEl = document.createElement('input') // lager søkeboks
    inputEl.setAttribute('onkeyup', 'searchPlayer()')
    inputEl.setAttribute('class', 'input')
    inputEl.setAttribute('placeholder', 'Search for a player');

    if (!Boolean(document.querySelector('.input'))) {
        registerDivEl.appendChild(inputEl)
    }

    ulEl = document.createElement('ul') // lager liste for spillere som skal byttes inn
    db.collection('players').get().then((snapshot) => { // henter spillere
        documents2 = snapshot.docs;
        playerTeamDict = {}
        playerPosDict = {}
        for (m = 0; m < documents2.length; m++) {
            playerTeamDict[documents2[m].data().name] = documents2[m].data().team // Objekt for hvilke lag som er hvilke spillere
            playerPosDict[documents2[m].data().name] = posFunc(documents2[m].data().keeper) // Objekt for hvilken posisjon spillere er
        }
        a = []
        b = []
        for (l=0; l < documents2.length; l++) {

            liEl = document.createElement('li') // lager liste elementer
            liEl.innerHTML = documents2[l].data().name
            liEl.setAttribute('class', 'playerItem') // listeelementene har klassen playerItem
            a.push(liEl)

            transInEl = document.createElement('button') // lager knapper i listen
            transInEl.innerHTML = 'Transfer In'
            transInEl.addEventListener('click', transInFunc)
            transInEl.setAttribute('class', 'transInButtons') // lagde klasse for transfer in knappene, '.transInButtons'
            transInEl.playerIn = documents2[l].data().name
            transInEl.playerOut = playerName
            transInEl.transfersLeft = transfersLeft
            b.push(transInEl)
        }
        for  (n = 0; n < Math.min(documents2.length,7); n++) {
            a[n].appendChild(b[n])
            ulEl.appendChild(a[n])
            transDivEl.appendChild(ulEl)
        }
    })
}

function transInFunc(evt) {
    y = document.getElementsByClassName('transferOutButton')
    for (button of y) {
        button.disabled = false
    }
    z = document.getElementsByClassName('transInButtons')
    for (button of z) {
        button.disabled = true
    }

    playerIn = evt.currentTarget.playerIn
    playerOut = evt.currentTarget.playerOut
    transfersLeft = evt.currentTarget.transfersLeft

    if (!Boolean(document.querySelector('#registerButton'))) {
        registerEl = document.createElement('button')
        registerEl.innerHTML = 'Register'
        registerEl.setAttribute('id','registerButton')
        registerEl.addEventListener('click', registerTrans)
        registerDivEl.appendChild(registerEl)
    }

    index = playersArr.indexOf(playerOut)
    playersArr[index] = playerIn
    h3El.innerHTML += (' - ' + playerIn)
}

function registerTrans(evt) {
    keeperCount = 0
    sameTeam = false
    alertCount = 0
    
    resetButton = document.querySelector('#resetbutton')
    resetButton.disabled  = true
    for (i = 0; i < playersArr.length; i++) {
        for (j = 0; j < playersArr.length; j++) {
            player1 = playersArr[i]
            player2 = playersArr[j]
            if (i != j) 
            if (playerTeamDict[player1] == playerTeamDict[player2]) {
                sameTeam = true
                if (alertCount == 0) {
                    alertCount += 1
                    window.alert('You can only have 1 player from each team')
                }
            }
        }
        if (playerPosDict[player1] == 'Keeper') {
            keeperCount += 1
        }
        if (keeperCount != 1) {
            keeperFault = true
        } else {
            keeperFault = false
        }
    }
    if (keeperFault) {
        window.alert('You must only have 1 keeper')
    }
    
    newtransfersLeft = transfersLeft
    for (o = 0; o < 5; o++) {
        if (playersArr[o] != playersArrSave[o]) {
            newtransfersLeft = newtransfersLeft - 1
        }
    
    }
    if (newtransfersLeft < 0) {
        window.alert('You have no transfers left')
    }
    if (!keeperFault && !sameTeam && (newtransfersLeft >= 0)) {
        db.collection('teams').doc(userID).update({players: playersArr, transfersLeft: newtransfersLeft});
    } else {
        playersArr = playersArrSave
    }
    transDivEl.innerHTML = ''
    registerDivEl.innerHTML = ''
}

function searchPlayer() {
    let input = document.querySelector('input').value
    input = input.toLowerCase()
    let x = document.getElementsByClassName('playerItem');
    for (i = 0; i < a.length; i++) { 
        if (!a[i].innerHTML.toLowerCase().includes(input)) {
            a[i].style.display="none";
        } else {
            a[i].appendChild(b[i])
            ulEl.appendChild(a[i])
            a[i].style.display="list-item";
        }
    }
}

db = firebase.firestore();

db.collection('teams').doc(userID).onSnapshot((snapshot) => {
    db.collection("teams").get().then((snapshot) => { // firebase for å hente spillere i lag
        let documents1 = snapshot.docs

        tbodyEl1 = document.querySelector('#team')
        tbodyEl1.innerHTML = ''
        transDivEl = document.querySelector('#transdiv')
        transDivEl.innerHTML = ''
        tbodyEl2 = document.querySelector('#performance')
        tbodyEl2.innerHTML = ''
        registerDivEl = document.querySelector('#registerdiv')
        registerDivEl.innerHTML = ''


        for (j = 0; j < documents1.length;j++) {
            if (documents1[j].id == userID) {
                playersArr = documents1[j].data().players
                playersArrSave = documents1[j].data().players
                points = documents1[j].data().points
                showTeamNames(documents1[j].data())

                document.querySelector('#translefth2').innerHTML += documents1[j].data().transfersLeft
            }
        }
    });
})