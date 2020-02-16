const app = require('express')()
const axios = require('axios')

const DEEZER_URL = "https://api.deezer.com";

const PORT = 3000

app.get("/", (req, res) => {
    let query = req.query.search;
    axios.get(`${DEEZER_URL}/search?q=${query}`)
        .then((response) => {
            res.send(response.data);
        })
})
//http://localhost:3000/?search=eminem
// I add more stuff here
// app.get("/", (req, res) => {
//     let query = req.query.search;
//     axios.get(`${DEEZER_URL}/search?q=artist:${query}`)
//         .then((response) => {
//             res.send(response.data);
//         })
// })

app.listen(PORT, () => console.log("Example server listening on", PORT))