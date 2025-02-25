const { default: axios } = require("axios");

function nikki() {
    return axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((response) => {
            let a = response.data.slice(0, 5);
            console.log(a);

            // Creating a promise chain to ensure sequential execution
            let promiseChain = Promise.resolve(); // Start with a resolved promise

            for (let i = 1; i < 6; i++) {
                promiseChain = promiseChain.then(() => {
                    return axios.get(`https://jsonplaceholder.typicode.com/posts/${i}`)
                        .then((res) => {
                            console.log('hello');
                            console.log(res.data);  // ✅ This ensures ordered execution
                        });
                });
            }

            return promiseChain; // Ensures all requests finish in sequence
        })
        .catch((error) => {
            console.error("Error fetching posts:", error);
        });
}

// Call the function
nikki().then(() => {
    console.log("All posts fetched in order!");
});
