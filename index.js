const container = document.getElementById("container");
const content = document.createDocumentFragment();

const gauge = document.createElement("div");
gauge.style.cssText = "border: 1px solid #444; border-radius: 20px; height: 100px; overflow: hidden; position: relative; width: 20px;";
const level = document.createElement("div");
level.style.cssText = "background: blue; bottom: 0; height: 0; left: 0; position: absolute; transition: height 1.5s ease-in-out; width: 20px;";
const readout = document.createElement("div");
readout.innerText = "0.000";

gauge.appendChild(level);
content.appendChild(gauge);
content.appendChild(readout);
container.appendChild(content);

fetch("https://us-central1-hydrometric-api.cloudfunctions.net/fetchWaterLevel?stationId=08HA009&timezone=pst")
  .then(res => res.json())
  .then(res => {
    level.style.height = `${(res.level / 2) * 100}px`;
    readout.innerText = res.level
  });