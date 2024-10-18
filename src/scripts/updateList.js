let messages;

async function getOriginalMessage() {
    let originalResponse = await fetch("/messages");
    let originalMessages = await originalResponse.json();

    messages = originalMessages;
}

getOriginalMessage();

setInterval(async () => {
    let updatedResponse = await fetch("/messages");

    let updatedMessages = await updatedResponse.json();

    console.log(updatedResponse.status, updatedMessages);
    console.log(messages, updatedMessages);

    if (updatedResponse.status === 200 && messages.length < updatedMessages.length) {
        for (let i = 0; i < updatedMessages.length; i++) {
            console.log(true);
        }

        messages = updatedMessages;
    } else if (updatedResponse.status === 200 && messages.length > updatedMessages.length) {
        location.reload();
    }
}, 4000);
