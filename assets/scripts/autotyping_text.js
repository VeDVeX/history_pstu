document.addEventListener("DOMContentLoaded", function() {

const t = [
    'Пермский государственный национальный исследовательский\n',
    'университет',
];

function typeText() {
    let line = 0;
    let count = 0;
    let out = '';
    let htmlOut = document.querySelector('.heading-autotyping-text');

    function typeLine(){
        //рисуем строку
        let interval = setTimeout(function(){
            out += t[line][count];
            htmlOut.innerHTML = out + '<span class="blink">|</span>';
            count++;

            if (count >= t[line].length) {
                count = 0;
                line++;
                if (line == t.length) {
                    htmlOut.innerHTML = out;
                    clearTimeout(interval);
                    return true;
                }
            }
            typeLine();
        }, getRandomInt(getRandomInt(350)));
    }

    typeLine();
}

function getRandomInt(max) {
    return Math.floor(Math.random()*Math.floor(max));
}

typeText();

});