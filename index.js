const searchEl  = document.getElementById('search-icon')
const header = document.querySelector('.header-container')

searchEl.addEventListener('click',function(){
    const search =document.createElement('div')
    search.className = 'click-search-bar'
    header.appendChild(search)
    const form = document.createElement('form')
    form.className = 'search-form'
    search.appendChild(form)
    const input = document.createElement('input')
    input.className = 'search-input'
    form.appendChild(input)
    const searchBtn = document.createElement('button')
    searchBtn.className = 'search-btn'
    form.appendChild(searchBtn)
    const closeBtn = document.createElement('button')
    closeBtn.className = 'close-btn'
    search.appendChild(closeBtn)

})

