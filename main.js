function openTab(evt, tabName) {
let tabcontent = document.getElementsByClassName("tabcontent");
for (let i = 0; i < tabcontent.length; i++) {tabcontent[i].style.display = "none";}
let tablinks = document.getElementsByClassName("tablinks");
for (let i = 0; i < tablinks.length; i++) {tablinks[i].classList.remove("active");}
document.getElementById(tabName).style.display = "block";evt.currentTarget.classList.add("active");}
document.addEventListener("DOMContentLoaded", () => {document.querySelector(".tablinks").click();});
