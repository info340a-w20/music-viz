const app = require('express')()
const axios = require('axios')
const cors = require('cors')

app.use(cors())

const DEEZER_URL = "https://api.deezer.com";

const PORT = 3000

app.get("/", (req, res) => {
    let query = req.query.search;
    axios.get(`${DEEZER_URL}/search?q=${query}`)
        .then((response) => {
            res.send(response.data);
        });
})

app.listen(PORT, () => console.log("Example server listening on", PORT))