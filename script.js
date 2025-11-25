const apiURL =
  "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";

const loading = document.getElementById("loading");
const jokeResult = document.getElementById("joke-result");
const emojiBox = document.getElementById("emoji");
const historyList = document.getElementById("history");

let history = [];
const emojis = ["😂", "🤣", "😄", "😆", "😉", "😹", "😜"];

document.getElementById("joke-button").addEventListener("click", async () => {
  loading.style.display = "block";
  jokeResult.style.opacity = 0;
  emojiBox.innerHTML = "";

  try {
    let response = await fetch(apiURL);
    let data = await response.json();

    let joke =
      data.type === "single"
        ? data.joke
        : `${data.setup}<br>${data.delivery}`;

    setTimeout(() => {
      loading.style.display = "none";

      jokeResult.innerHTML = joke;
      jokeResult.style.opacity = 1;

      emojiBox.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];

      addToHistory(joke);
    }, 700);
  } catch (error) {
    loading.style.display = "none";
    jokeResult.innerHTML = "Failed to load joke.";
    jokeResult.style.opacity = 1;
  }
});

/* ---------- COPY BUTTON ---------- */
document.getElementById("copy-btn").addEventListener("click", () => {
  navigator.clipboard.writeText(jokeResult.innerText);
  alert("Joke Copied!");
});

/* ---------- SAVE HISTORY ---------- */
function addToHistory(joke) {
  history.unshift(joke);
  if (history.length > 5) history.pop();

  historyList.innerHTML = history
    .map((j) => `<li>• ${j}</li>`)
    .join("");
}

/* ---------- DARK MODE TOGGLE ---------- */
const modeToggle = document.getElementById("mode-toggle");
const modeLabel = document.getElementById("mode-label");

modeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");

  modeLabel.textContent = modeToggle.checked
    ? "Dark Mode"
    : "Light Mode";
});
