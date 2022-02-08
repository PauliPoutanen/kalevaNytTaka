const express = require('express')
const app = express()

app.use(express.json())

const requestLog = (request, response, next) => {
  console.log ('Metodi: ', request.method)
console.log ('Polku:', request.path)
console.log('Body:', request.body)
console.log('---')
next()
  
}
app.use(requestLog)



let tviits = [
    {
      
      "content": "Tämä on testiviesti tietokannasta",
      "date": "Sun Feb 06 2022",
      "hours": 13,
      "minutes": 18,
      "important": true,
      "id": 1
    },
    {
      "content": "Tämä on varsinainen viesti.",
      "date": "Sun Feb 06 2022",
      "hours": 13,
      "minutes": 18,
      "important": true,
      "id": 2
    }
  ]

app.get('/', (req, res) => {
    res.send('<h2>Terve TakaLauta-Serveri</h2>')
})

app.get('/api/tviits', (req, res) =>{
    res.json(tviits)
})

app.get('/api/tviits/:id', (request, response)=>{
  const id = Number(request.params.id)
  const tviit = tviits.find(tviit => tviit.id === id)
  if (tviit){
    response.json(tviit)
  }else{
    response.status(404).end()
  }
})

const generateId = () => {
  const maxId = tviits.length > 0
  ?Math.max(...tviits.map(n => n.id)) 
  : 0
  return 
  maxId + 1
}

app.post('/api/tviits', (request, response) => {
  const body = request.body
  if (!body.viesti) {
    return response.status(400).json({
      error : 'Ei tekstiä - kirjoita teksti!'
    })
  }
  const viserre = {
    viesti : body.viesti,
    important : body.important,
    date: new Date(),
    id: generateId(),
  }
  tviits = tviits.concat(viserre)
  response.json(viserre)
})


const PORT = 3001
app.listen(PORT, () => {
console.log(`Takalauta käynnistyi portissa ${PORT}`)})