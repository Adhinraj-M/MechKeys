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

export function filterData(min, max, data) {
  if (instock.checked) {
    let filteredByRating;
    switch (rating) {
      case rating === fiveStar.checked:
        filteredByRating = data.filter((item) => {
          return (
            item.price_usd >= min &&
            item.price_usd <= max &&
            item.rating_value === 5 &&
            item.in_stock === true
          );
        });
        return filteredByRating;

      case rating === fourStar.checked:
        filteredByRating = data.filter((item) => {
          return (
            item.price_usd >= min &&
            item.price_usd <= max &&
            item.rating_value >= 4 &&
            item.in_stock === true
          );
        });
        return filteredByRating;
      case rating === threeStar.checked:
        filteredByRating = data.filter((item) => {
          return (
            item.price_usd >= min &&
            item.price_usd <= max &&
            item.rating_value >= 3 &&
            item.in_stock === true
          );
        });
        return filteredByRating;
      default:
        let inStockFilter = data.filter((item) => {
          return (
            item.price_usd >= min &&
            item.price_usd <= max &&
            item.in_stock === true
          );
        });
        return inStockFilter;
    }
  }

  if (outStock.checked) {
    let filteredByRating;
    switch (rating) {
      case rating === fiveStar.checked:
        filteredByRating = data.filter((item) => {
          return (
            item.price_usd >= item.price_usd <= max &&
            item.rating_value === 5 &&
            item.in_stock === false
          );
        });

        return filteredByRating;

      case rating === fourStar.checked:
        filteredByRating = data.filter((item) => {
          return (
            item.price_usd >= item.price_usd <= max &&
            item.rating_value >= 4 &&
            item.in_stock === false
          );
        });
        console.log(filteredByRating);

        return filteredByRating;
      case rating === threeStar.checked:
        filteredByRating = data.filter((item) => {
          return (
            item.price_usd >= item.price_usd <= max &&
            item.rating_value >= 3 &&
            item.instock === false
          );
        });
        return filteredByRating;
      default:
        let inStockFilter = data.filter((item) => {
          return (
            item.price_usd >= min &&
            item.price_usd <= max &&
            item.in_stock === false
          );
        });
        return inStockFilter;
    }
  }

  let filteredByRating;

  //Rating by sort logic
  switch (rating) {
    case rating === fiveStar.checked:
      filteredByRating = data.filter((item) => {
        if (instock.checked) {
          return (
            item.price_usd >= min &&
            item.price_usd <= max &&
            item.rating_value === 5 &&
            item.in_stock === true
          );
        } else if (outStock.checked) {
          return (
            item.price_usd >= min &&
            item.price_usd <= max &&
            item.rating_value === 5 &&
            item.in_stock === false
          );
        } else {
          return (
            item.price_usd >= min &&
            item.price_usd <= max &&
            item.rating_value === 5
          );
        }
      });

      return filteredByRating;

    case rating === fourStar.checked:
      filteredByRating = data.filter((item) => {
        if (instock.checked) {
          return (
            item.price_usd >= min &&
            item.price_usd <= max &&
            item.rating_value >= 4 &&
            item.in_stock === true
          );
        } else if (outStock.checked) {
          return (
            item.price_usd >= min &&
            item.price_usd <= max &&
            item.rating_value >= 4 &&
            item.in_stock === false
          );
        } else {
          return (
            item.price_usd >= min &&
            item.price_usd <= max &&
            item.rating_value >= 4
          );
        }
      });

      return filteredByRating;

    case rating === threeStar.checked:
      filteredByRating = data.filter((item) => {
        if (instock.checked) {
          return (
            item.price_usd >= min &&
            item.price_usd <= max &&
            item.rating_value >= 3 &&
            item.in_stock === true
          );
        } else if (outStock.checked) {
          return (
            item.price_usd >= min &&
            item.price_usd <= max &&
            item.rating_value >= 3 &&
            item.in_stock === false
          );
        } else {
          return (
            item.price_usd >= min &&
            item.price_usd <= max &&
            item.rating_value >= 3
          );
        }
      });
      return filteredByRating;
  }

  const filter = data.filter(
    (item) => item.price_usd >= min && item.price_usd <= max
  );

  return filter;
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
