db = firebase.firestore()

document.querySelector('#pickTeam').addEventListener('click', start)

registerButtonEl = document.querySelector('#registerbutton')
registerButtonEl.addEventListener('click', registerGame)

players1 = []
players2 = []

goalsDict = {}
assistsDict = {}

scoreEl = document.querySelector('#score')
scoreEl.score = [0,0]
cleanSheet = [true, true]
MOTM = ''



function start() {
    registerButtonEl.disabled = false
    input1 = document.querySelector('#team1input').value

    input2 = document.querySelector('#team2input').value

    db.collection('players').get().then((snapshot) => {
        doc = snapshot.docs
        for (i = 0; i<doc.length; i++) {
            if (doc[i].data().team == input1) {
                players1.push(doc[i].data().name)
            }
        }
    })

    db.collection('players').get().then((snapshot) => {
        doc = snapshot.docs
        for (i = 0; i<doc.length; i++) {
            if (doc[i].data().team == input2) {
                players2.push(doc[i].data().name)
            }
        }
    })



    h3El = document.querySelector('#h31')
    h3El.innerHTML = input1

    for (i=0; i<players1.length;i++) {
        ulEl = document.querySelector('#team1ul')

        liEl = document.createElement('li')
        liEl.innerHTML = players1[i]

        buttonEl = document.createElement('button')
        goals = 0
        buttonEl.innerHTML = goals + ' goals'
        buttonEl.goals = goals
        buttonEl.team = 0
        buttonEl.player = players1[i]
        goalsDict[players1[i]] = 0
        buttonEl.addEventListener('click', addGoal)
        liEl.appendChild(buttonEl)

        buttonEl = document.createElement('button')
        assists = 0
        buttonEl.innerHTML = assists + ' assists'
        buttonEl.assists = assists
        buttonEl.player = players1[i]
        assistsDict[players1[i]] = 0
        buttonEl.addEventListener('click', addAssist)
        liEl.appendChild(buttonEl)

        buttonEl = document.createElement('button')
        buttonEl.innerHTML = 'MOTM'
        buttonEl.setAttribute('class', 'MOTMbutton')
        buttonEl.player = players1[i]
        buttonEl.addEventListener('click', MOTMfunc)
        liEl.appendChild(buttonEl)
        
        ulEl.appendChild(liEl)
    }



    h3El = document.querySelector('#h32')
    h3El.innerHTML = input2

    for (i=0; i<players2.length;i++) {
        ulEl = document.querySelector('#team2ul')

        liEl = document.createElement('li')
        liEl.innerHTML = players2[i]

        buttonEl = document.createElement('button')
        goals = 0
        buttonEl.innerHTML = goals + ' goals'
        buttonEl.goals = goals
        buttonEl.team = 1
        buttonEl.player = players2[i]
        goalsDict[players2[i]] = 0
        buttonEl.addEventListener('click', addGoal)
        liEl.appendChild(buttonEl)

        buttonEl = document.createElement('button')
        assists = 0
        buttonEl.innerHTML = assists + ' assists'
        buttonEl.assists = assists
        buttonEl.player = players2[i]
        assistsDict[players2[i]] = 0
        buttonEl.addEventListener('click', addAssist)
        liEl.appendChild(buttonEl)

        buttonEl = document.createElement('button')
        buttonEl.innerHTML = 'MOTM'
        buttonEl.setAttribute('class', 'MOTMbutton')
        buttonEl.player = players2[i]
        buttonEl.addEventListener('click', MOTMfunc)
        liEl.appendChild(buttonEl)
        
        ulEl.appendChild(liEl)
    }
}



function addGoal(evt) {
    evt.currentTarget.goals++
    goals = evt.currentTarget.goals
    player = evt.currentTarget.player

    evt.currentTarget.innerHTML = goals + ' goals'

    scoreEl = document.querySelector('#score')
    scoreEl.score[evt.currentTarget.team]++
    scoreEl.innerHTML = scoreEl.score[0] + ' - ' + scoreEl.score[1]
    goalsDict[player]++

    cleanSheet[Math.abs(evt.currentTarget.team - 1)] = false
}



