usrnmEl = document.querySelector('#username')
psswrdEl = document.querySelector('#password')

buttonEl = document.querySelector('#loginbutton')


let db = firebase.firestore();

let glemtEl = document.querySelector("#glemt");

glemtEl.addEventListener("click", alertFunksjon);

function alertFunksjon(){
    alert("Snakk med Shiza eller Aleks for glemt brukernavn eller passord");
}

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

function myFunction() {
    let x = document.getElementById("password");
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
  

let input = document.getElementById("password");

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("loginbutton").click();
  }
});