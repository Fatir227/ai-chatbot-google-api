// Enhanced JavaScript for Gemini AI Chatbot
// This script handles the chat functionality with modern features and animations

const chat = document.getElementById('chat');
const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const sendButton = document.querySelector('.send-button');

// Add typing indicator
let isTyping = false;

function scrollToBottom() {
    chat.scrollTop = chat.scrollHeight;
}

function addMessage(content, type, animate = true) {
    const messageDiv = document.createElement('div');
    messageDiv.className = type;
    
    if (animate) {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(20px)';
    }
    
    messageDiv.innerHTML = content;
    chat.appendChild(messageDiv);
    
    if (animate) {
        // Trigger animation
        setTimeout(() => {
            messageDiv.style.transition = 'all 0.3s ease-out';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 10);
    }
    
    scrollToBottom();
    return messageDiv;
}

function showTypingIndicator() {
    if (isTyping) return;
    
    isTyping = true;
    const typingDiv = document.createElement('div');
    typingDiv.className = 'bot typing-indicator';
    typingDiv.innerHTML = `
        <div class="typing-dots">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <span style="margin-left: 10px; font-size: 14px; opacity: 0.7;">Gemini is typing...</span>
    `;
    chat.appendChild(typingDiv);
    scrollToBottom();
    return typingDiv;
}

function hideTypingIndicator(typingDiv) {
    if (typingDiv && typingDiv.parentNode) {
        typingDiv.style.transition = 'all 0.3s ease-out';
        typingDiv.style.opacity = '0';
        typingDiv.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            if (typingDiv.parentNode) {
                typingDiv.parentNode.removeChild(typingDiv);
            }
        }, 300);
    }
    isTyping = false;
}

// Enhanced form submission
form.onsubmit = async (e) => {
    e.preventDefault();
    
    const userMsg = input.value.trim();
    if (!userMsg) return;
    
    // Disable input and button during processing
    input.disabled = true;
    sendButton.disabled = true;
    sendButton.style.opacity = '0.6';
    
    // Add user message
    addMessage(`<b>You:</b> ${userMsg}`, 'user');
    input.value = '';
    
    // Show typing indicator
    const typingDiv = showTypingIndicator();
    
    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMsg })
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        // Hide typing indicator
        hideTypingIndicator(typingDiv);
        
        // Add bot response with slight delay for natural feel
        setTimeout(() => {
            addMessage(`<b>Gemini:</b> ${data.response}`, 'bot');
        }, 300);
        
    } catch (error) {
        console.error('Error:', error);
        hideTypingIndicator(typingDiv);
        
        // Show error message
        setTimeout(() => {
            addMessage(`<b>Gemini:</b> Sorry, I encountered an error. Please try again.`, 'bot error');
        }, 300);
    } finally {
        // Re-enable input and button
        input.disabled = false;
        sendButton.disabled = false;
        sendButton.style.opacity = '1';
        input.focus();
    }
};

// Enhanced input handling
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        form.dispatchEvent(new Event('submit'));
    }
});

// Add input focus effects
input.addEventListener('focus', () => {
    input.parentElement.style.transform = 'scale(1.02)';
});

input.addEventListener('blur', () => {
    input.parentElement.style.transform = 'scale(1)';
});

// Add button hover effects
sendButton.addEventListener('mouseenter', () => {
    sendButton.style.transform = 'translateY(-2px) scale(1.05)';
});

sendButton.addEventListener('mouseleave', () => {
    sendButton.style.transform = 'translateY(0) scale(1)';
});

// Enhanced timestamp function
function updateTimestamp() {
    const now = new Date();
    const options = { 
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    const timestampElement = document.getElementById('current-timestamp');
    if (timestampElement) {
        timestampElement.textContent = now.toLocaleString(undefined, options);
    }
}

// Initialize timestamp and update every second
updateTimestamp();
setInterval(updateTimestamp, 1000);

// Add welcome message when page loads
window.addEventListener('load', () => {
    input.focus();
    
    // Add a subtle entrance animation for the container
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        container.style.transition = 'all 0.8s ease-out';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);
    
    // Add floating animation to shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        shape.style.animationDelay = `${index * 0.5}s`;
    });
});

// Add CSS for typing indicator
const style = document.createElement('style');
style.textContent = `
    .typing-indicator {
        background: linear-gradient(135deg, #f093fb, #f5576c) !important;
        padding: 15px 20px !important;
        display: flex !important;
        align-items: center !important;
        max-width: 120px !important;
    }
    
    .typing-dots {
        display: flex;
        gap: 4px;
    }
    
    .typing-dots span {
        width: 8px;
        height: 8px;
        background: white;
        border-radius: 50%;
        animation: typing 1.4s infinite ease-in-out;
    }
    
    .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
    .typing-dots span:nth-child(2) { animation-delay: -0.16s; }
    
    @keyframes typing {
        0%, 80%, 100% {
            transform: scale(0.8);
            opacity: 0.5;
        }
        40% {
            transform: scale(1);
            opacity: 1;
        }
    }
    
    .error {
        background: linear-gradient(135deg, #ff6b6b, #ee5a24) !important;
        box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3) !important;
    }
    
    .input-wrapper {
        transition: transform 0.3s ease;
    }
    
    .send-button {
        transition: all 0.3s ease !important;
    }
`;
document.head.appendChild(style);