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

    /*console.log(updatedResponse.status, updatedMessages);
    console.log(messages, updatedMessages);*/

    if (updatedResponse.status === 200 && messages.length < updatedMessages.length) {
        console.log(messages.length, "to", updatedMessages.length - 1);

        //location.reload();

        for (let i = messages.length; i < updatedMessages.length; i++) {
            let newMessage = document.createElement("div");
            newMessage.classList.add("message");

            let date = document.createElement("h4");
            date.classList.add("date-added");
            date.textContent = updatedMessages[i].added;

            let container = document.createElement("div");
            container.classList.add("open-container");

            let user = document.createElement("h2");
            user.classList.add("user");
            user.textContent = updatedMessages[i].username;

            let openMessage = document.createElement("h3");
            let link = document.createElement("a");
            link.href = "/messages/" + updatedMessages[i].id;
            link.textContent = "Open Message";
            openMessage.appendChild(link);

            let messageContent = document.createElement("p");
            messageContent.classList.add("message-text");
            messageContent.textContent = updatedMessages[i].text;

            container.appendChild(user);
            container.appendChild(openMessage);

            newMessage.appendChild(container);
            newMessage.appendChild(messageContent);

            document.querySelector(".message-board").appendChild(newMessage);
        }

        messages = updatedMessages;
    } else if (updatedResponse.status === 200 && messages.length > updatedMessages.length) {
        location.reload();
    }
}, 6000);
