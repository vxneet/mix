document.addEventListener("scroll", function() {
  const interactiveSection = document.getElementById("interactiveSection");
  if (window.scrollY > 100) {  // Adjust this value as per your need
    document.body.classList.add('scrolled');
  }
});

// Your existing face detection script would go here

const video = document.getElementById('videoElement');
const messageDiv = document.getElementById('message');
const refreshButton = document.getElementById('refreshButton');

let compliments = [
"You're really glowing",
"I guess you're the friend everyone needs",
"You seem like a kind person",
"You have a great smile!",
"You look like you have an effortless way of making others feel at ease.",
"Your energy seems infectious"
];

let insults = [
"I’m not saying you’re annoying, but you’re definitely a solid argument for birth control.",
  "I bet you bring everyone so much joy... when you leave the room.",
  "You’re like a software update—whenever I see you, I think, ‘Not now.’",
  "If ignorance is bliss, you must be the happiest person on the planet.",
  "You're proof that even evolution makes mistakes.",
  "I’d explain it to you, but I don’t have any crayons.",
  "You’re like a cloud. When you disappear, it’s a beautiful day.",
  "You’re the reason God created the middle finger.",
  "If I wanted to hear from an idiot, I’d just read your social media posts.",
  "You’re living proof that even evolution can take a wrong turn.",
  "You have the perfect face for radio.",
  "Two wrongs don't make a right, take your parents as an example.",
  "You look like you're about as useful as a knitted condom.",
  "You're so full of shit, the toilet is jealous.",
  "If my dog had a face like yours I'd shave its ass and make it walk backwards.",
  "You look like something I drew with my left hand.",
  "If laughter is the best medicine, your face must be curing the world.",
  "I would love to insult you... but that would be beyond the level of your intelligence.",
  "I dont have the energy to pretend to like you today.",
  "You look like a mentally challenged broccoli.",
  "Your face makes onion cry.",
  "The trash gets picked up tomorrow. Be ready",
  "What are you a model for? Depression?",
  "If my dick was a human, it would look like you",
  "Ah, so you're the reason we have warning labels on everything.",
  "Your face makes blind kids cry",
  "I envy people who haven't met you.",
  "I had zero expectations and you still let me down."
];

let messageCooldown = false;  // Cooldown to prevent multiple messages
const cooldownDuration = 1000000;  // 10 seconds cooldown
let model;

// Load face detection model
blazeface.load().then(loadedModel => {
  model = loadedModel;
  detectFace();  // Start face detection
});

// Get the webcam stream
navigator.mediaDevices.getUserMedia({ video: true })
.then(stream => {
  video.srcObject = stream;
})
.catch(err => {
  console.log("Error accessing webcam: " + err);
});

// Function to display a random compliment or insult
function displayMessage(isFaceDetected) {
if (!isFaceDetected || messageCooldown) return;

const isCompliment = Math.random() > 0.5;
const list = isCompliment ? compliments : insults;
const randomMessage = list[Math.floor(Math.random() * list.length)];

// Display the message
messageDiv.textContent = randomMessage;
messageDiv.style.opacity = 1;

// Activate cooldown
messageCooldown = true;

// Clear the message after the cooldown duration
setTimeout(() => {
  messageDiv.style.opacity = 0;
  messageCooldown = false;
  console.log("Ready to detect again.");
}, cooldownDuration);
}

// Face detection logic
function detectFace() {
model.estimateFaces(video).then(predictions => {
  if (predictions.length > 0) {
    console.log("Face detected!");
    displayMessage(true);  // Show message when face is detected
  } else {
    console.log("No face detected.");
  }

  // Continue to check for a new face detection (refresh)
  setTimeout(detectFace, 1000);  // Check every second for a new face
});
}

// Add event listener to the refresh button
refreshButton.addEventListener('click', () => {
console.log("Refresh button clicked, resetting detection.");
messageCooldown = false;  // Reset cooldown so a new face can be detected
messageDiv.textContent = '';  // Clear the current message immediately
});

// Start face detection (initial call happens after model is loaded)
