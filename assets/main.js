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