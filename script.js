const canvas = document.getElementById('avatarCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let friends = []; // This will hold our list of names

// --- DRAWING LOGIC ---
canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup', () => { drawing = false; ctx.beginPath(); });
canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
});

// --- PROFILE LOGIC ---
function saveProfile() {
    const user = document.getElementById('usernameInput').value;
    const drawingData = canvas.toDataURL();
    localStorage.setItem('myUsername', user);
    localStorage.setItem('myAvatar', drawingData);
    loadProfile();
}

function loadProfile() {
    const savedName = localStorage.getItem('myUsername');
    const savedAvatar = localStorage.getItem('myAvatar');
    const savedFriends = localStorage.getItem('myFriends');

    if (savedName) document.getElementById('displayUsername').innerText = savedName;
    if (savedAvatar) {
        const img = document.getElementById('savedAvatarImg');
        img.src = savedAvatar;
        img.style.display = "inline-block";
    }
    
    // Load friends list if it exists
    if (savedFriends) {
        friends = JSON.parse(savedFriends); // Turn the string back into a list
        renderFriends();
    }
}

// --- FRIENDS LOGIC ---
function addFriend() {
    const name = document.getElementById('friendNameInput').value;
    if (name.trim() === "") return;

    friends.push(name); // Add name to our list
    document.getElementById('friendNameInput').value = ""; // Clear input
    
    saveFriends();
    renderFriends();
}

function saveFriends() {
    // We have to turn the list into a string to save it in localStorage
    localStorage.setItem('myFriends', JSON.stringify(friends));
}

function renderFriends() {
    const container = document.getElementById('friendListContainer');
    container.innerHTML = ""; // Clear current list so we don't double up

    friends.forEach((friend, index) => {
        const li = document.createElement('li');
        li.className = "friend-item";
        li.innerHTML = `<span>${friend}</span> <button style="background:red; padding:2px 8px;" onclick="removeFriend(${index})">X</button>`;
        container.appendChild(li);
    });
}

function removeFriend(index) {
    friends.splice(index, 1); // Remove from list
    saveFriends();
    renderFriends();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Start everything
window.onload = loadProfile;