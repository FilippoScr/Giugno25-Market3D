/* all'apertura della pagina avvia funzione di caricamento oggetti nel main */

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
    // Login disabilitato se 1 dei campi è vuoto:
    btnLogin.disabled = (Email.value === "" || Password.value === "");
    // Register disabilitato se 1 dei campi è pieno:
    // btnRegister.disabled = (Email.value !== "" || Password.value !== ""); // Valutare se lasciarlo sempre visibile o meno.
  }

  // Controllo iniziale subito dopo la definizione della funzione
  listenerEmailPw();

  // Simula il comportamento del link Registrati...:
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
  span.textContent = 'Benvenuto Z!';

  // Nascondi subito il form
  loginForm.style.display = 'none';

  // Sostituisci il contenuto del div interno al loginForm con il bottone "Scollegati!"
  const divInterno = document.querySelector('#loginForm > div');
  divInterno.innerHTML = '<button type="button" id="btnLogout" class="btnLogout noColor">Scollegati!</button>';

  document.getElementById('btnLogout').addEventListener('click', function () {
    // Cancella dati di autenticazione o carrello
    localStorage.clear();
    sessionStorage.clear();
    // ...altri dati da cancellare...

    // Ricarica la pagina o fai redirect
    location.reload();
    // oppure: window.location.href = 'index.html';
  });
});


const carrello = [];

function avviso(divAvviso) {
  // Rimuovi eventuale span già presente
  const oldSpan = divAvviso.querySelector('span');
  if (oldSpan) divAvviso.removeChild(oldSpan);

  // Crea e aggiungi nuovo span
  const spanAvviso = document.createElement("span");
  spanAvviso.textContent = "Aggiunto al carrello!";
  divAvviso.appendChild(spanAvviso);

  // Rimuovi lo span dopo 1.5 secondi
  setTimeout(() => {
    divAvviso.removeChild(spanAvviso);
  }, 1500);
}

// Funzione per aggiungere un articolo al carrello: modifica28-29-17-articolo.
function aggiungiAlCarrello(articolo) {
  //const aggiungiArt = artArray.find(item => item.id === id);
  // Prendi la quantità attuale dall'input
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

// Funzione per creare gli articoli nel main: modifica132-153-47-60 aggiunte sotto
function creaArticoli(param = artArray) {
  const main = document.querySelector("main");
  main.innerHTML = "";
  for (let articolo of param) {
    const div = document.createElement("div");
    div.classList.add("articolo");
    div.setAttribute("data-id", articolo.id);

    div.innerHTML = `
            <h2>${articolo.nome}</h2>
            <div class="divAvvisoAgg"><img src="${articolo.img.medium}" alt="${articolo.altMessage}"></div>
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
    // Event listener per l'input quantità
    const inputQnt = div.querySelector(`#inputQntArt${articolo.id}`);
    inputQnt.addEventListener("change", () => calcolaQuantita(articolo));

    // Crea il bottone e aggiungi l'event listener
    const btnAggiungi = document.createElement("button");
    btnAggiungi.innerHTML = `Aggiungi al carrello <i class="fa-solid fa-cart-plus"></i>`;
    btnAggiungi.addEventListener("click", () => {
      aggiungiAlCarrello(articolo);
      const divAvviso = div.querySelector('.divAvvisoAgg');
      avviso(divAvviso);
    })

    div.appendChild(btnAggiungi);

    main.appendChild(div);
  }
}

// Funzione per calcolare prezzo totale dato prezzo e quantità modifica77-articolo.
function calcolaQuantita(articolo) {
  const input = document.getElementById(`inputQntArt${articolo.id}`);
  const quantita = parseInt(input.value, 10) || 1;
  //const articolo = artArray.find(item => item.id === id);
  const prezzoTotale = (articolo.prezzo * quantita).toFixed(2);

  // Aggiorna il DOM
  const prezzoEl = document.getElementById(`pPriceArt${articolo.id}`);
  prezzoEl.textContent = `Totale: €${prezzoTotale}`;
}

//nuova ricalcoloQuantità
function aggiornaQuantitaCarrello(articolo) {
  const input = document.getElementById(`inputCartQntArt${articolo.id}`);
  const nuovaQuantita = parseInt(input.value, 10) || 1;
  // Trova l'articolo nel carrello e aggiorna la quantità
  const index = carrello.findIndex(item => item.id === articolo.id);
  if (index !== -1) {
    carrello[index].quantita = nuovaQuantita;
    aggiornaLista();
  }
}

// Funzione placeholder per aggiornare la lista carrello (può essere migliorata) modifica90-99 aggiunte sotto, 184Class-label-input-da198a210
function aggiornaLista() {
  const ulCart = document.querySelector("#asideCart ul");
  ulCart.innerHTML = ""; // Pulisce il contenuto precedente

  let totale = 0;

  for (let articolo of carrello) {
    const liCart = document.createElement("li");
    liCart.classList.add("cartBoxArt");
    liCart.innerHTML = `<img src="${articolo.img}" alt="${articolo.altMessage}" class="cartImg">
    <div class="cartDivArtQnt">
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
    // Event listener per l'input quantità
    const inputCartQnt = liCart.querySelector(`#inputCartQntArt${articolo.id}`);
    inputCartQnt.addEventListener("change", () => aggiornaQuantitaCarrello(articolo));
    // Crea il bottone e aggiungi l'event listener
    const btnElimina = document.createElement("button");
    Object.assign(btnElimina.style, {
      position: "absolute",
      right: "0px",
      top: "0px"
    });
    btnElimina.innerHTML = `Elimina <i class="fa-solid fa-eraser"></i>`;
    btnElimina.addEventListener("click", () => eliminaProdotto(articolo));
    liCart.querySelector(".cartDivArtQnt").appendChild(btnElimina);

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
});

// Simula il comportamento del link Acquista...:
document.getElementById('btnCartAcq').addEventListener('click', function () {
  window.location.href = "procedAcquisto.html";
});


// Barra di ricerca (cerca nell'array e ricostruisce il DOM):
function ricerca(event) {
  console.log(event); // TEST: Vedrai l'oggetto evento! (event come parametro e il console.log in questo caso non servono).
  const parola = document.getElementById("inputSearch").value.toLowerCase().trim();

  if (parola === "") {
    creaArticoli(artArray);
  } else {
    creaArticoli(
      artArray.filter(articolo =>
        articolo.nome.toLowerCase().includes(parola) /* ||
        articolo.descrizione.toLowerCase().includes(parola) */
      )
    );
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

});
