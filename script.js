const moodInput = document.getElementById('moodInput');
const submitButton = document.getElementById('submitButton');
const moodList = document.getElementById('moodList');

// method to GET the moods.db and display them onto the page
function fetchMoods(){
    fetch('api.php')
    .then(response => response.json())
    .then(moods => {
        moodList.innerHTML = "";
        moods.forEach(mood => {
            const li = document.createElement('li');
            const date = new Date(mood.timestamp * 1000);
            li.textContent = `${mood.mood} - ${date.toLocaleString()}`;
            moodList.appendChild(li);
        });
    });
};

// add even listener when button is clicked a POST request is made to add new mood onto db
submitButton.addEventListener('click', () => {
    const mood = moodInput.value;
    fetch('api.php', {
        method: 'POST',
        headers: {
            'Content-type' : 'application/x-www-form-urlencoded',
        },
        body: `mood=${encodeURIComponent(mood)}`,
    }).then(() => {
        moodInput.value = '';
        fetchMoods();
    });
})