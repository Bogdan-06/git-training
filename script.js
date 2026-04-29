const masini = {
  "WBA12345678901234": {
    model: "BMW Seria 3",
    imagine: "images/poza1.jpg",
    tuning: ["Stage 1 - +40HP", "Evacuare sport", "Jante 18 inch"]
  },

  "VW456789012345678": {
    model: "Volkswagen Golf 5",
    imagine: "images/poza2.jpg",
    tuning: ["Soft motor", "Suspensie sport", "Body kit"]
  },

  "WAU98765432109876": {
    model: "Audi A4",
    imagine: "images/poza3.jpg",
    tuning: ["Stage 2", "Turbo upgrade", "Jante 20 inch","Bodykit"]
  },

  "WDB11122233344455": {
    model: "Mercedes C-Class",
    imagine: "images/poza4.jpg",
    tuning: ["AMG kit", "Evacuare sport","Jante 20 inch"]
  },

  "WF012345678901234": {
    model: "Ford Focus",
    imagine: "images/poza5.jpg",
    tuning: ["Remap ECU", "Filtru sport","Jante 19 inch","Body kit"]
  },

  "VW098765432109876": {
    model: "Volkswagen Passat B5.5",
    imagine: "images/poza6.jpg",
    tuning: ["Bate ceva, dar nu stim ce", "Volanta cu personalitate", "Chiuloasa are secrete"]
  },

  "WVWZZZ1JZXW000123": {
    model: "Audi A4 B7",
    imagine: "images/poza7.jpg",
    tuning: ["Jante R17", "Fagura neagra", "Semnalizare dinamica"]
  },

  "WBAZZZ99ZTS123456": {
    model: "Audi A4 B6",
    imagine: "images/poza8.jpg",
    tuning: ["Jante R17", "Ochelar far de ceata lipsa", "Pompa servo urla"]
  }
};

const VIN_CARS_STORAGE_KEY = "vinCarsMasiniSalvate";
const vinuriDinScript = new Set(Object.keys(masini));

function normalizareVIN(vin) {
  return vin.trim().toUpperCase();
}

function esteVINValid(vin) {
  return /^[A-Z0-9]{17}$/.test(vin);
}

function esteMasinaValida(vin, masina) {
  return (
    esteVINValid(vin) &&
    masina &&
    typeof masina.model === "string" &&
    typeof masina.imagine === "string" &&
    Array.isArray(masina.tuning)
  );
}

function citesteMasiniSalvate() {
  if (typeof localStorage === "undefined") {
    return {};
  }

  try {
    const masiniSalvate = JSON.parse(localStorage.getItem(VIN_CARS_STORAGE_KEY)) || {};

    return Object.fromEntries(
      Object.entries(masiniSalvate).filter(([vin, masina]) => !vinuriDinScript.has(vin) && esteMasinaValida(vin, masina))
    );
  } catch (error) {
    localStorage.removeItem(VIN_CARS_STORAGE_KEY);
    return {};
  }
}

function salveazaMasiniSalvate(masiniSalvate) {
  localStorage.setItem(VIN_CARS_STORAGE_KEY, JSON.stringify(masiniSalvate));
}

function incarcaMasiniSalvate() {
  const masiniSalvate = citesteMasiniSalvate();

  Object.entries(masiniSalvate).forEach(([vin, masina]) => {
    if (!vinuriDinScript.has(vin)) {
      masini[vin] = masina;
    }
  });
}

