// inject toast html into body

const toastHTML = `
<div class="toast" id="toast" style="display: none; background-color: red; color: white; padding: 12px; z-index: 999;">
        <h3 id="toast-heading">
            toast message here
        </h3>
        <p id="toast-message">toast message</p>
        <button id="close-toast">close</button>
    </div>
`;

const toastBody = document.getElementById("toast");
if (!toastBody) {
    const body = document.body;
    document.body.innerHTML = toastHTML + body.innerHTML
}

const toastTypes = {
    success: {
        backgroundColor: "green",
        color: "white",
        padding: "12px",
        title: "Success"
    },
    warning: {
        backgroundColor: "yellow",
        color: "black",
        padding: "12px",
        title: "Warning"
    },
    error: {
        backgroundColor: "red",
        color: "white",
        padding: "12px",
        title: "Error"
    }
};

const dataToastBtn = document.getElementsByClassName("toast-btn");

if (dataToastBtn.length > 0) {
    for (const toastBtn of dataToastBtn) {
        toastBtn.addEventListener("click", (e) => {
            const isToastBtn = e?.target?.hasAttribute("data-toast-type");
            if (!isToastBtn) {
                return;
            }
            const toastType = e?.target?.getAttribute("data-toast-type");
            const toastStyles = toastTypes[toastType] || toastTypes.warning;
        
            const toast = document.getElementById("toast");
            toast.style.display = "block";
            toast.style.backgroundColor = toastStyles.backgroundColor;
            toast.style.color = toastStyles.color;
            toast.style.padding = toastStyles.padding;
            const toastHeading = document.getElementById("toast-heading");
            if (toastHeading) {
                toastHeading.innerText = toastStyles.title;
            }
        });
    }
} else {
    console.warn('unable to find the toast button');
}

const toastCloseBtn = document.getElementById("close-toast");

if (toastCloseBtn) {
    toastCloseBtn.addEventListener("click", (e) => {
        const toast = document.getElementById("toast");
        toast.style.display = "none";
    })
}