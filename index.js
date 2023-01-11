let myLeads = []
const inputBtn = document.getElementById("input-btn") //const is constant and the variable
const inputEl = document.getElementById("input-el") //const can't be reassigned or redeclared
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const savetabBtn = document.getElementById("savetab-btn")


const localLeads = JSON.parse(localStorage.getItem("leads"))
if(localLeads){
    myLeads = localLeads
    render(myLeads)//*The values given when invoking or calling a func are arguments and the ones when inside the fucntion are parameters*
}

savetabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)//const tabs = [{url: "www.abcd.com"}] tabs are stored this way
        localStorage.setItem("leads",JSON.stringify(myLeads))
        render(myLeads)
    })//in order for chrome.tabs to work we need to add permission[tabs] in the manifest.json
})


deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click",function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("leads",JSON.stringify(myLeads)) //Local storage is for the user's device's local storage only. The data saved in local storage are always set as string
    //in order to set myLeads array in our local storage we use the localStorage.setItem() func and give a key-value string pair as input.
    //The JSON.stringify() makes the array into a string whereas JSON.parse() can convert that string into the original type which was array.

    render(myLeads)
})

function render(leads){
    let listItems = ""
    for(let i = 0; i < leads.length; i++){
        //listItems += "<li><a target = '_blank' href ='" + myLeads[i] + "'>" + myLeads[i] + "</a>" + "</li>" //variation: const li = document.createElement("li") //li.textContent = myLeads[i] //ulEl.append(li)
        //target = '_blank' is used to open a link in a new tag
        listItems += `
            <li>
                <a target = "_blank" href = "${leads[i]}"> 
                    ${leads[i]}
                </a>
            </li>
        `//template strings/literals by using the `` sign and ${value} to escape from the encapsulation
        console.log(listItems)
    }
    ulEl.innerHTML = listItems
}    
//Truthy values are values which are considered to be true by default when put in a condition.
//Falsey values are values which are considered to be false by default when put in a condition.
//Falsey value examples = false,0,-0,"",null-> How a dev signifies emptiness,NaN(Not a Number) and undefined-> How js signifies emptiness.
//All other except the falsey values are truthy values.
//if(0){console.log("it is true")} else{console.log("It is false")}
//this will make 0 = false hence the else condition will run
//if(1){console.log("it is true")} else{console.log("It is false")}
//this will make 1 = true hence the if condition will run
//Boolean(value) can be used to check wether the value inside it are truthy or falsey