/*const form=document.querySelector("form");
const input=document.querySelector("#txtTaskName");
const btnDeleteAll=document.querySelector("#btnDeleteAll");
const taskList=document.querySelector("#task-list");
const item=["item 1","item 2","item 3"];
eventListeners();

loadItems();

function eventListeners(){
    //add item
    form.addEventListener("submit", addNewItem);
    //delete item
    taskList.addEventListener("click",deleteItem);
    btnDeleteAll.addEventListener("click",deleteAll)
}
function addNewItem(e){
console.log(input.value);
    if(input.value==="")alert("Add new item!");
    else{
       createItem(input.value);
    }
    e.preventDefault();
    input.value="";
}
function deleteItem(e){
if(e.target.className==="fas fa-times")
{
    e.target.parentElement.parentElement.remove();
}
}
function deleteAll(e){
    if(confirm("Are you sure?")){
   taskList.innerHTML="";
}
e.preventDefault();
}
function loadItems(){
item.forEach(function(item){
    createItem(item);
})
}
function createItem(text){
    const li=document.createElement('li');
        li.className='list-group-item list-group-item-secondary';
        li.appendChild(document.createTextNode(text));
        const a=document.createElement("a");
        a.classList='delete-item float-right'; 
        a.setAttribute("href","#");
        a.innerHTML='<i class="fas fa-times"></i>'
        li.appendChild(a);
        taskList.appendChild(li);
}*/

////local storage ile

const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let items;

loadItems();
eventListeners();



function eventListeners() {
  //add item
  form.addEventListener("submit", addNewItem);
  //delete item
  taskList.addEventListener("click", deleteItem);
  btnDeleteAll.addEventListener("click", deleteAllItems);
}
function addNewItem(e) {
  if (input.value === "") {
    alert("add new item");
  }

  // create item
  createItem(input.value);

  // save to LS
  setItemToLS(input.value);

  // clear input
  input.value = "";

  e.preventDefault();
}


function loadItems() {
    items = getItemsFromLS();
    items.forEach(function (item) {
      createItem(item);
    });
  }
  function getItemsFromLS() {
    if (localStorage.getItem("items") === null) {
      items = [];
    } else {
      items = JSON.parse(localStorage.getItem("items"));
    }
    return items;
  }
  function setItemToLS(text){
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}

  function deleteItemFromLS(text) {
    items = getItemsFromLS();
    items.forEach(function (item, index) {
      if (item === text) {
        items.splice(index, 1);
      }
    });
    localStorage.setItem("items",JSON.stringify(items));
  }
  function createItem(text) {
    // create li
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));

    // create a
    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>';

    // add a to li
    li.appendChild(a);

    // add li to ul
    taskList.appendChild(li);

}
function deleteItem(e) {
    if (e.target.className === 'fas fa-times') {
        if (confirm('are you sure ?')) {
            e.target.parentElement.parentElement.remove();

            // delete item from LS
            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault();
}

// delete all items
function deleteAllItems(e) {

    if (confirm('are you sure ?')) {
        // taskList.innerHTML='';
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
        localStorage.clear();
    }
    e.preventDefault();
}


