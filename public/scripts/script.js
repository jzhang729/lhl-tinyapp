var xhr;
var logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", function (e) {
  e.preventDefault();
  makeRequest("/logout");
});

function makeRequest(url) {
  xhr = new XMLHttpRequest();

  if (!xhr) {
   alert('Giving up :( Cannot create an XMLHTTP instance');
   return false;
  }

  xhr.onreadystatechange = ajaxLogout;
  xhr.open('POST', url);
  xhr.send();
}

function ajaxLogout () {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {
      location.reload();
    }
  }
}

function createElement (str) {
  var div = document.createElement("div");
  div.innerHTML = str;
  return div;
}
