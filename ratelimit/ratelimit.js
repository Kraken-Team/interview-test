function printMessage(message) {
    const dataDiv = document.getElementById("data");
    if (dataDiv) {
        dataDiv.innerText = message;
    } else {
        console.log(message);
    }
}

function rateLimit(func, delay) {
    let lastApiCall = 0;
    return function(...args) {
        const now  = new Date().getTime();
        if (now - lastApiCall >= delay) {
            lastApiCall = now;
            printMessage('Request sent, wait for 2000ms...');
            return func(...args);
        } else {
            const message = `Please wait till ${delay - (now - lastApiCall)} ms before retrying`
            printMessage(message);
        }
    }
}

const getData = rateLimit(() => {
    
}, 2000)

const sendBtn = document.getElementById("btn");
sendBtn.addEventListener("click", () => {
    getData();
})