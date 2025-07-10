import { handleChange } from "./fetching.js";

const rangeMin = document.getElementById("rangeMin");
const rangeMax = document.getElementById("rangeMax");
const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");
const rangeFill = document.getElementById("rangeFill");
const resetPrice = document.getElementById("reset-btn-price");
const instock = document.getElementById("InStockCheck");
const outStock = document.getElementById("OutStockCheck");
const resetStock = document.getElementById("reset-btn-stock");
const fiveStar = document.getElementById("five-star");
const fourStar = document.getElementById("four-star");
const threeStar = document.getElementById("three-star");
const resetRating = document.getElementById("reset-btn-star");

const minGap = 50;
const maxRange = 250;

//filter slider

export function updateSlider(e) {
  let minVal = parseInt(rangeMin.value);
  let maxVal = parseInt(rangeMax.value);

  if (maxVal - minVal < minGap) {
    if (e.target === rangeMin) {
      rangeMin.value = maxVal - minGap;
      minVal = parseInt(rangeMin.value);
    } else {
      rangeMax.value = minVal + minGap;
      maxVal = parseInt(rangeMax.value);
    }
  }

  minPrice.value = minVal;
  maxPrice.value = maxVal;

  const percentMin = ((minVal - 50) / (maxRange - 50)) * 100;
  const percentMax = ((maxVal - 50) / (maxRange - 50)) * 100;

  rangeFill.style.left = percentMin + "%";
  rangeFill.style.width = percentMax - percentMin + "%";
  resetPrice.classList.remove("none");
  handleChange(minVal, maxVal);
}

export function updateInputs() {
  let minVal = parseInt(minPrice.value);
  let maxVal = parseInt(maxPrice.value);

  if (maxVal - minVal >= minGap && maxVal <= maxRange && minVal >= 0) {
    rangeMin.value = minVal;
    rangeMax.value = maxVal;

    const percentMin = ((minVal - 50) / (maxRange - 50)) * 100;
    const percentMax = ((maxVal - 50) / (maxRange - 50)) * 100;

    rangeFill.style.left = percentMin + "%";
    rangeFill.style.width = percentMax - percentMin + "%";
  }

  handleChange(minVal, maxVal);
}

rangeMin.addEventListener("input", updateSlider);
rangeMax.addEventListener("input", updateSlider);

updateInputs();

//data filtering by conditions

export function filterData(min, max, data) {
  if (instock.checked) {
    let filteredByRating;
    switch (rating) {
      case rating === fiveStar.checked:
         filteredByRating =inStockByRating(5,data,min, max)
        return filteredByRating
      case rating === fourStar.checked:
        filteredByRating =inStockByRating(4,data,min, max)
        return filteredByRating
      case rating === threeStar.checked:
         filteredByRating =inStockByRating(3,data,min, max)
        return filteredByRating
      default:
        filteredByRating =  filterByStock(data,min,max)
    
       return filteredByRating
    }
  }

  if (outStock.checked) {
    let filteredByRating;
    switch (rating) {
      case rating === fiveStar.checked:
      filteredByRating=  outStockByRting(5,data,min,max)
      return filteredByRating
      case rating === fourStar.checked:
        filteredByRating=  outStockByRting(4,data,min,max)
      return filteredByRating
      case rating === threeStar.checked:
        filteredByRating=  outStockByRting(3,data,min,max)
      return filteredByRating
      default:
        filteredByRating =  filterByStock(data,min,max)
       return filteredByRating
    }
  }

  let filteredByRating;

  //Rating by sort logic
  switch (rating) {
    case rating === fiveStar.checked:
        if (instock.checked) {
          filteredByRating=  inStockByRating(5,data,min,max)
         return filteredByRating
        } else if (outStock.checked) {
         filteredByRating= outStockByRting(5,data,min,max)
          return filteredByRating
        } else {
           let ratingData = filterRating(5,data,min,max)
          return ratingData
        }

    case rating === fourStar.checked:
        if (instock.checked) {
           filteredByRating=  inStockByRating(4,data,min,max)
          return filteredByRating
        } else if (outStock.checked) {
           filteredByRating=  outStockByRting(4,data,min,max)
          return filteredByRating
        } else {
           let ratingData = filterRating(4,data,min,max)
           return ratingData
        }
    
    case rating === threeStar.checked:
     
        if (instock.checked) {
            filteredByRating=  inStockByRating(3,data,min,max)
          return filteredByRating
        } else if (outStock.checked) {
           filteredByRating=  outStockByRting(3,data,min,max)
          return filteredByRating
        } else {
          let ratingData = filterRating(3,data,min,max)
          return ratingData
        }
  }

  //  price range filtering 
  const filter = data.filter(
    (item) => item.price_usd >= min && item.price_usd <= max
  );

  return filter;
}

