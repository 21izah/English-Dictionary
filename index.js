const inputEl = document.getElementById("input");

const infoEL = document.getElementById("info-text");

const meaningContainerEl = document.getElementById("meaning-container");

const titleEL = document.getElementById("title");

const meaningEl = document.getElementById("meaning");

const audioEL = document.getElementById("audio");

async function fetchAPI(word) {
  const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

  try {
    infoEL.style.display = "block";
    meaningContainerEl.style.display = "none";

    infoEL.innerText = `Searching the meaning of ${word}`;
    const response = await fetch(url, {
      method: "GET",
    });
    if (!response) {
      throw new Error("Request failed");
    }

    const data = await response.json();
    console.log(data);
    if (data.title) {
      infoEL.style.display = "none";
      meaningContainerEl.style.display = "block";
      titleEL.innerText = word;
      meaningEl.innerText = "N/A";
      audioEL.src = "none";
    } else {
      infoEL.style.display = "none";
      meaningContainerEl.style.display = "block";
      titleEL.innerText = data[0]["word"];
      meaningEl.innerText =
        data[0]["meanings"][0]["definitions"][0]["definition"];
      audioEL.src = data[0]["phonetics"][0]["audio"];
    }

    // infoEL.style.display = "none";
    // meaningContainerEl.style.display = "block";
    // titleEL.innerText = data[0]["word"];
    // meaningEl.innerText =
    //   data[0]["meanings"][0]["definitions"][0]["definition"];
    // audioEL.src = data[0]["phonetics"][0]["audio"];
  } catch (error) {
    console.error("Error", error);
    infoEL.innerText = `an error occured, try again...`;
  }
}

inputEl.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
});
