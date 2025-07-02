const selectEl = document.getElementById("sorting-keyboard");
const ulEl = document.querySelector(".keyboard-data-container");
console.log(selectEl.value)
window.addEventListener('load',handleChange) //for inital loading
selectEl.addEventListener("change", handleChange);

async function handleChange() {
  const fetchedData = await dataFetch();

  switch (selectEl.value) {
    case "latest":
      const latest = latestKeyboard(fetchedData);
      createList(latest);
      break;
    case "popularity":
      const popular = popularkeyboard(fetchedData);
      createList(popular);
      break;
    case "average":
      const average = averagekeyboard(fetchedData);
      createList(average);
      break;
    case "low-to-high":
      const lowPriceFirst = lowToHigh(fetchedData);
      createList(lowPriceFirst);
      break;
    case "high-to-low":
      const highPriceFirst = highToLow(fetchedData);
      createList(highPriceFirst);
      break;
    default:
      console.log("Select one of the option!");
  }
}
async function dataFetch() {
  try {
    const response = await fetch("Keyboard.Data/keyboard.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function latestKeyboard(data) {
  return data.sort((a, b) => b.id - a.id);
}

function popularkeyboard(data) {
  return data.sort((a, b) => a.rating_value - b.rating_value);
}

function averagekeyboard(data) {
  return data;
}

function lowToHigh(data) {
  return data.sort((a, b) => a.price_usd - b.price_usd);
}

function highToLow(data) {
  return data.sort((a, b) => b.price_usd - a.price_usd);
}

function createList(data) {
    ulEl.innerHTML = ''    //clear previous list 


  data.forEach((data, index) => {
    const keyboarLi = document.createElement("li");
    keyboarLi.dataset.key = index;
    keyboarLi.className = "keyboard-wrapper";
    ulEl.appendChild(keyboarLi);

    const imgContainer = document.createElement("div");
    imgContainer.className = "img-wishlist-container";
    keyboarLi.appendChild(imgContainer);

    const imgEl = document.createElement("img");
    imgEl.className = "keyboard-img";
    imgEl.src = data.image;
    imgEl.width = 300;
    imgEl.height = 200;
    imgContainer.appendChild(imgEl);

    const wishBtn = document.createElement("button");
    wishBtn.className = "wishlist-btn";
    wishBtn.innerHTML = `<svg
                  style="color: white"
                  width="16"
                  height="16"
                  viewBox="0 0 512 512"
                >
                  <path
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
                  ></path>
                </svg>`;
    imgContainer.appendChild(wishBtn);

    const keyboardInfo = document.createElement("div");
    keyboardInfo.className = "keyboard-info";
    keyboarLi.appendChild(keyboardInfo);

    const nameEl = document.createElement("h2");
    nameEl.className = "keyboard-name";
    nameEl.innerHTML = data.name;
    keyboardInfo.appendChild(nameEl);

    const starDiv = document.createElement("div");
    starDiv.className = "star-rating";
    starDiv.innerHTML = data.rating;
    keyboardInfo.appendChild(starDiv);

    const price = document.createElement("span");
    price.className = "price";
    price.innerHTML = `$ ${data.price_usd}`;
    keyboardInfo.appendChild(price);
  });

}
