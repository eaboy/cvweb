var stars = document.getElementsByClassName('stars');
var newComment = {stars: 0, comment:''};

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
    if (newComment.stars = 0 || newComment.comment === '') {
        document.getElementById('alert-new-comment').classList.add('show');
    }
    console.log(newComment);
})