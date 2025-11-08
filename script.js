// DOM elements
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");

// Message history for context
let messages = [
  {
    role: "system",
    content:
      "You are a helpful assistant for L'Oréal. Only answer questions about L'Oréal products and beauty routines. If asked about anything else, politely refuse. Always use context from previous messages.",
  },
  {
    role: "assistant",
    content: "👋 Hello! Ask me anything about L'Oréal products or routines.",
  },
];

// Render all messages
function renderMessages() {
  chatWindow.innerHTML = "";
  messages.forEach((msg) => {
    if (msg.role === "user") {
      chatWindow.innerHTML += `<div class="msg user">${msg.content}</div>`;
    } else if (msg.role === "assistant") {
      chatWindow.innerHTML += `<div class="msg ai">${msg.content}</div>`;
    }
  });
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Initial render
renderMessages();

// Handle form submit
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const input = userInput.value.trim();
  if (!input) return;

  // Add user message
  messages.push({ role: "user", content: input });
  renderMessages();
  userInput.value = "";

  // Show loading message
  chatWindow.innerHTML += `<div class="msg ai">...</div>`;
  chatWindow.scrollTop = chatWindow.scrollHeight;

  // Next: send messages to Cloudflare Worker and display response
});
