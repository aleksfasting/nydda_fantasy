url = document.location.href
username = url.split('?')[1]
password = url.split('?')[2]

db = firebase.firestore()

ulEl = document.querySelector('#playerlist')

inputEl = document.querySelector('#input')
nameButtonEl = document.querySelector('#nameButton')
nameButtonEl.addEventListener('click', pickName)

function pickName() {
    showPicksDiv = document.querySelector('#showPicksDiv')
    showPicksDiv.innerHTML = ''
    teamNameExists = false
    playerArr = []
    teamArr = []
    keeper = false
    listed = false
    items = []
    teamName = inputEl.value
    db.collection('teams').get().then((snapshot) => {
        documents = snapshot.docs
        for (i=0;i<documents.length;i++) {
            if (documents[i].data().name == teamName) {
                teamNameExists = true
            }
        }
        if (!teamNameExists) {
            h2El = document.createElement('h2')
            h2El.innerHTML = teamName
            showPicksDiv.appendChild(h2El)
            cont()
        } else {
            window.alert('Team Name already exists')
        }
    })
}

function cont() {
db.collection('players').get().then((snapshot) => {
    docs = snapshot.docs;
    for (i=0;i<docs.length;i++) {
        liEl = document.createElement('li')
        liEl.innerHTML = docs[i].data().name
        buttonEl = document.createElement('button')
        buttonEl.innerHTML = 'Pick Player'
        buttonEl.addEventListener('click', pickPlayer)
        buttonEl.name = docs[i].data().name
        buttonEl.team = docs[i].data().team
        buttonEl.keeper = docs[i].data().keeper
        liEl.appendChild(buttonEl)
        liEl.id = docs[i].id
        liEl.name = docs[i].data().name
        liEl.team = docs[i].data().team
        liEl.keeper = docs[i].data().keeper
        items.push(liEl)

        ulEl.appendChild(liEl)
    }
})
}

function lister() {
    for (player of playerArr) {
        for (item of items) {
            j = playerArr.indexOf(player)
            team = teamArr[j]
            if (team == item.team) {
                item.style.display = 'none'
            }
            if (keeper == true && item.keeper == true) {
                item.style.display = 'none'
            }
            if (playerArr.length == 4 && keeper == false && item.keeper == false) {
                item.style.display = 'none'
            }
            if (playerArr.length == 5 && listed == false) {
                listed = true
                item.style.display = 'none'
                for (player of playerArr) {
                    h3El = document.createElement('h3')
                    h3El.innerHTML = player
                    showPicksDiv.appendChild(h3El)
                }
                homePageButton = document.createElement('button')
                db.collection('teams').add({
                    name: teamName,
                    players: playerArr,
                    transfersleft: 2,
                    usrnm: username,
                    psswrd: password
                })
                homePageButton.innerHTML = 'Take me to the user-page'
                homePageButton.addEventListener('click',confirm)
                showPicksDiv.appendChild(homePageButton)
            }
        }
    }
}

function confirm() {
    db.collection('teams').get().then((snapshot) => {
        documents1 = snapshot.docs
        for (k=0;k<documents1.length;k++) {
            if (documents1[k].data().name == teamName) {
                document.location.href = 'userpage.html?user=' + documents1[k].id
            }
        }
    })
}

function pickPlayer(evt) {
    playerName = evt.currentTarget.name
    playerTeam = evt.currentTarget.team
    playerKeeper = evt.currentTarget.keeper
    playerArr.push(playerName)
    teamArr.push(playerTeam)
    if (playerKeeper == true) {
        keeper  = true
    }
    lister()
}