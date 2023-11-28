const apiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const resultElement = document.getElementById("result");
const soundElement = document.getElementById("sound");
const searchBtn = document.getElementById("search-btn");

const fetchData = (word) => {
  return fetch(`${apiUrl}${word}`)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch(() => {
      throw new Error("Couldn't find the word");
    });
};

const displayWordDetails = (word, data) => {
  resultElement.innerHTML = `
    <div class="word">
        <h3>${word}</h3>
        <button onclick="playSound()">
            <i class="fas fa-volume-up"></i>
        </button>
    </div>
    <div class="details">
        <p>${data[0].meanings[0].partOfSpeech}</p>
        <p>/${data[0].phonetic}/</p>
    </div>
    <p class="word-meaning">
       ${data[0].meanings[0].definitions[0].definition}
    </p>
    <p class="word-example">
        ${data[0].meanings[0].definitions[0].example || ""}
    </p>`;

  soundElement.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
};

const handleFetchError = () => {
  resultElement.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
};

const playSound = () => {
  soundElement.play();
};

searchBtn.addEventListener("click", async () => {
  try {
    const inputWord = document.getElementById("inp-word").value;
    const data = await fetchData(inputWord);
    displayWordDetails(inputWord, data);
  } catch (error) {
    handleFetchError();
  }
});
