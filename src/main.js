let API_KEY = import.meta.env.VITE_NASA_API_KEY;

if (API_KEY == undefined) {
  API_KEY = "DEMO_KEY";
}

document.querySelector("#app").innerHTML = "<p>loading...</p>";

console.log("aaah")

fetch(`https://science.nasa.gov/wp-json/wp/v2/apod-basic?api_key=${API_KEY}`)
  .then((response) => response.json())
  .then((data) => {
    let media;
    let downloadBtn = "";

    const imageUrl = data[0].hdurl || data[0].url;

    if (data[0].media_type === "image") {
      media = `<img src="${imageUrl}" alt="${data[0].alt}" />`;

      downloadBtn = `
<a href="${imageUrl}" target="_blank" rel="noopener noreferrer" class="download-btn">
                View HD Image ↗
            </a>
        `;
    } else {
      media = `<video src="${data[0].url}"  controls></video>`;
    }

    const copyright = data[0].copyright
      ? `@ ${data[0].copyright.trim()}`
      : "Public Domain";

    document.querySelector("#app").innerHTML = `
    <h1>Today's APOD is:</h1>
    <h2>${data[0].title}</h2>
    <p class="meta-info"><strong>Date:</strong> ${data[0].date} | <strong>Credit:</strong> ${copyright}</p>
        ${media}
        ${downloadBtn}
        <p>${data[0].explanation}</p>
    `;
  })
  .catch((err) => {
    document.querySelector("#app").innerHTML = `<p>Error: ${err.message}</p>`;
  });
