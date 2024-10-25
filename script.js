var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}

const chatBtn = document.getElementById('chat-btn');
const chatContainer = document.getElementById('chat-container');
const closeBtn = document.getElementById('close-btn');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const chatMessages = document.getElementById('chat-messages');

// Function to toggle chat container visibility
chatBtn.addEventListener('click', () => {
    chatContainer.style.display = 'block';
    loadMessages(); // Load messages when chat opens
});

// Function to close the chat container
closeBtn.addEventListener('click', () => {
    chatContainer.style.display = 'none';
});

// Function to send a message
sendBtn.addEventListener('click', () => {
    const message = chatInput.value;
    if (message.trim() !== '') {
        saveMessage(message); // Save the message
        chatInput.value = ''; // Clear the input
    }
});

// Function to save messages to local storage
function saveMessage(message) {
    let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    messages.push(message);
    localStorage.setItem('chatMessages', JSON.stringify(messages));
    displayMessages(); // Refresh displayed messages
}

// Function to load messages from local storage
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    messages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.textContent = msg;
        chatMessages.appendChild(messageElement);
    });
}

// Function to display messages in the chat box
function displayMessages() {
    chatMessages.innerHTML = ''; // Clear the chat box
    loadMessages(); // Reload messages from local storage
}

// Hide chat container when clicking outside
document.addEventListener('click', (event) => {
    if (!chatContainer.contains(event.target) && event.target !== chatBtn) {
        chatContainer.style.display = 'none';
    }
});
// Send message when "Enter" key is pressed
chatInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendBtn.click(); // Trigger send button click
    }
});

// Function to load messages from local storage
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    chatMessages.innerHTML = ''; // Clear previous messages
    messages.forEach(msg => {
        displayMessage(msg); // Display each message
    });
}

// Function to display messages in the chat box
function displayMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    chatMessages.appendChild(messageDiv);
}

// Function to clear messages
function clearMessages() {
    const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    if (messages.length === 0) {
        alert("Cannot clear chat. No messages loaded.");
    } else {
        // Clear messages from local storage and the chat display
        localStorage.removeItem('chatMessages'); // Optionally, clear local storage
        chatMessages.innerHTML = ''; // Clear displayed messages
        alert("Chat has been cleared.");
    }
}

// Event listener for the clear button
document.getElementById('clear-btn').addEventListener('click', clearMessages);
