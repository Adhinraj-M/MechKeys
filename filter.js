import { handleChange } from "./fetching.js";


const rangeMin = document.getElementById("rangeMin");
const rangeMax = document.getElementById("rangeMax");
const minPrice = document.getElementById("minPrice");
const maxPrice = document.getElementById("maxPrice");
const rangeFill = document.getElementById("rangeFill");
const resetPrice = document.getElementById("reset-btn-price");

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
  resetPrice.classList.add('none')
});


//check box filtering 

const instock = document.getElementById('InStockCheck')
const outStock = document.getElementById('OutStockCheck')

instock.addEventListener('click',()=>{
  const filter = data.filter((item)=> item.in_stock === true)

})=