const pop = document.querySelector('#navmenu .navbar-nav .nav-button #pop-btn')
const remove = document.querySelector('.popup .close-btn')

pop.addEventListener('click', function(){
  document.querySelector('.popup').classList.add('active')
})

remove.addEventListener('click', function(){
  document.querySelector('.popup').classList.remove('active')
})

