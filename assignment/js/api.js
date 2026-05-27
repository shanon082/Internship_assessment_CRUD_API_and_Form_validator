
class CRUDManager {
    constructor() {
        this.baseURL = 'https://jsonplaceholder.typicode.com/posts';
        this.posts = [];
        this.currentPage = 1;
        this.postsPerPage = 10;
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000;
        this.pendingDeleteId = null;
    }

    async init() {
        await this.fetchPosts();
        this.setupEventListeners();
    }

    async fetchPosts(forceRefresh = false) {
        const cacheKey = 'posts_data';
        const cached = this.cache.get(cacheKey);

        if (!forceRefresh && cached && (Date.now() - cached.timestamp) < this.cacheTimeout) {
            this.posts = cached.data;
            this.renderPosts();
            this.updateCacheIndicator(true);
            return;
        }

        try {
            this.showLoading(true);
            const response = await fetch(this.baseURL);
            const data = await response.json();
            this.posts = data.slice(0, 100);
            
            this.cache.set(cacheKey, {
                data: this.posts,
                timestamp: Date.now()
            });
            
            this.renderPosts();
            this.updateCacheIndicator(false);
            Utils.showToast('Posts loaded successfully', 'success');
        } catch (error) {
            console.error('Error fetching posts:', error);
            Utils.showToast('Failed to load posts', 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async createPost(title, body) {
        if (!title.trim() || !body.trim()) {
            Utils.showToast('Title and content are required', 'error');
            return null;
        }

        try {
            const response = await fetch(this.baseURL, {
                method: 'POST',
                body: JSON.stringify({
                    title: title.trim(),
                    body: body.trim(),
                    userId: 1,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            
            const newPost = await response.json();
            this.posts.unshift({ ...newPost, id: Utils.generateId() });
            this.renderPosts();
            Utils.showToast('Post created successfully!', 'success');
            return newPost;
        } catch (error) {
            console.error('Error creating post:', error);
            Utils.showToast('Failed to create post', 'error');
            return null;
        }
    }

    async updatePost(id, title, body) {
        if (!title.trim() || !body.trim()) {
            Utils.showToast('Title and content are required', 'error');
            return null;
        }

        try {
            const response = await fetch(`${this.baseURL}/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    id,
                    title: title.trim(),
                    body: body.trim(),
                    userId: 1,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            
            const updatedPost = await response.json();
            const index = this.posts.findIndex(p => p.id == id);
            
            if (index !== -1) {
                this.posts[index] = { ...this.posts[index], ...updatedPost };
                this.renderPosts();
                Utils.showToast('Post updated successfully!', 'success');
            }
            
            return updatedPost;
        } catch (error) {
            console.error('Error updating post:', error);
            Utils.showToast('Failed to update post', 'error');
            return null;
        }
    }

    async deletePost(id) {
        try {
            await fetch(`${this.baseURL}/${id}`, {
                method: 'DELETE',
            });
            
            this.posts = this.posts.filter(post => post.id != id);
            this.renderPosts();
            Utils.showToast('Post deleted successfully!', 'success');
        } catch (error) {
            console.error('Error deleting post:', error);
            Utils.showToast('Failed to delete post', 'error');
        }
    }

    renderPosts() {
        const container = document.getElementById('postsContainer');
        if (!container) return;

        const startIndex = (this.currentPage - 1) * this.postsPerPage;
        const endIndex = startIndex + this.postsPerPage;
        const paginatedPosts = this.posts.slice(startIndex, endIndex);

        if (paginatedPosts.length === 0) {
            container.innerHTML = '<div class="loading-spinner"><p><i class="fas fa-inbox"></i> No posts found</p></div>';
            this.updatePagination();
            return;
        }

        container.innerHTML = paginatedPosts.map(post => `
            <div class="post-card" data-post-id="${post.id}">
                <div class="post-title">
                    <i class="fas fa-file-alt"></i>
                    ${Utils.escapeHtml(post.title)}
                </div>
                <div class="post-body">${Utils.escapeHtml(post.body)}</div>
                <div class="post-actions">
                    <button class="btn btn-primary btn-small" onclick="window.crudManager.openEditModal(${post.id})">
                        <i class="fas fa-edit"></i>
                        <span>Edit</span>
                    </button>
                    <button class="btn btn-danger btn-small" onclick="window.crudManager.openDeleteModal(${post.id})">
                        <i class="fas fa-trash"></i>
                        <span>Delete</span>
                    </button>
                </div>
            </div>
        `).join('');

        this.updatePagination();
    }

    openEditModal(id) {
        const post = this.posts.find(p => p.id == id);
        if (post) {
            document.getElementById('editPostId').value = post.id;
            document.getElementById('editPostTitle').value = post.title;
            document.getElementById('editPostBody').value = post.body;
            document.getElementById('editPostModal').classList.add('active');
        }
    }

    openDeleteModal(id) {
        this.pendingDeleteId = id;
        document.getElementById('deleteConfirmModal').classList.add('active');
    }

    confirmDelete() {
        if (this.pendingDeleteId) {
            this.deletePost(this.pendingDeleteId);
            this.pendingDeleteId = null;
            closeDeleteModal();
        }
    }

    updatePagination() {
        const totalPages = Math.ceil(this.posts.length / this.postsPerPage);
        document.getElementById('currentPage').textContent = this.currentPage;
        document.getElementById('totalPages').textContent = totalPages;
        document.getElementById('prevPage').disabled = this.currentPage === 1;
        document.getElementById('nextPage').disabled = this.currentPage === totalPages;
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.renderPosts();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    nextPage() {
        const totalPages = Math.ceil(this.posts.length / this.postsPerPage);
        if (this.currentPage < totalPages) {
            this.currentPage++;
            this.renderPosts();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    updateCacheIndicator(usingCache) {
        const indicator = document.getElementById('cacheStatus');
        if (indicator) {
            indicator.innerHTML = usingCache ? 
                '<i class="fas fa-database"></i> Cached Data' : 
                '<i class="fas fa-cloud-download-alt"></i> Live Data';
        }
    }

    showLoading(show) {
        const container = document.getElementById('postsContainer');
        if (container && show) {
            container.innerHTML = '<div class="loading-spinner"><div class="spinner"></div><p>Loading posts...</p></div>';
        }
    }

    setupEventListeners() {
        const prevBtn = document.getElementById('prevPage');
        const nextBtn = document.getElementById('nextPage');
        
        if (prevBtn) prevBtn.addEventListener('click', () => this.previousPage());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextPage());
        
        const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
        if (confirmDeleteBtn) confirmDeleteBtn.addEventListener('click', () => this.confirmDelete());
    }
}

window.CRUDManager = CRUDManager;