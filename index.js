const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
require('dotenv').config();


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4bshi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const ItemCollection = client.db('inventoryManage').collection('items');

        app.get("/items", async (req, res) => {
            const items = await ItemCollection.find({}).toArray();
            res.send(items);
        });
        app.get('/items/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const items = await ItemCollection.findOne(query);
            res.send(items)
        })
    }
    finally{
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res)=>{
    res.send('node is running');
});

app.listen(port, ()=>{
    console.log('server is running', port)
});