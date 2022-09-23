usrnmEl = document.querySelector('#username')
psswrdEl = document.querySelector('#password')

buttonEl = document.querySelector('#loginbutton')

let db = firebase.firestore();



function loginClick() {
    utry = usrnmEl.value
    ptry = psswrdEl.value
    db.collection("teams").get().then((snapshot) => {
        let documents = snapshot.docs;
        let loginSuccess = false
        for (j = 0; j < documents.length;j++) {
            let data = documents[j].data()
            if (utry == data.usrnm && ptry == data.psswrd) {
                loginSuccess = true
            }
        }
        if (loginSuccess) {
            document.write('success')
        } else {
            document.write('nono')
        }
    });

}



