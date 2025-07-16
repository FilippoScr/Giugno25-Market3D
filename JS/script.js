const artArray = [
  {
    id: 1,
    nome: "Filamenti",
    img: {
      large: "assets/immagini/1920/filamenti.webp",
      medium: "assets/immagini/600/filamenti.webp",
      small: "assets/immagini/128/filamenti.webp",
    },
    altMessage: "Immagine filamenti.",
    descrizione: "Aa",
    prezzo: 25.99,
    quantita: 1,
  },
  {
    id: 2,
    nome: "Inserti",
    img: {
      large: "assets/immagini/1920/inserti.webp",
      medium: "assets/immagini/600/inserti.webp",
      small: "assets/immagini/128/inserti.webp",
    },
    altMessage: "Immagine inserti.",
    descrizione: "Bb",
    prezzo: 4.99,
    quantita: 1,
  },
  {
    id: 3,
    nome: "Stampante",
    img: {
      large: "assets/immagini/1920/stampante.webp",
      medium: "assets/immagini/600/stampante.webp",
      small: "assets/immagini/128/stampante.webp",
    },
    altMessage: "Immagine stampante.",
    descrizione: "Cc",
    prezzo: 399.0,
    quantita: 1,
  },
  {
    id: 4,
    nome: "Piatto",
    img: {
      large: "assets/immagini/1920/piatto.webp",
      medium: "assets/immagini/600/piatto.webp",
      small: "assets/immagini/128/piatto.webp",
    },
    altMessage: "Immagine piatto.",
    descrizione: "Dd",
    prezzo: 35.0,
    quantita: 1,
  },
  {
    id: 5,
    nome: "Kit pulizia",
    img: {
      large: "assets/immagini/1920/kit-pulizia.webp",
      medium: "assets/immagini/600/kit-pulizia.webp",
      small: "assets/immagini/128/kit-pulizia.webp",
    },
    altMessage: "Immagine kit pulizia.",
    descrizione: "Ee",
    prezzo: 10.0,
    quantita: 1,
  },
  {
    id: 6,
    nome: "Cuscinetti",
    img: {
      large: "assets/immagini/1920/cuscinetti.webp",
      medium: "assets/immagini/600/cuscinetti.webp",
      small: "assets/immagini/128/cuscinetti.webp",
    },
    altMessage: "Immagine cuscinetti.",
    descrizione: "Ff",
    prezzo: 4.5,
    quantita: 1,
  },
  {
    id: 7,
    nome: "Fotocamera",
    img: {
      large: "assets/immagini/1920/fotocamera.webp",
      medium: "assets/immagini/600/fotocamera.webp",
      small: "assets/immagini/128/fotocamera.webp",
    },
    altMessage: "Immagine fotocamera.",
    descrizione: "Gg",
    prezzo: 127.69,
    quantita: 1,
  },
];

// Gestione Salta dentro!.
const btnSaltaDentro = document.getElementById('btnSaltaDentro');
const loginForm = document.getElementById('loginForm');

btnSaltaDentro.addEventListener('click', function (e) {
  e.stopPropagation(); // Ferma la propagazione del click nel DOM.
  loginForm.style.display = (loginForm.style.display === 'block') ? 'none' : 'block';
  if (loginForm.style.display === 'block') {
    enabledDisabledBtnLoginForm();
  }
});

document.addEventListener('click', function () {
  loginForm.style.display = 'none';
});

loginForm.addEventListener('click', function (e) {
  e.stopPropagation(); // Se clicchi dentro il form, esso non si chiude.
});


function enabledDisabledBtnLoginForm() {
  const Email = document.getElementById('inputEmail');
  const Password = document.getElementById('inputPassword');
  const btnRegister = document.getElementById('btnRegister');
  const btnLogin = document.getElementById('btnLogin');

  function listenerEmailPw() {
    btnLogin.disabled = (Email.value === "" || Password.value === "");
    // btnRegister.disabled = (Email.value !== "" || Password.value !== ""); // Valutare se lasciarlo sempre visibile o meno.
  }

  listenerEmailPw();

  btnRegister.onclick = function (e) {
    e.stopPropagation();
    if (!btnRegister.disabled) {
      window.location.href = "registrazione.html";
    }
  };

  const listenerEmailPwDebounced = debounce(listenerEmailPw, 300);

  Email.addEventListener('input', listenerEmailPwDebounced);
  Password.addEventListener('input', listenerEmailPwDebounced);
}

