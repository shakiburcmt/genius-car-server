const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());


// mongodb setup
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.i7ulodc.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const serviceCollection = client.db('geniusCar').collection('services');

        // read all data
        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            // for using data in client side need to convert toArray
            const services = await cursor.toArray();
            res.send(services);
        });

        // read single data
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service);
        })
    }
    finally {
        
    }
}

run().catch(err=>console.error(err))


app.get('/', (req, res) => {
    res.send('Genius Car Server')
})

app.listen(port, () => {
    console.log(`${port} is for Genius Car`);
})