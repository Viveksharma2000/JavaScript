'use strict'

document.getElementById("form").addEventListener('submit', async function joke(event){

    event.preventDefault()

    const query = document.getElementById("query").value.trim()
    const resultscontainer = document.getElementById("results")
    resultscontainer.innerHTML = ""

    try {
        const response = await fetch(`https://api.chucknorris.io/jokes/search?query=${query}`)
        const data = await response.json()

        data.result.forEach(element => {
            const joke = element.value

            const article = document.createElement("article")

            const jokeElement = document.createElement("p")
            jokeElement.textContent = joke
            article.appendChild(jokeElement)

            resultscontainer.appendChild(article)
        });

    } catch(error) {
        console.log(error.message)
    }

})