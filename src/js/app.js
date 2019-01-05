import $ from 'jquery'
import 'slick-carousel'
import '../../node_modules/slick-carousel/slick/slick.css'
import '../../node_modules/slick-carousel/slick/slick-theme.css'
import '../../dist/css/carousel.css'

$('button').on('click', () => {
  window.alert('hello webpack')
})

// $('.multiple-items').slick({
//   infinite: true,
//   slidesToShow: 3,
//   slidesToScroll: 3
// })

$('.multiple-items').slick({
  prevArrow: `<button type="button" class="slick-prev my-button">Previous</button>`,
  nextArrow: `<button type="button" class="slick-next my-button">Next</button>`,
  dots: true,
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
})

const openMenu = document.getElementById('open_menu')
const closeMenu = document.getElementById('close_menu')
const menu = document.getElementById('menu')

openMenu.addEventListener('click', (event) => {
  menu.classList.add('shown')
})

closeMenu.addEventListener('click', (event) => {
  menu.classList.remove('shown')
})
