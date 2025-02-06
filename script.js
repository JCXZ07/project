const messages = [
    "Sure ka?",
    "Ehhhh",
    "Mali ka ata ng pinindot",
    "Ehh bilhan kita melkti",
    "<--Yes For Samgyup!!",
    "GALIT MO KO!!",
    "Joke lang yes ka na hehe",
    "Date tayo kahit saan mo gusto!!!",
    "Ok fine, I will stop asking...",
    "Just kidding, say yes please! ❤️"
];

let messageIndex = 0;

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.5}px`;
}

function handleYesClick() {
    window.location.href = "yes_page.html";
}
