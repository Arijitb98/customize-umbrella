async function fetchColors() {
  const response = await fetch('assets/data/colors.json');
  const colors = await response.json();
  return colors;
}

function createColorButtons(colors) {
  const colorSwitchesContainer = document.getElementById('color-switches');
  colors.forEach(color => {
    const button = document.createElement('button');
    button.className = 'switch';
    button.style.backgroundColor = color.hex;
    button.onclick = () => changeColor(button, color.color, color.hex);
    colorSwitchesContainer.appendChild(button);
  });
}

// Get the colors json and create buttons before loading
fetchColors().then(colors => {
  createColorButtons(colors);
  // Selecting blue color by default
  const blueButton = document.querySelector(".switch");
  changeColor(blueButton, "blue", "#37B6E6");
});
