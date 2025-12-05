// ==========================
// Onglets (tabs)
// ==========================
function openTab(evt, tabName, group = "1") {
    const contentClass = "tabcontent" + group;
    const contentFallback = group === "1" ? "tabcontent" : null;
    const linkClass = "tablinks" + group;
    const linkFallback = group === "1" ? "tablinks" : null;

    // Masquer tous les contenus
    let tabcontents = Array.from(document.getElementsByClassName(contentClass));
    if (tabcontents.length === 0 && contentFallback) tabcontents = Array.from(document.getElementsByClassName(contentFallback));
    tabcontents.forEach(tc => tc.style.display = "none");

    // Retirer "active" sur tous les boutons
    let tablinks = Array.from(document.getElementsByClassName(linkClass));
    if (tablinks.length === 0 && linkFallback) tablinks = Array.from(document.getElementsByClassName(linkFallback));
    tablinks.forEach(tl => tl.classList.remove("active"));

    // Afficher l'onglet sélectionné
    const target = document.getElementById(tabName);
    if (!target) return console.warn(`openTab: id "${tabName}" introuvable`);
    target.style.display = "block";

    // Ajouter "active" sur le bouton cliqué
    let clickedElem = evt.currentTarget || evt;
    clickedElem.classList.add("active");
}
window.openTab = openTab;

document.addEventListener("DOMContentLoaded", () => {
    // Ouvre le premier onglet
    const firstTabMain = document.querySelector(".tablinks1, .tablinks");
    if (firstTabMain) firstTabMain.click();
    const firstTab2 = document.querySelector(".tablinks2");
    if (firstTab2) setTimeout(() => firstTab2.click(), 50);

    // ==========================
    // Menu déroulant & sous-menu
    // ==========================
    const blocs = document.querySelectorAll(".bloc_base");
    blocs.forEach(btn => {
        btn.addEventListener("click", e => {
            // Toggle display du menu
            const contenu = btn.nextElementSibling;
            if (!contenu) return;
            // Fermer les autres menus au même niveau
            const siblings = Array.from(btn.parentNode.children).filter(c => c !== contenu && c.classList.contains("bloc-contenu"));
            siblings.forEach(sib => sib.style.display = "none");

            // Afficher / cacher ce menu
            contenu.style.display = (contenu.style.display === "block") ? "none" : "block";
        });
    });

    // Fermer les menus si clic à l'extérieur (desktop)
    document.addEventListener("click", e => {
        if (!e.target.closest(".bloc")) {
            document.querySelectorAll(".bloc-contenu").forEach(menu => menu.style.display = "none");
        }
    });
});