//filter bY rating only 
function filterRating(star,data,min,max){
  let filterByRating = data.filter((item)=>{
   return item.price_usd >= min && item.price_usd <= max && item.rating_value >= star
  })

  return filterByRating
}

//filter by stock only
function filterByStock(data, min, max) {
  if (instock.checked) {
    let filterByStock = data.filter((item) => {
     return  item.price_usd >= min && item.price_usd <= max && item.in_stock === true;
    });
    return filterByStock;
  }

  if (outStock.checked) {
    let filterByStock = data.filter((item) => {
     return item.price_usd >= min && item.price_usd <= max && item.in_stock === false;
    });
    return filterByStock;
  }
}

//instock filtering with the rating
function inStockByRating(star,data,min, max){
  let filteredByRating = data.filter((item) => {
          return (
            item.price_usd >= min && item.price_usd <= max &&
            item.rating_value >= star &&
            item.in_stock === true
          );
        });
        return filteredByRating;
}

//out of stock filtering with the rating
function outStockByRting(star,data,min,max){
 let filteredByRating = data.filter((item) => {
          return (
            item.price_usd >=min && item.price_usd <= max &&
            item.rating_value >= star &&
            item.in_stock === false
          );
        });

        return filteredByRating;
}



//reset the slider
resetPrice.addEventListener("click", function priceReset() {
  rangeMax.value = 250;
  rangeMin.value = 50;
  minPrice.value = 50;
  maxPrice.value = 250;
  rangeFill.style.left = "0%";
  rangeFill.style.width = "100%";
  handleChange(50, 250);
  resetPrice.classList.add("none");
});

//check box filtering (Stock)

instock.addEventListener("change", () => {
  resetStock.classList.remove("none");
  if (instock.checked) {
    outStock.checked = false;
  }
  updateInputs();
});

outStock.addEventListener("change", () => {
  resetStock.classList.remove("none");
  if (outStock.checked) {
    instock.checked = false;
  }
  updateInputs();
});

//reset stock checkbox

resetStock.addEventListener("click", function () {
  instock.checked = false;
  outStock.checked = false;
  resetStock.classList.add("none");
  updateInputs();
});

//rating star wise filtering

let rating;

fiveStar.addEventListener("change", function () {
  if (fiveStar.checked) {
    rating = fiveStar.checked;
    fourStar.checked = false;
    threeStar.checked = false;
  }
  updateInputs();
  resetRating.classList.remove("none");
});

fourStar.addEventListener("change", function () {
  if (fourStar.checked) {
    rating = fourStar.checked;
    fiveStar.checked = false;
    threeStar.checked = false;
  }
  updateInputs();
  resetRating.classList.remove("none");
});

threeStar.addEventListener("change", function () {
  if (threeStar.checked) {
    rating = threeStar.checked;
    fiveStar.checked = false;
    fourStar.checked = false;
  }
  updateInputs();
  resetRating.classList.remove("none");
});

resetRating.addEventListener("click", () => {
  fiveStar.checked = false;
  fourStar.checked = false;
  threeStar.checked = false;
  resetRating.classList.add("none");
  updateInputs();
});


