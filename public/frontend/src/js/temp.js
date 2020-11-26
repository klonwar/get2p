const yts = document.querySelectorAll(`div[src*="https://www.patreon.com/media-url"]`);
for (let item of yts) {
  const src = item.attributes.src.value;
  const hash = src.match(/media-url\/([a-zA-Z0-9=]*)/)[1];
  const imgLink = atob(hash);
  const vCode = imgLink.match(/\/vi\/([a-zA-Z0-9=]*)\//)[1];
  console.log(vCode);

  const parent = item.parentElement.parentElement.parentElement.parentElement.parentElement;
  parent.href = `https://www.youtube.com/watch?v=${vCode}`;
}
