const masini = {
  "WBA12345678901234": {
    model: "BMW Seria 3",
    imagine: "poza1.jpg",
    tuning: ["Stage 1 - +40HP", "Evacuare sport", "Jante 18 inch"]
  },

  "VW456789012345678": {
    model: "Volkswagen Golf 5",
    imagine: "poza2.jpg",
    tuning: ["Soft motor", "Suspensie sport", "Body kit"]
  },

  "WAU98765432109876": {
    model: "Audi A4",
    imagine: "poza3.jpg",
    tuning: ["Stage 2", "Turbo upgrade", "Jante 20 inch","Bodykit"]
  },

  "WDB11122233344455": {
    model: "Mercedes C-Class",
    imagine: "poza4.jpg",
    tuning: ["AMG kit", "Evacuare sport","Jante 20 inch"]
  },

  "WF012345678901234": {
    model: "Ford Focus",
    imagine: "poza5.jpg",
    tuning: ["Remap ECU", "Filtru sport","Jante 19 inch","Body kit"]
  },

  "VW098765432109876": {
    model: "Volkswagen Passat B5.5",
    imagine: "poza6.jpg",
    tuning: ["Bate ceva, dar nu stim ce", "Volanta cu personalitate", "Chiuloasa are secrete", "Troacane premium", "Sunet de diesel autentic", "Verificat de vecinul mecanic"]
},
};

function verificaVIN() {
  const vin = document.getElementById("vin").value.trim();
  const rezultat = document.getElementById("rezultat");
  const sunet = document.getElementById("engineSound");

  rezultat.classList.remove("show");

  // 🔹 Validare VIN
  if (vin.length !== 17) {
    rezultat.innerHTML = "<p>⚠️ VIN invalid (trebuie să aibă 17 caractere)</p>";
    rezultat.classList.add("show");
    return;
  }

  if (masini[vin]) {
    let masina = masini[vin];

    // 🔊 redă sunet
    sunet.currentTime = 0;
    sunet.play();

    rezultat.innerHTML = `
      <h2>${masina.model}</h2>
      <img src="${masina.imagine}">
      <p>🔧 Modificări implemetate:</p>
      <ul>
        ${masina.tuning.map(t => `<li>${t}</li>`).join("")}
      </ul>
    `;
  } else {
    rezultat.innerHTML = "<p>❌ VIN necunoscut</p>";
  }

  setTimeout(() => {
    rezultat.classList.add("show");
  }, 100);
}

//////////////////////////////////////////////////////
// 🔥 VIN GENERATOR
//////////////////////////////////////////////////////

function genereazaVIN() {
  const caractere = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let vin = "";

  for (let i = 0; i < 17; i++) {
    vin += caractere.charAt(Math.floor(Math.random() * caractere.length));
  }

  document.getElementById("vin").value = vin;
}