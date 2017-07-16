var stars = document.getElementsByClassName('stars');
var newComment = {stars: 0, comment:''};
var comments = [];
var commentsContainer = document.getElementById('comments-container');

for ( var i = 0; i < stars.length; i++) {
    (function(i){
        stars[i].selected = false;
        stars[i].addEventListener('mouseover', function() {
            overOrSelected(i);
        });
        stars[i].addEventListener('mouseout', function() {
            mouseOut();
        });
        stars[i].addEventListener('click', function() {
            selected(i);
        });

    })(i);
}

function overOrSelected (index) {
    for (var i = 0 ; i < stars.length; i++) {
        stars[i].classList.remove('fa-star-o');
        stars[i].classList.remove('fa-star');
        if (i <= index) {
            stars[i].classList.add('fa-star');
            stars[i].classList.remove('fa-star-o');
        } else {
            stars[i].classList.add('fa-star-o');
            stars[i].classList.remove('fa-star');
        }
    }
}

function mouseOut() {
    for (var i = 0 ; i < stars.length; i++) {
        stars[i].classList.remove('fa-star-o');
        stars[i].classList.remove('fa-star');        
        if (!stars[i].selected) {
            stars[i].classList.add('fa-star-o');
            stars[i].classList.remove('fa-star');
        } else {
            stars[i].classList.add('fa-star');
            stars[i].classList.remove('fa-star-o');
        }
    }
    overOrSelected
}

function selected (index) {
    for (var i = 0; i < stars.length; i++) {
        if (i<=index) {
            stars[i].selected = true;
        } else {
            stars[i].selected = false;
        }
    }
    newComment.stars = index + 1;
}



document.getElementById("addNewComment").addEventListener("click", function (event) {
    event.preventDefault();
    newComment.comment = document.getElementById("newComment").value;
    if (newComment.stars === 0 || newComment.comment === '') {
        document.getElementById('alert-new-comment').classList.add('show');
    } else {        
        addComment();
    }
})

function getComments () {
    var XHR = new XMLHttpRequest();
    XHR.open("GET", "http://localhost:8000/api/comments", true);
    XHR.setRequestHeader("Content-Type", "application/json");

    XHR.onreadystatechange = function () {
        if (XHR.readyState === 4 && XHR.status !== 404) {
            comments = JSON.parse(XHR.responseText);
            drawComments();
        } else {
            console.log("Página no encontrada");
            drawComments();
        }
    }

    XHR.send();
}

function addComment() {
    var XHR = new XMLHttpRequest();
    XHR.open("POST", "http://localhost:8000/api/comments", true);
    XHR.setRequestHeader("Content-Type", "application/json");

    XHR.onreadystatechange = function () {
        if (XHR.readyState === 4) {
            comments.unshift(JSON.parse(XHR.responseText));
            clearCommentForm();
            drawComments();
        } else if (XHR.readyState === 4 && XHR.status === 404) {
            console.log("Página no encontrada");
        }
    }

    XHR.send(JSON.stringify(newComment));
}

function drawComments() {
    while (commentsContainer.firstChild) {
        commentsContainer.removeChild(commentsContainer.firstChild);
    }
    if (comments.length === 0) {
        createComment('No hay comentarios');
    } else {
        for (var i = 0; i < comments.length; i++) {
            createComment('Comentario: '+comments[i].comment, comments[i].stars);
        }
    }
}

function createComment(comment, stars) {
    var li = document.createElement('li');
    var text = document.createTextNode(comment);
    li.appendChild(text);
    if (stars) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode('Valoración: '));
        for (var i = 0; i < parseInt(stars); i++) {
            var icon = document.createElement('i');
            icon.classList.add('fa','fa-star');
            div.appendChild(icon);
        }
        li.appendChild(div);
    }
    commentsContainer.appendChild(li);
}

function clearCommentForm () {
    newComment = {stars: 0, comment:''};
    document.getElementsByTagName('form')[1].reset();
    selected(-1);
    mouseOut();
}

getComments();