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

function createMark(pos, type, label) {
  const mark = document.createElement("div");
  mark.style.cssText = `line-height: 20px; margin-left: -1px; position: absolute; top: ${markerSpacing * pos - 11}px;`;
  mark.innerText = `${type === "q" ? "\u002d" : type === "h" ? "\u2013" : "\u2014"} ${label ? label : ""}`;
  return mark;
}

const marker0q1 = createMark(15, "q");
const marker0h = createMark(14, "h");
const marker0q3 = createMark(13, "q");
const marker1 = createMark(12, "f", "1.00");
const marker1q1 = createMark(11, "q");
const marker1h = createMark(10, "h");
const marker1q3 = createMark(9, "q");
const marker2 = createMark(8, "f", "2.00");
const marker2q1 = createMark(7, "q");
const marker2h = createMark(6, "h");
const marker2q3 = createMark(5, "q");
const marker3 = createMark(4, "f", "3.00");
const marker3q1 = createMark(3, "q");
const marker3h = createMark(2, "h");
const marker3q3 = createMark(1, "q");

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