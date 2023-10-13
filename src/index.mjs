import "./styles.css";
import { getSuggestions } from "./mockServer"

(function(){
const input = document.getElementById("search");
const suggestionArea = document.getElementById("suggestion-area");

const onInputFocus = () => {
  suggestionArea.style.display = "block"
}
// const clickOutSideInput = ()=>{
//   suggestionArea.style.display = "none"
// }

// to click to suggestion-area and populate the result over input
const clickOutSideInput = (e)=>{
  if(e.target === input || e.target === suggestionArea) {
    return
  }
  
  suggestionArea.style.display = "none"
}

// when focus on input show the suggestion-area
input.addEventListener("focus",onInputFocus)
// input.addEventListener("blur",clickOutSideInput)

/* whenever we type something in the input area we've to make 
the api call and show the suggestion inthe suggestion-area so for
that we are using keyup event.
*/

/*
so keypress is a formation of 2 events one is key press (keydown event)
and second one is key release (keyup event).

so we've to choise that when we make api call on keydown or keyup,
so  in below i'm going to call api on keyup( means when release the key)
*/

const onInputChange = (e)=>{
// const inputVal = e.target.value;
  const {value} = e.target;
  processData(value)
  
}

const processData = async(value)=>{
  // if input box is empty then clear then suggestionArea
  suggestionArea.innerHTML = "";
  if(!value) {
    return;
  }
  try{
    const res = await getSuggestions(value)
    if(res.length>0){
      const list = document.createElement("ul");
      res.forEach((item)=>{
        const listItems = document.createElement("li");
        //for styling
listItems.style.cursor ="pointer" 

        listItems.innerText = item;
        list.appendChild(listItems)
      });
      // to avoid appending 2 ul/li and clear the innerHtml
      suggestionArea.innerHTML = "";
      suggestionArea.appendChild(list)
    }
   
  }catch(err){
    console.log("error at api call",err)
  }

}

input.addEventListener("keyup", onInputChange)

/* to click on suggestion results,
 that will be populated in the inputbox
 */

 const handleClick = (e)=>{
   /* to not show all result in input when click on suggestions area
   only show perticular click item from suggestionArea over input box 
   */
   if(e.target === suggestionArea) {
     return
   }

   const inputText = e.target.innerText;
  //  console.log(e.target.innerText);
  input.value = inputText;
  input.focus();
  suggestionArea.style.display = "none";
   
 }
 // true to capture the event
 window.addEventListener("click",clickOutSideInput,true)
suggestionArea.addEventListener("click",handleClick)
}())