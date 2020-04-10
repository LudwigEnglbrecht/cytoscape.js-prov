//MongoDb Connection
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const connectionString = 'mongodb://localhost:27017';

//Verbindung zur MongoDB herstellen
function connectToMongoDb(){
  MongoClient.connect(connectionString, (err, client) => {
    if (err) {
      console.log('Failed to connect.', err.message);
      process.exit(1);
    }
    const database = client.db('Import');
    const collection = database.collection('mqtt');
    console.log('Connected to DB: '+ database.databaseName + ', in Collection: '+ collection.collectionName);

    // Provenance Daten aus Datenbank laden
    entries = collection.find({});

    // Provenance Daten ausgeben
    entries.each((err,data)=>{
      if(err) return cb(err);
      if(data == null){
        client.close();
        process.exit(1);
      }
      console.log(JSON.stringify(data));
    });

})}

connectToMongoDb();
