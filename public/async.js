const commentBox = document.getElementById('commentBox')
const commentFormBox = document.getElementById('commentFormBox')
const blogIdTextBox = document.getElementById('blogIdTextBox')
const bodyTextBox = document.getElementById('bodyTextBox')
const newestBtn = document.getElementById('newestBtn')
const oldestBtn = document.getElementById('oldestBtn')
const mainImageBox = document.getElementById('mainImageBox')


function sortByNewest() {
    fetch('http://localhost:8080/sort-by-newest')
        .then(response => response.json())
        .then(blogs => {
            sortedBlogs = blogs.map((blog) => {
                return `<div id="container">
                            <div class="fill"><img src="${blog.image}" alt=""></div>
                            <div id = "description">
                                <a href="/details/${blog.id}">
                                    <h3>${blog.title}</h3>
                                </a>
                                <p>${blog.createdAt}</p>
                            </div>
                        </div>`
            })
            mainImageBox.innerHTML = sortedBlogs.join('')
        })
}

function sortByOldest() {
    fetch('http://localhost:8080/sort-by-Oldest')
        .then(response => response.json())
        .then(blogs => {
            sortedBlogs = blogs.map((blog) => {
                return `<div id="container">
                        <div class="fill"><img src="${blog.image}" alt=""></div>
                        <div id = "description">
                            <a href="/details/${blog.id}">
                                <h3>${blog.title}</h3>
                            </a>
                            <p>${blog.createdAt}</p>
                        </div>
                    </div>`
            })
            mainImageBox.innerHTML = sortedBlogs.join('')
        })
}

function displayComment(result) {
    fetch(`http://localhost:8080/${result.oneComment.blog_id}/leave-comment`)
        .then(response => response.json())
        .then(comments => {
            let commentItems = comments.map((comment) => {
                return `<div id="eachComment">
            <p>${comment.body_text}</p>
            </div>`
            })
            commentBox.innerHTML = commentItems.join('')
        })
        .catch(error => {
            console.log(error)
        })
}

function postComment() {
    fetch("http://localhost:8080/leave-comment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                bodyText: bodyTextBox.value,
                blogId: blogIdTextBox.value
            })
        })
        .then(response => response.json())
        .then(result => {
            console.log(result)
            displayComment(result)
        })
        .catch(error => {
            console.log(error)
        })
}

commentFormBox.addEventListener('submit', (e) => {
    e.preventDefault()
    postComment()
})