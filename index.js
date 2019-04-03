const container = document.getElementById("container");

fetch("https://us-central1-hydrometric-api.cloudfunctions.net/fetchWaterLevel?stationId=08HA009&timezone=pst")
  .then(res => res.json())
  .then(res => container.innerText = res.level);