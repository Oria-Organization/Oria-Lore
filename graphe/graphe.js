const fichiers = [
  "graphe/contenu/partenaires_discord/Fear And Love.md",
  "graphe/contenu/partenaires_discord/Neko's Coffee.md",
  "graphe/contenu/partenaires_discord/Serveur des crêpes.md",
  "graphe/contenu/Annexes des mis à jour.md",
  "graphe/contenu/Oria Organisation.md",
  "graphe/contenu/Serveur discord - Empire Nexara.md",
  "graphe/contenu/Wiki du lore d'Oria.md"
];

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

  for (const fichier of fichiers) {
    const response = await fetch(fichier);
    if (!response.ok) {
      console.warn(`Impossible de charger ${fichier} (${response.status})`);
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
  function dessinerGraphe() {
    if (!positions[lien.from] || !positions[lien.to]) return;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", positions[lien.from].x);
    line.setAttribute("y1", positions[lien.from].y);
    line.setAttribute("x2", positions[lien.to].x);
    line.setAttribute("y2", positions[lien.to].y);
    line.setAttribute("stroke", "#ffffff");
    svg.appendChild(line);
  };

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