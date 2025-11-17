const apiURL = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';

document.getElementById('joke-button').addEventListener('click', async () => {
    try {
        let response = await fetch(apiURL);
        if (!response.ok) {
            throw new Error('Network Response Not Ok: ' + response.statusText);
        }

        let data = await response.json();

        if (data.type === 'single') {
            document.getElementById('joke-result').innerHTML = `<p>${data.joke}</p>`;
        } else {
            document.getElementById('joke-result').innerHTML = `<p>${data.setup}</p><p>${data.delivery}</p>`;
        }
    } catch (error) {
        console.error('Error fetching joke:', error);
        document.getElementById('joke-result').innerHTML = `<p>Oops! Could not fetch a joke. Try again.</p>`;
    }
});
