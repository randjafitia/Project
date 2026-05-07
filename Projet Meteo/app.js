const jourSemaine = [
  "Lundi", "Mardi", "Mercredi",
  "Jeudi", "Vendredi", "Samedi", "Dimanche"
];

let ajd = new Date();
let options = { weekday: 'long' };
let jourActuel = ajd.toLocaleDateString("fr-FR", options);

jourActuel = jourActuel.charAt(0).toUpperCase() + jourActuel.slice(1);

let tabJourEnOrdre =
  jourSemaine
    .slice(jourSemaine.indexOf(jourActuel))
    .concat(jourSemaine.slice(0, jourSemaine.indexOf(jourActuel)));

const CLEFAPI = "60963ca7bd2c58e7570f0f4c4242c947";
let resultatAPI;

const temps = document.querySelector(".temps");
const temperature = document.querySelector(".temperature");
const localisation = document.querySelector(".localisation");

const heure = document.querySelectorAll(".heure-nom-prevision");
const tempPourH = document.querySelectorAll(".heure-prevision-valeur");
const joursDiv = document.querySelectorAll(".jour-prevision-nom");
const tempJoursDiv = document.querySelectorAll(".jour-prevision-temp");

const imIcon = document.querySelector(".logo-meteo");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    position => {
      let long = position.coords.longitude;
      let lat = position.coords.latitude;
      AppelAPI(long, lat);
    },
    () => {
      alert("Votre localisation n'a pas été activer veuiller l'activer.");
    }
  );
}

function AppelAPI(long, lat) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&lang=fr&appid=${CLEFAPI}`)
    .then(reponse => reponse.json())
    .then(data => {

      resultatAPI = data;

      temps.innerText = resultatAPI.weather[0].description;
      temperature.innerText = `${Math.trunc(resultatAPI.main.temp)}°`;
      localisation.innerText = resultatAPI.name;

      let heureActuelle = new Date().getHours();

      for (let i = 0; i < heure.length; i++) {
        let heureIncr = heureActuelle + i * 3;

        if (heureIncr > 24) {
          heure[i].innerText = `${heureIncr - 24} h`;
        } else if (heureIncr === 24) {
          heure[i].innerText = "00 h";
        } else {
          heure[i].innerText = `${heureIncr} h`;
        }
      }

      for (let j = 0; j < tempPourH.length; j++) {
        tempPourH[j].innerText = `${Math.trunc(resultatAPI.main.temp)}°`;
      }

      for (let k = 0; k < tabJourEnOrdre.length; k++) {
        joursDiv[k].innerText = tabJourEnOrdre[k].slice(0, 3);
      }

      for (let m = 0; m < tempJoursDiv.length; m++) {
        tempJoursDiv[m].innerText = `${Math.trunc(resultatAPI.main.temp)}°`;
      }

      if (heureActuelle >= 6 && heureActuelle < 21) {
        imIcon.src = `res/jour/${resultatAPI.weather[0].icon}.svg`;
      } else {
        imIcon.src = `res/nuit/${resultatAPI.weather[0].icon}.svg`;
      
}
overlayer.classList.add("disparition");
    })


}