// Cambiamenti dopo l'accesso:
document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Evita il comportamento predefinito di invio form

  // Modifica icona e testo del bottone "Salta dentro!"
  const btnSaltaDentro = document.getElementById('btnSaltaDentro');
  const icona = btnSaltaDentro.querySelector('i');
  const span = btnSaltaDentro.querySelector('span');
  icona.classList.remove('fa-person-through-window');
  icona.classList.add('fa-user-check');
  span.textContent = 'Benvenuto Visitatore!';

  loginForm.style.display = 'none';

  // Sostituisci il contenuto del div interno al loginForm con il bottone "Scollegati!"
  const divInterno = document.querySelector('#loginForm > div');
  divInterno.innerHTML = '<button type="button" id="btnLogout" class="btnLogout noColor">Scollegati!</button>';

  document.getElementById('btnLogout').addEventListener('click', function () {
    // Cancella dati di autenticazione o carrello
    localStorage.clear();
    sessionStorage.clear();

    // Ricarica la pagina o fai redirect
    location.reload();
    // oppure: window.location.href = 'index.html';
  });
});


const carrello = [];

function avviso(boxImgDivAvviso) {
  // Rimuovi eventuale div di avviso già presente
  const oldDivAvviso = boxImgDivAvviso.querySelector('div');
  if (oldDivAvviso) boxImgDivAvviso.removeChild(oldDivAvviso);

  const divAvviso = document.createElement("div");
  divAvviso.classList.add("divAvviso");
  const SVG =
    `<svg class="fileSVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52.916677 26.458333" aria-hidden="true">
      <path class="pathPolistellare"
        d="m 52.449474,13.229199 -3.910053,2.686682 0.951335,4.542104 -5.143636,0.07704 -1.399446,3.451444 -4.541034,-1.551712 -3.216165,3.248515 -4.742639,-2.448079 -3.989459,2.896193 -3.989475,-2.896192 -4.742618,2.448086 -3.216186,-3.2485 L 9.969101,23.986497 8.5696092,20.535056 3.4261371,20.457996 4.3773456,15.915893 0.46720395,13.22921 4.3773456,10.54252 3.4261371,6.0004291 8.5696092,5.9233116 9.969101,2.471864 14.510098,4.023585 17.726284,0.77506018 22.468902,3.2231372 26.458377,0.32694955 30.447836,3.2231372 35.190475,0.77506018 38.40664,4.023585 42.947674,2.471864 44.34712,5.9233116 49.490756,6.0004246 48.539421,10.54252 Z"
      />
    </svg>`
    ;
  divAvviso.innerHTML = SVG;
  boxImgDivAvviso.appendChild(divAvviso);

  // Rimuovi divAvviso dopo 2 secondi
  setTimeout(() => {
    boxImgDivAvviso.removeChild(divAvviso);
  }, 2000);
}

// Funzione per aggiungere un articolo al carrello:
function aggiungiAlCarrello(articolo) {
  const input = document.getElementById(`inputQntArt${articolo.id}`);
  const quantita = parseInt(input.value, 10) || 1;
  const index = carrello.findIndex((item) => item.id === articolo.id);
  if (index !== -1) {
    carrello[index].quantita += quantita;
  } else {
    carrello.push({
      id: articolo.id,
      nome: articolo.nome,
      img: articolo.img.small,
      altMessage: articolo.altMessage,
      quantita: quantita,
      prezzo: articolo.prezzo,
    });
  }
  aggiornaLista();
}

