document.addEventListener('DOMContentLoaded', function() {
    const projetosMenuItem = document.getElementById('projetos-menu-item');
    if (projetosMenuItem) {
        const projetosLink = projetosMenuItem.querySelector('a');
        projetosLink.addEventListener('click', function(event) {
            const menuToggle = document.querySelector('.menu-toggle');
            if (window.getComputedStyle(menuToggle).display !== 'none') {
                event.preventDefault();
                projetosMenuItem.classList.toggle('submenu-aberto');
            }
        });
    }
});
const formValidator = {
    init(formId) {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                const isValid = this.validateForm(form);
                if (isValid) {
                    this.showSuccessMessage(form);
                }
            });
        }
    },
    validateForm(form) {
        let allFieldsValid = true;
        this.clearAllErrors(form);
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                allFieldsValid = false;
                const errorMessage = this.getErrorMessage(input);
                this.showError(input, errorMessage);
            }
        });
        return allFieldsValid;
    },
    getErrorMessage(input) {
        if (input.validity.valueMissing) return 'Este campo é obrigatório.';
        if (input.validity.typeMismatch) return 'Por favor, insira um e-mail válido.';
        if (input.validity.patternMismatch) return 'O formato está incorreto.';
        if (input.validity.tooShort) return `Deve ter no mínimo ${input.minLength} caracteres.`;
        return 'O valor inserido é inválido.';
    },
    showError(input, message) {
        input.classList.add('invalid');
        const parent = input.parentElement;
        let errorElement = parent.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            parent.appendChild(errorElement);
        }
        errorElement.textContent = message;
    },
    clearAllErrors(form) {
        form.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
        form.querySelectorAll('.error-message').forEach(el => el.remove());
    },
    showSuccessMessage(form) {
        form.innerHTML = `<div class="success-message"><h2>Recebido com Sucesso! ✅</h2><p>Obrigado! Sua mensagem foi enviada.</p></div>`;
    }
};