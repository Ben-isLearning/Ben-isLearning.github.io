let screenQuery = window.matchMedia("(max-width:500px)");

screenQuery.addEventListener("change", (event) => {
  if (event.matches) {
    atlasLayer.removeFrom(map);
    mobileLayer.addTo(map);
  } else {
    mobileLayer.removeFrom(map);
    atlasLayer.addTo(map);
  }
});
