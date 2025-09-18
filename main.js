function openTab(evt, tabName) {
let tabcontent = document.getElementsByClassName("tabcontent");
for (let i = 0; i < tabcontent.length; i++) {tabcontent[i].style.display = "none";}
let tablinks = document.getElementsByClassName("tablinks");
for (let i = 0; i < tablinks.length; i++) {tablinks[i].classList.remove("active");}
document.getElementById(tabName).style.display = "block";evt.currentTarget.classList.add("active");}
document.addEventListener("DOMContentLoaded", () => {document.querySelector(".tablinks").click();});

document.getElementById("oriaForm").addEventListener("submit", function(e) {e.preventDefault();
const webhookURL = "https://discord.com/api/webhooks/1418268269152047226/Ai0klj0_6naxp_PGHtIuuBJfe2pwQcczg-sIZOCGmjrxPYlWKoXGegEk1kpIyNpjQ9xH";
const name = document.getElementById("name").value;
const message = document.getElementById("message").value;
const payload = {content: `📩 **Nouveau formulaire reçu !**\n👤 Nom : ${name}\n💬 Message : ${message}`};
fetch(webhookURL, {method: "POST",headers: { "Content-Type": "application/json" },body: JSON.stringify(payload)})
.then(res => {if (res.ok) {document.getElementById("status").innerText = "✅ Envoyé avec succès !";} else {document.getElementById("status").innerText = "❌ Erreur lors de l’envoi.";}})
.catch(() => {document.getElementById("status").innerText = "⚠️ Impossible de contacter Discord.";});});
