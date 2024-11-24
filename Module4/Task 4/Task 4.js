'use strict'

document.getElementById("form").addEventListener('submit', async function series(event) {
    event.preventDefault()

    const query = document.getElementById("query").value.trim()
    const results = document.getElementById("result")

    results.innerHTML = ""

    try {
        const response = await fetch (`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`)
        const data = await response.json()

        data.forEach(series => {
            const show = series.show

            const article = document.createElement("article")

            const nameElement = document.createElement("h2");
            nameElement.textContent = show.nameElement
            article.append(nameElement)

            const link = document.createElement("a")
            link.href = show.url
            link.target = "_blank"
            link.textContent = "Link"
            article.appendChild(link)

            if (show.image?.medium) {
                const imageElement = document.createElement("img")
                imageElement.src = show.image.medium
                imageElement.alt = show.name
                article.appendChild(imageElement)
            } else {
                const imageElement = document.createElement("img")
                imageElement.src = "https://via.placeholder.com/210x295?text=Not%20Found"
                imageElement.alt = show.name
                article.appendChild(imageElement)
            }

            if (show.summary) {
                const summaryElement = document.createElement("div")
                summaryElement.innerHTML = show.summary
                article.appendChild(summaryElement)
            }

            results.appendChild(article)

        });
    } catch (error) {
        console.error(error.message)
    }
})