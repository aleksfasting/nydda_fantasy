url = document.location.href
expvar = url.split('?')[1]
userID = expvar.split('=')[1];

document.querySelector('#userID').innerHTML = 'user-ID: ' + userID