// Funzione per creare gli articoli nel main:
function creaArticoli(param = artArray) {
  const main = document.querySelector("main");
  main.innerHTML = "";
  for (let articolo of param) {
    const div = document.createElement("div");
    div.classList.add("articolo");
    div.setAttribute("data-id", articolo.id);

    div.innerHTML = `
            <h2>${articolo.nome}</h2>
            <div class="box_img-divAvviso"><img src="${articolo.img.medium}" alt="${articolo.altMessage}"></div>
            <p>${articolo.descrizione}</p>
            <p>Prezzo unitario: €${articolo.prezzo.toFixed(2)}</p>
            <label>Quantità:
                <input 
                    type="number" 
                    id="inputQntArt${articolo.id}" 
                    value="${articolo.quantita}" 
                    min="1"
                >
            </label>
            <p id="pPriceArt${articolo.id}">Totale: €${articolo.prezzo.toFixed(2)}</p>`;
    /* Prima nei backtick: <button onclick="aggiungiAlCarrello(${articolo.id})">Aggiungi al carrello...</button> */
    /* Prima nell'input: onchange="calcolaQuantita(${articolo.id} */
    // Event listener per l'input quantità:
    const inputQnt = div.querySelector(`#inputQntArt${articolo.id}`);
    inputQnt.addEventListener("change", () => calcolaQuantita(articolo));

    // Crea il bottone e aggiungi l'event listener:
    const btnAggiungi = document.createElement("button");
    btnAggiungi.innerHTML = `Aggiungi al carrello <i class="fa-solid fa-cart-plus"></i>`;
    btnAggiungi.addEventListener("click", () => {
      aggiungiAlCarrello(articolo);
      const boxImgDivAvviso = div.querySelector('.box_img-divAvviso');
      avviso(boxImgDivAvviso);
    })

    div.appendChild(btnAggiungi);

    main.appendChild(div);
  }
}

// Funzione per calcolare prezzo totale in base a prezzo e quantità:
function calcolaQuantita(articolo) {
  const input = document.getElementById(`inputQntArt${articolo.id}`);
  const quantita = parseInt(input.value, 10) || 1;
  const prezzoTotale = (articolo.prezzo * quantita).toFixed(2);

  const prezzoEl = document.getElementById(`pPriceArt${articolo.id}`);
  prezzoEl.textContent = `Totale: €${prezzoTotale}`;
}

//Nuovo ricalcolo quantità:
function aggiornaQuantitaCarrello(articolo) {
  const input = document.getElementById(`inputCartQntArt${articolo.id}`);
  const nuovaQuantita = parseInt(input.value, 10) || 1;
  // Trova l'articolo nel carrello e aggiorna la quantità:
  const index = carrello.findIndex(item => item.id === articolo.id);
  if (index !== -1) {
    carrello[index].quantita = nuovaQuantita;
    aggiornaLista();
  }
}

// Funzione placeholder per aggiornare la lista carrello:
function aggiornaLista() {
  const ulCart = document.querySelector("#asideCart ul");
  ulCart.innerHTML = ""; // Pulisce il contenuto precedente

  let totale = 0;

  for (let articolo of carrello) {
    const liCart = document.createElement("li");
    liCart.classList.add("cartBoxArt");
    liCart.innerHTML = `<img src="${articolo.img}" alt="${articolo.altMessage}" class="cartImg">
    <div class="cartBoxArtQnt">
      <h3>${articolo.nome}</h3>
      <label>Quantità:
          <input 
              type="number" 
              id="inputCartQntArt${articolo.id}" 
              value="${articolo.quantita}" 
              min="1" 
              )"
          >
      </label>
    </div>`;
    /* Prima nei backtick: <button onclick="eliminaProdotto(${articolo.id})">Elimina</button> */
    // Event listener per l'input quantità:
    const inputCartQnt = liCart.querySelector(`#inputCartQntArt${articolo.id}`);
    inputCartQnt.addEventListener("change", () => aggiornaQuantitaCarrello(articolo));
    // Crea il bottone e aggiungi l'event listener:
    const btnElimina = document.createElement("button");
    btnElimina.classList.add("btnxmarkCartBoxArt");
    Object.assign(btnElimina.style, {
      position: "absolute",
      right: "0px",
      top: "0px"
    });
    btnElimina.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    btnElimina.addEventListener("mousedown", function () {
      eliminaProdotto(articolo);
      const divAvvisi = document.querySelectorAll('.articolo .divAvviso');
      divAvvisi.forEach(elAvviso => elAvviso.remove());
    });
    liCart.querySelector(".cartBoxArtQnt").appendChild(btnElimina);

    ulCart.appendChild(liCart);
    totale += articolo.prezzo * articolo.quantita;
  }

  const totalElement = document.querySelector("#asideCart p");
  if (carrello.length === 0) {
    totalElement.textContent = "Carrello Vuoto!";
  } else {
    totalElement.textContent = `Totale carrello: €${totale.toFixed(2)}`;
  }
  enabledDisabledBtnCart();
}

