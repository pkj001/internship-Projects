document.addEventListener('DOMContentLoaded', () => {
    const currencySelect = document.getElementById('currency');
    const unitSelect = document.getElementById('unit');
    const buttons = document.querySelectorAll('.pricing-card button');
    const modal = document.getElementById('signup-modal');
    const closeModal = document.getElementsByClassName('close')[0];
    const selectedPlanText = document.getElementById('selected-plan');

    const basePrices = {
        'Basic Plan': { month: 10, year: 100 },
        'Standard Plan': { month: 20, year: 200 },
        'Premium Plan': { month: 30, year: 300 }
    };

    const conversionRates = {
        USD: 1,
        EUR: 0.85,
        INR: 75
    };

    function updatePrices() {
        const selectedCurrency = currencySelect.value;
        const selectedUnit = unitSelect.value;
        const conversionRate = conversionRates[selectedCurrency];
        document.querySelectorAll('.pricing-card').forEach((card, index) => {
            const planName = card.querySelector('h2').textContent;
            const basePrice = basePrices[planName][selectedUnit];
            const convertedPrice = (basePrice * conversionRate).toFixed(2);
            card.querySelector('.price').innerHTML = `<span class="currency">${currencySelect.options[currencySelect.selectedIndex].text}</span><span class="amount">${convertedPrice}</span><span class="unit">/${selectedUnit}</span>`;
        });
    }

    currencySelect.addEventListener('change', updatePrices);
    unitSelect.addEventListener('change', updatePrices);

    updatePrices();

    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const planName = event.target.parentElement.querySelector('h2').textContent;
            selectedPlanText.textContent = planName;
            modal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});
