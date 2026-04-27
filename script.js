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
  const vin = document.getElementById("vin").value.trim();
  const rezultat = document.getElementById("rezultat");
  const sunet = document.getElementById("engineSound");
  const loader = document.getElementById("loader");

  rezultat.classList.remove("show");
  loader.classList.add("show");
  rezultat.innerHTML = "";

  if (vin.length !== 17) {
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

      sunet.currentTime = 0;
      sunet.play();

      rezultat.innerHTML = `
        <h2>${masina.model}</h2>
        <img src="${masina.imagine}" class="loading">

        <p>🔧 Modificări implementate:</p>
        <ul>
          ${masina.tuning.map(t => `<li>${t}</li>`).join("")}
        </ul>

        <p>🧪 Diagnostic:</p>
        <ul>
          ${defecte.map(d => `<li>${d}</li>`).join("")}
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

function genereazaVIN() {
  const caractere = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let vin = "";

  for (let i = 0; i < 17; i++) {
    vin += caractere.charAt(Math.floor(Math.random() * caractere.length));
  }

  document.getElementById("vin").value = vin;
}
