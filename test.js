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
            discoveryDocs: ['https://photoslibrary.googleapis.com/$discovery/rest?version=v1']
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

// Display albums in a grid
function displayAlbums(albums) {
    const grid = document.getElementById('album-grid');
    grid.innerHTML = ''; // Clear existing content

    albums.forEach((album) => {
        const albumDiv = document.createElement('div');
        albumDiv.className = 'album';
        albumDiv.style.border = '1px solid #ccc';
        albumDiv.style.padding = '10px';
        albumDiv.style.textAlign = 'center';
        albumDiv.innerHTML = `
            <img src="${album.coverPhotoBaseUrl}" alt="${album.title}" style="width: 100%; height: auto; border-radius: 8px;">
            <p>${album.title}</p>
        `;
        grid.appendChild(albumDiv);
    });
}

