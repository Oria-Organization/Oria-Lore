const fichiers = [
  "partenaires_discord/Fear And Love.md",
  "partenaires_discord/Neko's Coffee.md",
  "partenaires_discord/Serveur des crêpes.md",
  "Annexes des mis à jour.md",
  "Oria Organisation.md",
  "Serveur discord - Empire Nexara.md",
  "Wiki du lore d'Oria.md"
];

function obtenirCheminContenu() {
  const cheminPage = window.location.pathname;
  const cheminBase = new URL(document.baseURI).pathname;

  if (cheminPage.includes("/Oria-Lore/") || cheminBase.includes("/Oria-Lore/")) {
    return "/Oria-Lore/graphe/contenu/";
  }

  return "/graphe/contenu/";
}

let documents = {};
let liens = [];

function normaliser(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "");
}

function extraireFrontMatter(texte) {
  const match = texte.match(/^---([\s\S]*?)---/);
  if (!match) return { nom: "Sans nom" };

  const lignes = match[1].split("\n");
  let nom = "Sans nom";

  for (const ligne of lignes) {
    if (ligne.trim().startsWith("nom:"))
      nom = ligne.replace("nom:", "").trim();
  }

  return { nom };
}

async function chargerFichiers() {
  let fichiersCharges = 0;

  const baseContenu = obtenirCheminContenu();

  for (const fichier of fichiers) {
    const response = await fetch(`${baseContenu}${fichier}`);
    if (!response.ok) {
      console.warn(`Impossible de charger ${baseContenu}${fichier} (${response.status})`);
      continue;
    }

    const texte = await response.text();
    const { nom } = extraireFrontMatter(texte);

    documents[normaliser(nom)] = {
      nom,
      contenu: texte.replace(/^---[\s\S]*?---/, "")
    };

    const regex = /\[\[([^\]]+)\]\]/g;
    let match;
    while ((match = regex.exec(texte)) !== null) {
      liens.push({
        from: normaliser(nom),
        to: normaliser(match[1])
      });
    }

    fichiersCharges += 1;
  }

  if (fichiersCharges === 0) {
    const note = document.getElementById("graph-note");
    if (note) {
      note.textContent = "Aucun document chargé. Vérifiez les chemins des fichiers Markdown.";
    }
  }

  afficherListe();
  dessinerGraphe();
}

function afficherListe() {
  const ul = document.getElementById("doc-list");
  ul.innerHTML = "";

  Object.values(documents).forEach(doc => {
    const li = document.createElement("li");
    li.textContent = doc.nom;
    li.onclick = () => afficherDocument(doc.nom);
    ul.appendChild(li);
  });
}

function afficherDocument(nom) {
  const doc = documents[normaliser(nom)];
  if (!doc) return;

  document.getElementById("doc-title").textContent = doc.nom;

  const contenu = doc.contenu.replace(/\[\[([^\]]+)\]\]/g, (m, cible) => {
    return `<a href="#" onclick="afficherDocument('${cible}')">${cible}</a>`;
  });

  document.getElementById("doc-content").innerHTML =
    marked.parse(contenu);
}

function dessinerGraphe() {
  const svg = document.getElementById("graph");
  svg.innerHTML = "";

  const noms = Object.keys(documents);
  const centreX = 350;
  const centreY = 250;
  const rayon = 150;

  let positions = {};

  noms.forEach((nom, i) => {
    const angle = (i / noms.length) * 2 * Math.PI;
    const x = centreX + rayon * Math.cos(angle);
    const y = centreY + rayon * Math.sin(angle);
    positions[nom] = { x, y };
  });

  liens.forEach(lien => {
    if (!positions[lien.from] || !positions[lien.to]) return;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", positions[lien.from].x);
    line.setAttribute("y1", positions[lien.from].y);
    line.setAttribute("x2", positions[lien.to].x);
    line.setAttribute("y2", positions[lien.to].y);
    line.setAttribute("stroke", "#ffffff");
    svg.appendChild(line);
  });

  noms.forEach(nom => {
    const { x, y } = positions[nom];

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", x);
    circle.setAttribute("cy", y);
    circle.setAttribute("r", 15);
    circle.setAttribute("fill", "#550000");
    circle.style.cursor = "pointer";
    circle.onclick = () => afficherDocument(documents[nom].nom);
    svg.appendChild(circle);
  });
}

chargerFichiers();