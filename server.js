const express=require('express');
const cors = require('cors');
const mongoose=require('mongoose');
const ShortUrl=require('./models/shortUrl')
const app=express();

app.use(cors());
app.use(express.json());
app. set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))


require('dotenv').config({path: __dirname + '/.env'})
const uri = process.env.ATLAS_URI;
// console.log(uri)
const port=process.env.PORT||5000;
mongoose.connect(uri, { });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})




// function isConnected(client) {
//     return !!client && !!client.topology && client.topology.isConnected()
//   }


  app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find();
    res.render('index',{data:shortUrls});
  })

  app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl })
  
    res.redirect('/')
  })

  app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)
  
    shortUrl.clicks++
    shortUrl.save()
  
    res.redirect(shortUrl.full)
  })
  
  app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)
  
    shortUrl.clicks++
    shortUrl.save()
  
    res.redirect(shortUrl.full)
  })

  app.get('/:short/del', async (req, res) => {
    const shortUrl = await ShortUrl.findOneAndDelete({ short: req.params.short })
    if (shortUrl == null) return res.sendStatus(404)
    res.redirect('/')
  })

app.listen(port,()=>{
    console.log("app is listening on port "+port)
})