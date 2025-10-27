const formValidator = {
    init() {
        const appRoot = document.getElementById('app-root');
        appRoot.addEventListener('submit', (event) => {
            if (event.target.tagName === 'FORM') {
                event.preventDefault();
                const form = event.target;
                if (this.validateForm(form)) {
                    this.showSuccessMessage(form);
                }
            }
        });
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
    let successTitle = 'Cadastro Realizado! ✅';
    let successText = 'Obrigado por se juntar à nossa causa. Em breve, você receberá novidades em seu e-mail.';

    if (form.id === 'form-doacao') {
        successTitle = 'Doação Recebida!';
        successText = 'Sua contribuição faz uma enorme diferença. Muito obrigado pelo seu apoio!';
    }

    form.innerHTML = `
        <div class="success-message">
            <h2>${successTitle}</h2>
            <p>${successText}</p>
            <a href="/src/pages/projetos.html" class="btn btn-principal" data-link>Ver Nossos Projetos</a>
        </div>
    `;
},
}
export default formValidator;