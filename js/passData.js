function displayTourData(event) {
  event.preventDefault();
  const tourId = event.target.getAttribute("data-tour-id");

  // Create the URL for the tourdescription.html page with the tourId as a query parameter
  const tourDescriptionURL = `tourdescription.html?tourId=${tourId}`;

  // Redirect to the tourdescription.html page
  window.location.href = tourDescriptionURL;
}


document.addEventListener("DOMContentLoaded", function () {
  // Function to parse query parameters from the URL
  function getQueryParam(paramName) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(paramName);
  }

  // Get the tourId from the URL
  const tourId = getQueryParam("tourId");

  // Define the URL of the JSON file
  const jsonUrl = "js/tourData.json"; // Corrected the path to the JSON file

  // Target the container element to display tour data
  const tourContainer = document.getElementById("tourDescription");

  // Function to load and display tour data
  function loadTourData() {
    // Make a GET request to fetch the JSON data
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((tours) => {
        // Find the tour with the matching tourId
        const tour = tours.find((tour) => tour.id === tourId);

        if (tour) {
          // Create HTML elements to display the tour data
          const tourElement = document.createElement("article");
          tourElement.classList.add("product-big");
          

          const carouselImages = tour.photos.map((imageSrc, index) => `
          <div class="sliderSize carousel-item ${index === 0 ? 'active' : ''}">
            <img src="${imageSrc}" alt="Image ${index + 1}">
          </div>
        `).join("");

          // Populate the tour element with data
          tourElement.innerHTML = `
          
           <div class="unit flex-column flex-md-row align-items-md-stretch">
            <div class="image-slider">
              <!-- Bootstrap Carousel for Image Slider -->
              <div id="imageCarousel" class="product-big-figure unit-left carousel slide" data-ride="carousel" style="width:500px">
                <ol class="carousel-indicators">
                  ${tour.photos.map((_, index) => `
                    <li data-target="#imageCarousel" data-slide-to="${index}" class="${index === 0 ? 'active' : ''}"></li>
                  `).join("")}
                </ol>
                <div class="sliderSize carousel-inner">
                  ${carouselImages}
                </div>
                <a class="carousel-control-prev" href="#imageCarousel" data-slide="prev">
                  <span class="carousel-control-prev-icon"></span>
                </a>
                <a class="carousel-control-next" href="#imageCarousel" data-slide="next">
                  <span class="carousel-control-next-icon"></span>
                </a>
              </div>
            </div>

            <div class="unit-body">
              <div class="product-big-body">
                <h5 class="product-big-title mb-4 mt-3" id="tourTitle">${tour.name}</h5>

                <div class="group-sm group-middle justify-content-start">

                </div>
                <p class="product-big-text" id="tourDescription">${tour.description}</p>
                  
                <div class="product-big-price-wrap"><span class="product-big-price" id="price">$${tour.price}</span></div>
                <div class="overView mt-5">
                    <h5 class="product-big-title">OverView</h4>
                      <p class="product-big-text" id="overView">${tour.overview}</p>
                        
                </div>
                <div class="whatIncluded mt-5">
            <h5 class="product-big-title">What's Included</h5>
            <ul class="product-big-text"  id="includedList">
              ${tour.whatIncluded.map((item) => `<li>${item}</li>`).join("")}
            </ul>
          </div>
              </div>
              
            </div>
          </div>
        
    
          `;

          // Append the tour element to the container
          tourContainer.appendChild(tourElement);
        } else {
          // Handle the case where the tour with the given tourId is not found
          console.error(`Tour with ID ${tourId} not found.`);
        }
      })
      .catch((error) => {
        console.error("Error loading tour data:", error);
      });
  }

  // Call the function to load tour data
  loadTourData();
});
