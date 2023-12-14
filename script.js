const socket = io();

// Function to create and append a message element to the messages container
function appendMessage(username, content) {
    const messagesContainer = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${username}:</strong> ${content}`;
    messagesContainer.appendChild(messageElement);
    
    // Scroll to the bottom of the messages container
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Function to handle sending a message
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const messageContent = messageInput.value.trim();

    if (messageContent !== '') {
        const username = 'YourUsername'; // Replace with the actual username or fetch it from the user
        const messageData = { username, content: messageContent };

        // Send the message data to the server
        socket.emit('message', messageData);

        // Clear the input field
        messageInput.value = '';
    }
}

// Create and append the button dynamically
const inputContainer = document.getElementById('input-container');

const sendButton = document.createElement('button');
sendButton.textContent = 'Send';
sendButton.addEventListener('click', sendMessage);

const buttonContainer = document.createElement('div');
buttonContainer.appendChild(sendButton);

inputContainer.appendChild(buttonContainer);

// Listen for incoming messages from the server
socket.on('message', (message) => {
    // Display the received message
    appendMessage(message.username, message.content);
});

