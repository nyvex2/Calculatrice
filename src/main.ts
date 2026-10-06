import "./style.css";

// Structure de la calculatrice
document.querySelector("#app")!.innerHTML = `
  <div class="calculator">
    <div class="top-bar">
      <span id="topText">Calculatrice en ligne</span>
    </div>

    <div class="display">
      <div id="expression">0</div>
      <div id="result"></div>
    </div>

    <div class="buttons">
      <button class="clear" data-value="clear">AC</button>
      <button data-value="backspace">⌫</button>
      <button data-value="%">%</button>
      <button class="operator" data-value="/">÷</button>

      <button data-value="7">7</button>
      <button data-value="8">8</button>
      <button data-value="9">9</button>
      <button class="operator" data-value="×">×</button>

      <button data-value="4">4</button>
      <button data-value="5">5</button>
      <button data-value="6">6</button>
      <button class="operator" data-value="-">−</button>

      <button data-value="1">1</button>
      <button data-value="2">2</button>
      <button data-value="3">3</button>
      <button class="operator" data-value="+">+</button>

      <button class="zero" data-value="0">0</button>
      <button data-value=".">.</button>
      <button class="equals" data-value="=">=</button>
    </div>
  </div>
`;

const expressionDisplay = document.querySelector("#expression") as HTMLElement;
const resultDisplay = document.querySelector("#result") as HTMLElement;
const topText = document.querySelector("#topText") as HTMLElement;

let expression = "";

// Met à jour l'écran
function updateDisplay() {
  expressionDisplay.textContent = expression || "0";
}

// Ajoute une valeur au calcul
function addValue(value: string) {
  expression += value;
  updateDisplay();
}

// Efface le calcul
function clearCalculator() {
  expression = "";
  resultDisplay.textContent = "";
  updateDisplay();
}

// Supprime le dernier caractère
function deleteLast() {
  expression = expression.slice(0, -1);
  updateDisplay();
}

// Calcule le résultat
function calculate() {
  if (!expression) return;

  try {
    // Remplace le symbole × par *
    const calculation = expression.replace(/×/g, "*");

    // Vérifie que le calcul contient seulement des caractères autorisés
    if (!/^[0-9+\-*/().%\s]+$/.test(calculation)) {
      throw new Error();
    }

    const result = Function(`"use strict"; return (${calculation})`)();

    if (!Number.isFinite(result)) {
      throw new Error();
    }

    resultDisplay.textContent = `= ${result}`;
  } catch {
    resultDisplay.textContent = "Erreur";
  }
}

// Gère les boutons
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    if (!value) return;

    if (value === "clear") {
      clearCalculator();
    } else if (value === "backspace") {
      deleteLast();
    } else if (value === "=") {
      calculate();
    } else {
      addValue(value);
    }
  });
});

// Change le texte du haut
const messages = [
  "Calculatrice en ligne",
  "← Retour   → Avancer",
  "Créée par Adam Eddahbi"
];

let messageIndex = 0;

setInterval(() => {
  messageIndex = (messageIndex + 1) % messages.length;

  topText.classList.add("changing");

  setTimeout(() => {
    topText.textContent = messages[messageIndex];
    topText.classList.remove("changing");
  }, 250);
}, 3000);
