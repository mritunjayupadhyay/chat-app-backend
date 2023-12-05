const express = require('express')
const app = express()

app.get('/', (request, response) => {
    response.send('Hi there from express!')
})

app.listen(8000, () => {
    console.log('Listen on the port 3000...')
})
