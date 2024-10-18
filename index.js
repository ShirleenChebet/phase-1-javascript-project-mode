
// Initialize Google Map
window.initMap = function () {
    // Fetch user's location from GeoJS API
    fetch('https://get.geojs.io/v1/ip/geo.json')
        .then(response => response.json())
        .then(data => {
            const { latitude, longitude } = data;

            // Initialize the map using the fetched coordinates
            const map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: parseFloat(latitude), lng: parseFloat(longitude) }, // User's coordinates
                zoom: 12
            });

            const request = {
                location: { lat: parseFloat(latitude), lng: parseFloat(longitude) },
                radius: '5000', // 5 kilometers
                query: 'sexual health clinic'
            };

            const service = new google.maps.places.PlacesService(map);
            service.textSearch(request, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (let i = 0; i < results.length; i++) {
                        createMarker(results[i]);
                    }
                    map.setCenter(results[0].geometry.location);
                }
            });

            function createMarker(place) {
                const marker = new google.maps.Marker({
                    map: map,
                    position: place.geometry.location
                });

                const infowindow = new google.maps.InfoWindow();
                marker.addListener('click', () => {
                    infowindow.setContent(`
                                <div>
                                    <strong>${place.name}</strong><br>
                                    ${place.formatted_address}<br>
                                    ${place.formatted_phone_number || 'N/A'}
                                </div>
                            `);
                    infowindow.open(map, marker);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching location:', error);
            // Handle errors, e.g., use default coordinates
            const defaultLat = -1.286389; // Nairobi
            const defaultLng = 36.817223; // Nairobi

            const map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: defaultLat, lng: defaultLng },
                zoom: 12
            });
        });
};

// User Authentication
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const welcomeMsg = document.getElementById('welcomeMsg');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = usernameInput.value;
        localStorage.setItem('username', username);
        displayWelcomeMessage();
        loginForm.style.display = 'none';
    });

    function displayWelcomeMessage() {
        const username = localStorage.getItem('username');
        if (username) {
            welcomeMsg.innerText = `Welcome, ${username}!`;
        }
    }

    displayWelcomeMessage();

    // Load articles
    fetch('http://localhost:3001/articles')
        .then(response => response.json())
        .then(data => {
            const articlesContainer = document.getElementById('articles');
            data.forEach(article => {
                const articleDiv = document.createElement('div');
                articleDiv.className = 'article';
                articleDiv.innerHTML = `
                            <h3>${article.title}</h3>
                            <p>${article.content}</p>
                        `;
                articlesContainer.appendChild(articleDiv);
            });
        });

    // Handle Q&A form submission
    const qaForm = document.getElementById('qaForm');
    qaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const question = document.getElementById('question').value;

        fetch('http://localhost:3001/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question })
        })
            .then(response => response.json())
            .then(data => {
                const qaContainer = document.getElementById('qaList');
                const questionDiv = document.createElement('div');
                questionDiv.innerHTML = `
                        <h3>Q: ${data.question}</h3>
                        <p>A: ${data.answer}</p>
                    `;
                qaContainer.appendChild(questionDiv);
            });
    });

    // Load existing Q&A
    fetch('http://localhost:3001/questions')
        .then(response => response.json())
        .then(data => {
            const qaContainer = document.getElementById('qaList');
            data.forEach(item => {
                const questionDiv = document.createElement('div');
                questionDiv.innerHTML = `
                            <h3>Q: ${item.question}</h3>
                            <p>A: ${item.answer}</p>
                        `;
                qaContainer.appendChild(questionDiv);
            });
        });

    // Symptom Checker logic
    const symptomCheckerForm = document.getElementById('symptomCheckerForm');
    symptomCheckerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const symptoms = document.getElementById('symptoms').value;
        let advice = '';

        if (symptoms.includes('pain') || symptoms.includes('discharge') || symptoms.includes('blood')) {
            advice = 'You should consult a doctor.';
        } else if (symptoms.includes('rash') || symptoms.includes('itching')) {
            advice = 'There\'s no cause for alarm, but you might need to be cautious.';
        } else {
            advice = 'Your symptoms do not seem serious, but if they persist, please see a healthcare provider.';
        }

        document.getElementById('symptomAdvice').innerText = advice;
    });

    // Feedback Handling
    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackText = document.getElementById('feedbackText');
    const feedbackList = document.getElementById('feedbackList');

    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const feedback = feedbackText.value;
        const username = localStorage.getItem('username');
        const feedbackItem = {
            username: username || 'Anonymous',
            feedback: feedback,
            timestamp: new Date().toISOString()
        };
        addFeedback(feedbackItem);
        displayFeedback(feedbackItem);
    });

    function addFeedback(feedbackItem) {
        let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
        feedbacks.push(feedbackItem);
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    }

    function displayFeedback(feedbackItem) {
        const feedbackDiv = document.createElement('div');
        feedbackDiv.innerHTML = `
                    <strong>${feedbackItem.username}</strong> (${new Date(feedbackItem.timestamp).toLocaleString()}):
                    <p>${feedbackItem.feedback}</p>
                `;
        feedbackList.appendChild(feedbackDiv);
    }

    function loadFeedback() {
        const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
        feedbacks.forEach(feedbackItem => displayFeedback(feedbackItem));
    }

    loadFeedback();
});
