/// DATABASE Connections
//database connection

const MongoClient = require('mongodb').MongoClient;
let projectCollection;

const uri = 'mongodb+srv://sit725-prac4:chasham123@sit725-2021-t2-prac4.czepu.mongodb.net/sit725-prac4?retryWrites=true&w=majority';
const client = new MongoClient(uri, {useNewUrlParser : true});

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

const createCollection = (collectionName) => {
  client.connect((err,db) => {
    projectCollection = client.db().collection(collectionName);
    if (!err) {
      console.log('Mongodb Connected')
    }
    else {
    console.log("DB error", err);
    process.exit(1);
  }
} )
}

exports.mongoClient = mongoClient;