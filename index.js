const container = document.getElementById("container");
const content = document.createDocumentFragment();

const gauge = document.createElement("div");
gauge.style.cssText = "border: 1px solid #444; border-radius: 2px; height: 200px; overflow: hidden; position: relative; width: 50px; margin: 0 auto;";
const level = document.createElement("div");
level.style.cssText = "background: #2af8; bottom: 0; height: 0; left: 0; position: absolute; transition: height 1.5s ease-in-out; width: 50px;";
const readout = document.createElement("div");
readout.innerText = "0.000 m";
readout.style.cssText = "text-align: center;";

gauge.appendChild(level);
content.appendChild(gauge);
content.appendChild(readout);
container.appendChild(content);

fetch("https://us-central1-hydrometric-api.cloudfunctions.net/fetchWaterLevel?stationId=08HA009&timezone=pst")
  .then(res => res.json())
  .then(res => {
    level.style.height = `${(res.level / 4) * 200}px`;
    readout.innerText = `${res.level} m`
  });