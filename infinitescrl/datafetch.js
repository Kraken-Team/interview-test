const url = "/infinitescrl/data.json";
let isFetching = false;

const getRandomData = async (page = 0, limit = 10) => {
    try {
        const response = await fetch(url);
        const parsed = await response.json();
        const start = page * limit;
        const end = start + limit;
        const initalLoad = parsed.slice(start, end);
        return {
            data: initalLoad,
            page: page,
            limit: limit,
            total: parsed.length,
            totalPages: Math.ceil(parsed.length / limit),
            hasNextPage: page + 1 < Math.ceil(parsed.length / limit),
            hasPrevPage: page > 0,
            nextPage: page + 1,
            prevPage: page - 1,
            lastPage: Math.ceil(parsed.length / limit),
        };
    } catch (error) {
        console.log('error while fetching data', error);
        return {};
    }
}

const addDataToPage = (apiResponse) => {
    const dataContainer = document.getElementById("data");
    if (!dataContainer) {
        console.log('no data container found, please try again');
        return;
    }
    if (!apiResponse.data) {
        console.log('no data found, please try again');
        return;
    }
    for (const d of apiResponse.data) {
        const div = document.createElement("div");
        div.innerHTML = `
        <h2> Title: ${d.title} </h2>
        <p> State: ${d.state} </p>
        <a href="${d.url}">more</a>
        <p>Lccn: ${d.lccn} </p>
        `;
        dataContainer.appendChild(div);
    }
    const heading = document.getElementById("title");
    heading.setAttribute("data-total", apiResponse.total);
    heading.setAttribute("data-total-pages", apiResponse.totalPages);
    heading.setAttribute("data-has-next-page", apiResponse.hasNextPage);
    heading.setAttribute('data-next-page', apiResponse.nextPage);
    heading.setAttribute('data-prev-page', apiResponse.prevPage);
    heading.setAttribute('data-limit', apiResponse.limit);
}

getRandomData().then((data) => {
    addDataToPage(data);
});

window.onscroll = function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !isFetching) {
        isFetching = true;
        const page = parseInt(document.getElementById("title").getAttribute("data-next-page")) || 0;
        const limit = parseInt(document.getElementById("title").getAttribute("data-limit")) || 10;
        getRandomData(page, limit).then((d) => {
            addDataToPage(d);
            isFetching = false;
        });
    }
};
