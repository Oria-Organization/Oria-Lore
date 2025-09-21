function openTab(evt, tabName, group = "1") {
let tabcontent = document.getElementsByClassName("tabcontent" + group);
for (let i = 0; i < tabcontent.length; i++) {tabcontent[i].style.display = "none";}
let tablinks = document.getElementsByClassName("tablinks" + group);
for (let i = 0; i < tablinks.length; i++) {tablinks[i].classList.remove("active");}
document.getElementById(tabName).style.display = "block";
evt.currentTarget.classList.add("active");}
document.addEventListener("DOMContentLoaded", () => {
let firstTab1 = document.querySelector(".tablinks1");
if (firstTab1) firstTab1.click();
let firstTab2 = document.querySelector(".tablinks2");
if (firstTab2) firstTab2.click();});
