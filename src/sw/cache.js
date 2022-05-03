self.addEventListener("fetch", (event) => {
  console.log("fetching", event.url);
});
