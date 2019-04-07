(function () {
  const container = document.getElementById("container");
  container.style.fontFamily = "helvetica";
  container.style.fontSize = "12px";

  const timezones = {
    pst: -8,
    mst: -7,
    cst: -6,
    est: -5,
    ast: -4,
    nst: -3.5
  };

  const { stationid, stationname, timezone, sealevel, gaugemax, gaugescale, gaugeheight } = container.dataset;

  const content = document.createDocumentFragment();

  const widget = document.createElement("div");
  widget.style.cssText = "background: white; border: 1px solid #444; border-radius: 4px; padding: 10px; width: auto; display: inline-flex;"

  const gauge = document.createElement("div");
  gauge.style.cssText = "width: 80px;";

  const meter = document.createElement("div");
  meter.style.cssText = "background: white; border: 1px solid #444; border-radius: 2px; overflow: hidden; position: relative; width: calc(100% - 2px); margin: 0 auto; position: relative;";
  meter.style.height = gaugeheight;

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
  readout.style.cssText = "background: white; border: 1px solid #444; border-radius: 2px; margin-top: 10px; padding: 5px 0; text-align: center; width: calc(100% - 2px);";

  const stationInfo = document.createElement("div");
  stationInfo.style.cssText = "margin-left: 10px; border: 1px solid #444; border-radius: 2px; padding: 10px;";

  function createInfoItem(label, value) {
    const infoItem = document.createElement("div");
    infoItem.style.cssText = "margin-bottom: 8px;";
    const labelEl = document.createElement("div");
    labelEl.classList.add("info-label");
    labelEl.style.cssText = "font-weight: bold; font-size: 10px; color: #444; margin-bottom: 2px;";
    labelEl.innerText = label;
    const valueEl = document.createElement("div");
    valueEl.classList.add("info-text");
    valueEl.innerHTML = value;
    infoItem.appendChild(labelEl);
    infoItem.appendChild(valueEl);
    return infoItem;
  }

  const infoName = createInfoItem("STATION NAME", stationname);
  const infoId = createInfoItem("STATION ID", `<a target="_blank" href="https://wateroffice.ec.gc.ca/report/real_time_e.html?stn=${stationid}">${stationid}</a>`);
  const infoBaseline = createInfoItem("BASELINE", `Reading is taken ${sealevel} m above sea level`);
  const infoSealevel = createInfoItem("RELATIVE", `Primary water level is ${sealevel} m above sea level`);
  const infoTime = createInfoItem("TIME", `Latest reading taken at 0:00 a.m. ${timezone.toUpperCase()}`);

  gauge.appendChild(meter);
  meter.appendChild(level);
  meter.appendChild(markers);
  gauge.appendChild(readout);
  stationInfo.appendChild(infoName);
  stationInfo.appendChild(infoId);
  stationInfo.appendChild(infoBaseline);
  stationInfo.appendChild(infoSealevel);
  stationInfo.appendChild(infoTime);
  widget.appendChild(gauge);
  widget.appendChild(stationInfo);
  content.appendChild(widget);
  container.appendChild(content);

  fetch(`https://us-central1-hydrometric-api.cloudfunctions.net/fetchWaterLevel?stationId=${stationid}&timezone=${timezone}`)
    .then(res => res.json())
    .then(res => {
      level.style.height = `${(res.level / gaugemax) * gaugeheight}px`;
      readout.innerText = `${res.level} m`
      const sealevelText = infoSealevel.getElementsByClassName("info-text")[0];
      const timeText = infoTime.getElementsByClassName("info-text")[0];
      sealevelText.innerText = `Primary water level is ${Math.round((parseFloat(sealevel) + parseFloat(res.level)) * 1000) / 1000} m above sea level`;
      timeText.innerText = `Latest reading taken at ${new Date(res.date + (3600000 * timezones[timezone])).toLocaleTimeString('en-CA', { hour: '2-digit', minute:'2-digit' })} ${timezone.toUpperCase()}`;
    });
}());
