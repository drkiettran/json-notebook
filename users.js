
/**
 * Working with MongoDB database.
 */

var dbName = 'mydb'
var dbHost = 'localhost'
var dbPort = '27017'
var MongoClient = require('mongodb').MongoClient;
mongodb_url = 'mongodb://' + dbHost + ':' + dbPort + '/' + dbName
console.log(mongodb_url)
MongoClient.connect(mongodb_url,
                    {useNewUrlParser: true, useUnifiedTopology: true}, 
                    function(err, dbConn) {    
    if(err) { 
        return console.dir(err); 
    }

    // console.log('connected ...', db)
    db = dbConn.db('mydb') // need to do this since version 2.x?

    if (err) throw err;
    // db pointing to newdb
    console.log(`** Switched to '${db.databaseName}' database`);
    // db.collection('users').drop()
    users = db.collection('users')
    users.drop(function (err, result) {
        createData(users)
        console.log('** users collection is dropped')
    })
});

console.log("i am outside!")

/**
 * Delete all element
 * @param users 
 */
function deleteData(users) {
    var name = 'Roshan'
    users.deleteOne({name: name})
    console.log(`** user ${name} is deleted`)
}

function updateData(users) {
    var name = 'Udat'
    var age = '99'
    users.updateOne({name: name}, {$set:{name: name, age: age}}, function(err, result) {
        console.log(`** ${name} age is updated`)
        readData(users)
    })
}
/**
 * 
 * @param users - database connection
 */
function createData(users) {
    // document to be inserted
    var doc = { name: "Roshan", age: "22" };
        
    // insert document to 'users' collection using insertOne
    users.insertOne(doc, function(err, result) {

        console.log('** Document inserted:\n', doc)

        var docs = [{ name: "Udat", age: "21" },
                    { name: "Karthik", age: "24" },
                    { name: "Anil", age: "23" }]

        // insert multiple documents to 'users' collection using insertOne
        // db.collection("users").insertMany(docs, function(err, res) {
        //     if (err) throw err
        //     console.log(res.insertedCount+" documents inserted")
        // });
        users.insertMany(docs, function(err, result) {
            console.log('** Documents inserted:\n',docs)
            updateData(users)
        })
    })

}

/**
 * Reading data
 * @param {*} users 
 */
function readData(users) {
    var item = users.findOne({name: 'Udat'}, function(err, item) {
        console.log('** Documents read:\n', item)
        deleteData(users)
    })
}

// process.exit()