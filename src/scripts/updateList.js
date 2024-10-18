setInterval(async () => {
    let updatedResponse = await fetch("/messages");

    let updatedMessages = await updatedResponse.json();

    console.log(updatedResponse.status, updatedMessages);

    if (updatedResponse.status === 200) {
        for (let i = 0; i < updatedMessages.length; i++) {
            
        }
    }
}, 4000);
