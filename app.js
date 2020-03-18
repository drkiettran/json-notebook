/**
 * NodeJS Application
 */


/**
 * Example 1: Simple hello world.
 */
var msg = 'Hello world!'

console.log('## example 1:')
console.log(' msg:', msg)

/**
 * Example 2: Displaying object
 */
var person = {
    firstname: "John",
    lastname: "Doe",
    age:50, 
    eyeColor: 'blue',
    getFullName: function() {
        return this.firstname + ' ' + this.lastname;
    }
}

console.log('\n## example 2: making json')
console.log(' person:', person)
console.log(' full-name:', person.getFullName())
console.log(" person.json:");
console.log(JSON.stringify(person, null, 2));

console.log('\n## example 3: another json')
var cars = ["Saab", "Volvo", "BMW"]
console.log("\tcars:")
console.log(JSON.stringify(cars, null, 2))

/**
 * Example 4: displaying object
 */
console.log('\n## example 4: javascript object')
var school = { 
    name: 'Vivekananda School', 
    location : 'Delhi', 
    established : 1971, 
    displayInfo : function(){ 
        console.log(`${school.name} was established  
              in ${school.established} at ${school.location}`)
    }
};

console.log('\n## example 5: school info:');
console.log(JSON.stringify(school, null, 2));
school.displayInfo()

/**
 * Define object as Object
 */
var author = new Object();
author.name = "Ben";
author.age = 36;
author.pets = [{ 
        name : "Waverly" , 
        age : 3.5 
    },
    { 
        name : "Westley" , 
        age : 4 
    }
];

console.log('author object:')
console.log(JSON.stringify(author, null, 2))

/**
 * Example 6 define object as {}
 */
console.log('\n## example 6: Another way defining object');
var book={};
book.title = "Beginning JSON"
book.publishDate= new Date("Jan 1 2015");
book.publisher= "Apress";
book.topic="JSON Data Interchange Format"

console.log("book object:")
console.log(JSON.stringify(book, null, 2))