function addAssist(evt) {
    evt.currentTarget.assists++
    assists = evt.currentTarget.assists
    player = evt.currentTarget.player

    evt.currentTarget.innerHTML = assists + ' assists'
    assistsDict[player]++
}



function MOTMfunc(evt) {
    player = evt.currentTarget.player
    console.log(player)
    x = document.getElementsByClassName('MOTMbutton')
    for (buttonEl of x) {
        buttonEl.disabled = true
    }
    MOTM = player
}



function registerGame() {
    db.collection('players').get().then((snapshot) => {
        doc1 = snapshot.docs
        for (i=0;i<doc1.length;i++) {
            if (players1.includes(doc1[i].data().name)) {
                player = doc1[i].data().name
                if (doc1[i].data().goalsInRound == undefined) {
                    goalsInRoundSave = []
                } else {
                    goalsInRoundSave = doc1[i].data().goalsInRound
                }
                if (doc1[i].data().assistsInRound == undefined) {
                    assistsInRoundSave = []
                } else {
                    assistsInRoundSave = doc1[i].data().assistsInRound
                }
                if (doc1[i].data().assistsInRound == undefined) {
                    assistsInRoundSave = []
                } else {
                    assistsInRoundSave = doc1[i].data().assistsInRound
                }
                if (doc1[i].data().CSInRound == undefined) {
                    CSInRoundSave = []
                } else {
                    CSInRoundSave = doc1[i].data().CSInRound
                }
                if (doc1[i].data().MOTM == undefined) {
                    MOTMSave = []
                } else {
                    MOTMSave = doc1[i].data().MOTM
                }
                goalsInRoundSave.push(goalsDict[player])
                assistsInRoundSave.push(assistsDict[player])
                CSInRoundSave.push(cleanSheet[0])
                if (MOTM == player) {
                    MOTMSave.push(true)
                } else {
                    MOTMSave.push(false)
                }


                console.log(goalsInRoundSave, assistsInRoundSave, CSInRoundSave, MOTMSave)

                db.collection('players').doc(doc1[i].id).update({
                    goalsInRound: goalsInRoundSave,
                    assistsInRound: assistsInRoundSave,
                    CSInRound: CSInRoundSave,
                    MOTM: MOTMSave
                })
            }
        }
    })



    db.collection('players').get().then((snapshot) => {
        doc1 = snapshot.docs
        for (i=0;i<doc1.length;i++) {
            if (players2.includes(doc1[i].data().name)) {
                player = doc1[i].data().name
                if (doc1[i].data().goalsInRound == undefined) {
                    goalsInRoundSave = []
                } else {
                    goalsInRoundSave = doc1[i].data().goalsInRound
                }
                if (doc1[i].data().assistsInRound == undefined) {
                    assistsInRoundSave = []
                } else {
                    assistsInRoundSave = doc1[i].data().assistsInRound
                }
                if (doc1[i].data().assistsInRound == undefined) {
                    assistsInRoundSave = []
                } else {
                    assistsInRoundSave = doc1[i].data().assistsInRound
                }
                if (doc1[i].data().CSInRound == undefined) {
                    CSInRoundSave = []
                } else {
                    CSInRoundSave = doc1[i].data().CSInRound
                }
                if (doc1[i].data().MOTM == undefined) {
                    MOTMSave = []
                } else {
                    MOTMSave = doc1[i].data().MOTM
                }
                goalsInRoundSave.push(goalsDict[player])
                assistsInRoundSave.push(assistsDict[player])
                CSInRoundSave.push(cleanSheet[1])
                if (MOTM == player) {
                    MOTMSave.push(true)
                } else {
                    MOTMSave.push(false)
                }


                console.log(goalsInRoundSave, assistsInRoundSave, CSInRoundSave, MOTMSave)

                db.collection('players').doc(doc1[i].id).update({
                    goalsInRound: goalsInRoundSave,
                    assistsInRound: assistsInRoundSave,
                    CSInRound: CSInRoundSave,
                    MOTM: MOTMSave
                })
            }
        }
    })
}