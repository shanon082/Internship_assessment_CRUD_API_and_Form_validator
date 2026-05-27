const Utils = {
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = 'toast';
        
        const icon = document.createElement('i');
        if (type === 'success') {
            icon.className = 'fas fa-check-circle';
            toast.style.background = '#10b981';
        } else if (type === 'error') {
            icon.className = 'fas fa-exclamation-circle';
            toast.style.background = '#ef4444';
        } else if (type === 'warning') {
            icon.className = 'fas fa-exclamation-triangle';
            toast.style.background = '#f59e0b';
        } else {
            icon.className = 'fas fa-info-circle';
            toast.style.background = '#1f2937';
        }
        
        const text = document.createTextNode(` ${message}`);
        toast.appendChild(icon);
        toast.appendChild(text);
        
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    },

    escapeHtml(str) {
        if (!str) return '';
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    },

    debounce(func, delay) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    },

    generateId() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
    }
};

window.Utils = Utils;