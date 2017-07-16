var textareaForm = document.getElementById('message');
var othersRadio = document.getElementById('know-me-4');
var radioButtons = document.querySelectorAll('input[name="know-me"]');
var form = document.getElementsByTagName('form')[0];
var inputNombre = document.getElementById('nombre');
var inputEmail = document.getElementById('email');
var inputMessage = document.getElementById('message');
var inputPhone = document.getElementById('phone');
var submitButton = document.getElementById('enviar');
var words = document.getElementById('words');

var loadingIcon = document.createElement('i');
loadingIcon.classList.add('fa', 'fa-spinner', 'fa-spin');

function countWords (text) {
    var wordsArr;
    var wordsCount;
    wordsArr = text.match(/\S+/g);
    if (wordsArr !== null) {
        wordsCount = wordsArr.length;
    } else {
        wordsCount = 0;
    }
    if (wordsCount > 150 ) {
        submitButton.disabled = true;
        inputMessage.classList.add('error');
        words.classList.add('error');
    } else {
        submitButton.disabled = false;
        inputMessage.classList.remove('error');
        words.classList.remove('error');
    }

    words.innerHTML = wordsCount;
}

function showOthersInput () {
    console.log(radioButtons);
}

textareaForm.addEventListener('keyup', function() {
    countWords(textareaForm.value)
});

othersRadio.addEventListener('click', function() {
    document.getElementById('others-input').classList.add('show');
});

for (var i = 0; i < radioButtons.length-1; i++) {
    radioButtons[i].addEventListener('click', function() {
    document.getElementById('others-input').classList.remove('show');        
    });
}

form.addEventListener('submit', function(event) {
    var formInvalid = false;
    if (inputNombre.checkValidity() === false) {
        inputNombre.focus();
        inputNombre.classList.add('error');
        formInvalid = true;
        inputNombre.addEventListener('keydown', function() {
            inputNombre.classList.remove('error');
        });
    }

    if (inputEmail.checkValidity() === false) {
        inputEmail.focus();
        inputEmail.classList.add('error');
        formInvalid = true;
        inputEmail.addEventListener('keydown', function() {
            inputEmail.classList.remove('error');
        });
    }

    if (inputPhone.checkValidity() === false) {
        inputPhone.focus();
        inputPhone.classList.add('error');
        formInvalid = true;
        inputPhone.addEventListener('keydown', function() {
            inputPhone.classList.remove('error');
        });
    }

    if (formInvalid) {
        event.preventDefault();
    } else {
        submitButton.disabled = true;
        submitButton.appendChild(loadingIcon);
        event.preventDefault();

        setTimeout(function () {
            form.reset();
            submitButton.disabled = false;
            submitButton.removeChild(loadingIcon);
            alert("Formulario enviado correctamente");
        }, 1000);
    }

});