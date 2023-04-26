// configure the sticky sidebar
if (window.innerWidth > 1023 && window.StickySidebar) {
  const sidebar = new StickySidebar('#sidebar-nav', {
    innerWrapperSelector: '.sidebar__inner',
    topSpacing: 20,
  })
}

// code to highlight the selected page
const urlParts = document.URL.split('/')
const urlFile = urlParts[urlParts.length - 1]
const links = document.getElementsByTagName('a')
for (let i = 0; i < links.length; i++) {
  const el = links[i]
  const linkParts = el.href.split('/')
  const linkFile = linkParts[linkParts.length - 1]

  if (urlFile === linkFile) {
    el.className += 'active'
  }
}

// configure the mobile navbar menu
$('#hamburger').on('click', (e) => {
  // make the hamburger active
  $('#hamburger').toggleClass('is-active')

  const urlParts = document.URL.split('/')
  const path = urlParts[urlParts.length - 1]

  // if on the homepage, show the regular menu
  if (path === 'index.html' || path === '/' || path === '') {
    $('.navbar-menu').toggleClass('active')

    // on all other pages, render the right sidebar
  } else {
    // show the right mobile sidebar
    $('#sidebar-nav').toggleClass('sticky')
    $('#stickyNavbarOverlay').toggleClass('active')

    // bind a listener to close the right sidebar
    $('#stickyNavbarOverlay').one('click', () => {
      $('#hamburger').toggleClass('is-active')
      $('#sidebar-nav').toggleClass('sticky')
      $('#stickyNavbarOverlay').toggleClass('active')
    })
  }
})
