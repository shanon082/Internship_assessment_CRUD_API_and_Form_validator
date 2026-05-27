
class FormValidator {
    constructor(config) {
        this.config = config;
        this.errors = {};
        this.form = null;
    }

    init() {
        this.form = document.getElementById('dynamicForm');
        if (!this.form) return;
        
        this.setupValidationListeners();
        this.setupSubmitHandler();
    }

    validateField(fieldName, value) {
        const rules = this.config[fieldName];
        if (!rules) return true;

        let isValid = true;
        let errorMessage = '';

        if (rules.required && !value) {
            errorMessage = rules.messages?.required || `${fieldName} is required`;
            isValid = false;
        }
        else if (rules.minLength && value && value.length < rules.minLength) {
            errorMessage = rules.messages?.minLength || `${fieldName} must be at least ${rules.minLength} characters`;
            isValid = false;
        }
        else if (rules.maxLength && value && value.length > rules.maxLength) {
            errorMessage = rules.messages?.maxLength || `${fieldName} must be less than ${rules.maxLength} characters`;
            isValid = false;
        }
        else if (rules.pattern && value && !rules.pattern.test(value)) {
            errorMessage = rules.messages?.pattern || `${fieldName} format is invalid`;
            isValid = false;
        }
        else if (rules.custom && value && !rules.custom(value)) {
            errorMessage = rules.messages?.custom || `${fieldName} is invalid`;
            isValid = false;
        }

        if (!isValid) {
            this.errors[fieldName] = errorMessage;
        } else {
            delete this.errors[fieldName];
        }

        this.displayError(fieldName, errorMessage);
        return isValid;
    }

    validateAll(formData) {
        let isValid = true;
        
        for (const fieldName in this.config) {
            const value = formData.get(fieldName) || '';
            if (!this.validateField(fieldName, value)) {
                isValid = false;
            }
        }
        
        return isValid;
    }

    displayError(fieldName, message) {
        const errorElement = document.getElementById(`${fieldName}Error`);
        const inputElement = document.getElementById(fieldName);
        
        if (errorElement) {
            if (message) {
                errorElement.textContent = message;
                errorElement.classList.add('show');
            } else {
                errorElement.textContent = '';
                errorElement.classList.remove('show');
            }
        }

        if (inputElement) {
            if (message) {
                inputElement.classList.add('error');
            } else {
                inputElement.classList.remove('error');
            }
        }
    }

    setupValidationListeners() {
        for (const fieldName in this.config) {
            const input = document.getElementById(fieldName);
            if (input) {
                const debouncedValidate = Utils.debounce((value) => {
                    this.validateField(fieldName, value);
                }, 300);
                
                input.addEventListener('input', (e) => {
                    debouncedValidate(e.target.value);
                });
                
                input.addEventListener('blur', (e) => {
                    this.validateField(fieldName, e.target.value);
                });
            }
        }
    }

    setupSubmitHandler() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();
                const formData = new FormData(this.form);
                
                if (this.validateAll(formData)) {
                    this.showSuccess();
                } else {
                    Utils.showToast('Please fix the errors before submitting', 'error');
                    this.scrollToFirstError();
                }
            });
        }
    }

    scrollToFirstError() {
        const firstErrorField = document.querySelector('.validator-input.error');
        if (firstErrorField) {
            firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstErrorField.focus();
        }
    }

    showSuccess() {
        showSuccessModal('Form submitted successfully!');
        this.form.reset();
        // Clear all error states
        for (const fieldName in this.config) {
            this.displayError(fieldName, '');
        }
    }
}

window.FormValidator = FormValidator;