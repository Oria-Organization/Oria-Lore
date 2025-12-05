// --- TABS ---
function openTab(evt, tabName, group = "1") {
    const contentClass = "tabcontent" + group;
    const contentFallback = group === "1" ? "tabcontent" : null;
    const linkClass = "tablinks" + group;
    const linkFallback = group === "1" ? "tablinks" : null;

    let tabcontents = Array.from(document.getElementsByClassName(contentClass));
    if (tabcontents.length === 0 && contentFallback) tabcontents = Array.from(document.getElementsByClassName(contentFallback));
    tabcontents.forEach(tc => tc.style.display = "none");

    let tablinks = Array.from(document.getElementsByClassName(linkClass));
    if (tablinks.length === 0 && linkFallback) tablinks = Array.from(document.getElementsByClassName(linkFallback));
    tablinks.forEach(tl => tl.classList.remove("active"));

    const target = document.getElementById(tabName);
    if (!target) return console.warn(`openTab: élément "${tabName}" introuvable.`);
    target.style.display = "block";

    let clickedElem = evt instanceof Event && evt.currentTarget ? evt.currentTarget : evt instanceof HTMLElement ? evt : null;
    if (clickedElem) clickedElem.classList.add("active");
}

window.openTab = openTab;

document.addEventListener("DOMContentLoaded", () => {
    const firstTabMain = document.querySelector(".tablinks1, .tablinks");
    if (firstTabMain) firstTabMain.click();
    const firstTab2 = document.querySelector(".tablinks2");
    if (firstTab2) setTimeout(() => firstTab2.click(), 50);

    // --- MENU DEROULANT MOBILE ---
    document.querySelectorAll('.bloc_base').forEach(btn => {
        btn.addEventListener('click', () => {
            const menu = btn.nextElementSibling;
            if (menu.style.display === 'flex') menu.style.display = 'none';
            else menu.style.display = 'flex';
        });
    });
});