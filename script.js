const canvas = document.getElementById('avatarCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;

// Drawing logic (Keep this part)
canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup', () => { drawing = false; ctx.beginPath(); });
canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
});

// SAVE FUNCTION
function saveProfile() {
    const user = document.getElementById('usernameInput').value;
    const drawingData = canvas.toDataURL();

    localStorage.setItem('myUsername', user);
    localStorage.setItem('myAvatar', drawingData);
    
    alert("Saved! Click 'Reload My Data' to see it.");
    loadProfile(); // Run the load function immediately
}

// LOAD FUNCTION (The "Remember Me" logic)
function loadProfile() {
    const savedName = localStorage.getItem('myUsername');
    const savedAvatar = localStorage.getItem('myAvatar');

    if (savedName) {
        document.getElementById('displayUsername').innerText = "Welcome, " + savedName;
        document.getElementById('usernameInput').value = savedName;
    }

    if (savedAvatar) {
        const displayImg = document.getElementById('savedAvatarImg');
        displayImg.src = savedAvatar;
        displayImg.style.display = "inline-block";
        
        // Also put it back on the canvas
        const img = new Image();
        img.onload = () => ctx.drawImage(img, 0, 0);
        img.src = savedAvatar;
    }
}

// FORGET FUNCTION
function logout() {
    localStorage.clear();
    location.reload(); // Refresh the page
}

// Automatically try to load when the page opens
window.onload = loadProfile;