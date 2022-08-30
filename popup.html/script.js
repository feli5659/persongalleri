const url = "https://persongalleri-5d3e.restdb.io/rest/persongalleri";
const options = {
  headers: { "x-apikey": "600fe9211346a1524ff12e31" },
};
const header = document.querySelector("header h1");

document.addEventListener("DOMContentLoaded", start);
let filter = "alle";
//første function kaldes efter DOM er loaded
function start() {
  const filterKnapper = document.querySelectorAll("nav button");
  filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerPersoner));
  hentData();
}
//eventlistener knyttet til knapperne der vælger hvad for et filter er aktivt
function filtrerPersoner() {
  filter = this.dataset.troende; //sæt variabel "filter" til værdien af data-troende på den knap der er klikket på
  document.querySelector(".valgt").classList.remove("valgt"); //fjern klassen valgt fra den knap
  this.classList.add("valgt"); //marker den knap der er klikket på
  vis(); // kald funktionen vis(json) efter nye filter er sat
  header.textContent = this.textContent;
}

async function hentData() {
  const resspons = await fetch(url, options);
  json = await resspons.json();
  console.log("Personer", json);
  vis();
}

document.querySelector("#luk").addEventListener("click", () => (popop.style.display = "none"));

// hentData(); - denne er ikke aktiv da jeg har lavet en DOMContentLoaded
//finktionen der viser personer i liste view
function vis() {
  console.log(json);
  const main = document.querySelector("main"); //container til articles med en person
  const template = document.querySelector("template").content; //select indhold af html skabelon (article)
  main.textContent = ""; //ryd container inden ny loop
  json.forEach((person) => {
    console.log("Troende", person.troende);
    //loop igennem json (personer)
    //tjek hvilken tro personen  har og sammenlign med aktuelt filter eller vis alle, hvis filter har værdien "alle"
    if (filter == person.troende || filter == "alle") {
      const klon = template.cloneNode(true);
      klon.querySelector(".billede").src = "faces/" + person.billede;
      klon.querySelector(".navn").textContent = person.fornavn;
      klon.querySelector(".efternavn").textContent = person.efternavn;
      klon.querySelector(".hobby").textContent = person.hobby;
      klon.querySelector("article").addEventListener("click", () => visDetaljer(person));
      main.appendChild(klon);
    }
  });
}

function visDetaljer(person) {
  console.log(person);
  popop.style.display = "block";
  popop.querySelector("img").src = "faces/" + person.billede;
  popop.querySelector("h2").textContent = person.fornavn + " " + person.efternavn;
  popop.querySelector(".titel").textContent = person.titel;
  popop.querySelector(".email").textContent = person.email;
  popop.querySelector(".fdag").textContent = person.fødselsdag.slice(0, 10);
  popop.querySelector(".hobby").textContent = person.hobby;
  popop.querySelector(".tro").textContent = person.tro;
}
