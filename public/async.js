const commentBox = document.getElementById('commentBox')
const commentFormBox = document.getElementById('commentFormBox')
const blogIdTextBox = document.getElementById('blogIdTextBox')
const bodyTextBox = document.getElementById('bodyTextBox')


function displayComment() {
    fetch("http://localhost:8080/blog/leave-comment")
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

// function fetchComment(event) {
//}

commentFormBox.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(bodyTextBox.value)
    console.log(blogIdTextBox.value)
    fetch("http://localhost:8080/blog/leave-comment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                body_text: bodyTextBox.value,
                blog_id: blogIdTextBox.value
            })
        })
        .then(response => response.json())
        .then(result => {
            console.log(result)
            displayComment()
        })
        .catch(error => {
            console.log(error)
        })
})