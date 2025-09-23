function openTab(evt, tabName, group = "1") {
const contentClass = "tabcontent" + group;
const contentFallback = group === "1" ? "tabcontent" : null;
const linkClass = "tablinks" + group;
const linkFallback = group === "1" ? "tablinks" : null;
let tabcontent = Array.from(document.getElementsByClassName(contentClass));
if (tabcontent.length === 0 && contentFallback) {tabcontent = Array.from(document.getElementsByClassName(contentFallback));}tabcontent.forEach(tc => tc.style.display = "none");
let tablinks = Array.from(document.getElementsByClassName(linkClass));
if (tablinks.length === 0 && linkFallback) {tablinks = Array.from(document.getElementsByClassName(linkFallback));}tablinks.forEach(tl => tl.classList.remove("active"));
const target = document.getElementById(tabName);
if (!target) {console.warn(`openTab: élément avec l'id "${tabName}" introuvable.`);
return;}target.style.display = "block";
if (evt && evt.currentTarget) evt.currentTarget.classList.add("active");}document.addEventListener("DOMContentLoaded", () => {
const firstTabMain = document.querySelector(".tablinks1, .tablinks");
if (firstTabMain) firstTabMain.click();
const firstTab2 = document.querySelector(".tablinks2");
if (firstTab2) {setTimeout(() => firstTab2.click(), 50);}});
