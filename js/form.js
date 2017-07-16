var textareaForm = document.getElementById('message');
var othersRadio = document.getElementById('others');
var radioButtons = document.querySelectorAll('input[name="know-me"]');

function countWords (text) {
    var wordsArr;
    var wordsCount;
    wordsArr = text.match(/\S+/g);
    if (wordsArr !== null) {
        wordsCount = wordsArr.length;
    } else {
        wordsCount = 0;
    }
    document.getElementById('words').innerHTML = wordsCount;
}

function showOthersInput () {
    console.log(radioButtons);
}

textareaForm.addEventListener('keyup', function() {
    countWords(textareaForm.value)
});

othersRadio.addEventListener('click', showOthersInput);