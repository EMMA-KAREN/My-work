// const oBJECT =["PEN", "TABLE"];
//  console.log(oBJECT[0 ,1])
const people =[
    {
        "id":1,
        "name": 'kev',
        "age":24
    },
    {
        "id":3,
        "name": 'ken',
        "age": 32
    },
    { "id": 2,
        "name": 'Kipchumba',
        "age" : 24
    }
];
//for each
people.forEach(function(person){
    console.log(person.name) //'kev', 'ken', 'kipchumba'
})
const PRODUCTS = [100, 200,2000]
let sum = 0
PRODUCTS.forEach(function x (item)
{
    sum += item
})
console.log(sum) //2300
//mapping-creates a new copy of existing array
PRODUCTS.map(function a(item){
    console.log(item +item) //200,400, 4000
})
people.map(function p(person){
    console.log(person.name)//'kev','ken', 'kinuthia'
})
//filter-changes the array based on the output /condition
const over18 = people.filter(function b(person){
    person.age >= 18
    console.console.log(person.age >= 18)
})