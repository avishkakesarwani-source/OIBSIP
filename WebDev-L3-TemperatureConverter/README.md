# Temperature Converter Website - Oasis Infobyte (OIBSIP)

## Task Description
This repository contains the source code for the Level 3 Web Development task: **Temperature Converter Website**.
The objective of this project is to build an interactive, user-friendly web tool that converts temperature values between **Celsius, Fahrenheit, and Kelvin**, featuring real-time input validation and edge-case handling.

## Features Checklist
- [x] **Numeric Input Field:** Validates input and displays clear error messages if input is empty or non-numeric.
- [x] **Input Unit Selector:** Dropdown selector to choose source unit (Celsius, Fahrenheit, Kelvin).
- [x] **Output Unit Selector:** Allows selective single-unit conversion OR simultaneous multi-unit conversion ("All Units").
- [x] **Convert Button:** Executes conversion calculations smoothly on click or pressing Enter.
- [x] **Reset / Clear Button:** Quickly clears inputs, errors, and results back to initial state.
- [x] **Edge Case Handling:** Strictly checks for and prevents impossible temperatures below **Absolute Zero** (−273.15°C / −459.67°F / 0 K).
- [x] **Clean, Centered UI:** Friendly, modern light-theme card layout with responsive design for mobile and desktop.

## Conversion Formulas Used
- **Celsius to Fahrenheit:** `°F = (°C × 9/5) + 32`
- **Celsius to Kelvin:** `K = °C + 273.15`
- **Fahrenheit to Celsius:** `°C = (°F − 32) × 5/9`
- **Fahrenheit to Kelvin:** `K = (°F − 32) × 5/9 + 273.15`
- **Kelvin to Celsius:** `°C = K − 273.15`
- **Kelvin to Fahrenheit:** `°F = (K − 273.15) × 9/5 + 32`

## Tech Stack
- HTML5
- CSS3 (Flexbox, CSS Grid, Transitions)
- Vanilla JavaScript (DOM manipulation, Event Listeners, Validation)

## Project Structure
```
OIBSIP/WebDev-L3-TemperatureConverter/
│
├── index.html       # HTML layout
├── style.css        # Responsive styling
├── script.js        # Core conversion and validation logic
├── title-card.html  # 2-second demo title card for walkthrough video
└── README.md        # Project documentation
```
