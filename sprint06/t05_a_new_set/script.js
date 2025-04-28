document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', (event) => {
        resultDiv.textContent = '';
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const ageInput = document.getElementById('age');
        const descriptionInput = document.getElementById('description');
        const photoInput = document.getElementById('photo');
        let hasError = false;

        if (!nameInput.value.trim())
        {
            displayError(nameInput, 'Name is required.');
            hasError = true;
        }
        else
        {
            clearError(nameInput);
        }

        if (!emailInput.value.trim())
        {
            displayError(emailInput, 'E-mail is required.');
            hasError = true;
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value))
        {
            displayError(emailInput, 'Invalid e-mail format.');
            hasError = true;
        }
        else
        {
            clearError(emailInput);
        }

        if (!ageInput.value)
        {
            displayError(ageInput, 'Age is required.');
            hasError = true;
        }
        else if (parseInt(ageInput.value, 10) <= 0 || isNaN(parseInt(ageInput.value, 10)))
        {
            displayError(ageInput, 'Invalid age.');
            hasError = true;
        }
        else
        {
            clearError(ageInput);
        }

        if (!descriptionInput.value.trim())
        {
            displayError(descriptionInput, 'Please tell us something about yourself.');
            hasError = true;
        }
        else
        {
            clearError(descriptionInput);
        }

        if (!photoInput.value)
        {
            displayError(photoInput, 'Please upload a photo.');
            hasError = true;
        }
        else
        {
            clearError(photoInput);
        }

        if (hasError)
        {
            event.preventDefault();
        }
    });

    function displayError(inputElement, message)
    {
        let errorSpan = inputElement.nextElementSibling;
        if (!errorSpan || !errorSpan.classList.contains('error-message'))
        {
            errorSpan = document.createElement('span');
            errorSpan.classList.add('error-message');
            inputElement.parentNode.insertBefore(errorSpan, inputElement.nextSibling);
        }
        errorSpan.textContent = message;
    }

    function clearError(inputElement)
    {
        const errorSpan = inputElement.nextElementSibling;
        if (errorSpan && errorSpan.classList.contains('error-message'))
        {
            errorSpan.textContent = '';
        }
    }
});