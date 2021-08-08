let express = require("express");
let app = express();
const MongoClient = require('mongodb').MongoClient;
let projectCollection;

const uri = 'mongodb+srv://sit725-prac4:chasham123@sit725-2021-t2-prac4.czepu.mongodb.net/firstDatabase?retryWrites=true&w=majority';
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


app.get("/test", function (request, response) {
  var user_name = request.query.user_name;
  response.end("Hello " + user_name + "!");
});

var port = process.env.PORT || 3000;

app.listen(port,()=>{
  console.log("Listening on port ", port);
  createCollection("Places")
})

const insertProjects = (project,callback) => {
  projectCollection.insert(project,callback);
}

const getProjects = (callback) => {
  projectCollection.find({}).toArray(callback);
}

app.get('/api/projects', (req,res) => {
  console.log("New Project Added", req.body)
  var newProject = req.body;
  //cardList.push(newProject);
  insertProjects(newProject,(err,result) => {
    if(err){
      res.json({statuscode: 400, message: err})
    }
    else {
      res.json({stauscode: 200, message: "Project successfully added", data: result})
    }
  })
  //res.json({statuscode : 200, message : "Project successfully added", data: newProject})
})