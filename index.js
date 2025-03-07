const express = require('express')
const app = express()
const port = process.env.PORT ||5000;
const cors = require('cors')



//middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World! ujjwal pandey ')
})



//mongodb password

//bw7Mv8DK2iSca7tn 

// mongodb configuration
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://mern-book-store:bw7Mv8DK2iSca7tn@cluster0.mqxe7uu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //create a collection of document

    const bookcollections = client.db("BookInventory").collection("books");

    //insert a book to the db : post method 
    app.post("/upload-book",async(req, res) => {
      const data = req.body;
      const result = await bookcollections.insertOne(data);
      res.send(result);

    })
    //get wall book from database
    app.get("/all-books", async(req, res) => {
      const books =  bookcollections.find();
      const result =  await books.toArray();
      res.send(result);

    })
    //update the book data 
    app.patch("/book/:id", async(req,res) =>{
      const id = req.params.id;

      const updateBookdata = req.body;
      const filter = {_id: new ObjectId(id)};
      const options = {upsert: true};

      const updateDoc = {
        $set:{ 
          ...updateBookdata
        }
      }
//update

const result = await bookcollections.updateOne(filter,updateDoc,options);
res.send(result);

    })
//delete the book
app.delete("/book/:id",async(req,res) =>{
  const id = req.params.id;
  const filter = {_id: new ObjectId(id)};
  const result = await bookcollections.deleteOne(filter);
  res.send(result);
})

//find my catagory
app.get("/all-books",async(req,res)=>{
  let query = {};
  if(req.query?.catagory){
    query = {catagory:req.query.catagory}
  }
  const result = await bookcollections.find(query).toArray();
  res.send(result);
})
//to get the single book 
app.get("/book/:id", async(req, res) =>{
const id=req.params.id;
const filter = {_id: new ObjectId(id)};
const result = await bookcollections.findOne(filter);
res.send(result);
})

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})