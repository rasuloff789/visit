let TODAY = new Date();
let YEAR = String(TODAY.getFullYear() );
let MONTH = String(TODAY.getMonth() + 1);
let DATE = String(TODAY.getDate() );

let getToday = `${YEAR}-${MONTH.padStart(2,"0")}-${DATE.padStart(2,"0")}`;
elDateInput.value = getToday;
let listDate = "";
let itemTemplate = elItemTemplate.content;

function renderList(array){
  list.innerHTML = "" ;
  
  let listFragment = document.createDocumentFragment();
  
  array.forEach(item => {
    listFragment.append(renderItem(item));
  });
  
  list.append(listFragment);
};

function renderItem(obj){
  let itemTemplateClone = itemTemplate.cloneNode(true);
  
  itemTemplateClone.querySelector(".name").textContent = findUserWithUserID(obj.userId);
  itemTemplateClone.querySelector(".visit").textContent = obj.visit ? "OK" : "-";
  itemTemplateClone.querySelector(".score").textContent = obj.score;
  
  return itemTemplateClone;
};

function findUserWithUserID(userID){
  return people.find(row => userID == row.id).name;
};

function filterByDate(date){
  return dataUsers.filter(row => row.visitDate === date);
}
renderList(dataUsers);

function onInputChange(evt){
  
  if (evt && evt.type === "change"){
    listDate = evt.target.value ;
  }else{
    listDate = getToday;
  };
  
  renderList(filterByDate(listDate));
};
onInputChange();

elDateInput.addEventListener('change', onInputChange);

// usersOption 
let optionTemplate = document.querySelector("#optionTemplate").content;

function renderOption(obj){
let optionTemplateClone = optionTemplate.cloneNode(true);

optionTemplateClone.querySelector(".option").textContent = obj.name;
optionTemplateClone.querySelector(".option").value = obj.id;

return optionTemplateClone;
};

function renderOptionCollection(array){
  userOption.innerHTML = '';

  let optionFragment = document.createDocumentFragment();

  array.forEach(row => optionFragment.append(renderOption(row)));

  userOption.append(optionFragment);
};
renderOptionCollection(people);

let userInfoBody = document.querySelector("#userInfoBody").content;

function renderInfoCollection(obj){
  let userInfoBodyClone = userInfoBody.cloneNode(true);
console.log(obj.visitDate);
  userInfoBodyClone.querySelector(".date").textContent = obj.visitDate;
  userInfoBodyClone.querySelector(".visit").textContent = obj.visit ? "OK" : "-";
  userInfoBodyClone.querySelector(".user-score").textContent = obj.score;

  return userInfoBodyClone;
};

function renderTBody(array){
  tableBody.innerHTML = "" ;

  let infoCollectionFragment = document.createDocumentFragment();

  array.forEach(row => infoCollectionFragment.append(renderInfoCollection(row)));
  
  tableBody.append(infoCollectionFragment);
};

function filterUserByID(number){
  return dataUsers.filter(row => row.userId == number);
};

function onSelectChange(){
  let selectValue = userOption.value;

  renderTBody(filterUserByID(selectValue));
};
onSelectChange();

userOption.addEventListener("change" , onSelectChange)