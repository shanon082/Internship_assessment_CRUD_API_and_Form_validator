let crudManager = null;
let formValidator = null;

// Navigation
function setupNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const views = document.querySelectorAll('.view');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const viewId = btn.dataset.view;
            
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            views.forEach(view => {
                if (view.id === `${viewId}View`) {
                    view.classList.add('active');
                } else {
                    view.classList.remove('active');
                }
            });
        });
    });
}

// Modal Functions
function openCreateModal() {
    document.getElementById('createPostModal').classList.add('active');
}

function closeCreateModal() {
    document.getElementById('createPostModal').classList.remove('active');
    document.getElementById('createPostForm').reset();
}

function closeEditModal() {
    document.getElementById('editPostModal').classList.remove('active');
    document.getElementById('editPostForm').reset();
}

function closeDeleteModal() {
    document.getElementById('deleteConfirmModal').classList.remove('active');
}

function showSuccessModal(message) {
    const modal = document.getElementById('successModal');
    const messageEl = document.getElementById('successMessage');
    if (messageEl) messageEl.textContent = message;
    modal.classList.add('active');
}

function closeSuccessModal() {
    document.getElementById('successModal').classList.remove('active');
}

// Make modal functions global
window.openCreateModal = openCreateModal;
window.closeCreateModal = closeCreateModal;
window.closeEditModal = closeEditModal;
window.closeDeleteModal = closeDeleteModal;
window.closeSuccessModal = closeSuccessModal;
window.showSuccessModal = showSuccessModal;

// Initialize CRUD
function initCRUD() {
    crudManager = new CRUDManager();
    window.crudManager = crudManager;
    crudManager.init();
    
    // Setup create post form
    const createForm = document.getElementById('createPostForm');
    if (createForm) {
        createForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const title = document.getElementById('modalPostTitle').value;
            const body = document.getElementById('modalPostBody').value;
            await crudManager.createPost(title, body);
            closeCreateModal();
        });
    }
    
    // Setup edit post form
    const editForm = document.getElementById('editPostForm');
    if (editForm) {
        editForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const id = document.getElementById('editPostId').value;
            const title = document.getElementById('editPostTitle').value;
            const body = document.getElementById('editPostBody').value;
            await crudManager.updatePost(id, title, body);
            closeEditModal();
        });
    }
}

// Initialize Form Validator
function initFormValidator() {
    const validationConfig = {
        name: {
            required: true,
            minLength: 2,
            maxLength: 100,
            messages: {
                required: 'Full name is required',
                minLength: 'Name must be at least 2 characters',
                maxLength: 'Name must be less than 100 characters'
            }
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/,
            messages: {
                required: 'Email address is required',
                pattern: 'Enter a valid email address'
            }
        },
        password: {
            required: true,
            minLength: 8,
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            messages: {
                required: 'Password is required',
                minLength: 'Password must be at least 8 characters',
                pattern: 'Password must contain uppercase, lowercase, number, and special character'
            }
        },
        phone: {
            required: true,
            pattern: /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/,
            messages: {
                required: 'Phone number is required',
                pattern: 'Enter a valid phone number'
            }
        },
        age: {
            custom: (value) => {
                if (!value) return true;
                const age = parseInt(value);
                return !isNaN(age) && age >= 18 && age <= 120;
            },
            messages: {
                custom: 'Age must be between 18 and 120'
            }
        }
    };
    
    formValidator = new FormValidator(validationConfig);
    formValidator.init();
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    initCRUD();
    initFormValidator();
    
    // Setup create post button
    const createBtn = document.getElementById('openCreateModalBtn');
    if (createBtn) {
        createBtn.addEventListener('click', openCreateModal);
    }
    
    // Close modals when clicking outside
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });
    
    console.log('Application initialized successfully');
});