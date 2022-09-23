
function showTeamEl(doc) {
    let tbodyEl = document.querySelector('tbody')
    let trEl = document.createElement('tr')

    let tdEl = document.createElement('td')
    tdEl.innerHTML = doc.data().name
    trEl.appendChild(tdEl)

    tdEl = document.createElement('td')
    tdEl.innerHTML = doc.data().usrnm
    trEl.appendChild(tdEl)

    tbodyEl.appendChild(trEl)
}

let db = firebase.firestore();

db.collection("teams").get().then((snapshot) => {
    let documents = snapshot.docs;
    for (j = 0; j < documents.length;j++) {
        showTeamEl(documents[j])
    }
});