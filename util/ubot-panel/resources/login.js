function showStartScreen () {
  document.getElementById('startScreen').style.display='flex'
  document.getElementById('anonLoginScreen').style.display='none'
  document.getElementById('accountScreen').style.display='none'
}
function showAnonLoginScreen () {
  document.getElementById('startScreen').style.display='none'
  document.getElementById('anonLoginScreen').style.display='flex'
  document.getElementById('loginButtonScreen').style.display='flex'
}
function showAccountScreen () {
  document.getElementById('startScreen').style.display='none'
  document.getElementById('accountScreen').style.display='flex'
  document.getElementById('loginButtonScreen').style.display='flex'
}
function loginTemp () {
  location = "/panel.html"
}