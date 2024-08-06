document.addEventListener('DOMContentLoaded', function() {
    let score = 0;
    let timeLeft = 60;
    const timerElement = document.getElementById('response');
    const scoreElement = document.getElementById('score');

    document.getElementById('guess-form').addEventListener('submit', function(event) {
        event.preventDefault();
        let guess = document.getElementById('guess').value;

        axios.post('/check_word', { word: guess })
            .then(response => {
                let result = response.data.result;
                let message = '';

                if (result === 'ok') {
                    message = 'Valid word!';
                    score += guess.length;
                    scoreElement.innerText = 'Score: ' + score;
                } else if (result === 'not-on-board') {
                    message = 'Word not on board.';
                } else if (result === 'not-a-word') {
                    message = 'Not a valid word.';
                }

                timerElement.innerText = message;
            })
            .catch(error => {
                console.error(error);
            });
    });

    let timer = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById('guess-form').style.display = 'none';
            timerElement.innerText = 'Time is up!';
            sendStatistics(score);
        } else {
            timerElement.innerText = 'Time left: ' + timeLeft;
            timeLeft -= 1;
        }
    }, 1000);

    function sendStatistics(score) {
        axios.post('/game_over', { score: score })
            .then(response => {
                console.log('Statistics updated');
            })
            .catch(error => {
                console.error(error);
            });
    }
});