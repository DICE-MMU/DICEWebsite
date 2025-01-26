const CLIENT_ID = '860524360235-c8nhuhlr0r4bugnp1qgdng43qmgknsdq.apps.googleusercontent.com';
let tokenClient;

// Initialize Google API on page load
window.onload = function () {
    console.log("Page loaded. Initializing Google API...");
    initGoogleAPI();
};

// Initialize Google API and authentication
function initGoogleAPI() {
    // Load the Google API library
    gapi.load('client', async () => {
        console.log("Google API client loaded.");
        await gapi.client.init({
            apiKey: 'AIzaSyAsyE0TfEqZ-zK6JrKr4YAk7ZU4nmB8z90', // Replace with your API key
            discoveryDocs: ['https://photoslibrary.googleapis.com/$discovery/rest?version=v1'],
        });
        console.log("Google API client initialized.");
        initAuthClient();
    });
}

// Initialize the authentication client
function initAuthClient() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: 'https://www.googleapis.com/auth/photoslibrary.readonly',
        callback: (response) => {
            console.log('Access Token:', response.access_token);
            fetchAlbums(response.access_token);
        },
    });

    // Automatically request an access token
    handleAuthClick();
}

// Trigger the authentication flow
function handleAuthClick() {
    if (tokenClient) {
        console.log("Requesting access token...");
        tokenClient.requestAccessToken();
    } else {
        console.error("Token client not initialized.");
    }
}

// Fetch albums from Google Photos API
async function fetchAlbums(accessToken) {
    console.log("Fetching albums...");
    try {
        const response = await gapi.client.photoslibrary.albums.list();
        console.log("Albums fetched:", response);
        displayAlbums(response.result.albums || []);
    } catch (error) {
        console.error("Error fetching albums:", error);
    }
}

// Fetch photos from an album
async function fetchPhotosFromAlbum(albumId) {
    console.log(`Fetching photos for album ID: ${albumId}`);
    try {
        const response = await gapi.client.photoslibrary.mediaItems.search({
            resource: { albumId },
        });
        console.log("Photos fetched:", response);
        displayPhotos(response.result.mediaItems || []);
    } catch (error) {
        console.error("Error fetching photos:", error);
    }
}

// Display albums in a grid
function displayAlbums(albums) {
    const grid = document.getElementById('album-grid');
    grid.innerHTML = ''; // Clear existing content

    albums.forEach((album) => {
        const albumDiv = document.createElement('button');
        albumDiv.className = 'album';
        albumDiv.style.border = '1px solid #ccc';
        albumDiv.style.padding = '10px';
        albumDiv.style.textAlign = 'center';
        albumDiv.style.cursor = 'pointer'; // Make it look like a button
        albumDiv.innerHTML = `
            <img src="${album.coverPhotoBaseUrl}" alt="${album.title}" style="width: 100%; height: auto; border-radius: 8px;">
            <p>${album.title}</p>
        `;

        // Add a click event listener to fetch and display photos
        albumDiv.addEventListener('click', () => {
            console.log(`Album clicked: ${album.title}`);
            fetchPhotosFromAlbum(album.id);
        });

        grid.appendChild(albumDiv);
    });
}

// Display photos of a selected album
function displayPhotos(photos) {
    const grid = document.getElementById('album-grid');
    grid.innerHTML = ''; // Clear existing content

    // Add a back button to return to the album grid
    const backButton = document.createElement('button');
    backButton.textContent = 'Back to Albums';
    backButton.style.marginBottom = '20px';
    backButton.style.padding = '10px 20px';
    backButton.style.cursor = 'pointer';
    backButton.addEventListener('click', () => {
        console.log("Returning to albums...");
        handleAuthClick(); // Re-fetch albums
    });
    grid.appendChild(backButton);

    // Display all photos in the album
    photos.forEach((photo) => {
        const photoDiv = document.createElement('div');
        photoDiv.style.marginBottom = '10px';
        photoDiv.innerHTML = `
            <img src="${photo.baseUrl}" alt="Photo" style="width: 100%; max-width: 300px; height: auto; border-radius: 8px;">
        `;
        grid.appendChild(photoDiv);
    });
}
