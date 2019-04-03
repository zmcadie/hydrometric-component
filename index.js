const container = document.getElementById("container");
const content = document.createDocumentFragment();

const readout = document.createElement("div");
readout.innerText = "0.000";

content.appendChild(readout);
container.appendChild(content);

fetch("https://us-central1-hydrometric-api.cloudfunctions.net/fetchWaterLevel?stationId=08HA009&timezone=pst")
  .then(res => res.json())
  .then(res => readout.innerText = res.level);