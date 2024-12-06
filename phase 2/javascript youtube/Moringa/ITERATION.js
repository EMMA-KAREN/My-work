
const students = [
    { id: 7, name: "Kelvin Smith", age: 22, major: "Electronic Engineering", GPA: 3.7 },
    { id: 5, name: "Kelvin Smith", age: 22, major: "Electronic Engineering", GPA: 3.7 },
    { id: 3, name: "Kelvin Smith", age: 22, major: "Electronic Engineering", GPA: 3.7, address: ["Nairobi", "Ngong", "Karen"] } // Corrected address format
  ];
  
  students.forEach((student) => {
    // Improved output with formatted string interpolation
    console.log(`${student.name} is ${student.age} years old.`);
  
    // Accessing address if present
    if (student.address) {
      console.log(`Address: ${student.address.join(", ")}`); // Proper comma separationZ
    }
  });

    // iteration
 //forEach-to  perform specific action for each element
    // const fruits =["mango","banana","orange ", "watermelon"]
    //   fruits.forEach( (x) => {
    //     console.log(x,x.length)//for counting letters\
    //     console.log(x.toUpperCase (),x.length)
    //   });

    //   const numbers =[23,45,67,89,90]
    // //   numbers.forEach( (num) =>{
    //     console.log(num+20)
    //   })

    //  mapping modify each element and return a modified Array
    //syntax Array
       //   original_array.map( (element, index, array)=>
      //  {
      //      return  attransformedelement
        //})
//the first item is the element then index,array


// const newArray= fruits.map((element,index,)=>{
//     return element(0).touppercase()+element.slice(1)+element.length+ " "+index
// })
// console.log(newarray);

// /filter =[] to find and returns list of item thatmeets a specific condition
// const numbers=[23,45,67,89,90]
// const filtereditems = numbers.filter((num)=>{
//     return num>50 && num<70
// })
// console.log(filtereditems);

// let fruits  =["mango","banana","apples"]

// let newfruits = fruits.filter((fruits)=>{
//     return fruits =="apples" 
// })

// console.log(newfruits)
// return fruits.length<=7

//find returns a single elements the condition
// const numbers = [1, 2, 3, 4, 5];

// // Find the first even number
// const evenNumber = numbers.find(number => number % 2 === 0);
// console.log(evenNumber); 

// // Find the first number greater than 3
// const greaterThan3 = numbers.find(number => number > 3);
// console.log(greaterThan3); 

// //Find a number that doesn't exist
// const nonExistent = numbers.find(number => number !== 10);
// console.log(nonExistent); 