function enabledDisabledBtnCart() {
  const ulCart = document.querySelector('#asideCart ul');
  const btnCartDisabled = document.querySelectorAll('.btnTrashCart, .btnCartAcq');
  const liPresenti = ulCart.children.length > 0;
  btnCartDisabled.forEach(btn => btn.disabled = !liPresenti);
}


function eliminaProdotto(articolo) {
  const index = carrello.findIndex((item) => item.id === articolo.id);
  if (index !== -1) {
    carrello.splice(index, 1);
    aggiornaLista();
  }
}

// Svuota il carrello:
document.getElementById('btnTrashCart').addEventListener('click', function () {
  carrello.length = 0; // Svuota l'array carrello
  aggiornaLista();     // Aggiorna la vista e disabilita il bottone se vuoto
  const divAvvisi = document.querySelectorAll('.articolo .divAvviso');
  divAvvisi.forEach(elAvviso => elAvviso.remove());
});

// Simula il comportamento del link Acquista...:
document.getElementById('btnCartAcq').addEventListener('click', function () {
  window.location.href = "../pages/pageEmpty.html";
});


/* // Barra di ricerca (cerca nell'array e ripopola il main): */
function ricerca() {
  const parola = document.getElementById("inputSearch").value.toLowerCase().trim();

  if (parola === "") {
    creaArticoli(artArray);
  } else {
    const risultati = artArray.filter(articolo =>
      articolo.nome.toLowerCase().includes(parola) /* ||
      articolo.descrizione.toLowerCase().includes(parola) */);
    if (risultati.length > 0) {
      creaArticoli(risultati)
    } else {
      const main = document.querySelector("main");
      main.innerHTML = "";
      const msg = document.createElement("p");
      msg.classList.add("msgArtNonTrovato");
      msg.textContent = "Articolo non trovato!";
      msg.style.textAlign = "center";
      main.appendChild(msg);
    }
  }
}


// Funzione debounce generica:
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Esegui al caricamento pagina:
document.addEventListener("DOMContentLoaded", function () {
  aggiornaLista(); //Mostra "Carrello Vuoto!" in P e chiama altre funzioni utili.
  creaArticoli();
  const btn = document.getElementById('btnTheme');
  const icon = btn.querySelector('i');
  const html = document.documentElement;

  btn.addEventListener('click', function () {
    // Leggi il tema attuale
    const temaAttuale = html.getAttribute('data-theme');
    // Cambia tema
    if (temaAttuale === 'light') {
      html.setAttribute('data-theme', 'dark');
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
    } else {
      html.setAttribute('data-theme', 'light');
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    }
  });


  const searchInput = document.getElementById("inputSearch");
  const searchButton = document.getElementById("buttonSearch");

  // Applica debounce solo all'input:
  const ricercaDebounced = debounce(ricerca, 300);

  // Ricerca mentre digiti con debouce:
  searchInput.addEventListener("input", ricercaDebounced);

  // Ricerca anche quando premi Enter (opzionale):
  searchInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      ricerca();
    }
  });

  // Ricerca solo al click del pulsante cerca:
  searchButton.addEventListener("click", ricerca);

  // Impedisce l'inserimento di valori inferiori a 1 negli input (anche quelli creati dinamicamente dopo il caricamento pagina):
  const container = document.getElementById('boxMainAside');

  container.addEventListener('input', (e) => {
    const target = e.target;

    // Controlla se l'elemento che ha generato l'evento è un input number
    if (target.matches('input[type="number"]')) {
      const value = parseInt(target.value, 10);
      if (isNaN(value) || value < 1) {
        target.value = 1;
      }
    }
  });
});