function escapeHTML(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

incarcaMasiniSalvate();

//////////////////////////////////////////////////////
// 🔥 DIAGNOSTIC DEFECTE RANDOM (ADĂUGAT)
//////////////////////////////////////////////////////

const defectePosibile = [
  "⚠️ Uzură turbo detectată",
  "⚠️ Presiune ulei scăzută",
  "⚠️ Plăcuțe frână uzate",
  "⚠️ Senzor ABS defect",
  "⚠️ Vibrații motor la relanti",
  "⚠️ Pierdere mică de boost",
  "⚠️ Consum ulei crescut",
  "✅ Motor în parametri normali"
];

function genereazaDefecte() {
  let lista = [];
  let nr = Math.floor(Math.random() * 4); // 0–3 defecte

  for (let i = 0; i < nr; i++) {
    const defect = defectePosibile[Math.floor(Math.random() * (defectePosibile.length - 1))];
    lista.push(defect);
  }

  if (lista.length === 0) {
    lista.push("✅ Motor perfect, fără probleme detectate");
  }

  return lista;
}

//////////////////////////////////////////////////////
// 🔧 VERIFICARE VIN
//////////////////////////////////////////////////////

function verificaVIN() {
  const vinInput = document.getElementById("vin");
  const vin = normalizareVIN(vinInput.value);
  const rezultat = document.getElementById("rezultat");
  const sunet = document.getElementById("engineSound");
  const loader = document.getElementById("loader");

  vinInput.value = vin;
  rezultat.classList.remove("show");
  loader.classList.add("show");
  rezultat.innerHTML = "";

  if (!esteVINValid(vin)) {
    setTimeout(() => {
      loader.classList.remove("show");
      rezultat.innerHTML = "<p>⚠️ VIN invalid (trebuie 17 caractere)</p>";
      rezultat.classList.add("show");
    }, 1000);
    return;
  }

  setTimeout(() => {

    if (masini[vin]) {
      let masina = masini[vin];

      const defecte = genereazaDefecte();

      if (sunet) {
        sunet.currentTime = 0;
        const playPromise = sunet.play();

        if (playPromise) {
          playPromise.catch(() => {});
        }
      }

      rezultat.innerHTML = `
        <h2>${escapeHTML(masina.model)}</h2>
        <img src="${escapeHTML(masina.imagine)}" class="loading">

        <p>🔧 Modificări implementate:</p>
        <ul>
          ${masina.tuning.map(t => `<li>${escapeHTML(t)}</li>`).join("")}
        </ul>

        <p>🧪 Diagnostic:</p>
        <ul>
          ${defecte.map(d => `<li>${escapeHTML(d)}</li>`).join("")}
        </ul>
      `;
    } else {
      rezultat.innerHTML = "<p>❌ VIN necunoscut</p>";
    }

    loader.classList.remove("show");

    setTimeout(() => {
      rezultat.classList.add("show");

      const img = document.querySelector("#rezultat img");
      if (img) img.classList.remove("loading");

    }, 100);

  }, 2000);
}

//////////////////////////////////////////////////////
// 🔥 VIN GENERATOR (nemodificat)
//////////////////////////////////////////////////////

function toggleCarForm(forceOpen) {
  const panel = document.getElementById("addCarPanel");

  if (!panel) {
    return;
  }

  const shouldOpen = typeof forceOpen === "boolean" ? forceOpen : panel.hidden;
  panel.hidden = !shouldOpen;

  if (shouldOpen) {
    document.getElementById("newVin").focus();
  }
}

function curataFormularMasina(clearMessage = true) {
  document.getElementById("newVin").value = "";
  document.getElementById("newModel").value = "";
  document.getElementById("newImage").value = "";
  document.getElementById("newTuning").value = "";

  if (clearMessage) {
    seteazaMesajMasina("");
  }
}

function seteazaMesajMasina(message, type = "") {
  const messageElement = document.getElementById("addCarMessage");

  if (!messageElement) {
    return;
  }

  messageElement.textContent = message;
  messageElement.className = `form-message ${type ? `form-message--${type}` : ""}`.trim();
}

function adaugaMasina() {
  const vin = normalizareVIN(document.getElementById("newVin").value);
  const model = document.getElementById("newModel").value.trim();
  const imagine = document.getElementById("newImage").value.trim() || "images/poza9.jpeg";
  const tuning = document.getElementById("newTuning").value
    .split(/\n|,/)
    .map(item => item.trim())
    .filter(Boolean);

  document.getElementById("newVin").value = vin;

  if (!esteVINValid(vin)) {
    seteazaMesajMasina("VIN-ul trebuie sa aiba exact 17 caractere, doar litere si cifre.", "error");
    return;
  }

  if (!model) {
    seteazaMesajMasina("Adauga modelul masinii.", "error");
    return;
  }

  if (vinuriDinScript.has(vin)) {
    seteazaMesajMasina("Acest VIN exista deja in script si ramane nemodificat.", "error");
    return;
  }

  const masina = {
    model,
    imagine,
    tuning: tuning.length ? tuning : ["Fara modificari introduse"]
  };
  const masiniSalvate = citesteMasiniSalvate();

  masiniSalvate[vin] = masina;
  salveazaMasiniSalvate(masiniSalvate);
  masini[vin] = masina;

  document.getElementById("vin").value = vin;
  curataFormularMasina(false);
  seteazaMesajMasina("Masina a fost salvata. VIN-ul este pregatit pentru verificare.", "success");
}

function genereazaVIN() {
  const caractere = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let vin = "";

  for (let i = 0; i < 17; i++) {
    vin += caractere.charAt(Math.floor(Math.random() * caractere.length));
  }

  document.getElementById("vin").value = vin;
}
