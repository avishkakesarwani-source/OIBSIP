// Oasis Infobyte - Task 3: Temperature Converter
// Developer: Avishka Kesarwani

document.addEventListener("DOMContentLoaded", function () {
    // DOM Element References
    const tempInput = document.getElementById("tempInput");
    const fromUnit = document.getElementById("fromUnit");
    const toUnit = document.getElementById("toUnit");
    const swapBtn = document.getElementById("swapBtn");
    const convertBtn = document.getElementById("convertBtn");
    const resetBtn = document.getElementById("resetBtn");
    const errorAlert = document.getElementById("errorAlert");
    const errorText = document.getElementById("errorText");
    const resultsOutput = document.getElementById("resultsOutput");
    const tempFeelBadge = document.getElementById("tempFeelBadge");
    const presetButtons = document.querySelectorAll(".preset-btn");

    // Display error message
    function showError(message) {
        errorText.textContent = message;
        errorAlert.style.display = "flex";
        resultsOutput.innerHTML = `
            <div class="empty-state">
                <p style="color: #ef4444;">Please fix the input value above.</p>
            </div>
        `;
        tempFeelBadge.style.display = "none";
    }

    // Clear error message
    function clearError() {
        errorAlert.style.display = "none";
        errorText.textContent = "";
    }

    // Determine temperature feel / sensation badge
    function updateFeelBadge(celsius) {
        tempFeelBadge.style.display = "inline-block";
        tempFeelBadge.className = "feel-badge";

        if (celsius < 0) {
            tempFeelBadge.textContent = "❄️ Freezing Cold";
            tempFeelBadge.classList.add("feel-freezing");
        } else if (celsius <= 15) {
            tempFeelBadge.textContent = "🌬️ Cool / Chilly";
            tempFeelBadge.classList.add("feel-cool");
        } else if (celsius <= 26) {
            tempFeelBadge.textContent = "🌿 Comfortable / Mild";
            tempFeelBadge.classList.add("feel-cool");
        } else if (celsius <= 38) {
            tempFeelBadge.textContent = "☀️ Warm / Body Temp";
            tempFeelBadge.classList.add("feel-warm");
        } else {
            tempFeelBadge.textContent = "🔥 Very Hot / Boiling";
            tempFeelBadge.classList.add("feel-hot");
        }
    }

    // Main Conversion Function
    function performConversion() {
        clearError();

        const rawValue = tempInput.value.trim();

        // 1. Validation: Empty Check
        if (rawValue === "") {
            showError("Please enter a temperature value to convert.");
            return;
        }

        const value = parseFloat(rawValue);

        // 2. Validation: Numeric Check
        if (isNaN(value)) {
            showError("Invalid input! Please enter a valid number.");
            return;
        }

        const from = fromUnit.value;
        const to = toUnit.value;

        // 3. Validation: Absolute Zero Checks
        if (from === "celsius" && value < -273.15) {
            showError("Physical Limit Exceeded: Value cannot be below Absolute Zero (−273.15°C).");
            return;
        }
        if (from === "fahrenheit" && value < -459.67) {
            showError("Physical Limit Exceeded: Value cannot be below Absolute Zero (−459.67°F).");
            return;
        }
        if (from === "kelvin" && value < 0) {
            showError("Physical Limit Exceeded: Kelvin cannot be negative (0 K is Absolute Zero).");
            return;
        }

        // Step A: Convert input to Celsius as common base
        let celsius;
        if (from === "celsius") {
            celsius = value;
        } else if (from === "fahrenheit") {
            celsius = (value - 32) * (5 / 9);
        } else if (from === "kelvin") {
            celsius = value - 273.15;
        }

        // Step B: Calculate target values
        const fahrenheit = (celsius * (9 / 5)) + 32;
        const kelvin = celsius + 273.15;

        // Update sensation badge
        updateFeelBadge(celsius);

        // Step C: Render Output
        if (to === "all") {
            resultsOutput.innerHTML = `
                <div class="result-card-item">
                    <div class="card-left">
                        <span class="res-unit-title">Celsius</span>
                        <span class="res-main-value">${celsius.toFixed(2)} °C</span>
                    </div>
                    <button type="button" class="copy-btn" onclick="copyResult('${celsius.toFixed(2)} °C', this)">Copy</button>
                </div>
                <div class="result-card-item">
                    <div class="card-left">
                        <span class="res-unit-title">Fahrenheit</span>
                        <span class="res-main-value">${fahrenheit.toFixed(2)} °F</span>
                    </div>
                    <button type="button" class="copy-btn" onclick="copyResult('${fahrenheit.toFixed(2)} °F', this)">Copy</button>
                </div>
                <div class="result-card-item">
                    <div class="card-left">
                        <span class="res-unit-title">Kelvin</span>
                        <span class="res-main-value">${kelvin.toFixed(2)} K</span>
                    </div>
                    <button type="button" class="copy-btn" onclick="copyResult('${kelvin.toFixed(2)} K', this)">Copy</button>
                </div>
            `;
        } else {
            let resultVal = "";
            let unitTitle = "";

            if (to === "celsius") {
                resultVal = `${celsius.toFixed(2)} °C`;
                unitTitle = "Celsius";
            } else if (to === "fahrenheit") {
                resultVal = `${fahrenheit.toFixed(2)} °F`;
                unitTitle = "Fahrenheit";
            } else if (to === "kelvin") {
                resultVal = `${kelvin.toFixed(2)} K`;
                unitTitle = "Kelvin";
            }

            resultsOutput.innerHTML = `
                <div class="result-card-item">
                    <div class="card-left">
                        <span class="res-unit-title">${unitTitle}</span>
                        <span class="res-main-value">${resultVal}</span>
                    </div>
                    <button type="button" class="copy-btn" onclick="copyResult('${resultVal}', this)">Copy</button>
                </div>
            `;
        }
    }

    // Global copy to clipboard function
    window.copyResult = function (text, btnElement) {
        navigator.clipboard.writeText(text).then(() => {
            const originalText = btnElement.textContent;
            btnElement.textContent = "Copied! ✓";
            btnElement.style.color = "#4f46e5";
            btnElement.style.borderColor = "#4f46e5";
            setTimeout(() => {
                btnElement.textContent = originalText;
                btnElement.style.color = "";
                btnElement.style.borderColor = "";
            }, 1500);
        });
    };

    // Swap From and To Units
    swapBtn.addEventListener("click", function () {
        if (toUnit.value === "all") {
            // Cannot directly swap "all", default to celsius/fahrenheit toggle
            toUnit.value = fromUnit.value;
            fromUnit.value = "celsius";
        } else {
            const temp = fromUnit.value;
            fromUnit.value = toUnit.value;
            toUnit.value = temp;
        }

        if (tempInput.value.trim() !== "") {
            performConversion();
        }
    });

    // Preset Button Click
    presetButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            tempInput.value = this.dataset.val;
            fromUnit.value = this.dataset.unit;
            performConversion();
            tempInput.focus();
        });
    });

    // Reset Form
    resetBtn.addEventListener("click", function () {
        tempInput.value = "";
        fromUnit.value = "celsius";
        toUnit.value = "fahrenheit";
        clearError();
        tempFeelBadge.style.display = "none";
        resultsOutput.innerHTML = `
            <div class="empty-state">
                <p>Enter a temperature value above to view the conversion.</p>
            </div>
        `;
        tempInput.focus();
    });

    // Event Listeners for Live Conversion
    convertBtn.addEventListener("click", performConversion);

    tempInput.addEventListener("input", function () {
        if (tempInput.value.trim() !== "") {
            performConversion();
        } else {
            clearError();
            tempFeelBadge.style.display = "none";
            resultsOutput.innerHTML = `
                <div class="empty-state">
                    <p>Enter a temperature value above to view the conversion.</p>
                </div>
            `;
        }
    });

    fromUnit.addEventListener("change", function () {
        if (tempInput.value.trim() !== "") {
            performConversion();
        }
    });

    toUnit.addEventListener("change", function () {
        if (tempInput.value.trim() !== "") {
            performConversion();
        }
    });

    tempInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            performConversion();
        }
    });
});
