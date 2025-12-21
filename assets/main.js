    document.addEventListener('DOMContentLoaded', function () {
      const buttons = document.querySelectorAll('.tab-btn');
      const contents = document.querySelectorAll('.tab-contenu');

      buttons.forEach(btn => {
        btn.addEventListener('click', () => {
          // retire les classes "actif" partout
          buttons.forEach(b => b.classList.remove('actif'));
          contents.forEach(c => c.classList.remove('actif'));

          // active le bouton cliqué
          btn.classList.add('actif');

          // récupère la valeur data-tab et active l'élément correspondant par id
          const id = 'tab' + btn.dataset.tab;
          const el = document.getElementById(id);
          if (el) el.classList.add('actif');
        });
      });
    });

/* === WIDGET ===*/

const servers = [
    "https://discord.com/api/guilds/1450725229914620039/widget.json",
    "https://discord.com/api/guilds/1376905559671832748/widget.json"
];

servers.forEach((url, index) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const container = document.createElement("div");
            container.classList.add("members-container");

            data.members.forEach(member => {
                const memberDiv = document.createElement("div");
                memberDiv.classList.add("member");

                const avatar = document.createElement("img");
                avatar.src = member.avatar_url || "default-avatar.png";
                avatar.alt = member.username;
                avatar.width = 50;

                const name = document.createElement("span");
                name.textContent = member.username;

                memberDiv.appendChild(avatar);
                memberDiv.appendChild(name);
                container.appendChild(memberDiv);
            });

            // Ajoute le conteneur à la page, à gauche ou à droite selon index
            if(index === 0){
                document.querySelector(".widget-lore").prepend(container);
            } else {
                document.querySelector(".widget-lore").append(container);
            }
        });
});
