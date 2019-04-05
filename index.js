const container = document.getElementById("container");
container.style.fontFamily = "helvetica";
container.style.fontSize = "12px";

const { stationid, timezone } = container.dataset;

const content = document.createDocumentFragment();

const widget = document.createElement("div");
widget.style.cssText = "background: white; border: 1px solid #444; border-radius: 4px; padding: 10px; width: 80px;"

const gauge = document.createElement("div");
gauge.style.cssText = "background: white; border: 1px solid #444; border-radius: 2px; height: 208px; overflow: hidden; position: relative; width: 100%; margin: 0 auto; position: relative;";

const markerSpacing = 208 / 16;

const marker0q1 = document.createElement("div");
marker0q1.style.cssText = `line-height: 20px; margin-left: -1px; position: absolute; top: ${markerSpacing * 15 - 11}px;`;
marker0q1.innerText = "\u002d";
const marker0h = document.createElement("div");
marker0h.style.cssText = `line-height: 20px; margin-left: -1px; position: absolute; top: ${markerSpacing * 14 - 11}px;`;
marker0h.innerText = "\u2013";
const marker0q3 = document.createElement("div");
marker0q3.style.cssText = `line-height: 20px; margin-left: -1px; position: absolute; top: ${markerSpacing * 13 - 11}px;`;
marker0q3.innerText = "\u002d";
const marker1 = document.createElement("div");
marker1.style.cssText = `line-height: 20px; margin-left: -1px; position: absolute; top: ${markerSpacing * 12 - 11}px;`;
marker1.innerText = "\u2014 1.00";
const marker1q1 = document.createElement("div");
marker1q1.style.cssText = `line-height: 20px; margin-left: -1px; position: absolute; top: ${markerSpacing * 11 - 11}px;`;
marker1q1.innerText = "\u002d";
const marker1h = document.createElement("div");
marker1h.style.cssText = `line-height: 20px; margin-left: -1px; position: absolute; top: ${markerSpacing * 10 - 11}px;`;
marker1h.innerText = "\u2013";
const marker1q3 = document.createElement("div");
marker1q3.style.cssText = `line-height: 20px; margin-left: -1px; position: absolute; top: ${markerSpacing * 9 - 11}px;`;
marker1q3.innerText = "\u002d";
const marker2 = document.createElement("div");
marker2.style.cssText = `line-height: 20px; margin-left: -1px; position: absolute; top: ${markerSpacing * 8 - 11}px;`;
marker2.innerText = "\u2014 2.00";
const marker2q1 = document.createElement("div");
marker2q1.style.cssText = `line-height: 20px; margin-left: -1px; position: absolute; top: ${markerSpacing * 7 - 11}px;`;
marker2q1.innerText = "\u002d";
const marker2h = document.createElement("div");
marker2h.style.cssText = `line-height: 20px; margin-left: -1px; position: absolute; top: ${markerSpacing * 6 - 11}px;`;
marker2h.innerText = "\u2013";
const marker2q3 = document.createElement("div");
marker2q3.style.cssText = `line-height: 20px; margin-left: -1px; position: absolute; top: ${markerSpacing * 5 - 11}px;`;
marker2q3.innerText = "\u002d";
const marker3 = document.createElement("div");
marker3.style.cssText = `line-height: 20px; margin-left: -1px; position: absolute; top: ${markerSpacing * 4 - 11}px`;
marker3.innerText = "\u2014 3.00";
const marker3q1 = document.createElement("div");
marker3q1.style.cssText = `line-height: 20px; margin-left: -1px; position: absolute; top: ${markerSpacing * 3 - 11}px;`;
marker3q1.innerText = "\u002d";
const marker3h = document.createElement("div");
marker3h.style.cssText = `line-height: 20px; margin-left: -1px; position: absolute; top: ${markerSpacing * 2 - 11}px`;
marker3h.innerText = "\u2013";
const marker3q3 = document.createElement("div");
marker3q3.style.cssText = `line-height: 20px; margin-left: -1px; position: absolute; top: ${markerSpacing * 1 - 11}px;`;
marker3q3.innerText = "\u002d";

const level = document.createElement("div");
level.style.cssText = "background: #2af8; bottom: 0; height: 0; left: 0; position: absolute; transition: height 1.5s ease-in-out; width: 100%;";

const readout = document.createElement("div");
readout.innerText = "0.000 m";
readout.style.cssText = "background: white; border: 1px solid #444; border-radius: 2px; margin-top: 10px; padding: 5px 0; text-align: center; width: 100%";

gauge.appendChild(level);
gauge.appendChild(marker0q1);
gauge.appendChild(marker0h);
gauge.appendChild(marker0q3);
gauge.appendChild(marker1);
gauge.appendChild(marker1q1);
gauge.appendChild(marker1h);
gauge.appendChild(marker1q3);
gauge.appendChild(marker2);
gauge.appendChild(marker2q1);
gauge.appendChild(marker2h);
gauge.appendChild(marker2q3);
gauge.appendChild(marker3);
gauge.appendChild(marker3q1);
gauge.appendChild(marker3h);
gauge.appendChild(marker3q3);
widget.appendChild(gauge);
widget.appendChild(readout);
content.appendChild(widget);
container.appendChild(content);

fetch(`https://us-central1-hydrometric-api.cloudfunctions.net/fetchWaterLevel?stationId=${stationid}&timezone=${timezone}`)
  .then(res => res.json())
  .then(res => {
    level.style.height = `${(res.level / 4) * 208}px`;
    readout.innerText = `${res.level} m`
  });