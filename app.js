const express = require('express')
const path = require('path')

const app = express()

app.use(express.static('public'))

app.use('/', (req,res) => {
    res.sendFile(__dirname+"/index.html")
})

app.listen(3000)
