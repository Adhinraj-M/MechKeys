const searchEl = document.getElementById("search-icon");
const header = document.querySelector(".header-container");
const sideMenuBar = document.querySelector(".side-menu-container");
const sideFilterEl = document.querySelector('.advanced-sort-container')
const keyboardOver =document.querySelector('.keyboard-sub-menu ')
const searchModal = document.querySelector(".search-form-lap");
const accOver = document.getElementById('accessories-sub-menu')

searchEl.addEventListener("click", function () {
  const search = document.createElement("div");
  search.className = "click-search-bar";
  header.appendChild(search);
  const form = document.createElement("form");
  form.className = "search-form";
  search.appendChild(form);
  const input = document.createElement("input");
  input.placeholder = "Search for...";
  input.className = "search-input";
  form.appendChild(input);
  const searchBtn = document.createElement("button");
  searchBtn.innerHTML = `<svg style="fill: #111111;opacity: 0.5;" width="14" height="14" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1216 832q0-185-131.5-316.5t-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5 316.5-131.5 131.5-316.5zm512 832q0 52-38 90t-90 38q-54 0-90-38l-343-342q-179 124-399 124-143 0-273.5-55.5t-225-150-150-225-55.5-273.5 55.5-273.5 150-225 225-150 273.5-55.5 273.5 55.5 225 150 150 225 55.5 273.5q0 220-124 399l343 343q37 37 37 90z"></path></svg>`;
  searchBtn.className = "search-btn";
  form.appendChild(searchBtn);
  let closeBtn = document.createElement("button");
  closeBtn.innerHTML = `<svg style="fill: #111111;" width="25" height="25" viewBox="0 0 20 20" fill="#555555"><path d="M14.95 6.46L11.41 10l3.54 3.54l-1.41 1.41L10 11.42l-3.53 3.53l-1.42-1.42L8.58 10L5.05 6.47l1.42-1.42L10 8.58l3.54-3.53z"></path></svg>`;
  closeBtn.className = "close-btn";
  search.appendChild(closeBtn);

  //close btn
  closeBtn.addEventListener("click", () => {
    search.style = 'display:none'
  });
});

//open side menu bar under tablet
const opneSideMenu = () => {
  sideMenuBar.classList.remove('none')
  sideMenuBar.style = "display:flex;";
};
// close the side menu bar under tablet
const closeSideBar = () => {
  sideMenuBar.style = 'display:none'
};

// search bar of laptop and above screen
const openSearchModal =()=>{
  searchModal.style = "display:flex;";
}

//open the filter side bar
const openSideFilter=()=>{
  sideFilterEl.classList.remove('none')
}

//close the filter side bar
const closeSideFilter = () => {
  sideFilterEl.classList.add('none')
};

//side filter remove
if(window.innerWidth >= 1024){
  sideFilterEl.classList.remove('none')
}

// nav bar mouse over
function mouseOver(){
  keyboardOver.classList.remove('none')
}

//nav bar mouse leave
function mouseLeave(){
  keyboardOver.classList.add('none')
}

//nav bar mouse over
function accMouseOver(){
  accOver.classList.remove('none')
}

//nav bar mouse leave
function accMouseLeave(){
  accOver.classList.add('none')
}

