
const celsiusEl = document.getElementById("celsius");
const fahrenheitEl = document.getElementById("fahrenheit");
const kelvinEl = document.getElementById("kelvin");
const resetButton = document.getElementById("reset-button");

const inputs = {
  celsius: celsiusEl,
  fahrenheit: fahrenheitEl,
  kelvin: kelvinEl,
};

function formatTemperature(value) {
  // Avoid displaying negative zero after rounding.
  const rounded = Number(value.toFixed(2));
  return (Object.is(rounded, -0) ? 0 : rounded).toFixed(2);
}

function computeTemp(event) {
  const source = event.target.name;
  const rawValue = event.target.value;

  // Clear calculated values if the active field is empty.
  if (rawValue.trim() === "") {
    Object.entries(inputs).forEach(([unit, input]) => {
      if (unit !== source) {
        input.value = "";
      }
    });
    return;
  }

  const value = Number(rawValue);

  if (!Number.isFinite(value)) {
    return;
  }

  let celsius;

  switch (source) {
    case "celsius":
      celsius = value;
      break;

    case "fahrenheit":
      celsius = (value - 32) * (5 / 9);
      break;

    case "kelvin":
      celsius = value - 273.15;
      break;

    default:
      return;
  }

  const results = {
    celsius,
    fahrenheit: (celsius * 9) / 5 + 32,
    kelvin: celsius + 273.15,
  };

  // Keep the field being edited unchanged.
  Object.entries(results).forEach(([unit, temperature]) => {
    if (unit !== source) {
      inputs[unit].value = formatTemperature(temperature);
    }
  });
}

// Convert instantly as the user types.
Object.values(inputs).forEach((input) => {
  input.addEventListener("input", computeTemp);
});

// Reset all values.
resetButton.addEventListener("click", () => {
  Object.values(inputs).forEach((input) => {
    input.value = "";
  });

  celsiusEl.focus();
});
