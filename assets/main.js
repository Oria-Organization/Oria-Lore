function openTab(evt, tabName, group = "1") {
    // classes dynamiques selon le groupe (compatibilité avec tabcontent / tabcontent1 / tabcontent2, ...)
    const contentClass = "tabcontent" + group;
    const contentFallback = group === "1" ? "tabcontent" : null;
    const linkClass = "tablinks" + group;
    const linkFallback = group === "1" ? "tablinks" : null;

    // Récupère les contenus à cacher
    let tabcontents = Array.from(document.getElementsByClassName(contentClass));
    if (tabcontents.length === 0 && contentFallback) {
        tabcontents = Array.from(document.getElementsByClassName(contentFallback));
    }
    tabcontents.forEach(tc => {
        tc.style.display = "none";
    });

    // Récupère les liens / boutons et retire la classe active
    let tablinks = Array.from(document.getElementsByClassName(linkClass));
    if (tablinks.length === 0 && linkFallback) {
        tablinks = Array.from(document.getElementsByClassName(linkFallback));
    }
    tablinks.forEach(tl => {
        tl.classList.remove("active");
    });

    // Trouve la cible et l'affiche
    const target = document.getElementById(tabName);
    if (!target) {
        console.warn(`openTab: élément avec l'id "${tabName}" introuvable.`);
        return;
    }
    target.style.display = "block";

    // Gère l'ajout de la classe "active" sur l'élément cliqué.
    // evt peut être un Event (evt.currentTarget) ou directement un HTMLElement (dans certains appels programmatiques).
    let clickedElem = null;
    if (evt instanceof Event && evt.currentTarget) {
        clickedElem = evt.currentTarget;
    } else if (evt instanceof HTMLElement) {
        clickedElem = evt;
    }
    if (clickedElem) {
        clickedElem.classList.add("active");
    }
}

// Assure la portée globale si jamais le script est utilisé avec des attributs onclick dans le HTML
window.openTab = openTab;

// Initialisation au chargement de la page : ouvre le premier onglet trouvé
document.addEventListener("DOMContentLoaded", () => {
    const firstTabMain = document.querySelector(".tablinks1, .tablinks");
    if (firstTabMain) firstTabMain.click();

    const firstTab2 = document.querySelector(".tablinks2");
    if (firstTab2) {
        // petit délai pour s'assurer qu'éventuels scripts d'UI sont prêts
        setTimeout(() => firstTab2.click(), 50);
    }
});
