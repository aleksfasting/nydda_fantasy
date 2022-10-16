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
                    pexists = true
                }
            }

            if (uexists) {
                window.alert('username exists')
            } else if (pexists) {
                window.alert('password exists')
            } else {
                db.collection('teams').add({
                    usrnm: u,
                    psswrd: p,
                })
                window.alert('Created User: ' + u)
                document.location.replace('pickTeam.html?' + u + '?' + p)
            }
        })
    }
    else{
      window.alert("The passwords aren`t the same");
    }
}

function myFunction() {
    let x = document.getElementById("password1");
    let y = document.getElementById("hide1");
    let z = document.getElementById("hide2");
    if (x.type === "password") {
      x.type = "text";
      y.style.display = "none";
      z.style.display = "block";
    } else {
      x.type = "password";
      y.style.display = "block";
      z.style.display = "none";
    }
  }
  
  
function myFunction2() {
    let a = document.getElementById("password2");
    let b = document.getElementById("hide3");
    let c = document.getElementById("hide4");
    if (a.type === "password") {
      a.type = "text";
      b.style.display = "none";
      c.style.display = "block";
    } else {
      a.type = "password";
      b.style.display = "block";
      c.style.display = "none";
    }
  }
  
let input = document.getElementById("password2");

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("loginbutton").click();
  }
});