const { MongoClient } = require(['mongodb']);
// Replace the uri string with your connection string.
const uri = "mongodb+srv://yousefmohamed:Axolotl44556677889900@dicewebsite.yihn5.mongodb.net/?retryWrites=true&w=majority&appName=DICEWebsite";
const client = new MongoClient(uri);
async function run() {
    try {
        const database = client.db('DICECLUB');
        const movies = database.collection('User_Information');
        // Query for a movie that has the title 'Back to the Future'
        const query = { UserName: "Ayesha" };
        const movie = await movies.findOne(query);
        console.log(movie);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);
