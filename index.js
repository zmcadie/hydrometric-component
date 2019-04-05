const container = document.getElementById("container");
container.style.fontFamily = "helvetica";
container.style.fontSize = "12px";

const { stationid, timezone, gaugemax, gaugescale, gaugeheight } = container.dataset;

const content = document.createDocumentFragment();

const widget = document.createElement("div");
widget.style.cssText = "background: white; border: 1px solid #444; border-radius: 4px; padding: 10px 12px 10px 10px; width: 80px;"

const gauge = document.createElement("div");
gauge.style.cssText = "background: white; border: 1px solid #444; border-radius: 2px; overflow: hidden; position: relative; width: 100%; margin: 0 auto; position: relative;";
gauge.style.height = gaugeheight;

const markerNum = gaugemax * gaugescale;
const markerSpacing = gaugeheight / markerNum;

function createMark(pos, type, label) {
  const mark = document.createElement("div");
  mark.style.cssText = `line-height: 20px; margin-left: -1px; position: absolute; top: ${markerSpacing * pos - 11}px;`;
  mark.innerText = `${type === "q" ? "\u002d" : type === "h" ? "\u2013" : "\u2014"} ${label ? label : ""}`;
  return mark;
}

const markers = document.createDocumentFragment();

for (i = markerNum - 1; i > 0; i--) {
  const type = i % (gaugescale / 2) === 0 ? i % gaugescale === 0 ? "f" : "h" : "q";
  const label = type === "f" ? `${(markerNum - i) / gaugescale}.00` : "";
  markers.appendChild(createMark(i, type, label));
}

const level = document.createElement("div");
level.style.cssText = "background: #2af8; bottom: 0; height: 0; left: 0; position: absolute; transition: height 1.5s ease-in-out; width: 100%;";

const readout = document.createElement("div");
readout.innerText = "0.000 m";
readout.style.cssText = "background: white; border: 1px solid #444; border-radius: 2px; margin-top: 10px; padding: 5px 0; text-align: center; width: 100%";

gauge.appendChild(level);
gauge.appendChild(markers);
widget.appendChild(gauge);
widget.appendChild(readout);
content.appendChild(widget);
container.appendChild(content);

fetch(`https://us-central1-hydrometric-api.cloudfunctions.net/fetchWaterLevel?stationId=${stationid}&timezone=${timezone}`)
  .then(res => res.json())
  .then(res => {
    level.style.height = `${(res.level / gaugemax) * gaugeheight}px`;
    readout.innerText = `${res.level} m`
  });