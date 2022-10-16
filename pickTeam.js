/*
Div-en med spillerne i har ID #playerlistDiv
Hver liste sitt første element er lagnavnet og alle de har klassen .listHead

hvert div for listene med lagene har id ('#div' + lagnavn) uten mellomrom
For eksempel har 'Trust The Process' boksen id-en '#divTrustTheProcess'

listen inni div-boksen har id '#ulTrustTheProcess'
*/

url = document.location.href
username = url.split('?')[1]
password = url.split('?')[2]

db = firebase.firestore()

playerListDiv = document.querySelector('#playerlistDiv')

inputEl = document.querySelector('#input')
nameButtonEl = document.querySelector('#nameButton')
nameButtonEl.addEventListener('click', pickName)

searchEl = document.querySelector('#searchbar')
searchEl.setAttribute('onkeyup', 'searchPlayer()')

function pickName() {
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
            div0 = document.querySelector('#FuckCSS')
            div0.innerHTML = ''
            h2El = document.createElement('h1')
            h2El.innerHTML = 'Your Team Name:'
            h2El.setAttribute("class", "Addie")
            div0.appendChild(h2El)
            div1 = document.querySelector('#RegInP')
            div1.innerHTML = ''
            div2 = document.createElement('div')
            div2.setAttribute('id','shizasdiv')
            h2El = document.createElement('h1')
            h2El.innerHTML = teamName
            div2.appendChild(h2El)
            div1.appendChild(div2)
            cont()
        } else {
            window.alert('Team Name already exists')
        }
    })
}

function cont() {
db.collection('players').get().then((snapshot) => {
    docs = snapshot.docs;
    for (i=0; i<docs.length; i++) {
        ulEl = document.querySelector(('#ul' + docs[i].data().team).replaceAll(' ', '').replaceAll('.',''))
        if (ulEl == undefined) {
            divEl = document.createElement('div')
            divEl.setAttribute('id', ('div' + docs[i].data().team).replaceAll(' ', '').replaceAll('.',''))

            ulEl = document.createElement('ul')
            ulEl.setAttribute('id', ('ul' + docs[i].data().team).replaceAll(' ', '').replaceAll('.',''))
    
            liEl = document.createElement('li')
            liEl.innerHTML = docs[i].data().team
            liEl.setAttribute('class', 'listHead')
    
            ulEl.appendChild(liEl)
            playerListDiv.appendChild(ulEl)
        }
    }
    for (i=0; i<docs.length; i++) {
        liEl = document.createElement('li')
        liEl.innerHTML = docs[i].data().name

        buttonEl = document.createElement('button')
        buttonEl.innerHTML = 'Pick Player'
        buttonEl.addEventListener('click', pickPlayer)
        buttonEl.name = docs[i].data().name
        buttonEl.team = docs[i].data().team
        buttonEl.keeper = docs[i].data().keeper
        buttonEl.setAttribute('class','transButtons')

        liEl.appendChild(buttonEl)
        liEl.id = docs[i].id
        liEl.name = docs[i].data().name
        liEl.team = docs[i].data().team
        liEl.keeper = docs[i].data().keeper
        liEl.setAttribute('class', 'playerItem')

        ulEl = document.querySelector(('#ul' + docs[i].data().team).replaceAll(' ', '').replaceAll('.',''))
        ulEl.appendChild(liEl)

        items.push(liEl)
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
                item.setAttribute('class','disabled')
            }
            if (keeper == true && item.keeper == true) {
                item.style.display = 'none'
                item.setAttribute('class','disabled')
            }
            if (playerArr.length == 4 && keeper == false && item.keeper == false) {
                item.style.display = 'none'
                item.setAttribute('class','disabled')
            }
            if (playerArr.length == 5 && listed == false) {
                div5 = document.querySelector('#around')
                div5.innerHTML = ''
                div9 = document.createElement('div')
                div9.innerHTML = '<h1>Your Players:</h1>'
                div9.setAttribute('id', 'denSisteDivenJegLager')
                showPicksDiv = document.createElement('div')
                showPicksDiv.appendChild(div9)
                showPicksDiv.setAttribute('id','showPicksDiv')
                div1000 = document.createElement('div')
                div1000.setAttribute('id', 'jegløy')
                listed = true
                item.style.display = 'none'
                for (player of playerArr) {
                    h3El = document.createElement('h3')
                    h3El.innerHTML = player
                    div1000.appendChild(h3El)
                    showPicksDiv.appendChild(div1000)
                }
                homePageButton = document.createElement('button')
                /*
                db.collection('teams').add({
                    name: teamName,
                    players: playerArr,
                    transfersleft: 2,
                    usrnm: username,
                    psswrd: password
             
                })   */
                homePageButton.innerHTML = 'Take me to the user-page'
                homePageButton.addEventListener('click',confirm)
                homePageButton.setAttribute("class", "moro")
                div1000.appendChild(homePageButton)
                div5.appendChild(showPicksDiv)
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

function searchPlayer() {
    let input = document.querySelector('#searchbar').value
    input = input.toLowerCase()
    let a = document.getElementsByClassName('playerItem');
    let b = document.getElementsByClassName('transButtons')
    for (i = 0; i < a.length; i++) {
        if (!a[i].innerHTML.toLowerCase().includes(input)) {
            a[i].style.display="none";
        } else {
            a[i].appendChild(b[i])
            a[i].style.display="list-item";
        }
    }
}
let input = document.getElementById("input");

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("nameButton").click();
  }
});