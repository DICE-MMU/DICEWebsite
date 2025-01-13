let CurrentVisible ="Sign";
const { MongoClient } = require('mongodb');
const URLConnect = "mongodb+srv://yousefmohamed:Axolotl#44556677889900@dicewebsite.yihn5.mongodb.net/?retryWrites=true&w=majority&appName=DICEWebsite";
const client = new MongoClient(URLConnect);

function VisiblityManager(element){
    var NewElement = document.getElementById(element)
    var currentElement =document.getElementById(CurrentVisible)
    if(element != CurrentVisible){
        currentElement.style.display ="none";
        NewElement.style.display ="flex";
        CurrentVisible = element;
    }
}
async function TestConnection(){
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("DICEWebsite");
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
}
