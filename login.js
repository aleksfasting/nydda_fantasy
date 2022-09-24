usrnmEl = document.querySelector('#username')
psswrdEl = document.querySelector('#password')

buttonEl = document.querySelector('#loginbutton')

let db = firebase.firestore();



function login() {
    utry = usrnmEl.value
    ptry = psswrdEl.value
    db.collection("teams").get().then((snapshot) => {
        let documents = snapshot.docs;
        let loginSuccess = false
        for (j = 0; j < documents.length;j++) {
            let data = documents[j].data()
            if (utry == data.usrnm && ptry == data.psswrd) {
                loginSuccess = true
                userlogin = documents[j].id
            }
        }
        if (loginSuccess) {
            document.location.replace('userpage.html?user='+userlogin)
        } else {
            window.alert('wrong username or password')
        }
    });

}