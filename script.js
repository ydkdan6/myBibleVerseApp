const verseElement = document.getElementById('verse');
const verseReferenceElement = document.getElementById('verse-reference');
const dateTodayElement = document.getElementById('dateToday');

function fetchVerse() {
    const apiUrl = 'https://labs.bible.org/api/?passage=random&type=json';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const verseText = data[0].text;
            const verseReference = data[0].bookname + ' ' + data[0].chapter + ':' + data[0].verse;
            verseElement.innerHTML = `<span>"${verseText}"</span>`;
            verseReferenceElement.textContent = verseReference;
        })
        .catch(error => {
            console.error('Error fetching verse:', error);
            verseElement.textContent = 'Error fetching verse. Please try again later.';
        });
}

// Fetch a verse when the page loads
document.addEventListener('DOMContentLoaded', function () {
    fetchVerse();
    displayDate();
});

// Refresh verse every day
setInterval(function () {
    fetchVerse();
    displayDate();
}, 24 * 60 * 60 * 1000); // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds

function displayDate() {
    const currentDate = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    dateTodayElement.textContent = formattedDate;
}

function copyVerse() {
    const verseText = verseElement.textContent;
    const referenceText = verseReferenceElement.textContent;
    const combinedText = `${verseText}\n${referenceText}`;

    navigator.clipboard.writeText(combinedText)
        .then(() => alert('Bible Verse Copied Successfully!'))
        .catch(err => console.error('Error copying verse: ', err));
}