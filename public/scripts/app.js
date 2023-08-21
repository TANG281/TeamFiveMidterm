// Client facing scripts here.
// This file is intended to be used to load the `header` and `footer` and all
// other shared elements into `.html` files.


// Checks if the HTML document is fully loaded.
$(document).ready(function() {


  // This function creates a Navigation Bar element and returns it.
  const createNavBarElement = function() {

    // Create a navigation bar using Bootstrap and populate it.
    const $navbar = $(
      `
      <nav class="navbar navbar-expand-lg bg-body-tertiary">

        <div class="container-fluid">

          <a class="navbar-brand" href="#Home">TeamFive</a>

          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>


          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">

              <!-- CATEGORIES -->
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="#category"> Desktops</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#category">Laptops</a>
              </li>

              <li class="nav-item">
                <a class="nav-link" href="#category"> Mini-PC</a>
              </li>

              <li class="nav-item">
                <a class="nav-link" href="#category">Phones</a>
              </li>

              <!-- USER ICON DROPDOWN MENU -->

                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i class="fa-solid fa-user"></i>
                  </a>
                  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="#">Login</a></li>
                    <li><a class="dropdown-item" href="#">Logout</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item" href="#">Add Item</a></li>
                    <li><a class="dropdown-item" href="#">Favourites</a></li>
                  </ul>
                </li>
                
            </ul>


          </div>

        </div>

      </nav>
      `
    );


    return $navbar;
  };


  // This function creates an HTML template for the footer.
  const createFooterElement = function() {

    // Create a footer element using Font Awesome's Social Media Icons.
    const $footer = $(
      `
      <!-- Uses Font Awesome -->
      <div id="Social-Media-Container">
        <i class="fa-solid fa-rss"></i>
        <i class="fa-brands fa-facebook"></i>
        <i class="fa-brands fa-github"></i>
        <i class="fa-brands fa-instagram"></i>
        <i class="fa-brands fa-twitter"></i>
      </div>


      <div id="Copyright">
        <div>

          <!-- Add 'text-black-50' Bootstrap class to text elements to give
               them 50% opacity. -->
          <p class="text-black-50">Copyright &copy; 2023 Team Five</p>
          <p class="text-black-50">Team Five is the Best Team! We are committed to providing the best product and outstanding customer service.</p>
          <sub class="text-black-50">All Sales are Final. No Refunds! Go Away!</sub>

        </div>
      </div>
      `
    );


    return $footer;
  };


  // This function appends HTML Elements (like the header & footer) to the
  // HTML files in this project.
  const renderHTMLElements = function() {

    // Load the Nav Bar.
    $("#Nav-Bar-Container").prepend(createNavBarElement());

    // Load the footer.
    $("footer").prepend(createFooterElement());

  };


  // DRIVER CODE
  renderHTMLElements();

});
