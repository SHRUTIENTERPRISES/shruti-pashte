const ADMIN_PASSWORD = "admin123";  
let blogs = JSON.parse(localStorage.getItem('blogs')) || [];

document.addEventListener('DOMContentLoaded', function () {
    // ... existing code for login ...

    // Event listener for adding a new blog.
    if (document.getElementById('addBlogForm')) {
        document.getElementById('addBlogForm').addEventListener('submit', function (e) {
            e.preventDefault();

            const title = document.getElementById('title').value;
            const content = document.getElementById('content').value;
            const imgUpload = document.getElementById('imgUpload').files[0];

            let reader = new FileReader();
            if (imgUpload) {
                reader.readAsDataURL(imgUpload);
                reader.onloadend = function () {
                    const base64data = reader.result;
                    const newBlog = {
                        id: Date.now(),
                        title,
                        content,
                        imgURL: base64data
                    };
                    blogs.push(newBlog);
                    localStorage.setItem('blogs', JSON.stringify(blogs));
                    displayBlogsAdmin();
                }
                return;
            }

            // If no image, still add the blog.
            const newBlog = {
                id: Date.now(),
                title,
                content,
                imgURL: ''  // No image URL.
            };
            blogs.push(newBlog);
            localStorage.setItem('blogs', JSON.stringify(blogs));
            displayBlogsAdmin();
        });
    }

    displayBlogsUser();
    displayBlogsAdmin();
});

function displayBlogsUser() {
    const blogContainer = document.getElementById('blogContainer');
    blogContainer.innerHTML = '';

    blogs.forEach(blog => {
        blogContainer.innerHTML += `
        <div class="card-group">
        <div class="card">
          
          <div class="card-body">
            <h5 class="card-title">${blog.title}</h5>
            <p class="card-text">${blog.content}</p>
            <p class="card-text"><small class="text-muted">-- श्रुतिका पष्टे</small></p>
          </div>
        </div>
      </div>
      
        `;
    });
}

function displayBlogsAdmin() {
    const blogContainer = document.getElementById('adminBlogContainer');
    if (!blogContainer) return;  // Exit if not on the admin page

    blogContainer.innerHTML = '';

    blogs.forEach(blog => {
        blogContainer.innerHTML += `
            <div class="card mb-4">
                
                <div class="card-body">
                    <h5 class="card-title">${blog.title}</h5>
                    <p class="card-text">${blog.content}</p>
                    <button onclick="deleteBlog(${blog.id})" class="btn btn-danger">Delete</button>
                </div>
            </div>
        `;
    });
}

function deleteBlog(id) {
    blogs = blogs.filter(blog => blog.id !== id);
    localStorage.setItem('blogs', JSON.stringify(blogs));
    displayBlogsAdmin();
}
