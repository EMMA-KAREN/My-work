Event
/**some events
 * mouse events
 *     -click mouseover,mousemove,mousedown
 * keyboard events
 * form events
 * window events
 */
// headerElement.addEventListener('click', function() {
//     console.log('Header clicked!');
// });
const headerElement = document.getElementById('myHeader');

//handling forms
const form =document.getElementById("myform")
form.addEventListener("Submit"), (event) =>{
  event.preventDefault();  //to avoid reloading the page

  const name = document.getElementById("name").ariaValueMax;
  const age = document.getElementById("age").ariaValueMax;
  const email = document.getElementById("emal").ariaValueMax;

//alert form submitted
console.log("form submitted",)
const user_values =document.getElementById("user-values")
user_values.innerHTML = '<h5>name: ${name} </h5 > <h5>age: ${age}</h5> <h5> email: $(email}</h5>'
})