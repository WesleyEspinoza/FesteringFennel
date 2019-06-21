// scripts.js

function deleteComment() {
  document.querySelectorAll('.delete-comment').forEach((commentElement) => {
    commentElement.addEventListener('click', (e) => {
      console.log('click!');
      const commentId = e.target.getAttribute('data-comment-id');
      const reviewId = e.target.getAttribute('data-comment-reviewId');
      const movieId = e.target.getAttribute('data-comment-movieId');
      // Same code used to add click handlers, except we call delete here
      axios.delete(`/movies/${movieId}/reviews/${reviewId}/comments/${commentId}`)
        .then((response) => {
          console.log(response);
          const comment = document.getElementById(commentId);
          comment.parentNode.removeChild(comment); // OR comment.style.display = 'none';
        })
        .catch((error) => {
          console.log(error);
          alert('There was an error deleting this comment.');
        });
    });
  });
}

// Only run this if we find the new-comment element
if (document.getElementById('new-comment')) {
  // listen for a form submit event
  document.getElementById('new-comment').addEventListener('submit', (e) => {
    // prevent the default form behavior
    e.preventDefault();

    // serialize the form data into an object
    const comment = {};
    const inputs = document.getElementsByClassName('form-control');
    for (let i = 0; i < inputs.length; i += 1) {
      comment[inputs[i].name] = inputs[i].value;
    }

    // use axios to initialize a post request and send in the form data

    // We'll need this for re-constructing our delete form
    const { movieId } = comment;
    axios.post('/reviews/comments', comment)
      .then((response) => {
        // wait for the success response from the server
        console.log('response: ', response);
        // remove the information from the form
        document.getElementById('new-comment').reset();
        // display the data as a new comment on the page
        document.getElementById('comments').insertAdjacentHTML('afterbegin',
          `<div class="card" id="${response.data.comment._id}">
           <div class="card-block">
             <h4 class="card-title">${response.title}</h4>
             <p class="card-text">${response.content}</p>
             <button class="btn btn-link delete-comment" data-comment-id="${response.data.comment._id}" data-comment-reviewId="${response.data.comment.reviewId}" data-comment-movieId="${movieId}">Delete</button>
           </div>
         </div>`);
      });
  });
  deleteComment();
}

// Check to make sure we see any .delete-comment elements
if (document.querySelectorAll('.delete-comment')) {
  // Add a click event listener for each comment
  deleteComment();
}
