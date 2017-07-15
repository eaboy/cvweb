var navbarItems = document.getElementsByClassName('navbar-item');

for ( var i = 0 ; i < navbarItems.length ; i++) {
    navbarItems[i].addEventListener('click', function(event) {
        var sectionToGo = this.getElementsByTagName('a')[0].href.split('#');

        deleteActiveClass();

        this.classList.add('active');
        if (sectionToGo.length === 2 ) {
            event.preventDefault();
            var goTo = sectionToGo[sectionToGo.length - 1];
            scrollToElement(document.getElementById(goTo));
        }
    })
}

function scrollToElement (element) {
    
    var jump = Math.abs(acumulativeOffset(element) - window.scrollY) * 0.3;
    if (window.scrollY < acumulativeOffset(element)) {
        window.scroll(0,window.scrollY + jump);
    } else {
        window.scroll(0,window.scrollY - jump);
    }
    if (jump === Math.abs(acumulativeOffset(element) - window.scrollY) * 0.3){ //Ends function when next jump is equal to last, i.e. when the end of the page is reached
        return;
    }
    if (jump > 1) {

        setTimeout(function() {
            scrollToElement(element);
        }, 40)
    } else {
        window.scroll(0, acumulativeOffset(element));
    }
}

function deleteActiveClass() {
    for (var i  = 0 ; i < navbarItems.length; i++) {
        navbarItems[i].classList.remove('active');
    }
}

var acumulativeOffset = function (element) {
    var top = 0;

    do {
        top += element.offsetTop || 0;
        element = element.offsetParent;

    } while (element);

    return top;
}

var offsetWhoIAm = acumulativeOffset(document.getElementById('who-i-am')) - 76;
var offsetStudies = acumulativeOffset(document.getElementById('studies')) - 56;
var offsetExperience = acumulativeOffset(document.getElementById('experience')) - 56;
/*var nvbar = acumulativeOffset(document.getElementsByClassName('navbar')[0]) - 50;*/

window.addEventListener('scroll', changeMenuStyle);

var previous;
function changeMenuStyle(event) {
    var pageOffset = window.pageYOffset;
    if ( pageOffset >= 0 && pageOffset < offsetWhoIAm ) {
        if (!previous || previous !== 1) {
            previous = 1;
        } else if (previous === 1) {
            return false;
        }

        deleteActiveClass();
        document.querySelector("a[href$='#header']").parentNode.classList.add('active');
        document.querySelector(".navbar > .navbar-list").classList.remove('scrolled');
    } else if (pageOffset >= offsetWhoIAm && pageOffset < offsetStudies) {
        if (!previous || previous !== 2) {
            previous = 2;
        } else if (previous === 2) {
            return false;
        }
        deleteActiveClass();
        document.querySelector("a[href$='#who-i-am']").parentNode.classList.add('active');
        document.querySelector(".who-i-am > article > .photo img").classList.add('animate');
        document.querySelector(".navbar > .navbar-list").classList.add('scrolled');
    } else if (pageOffset >= offsetStudies && pageOffset < offsetExperience) {
        if (!previous || previous !== 3) {
            previous = 3;
        } else if (previous === 3) {
            return false;
        }
        deleteActiveClass();
        document.querySelector("a[href$='#studies']").parentNode.classList.add('active');
    }
}