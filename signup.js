usrnmEl = document.querySelector('#username')
psswrd1El = document.querySelector('#password1')
psswrd2El = document.querySelector('#password2')

buttonEl = document.querySelector('#loginbutton')

let db = firebase.firestore();

function signup() {
    if (psswrd1El.value==psswrd2El.value) {
        u = usrnmEl.value
        p = psswrd1El.value
        db.collection("teams").get().then((snapshot) => {
            let documents = snapshot.docs;
            uexists = false
            pexists = false
            for (j = 0; j < documents.length;j++) {
                if (documents[j].data().usrnm == u) {
                    uexists = true
                } else if (documents[j].data().psswrd == p) {
                    pexists = ture
                }
            }

            if (uexists) {
                console.log('u exists')
            } else if (pexists) {
                console.log('p exists')
            } else {
                db.collection('teams').add({
                    usrnm: u,
                    psswrd: p,
                })
            }
        })
    }
}