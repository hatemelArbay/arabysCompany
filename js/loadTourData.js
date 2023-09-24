document.addEventListener("DOMContentLoaded", function () {
  // Define the URL of the JSON file
  const jsonUrl = "js\\tourData.json";

  // Target the tour container element
  const tourContainer = document.getElementById("tourContainer");

  // Function to load and display tour data
  function loadTourData() {
    // Make a GET request to fetch the JSON data
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((tours) => {
        // Loop through the tour data and create HTML elements
        tours.forEach((tour) => {
          const tourElement = document.createElement("article");
          tourElement.classList.add("product-big");

          // Populate the tour element with data
          tourElement.innerHTML = `
            <div class="col-sm-6 col-md-12 wow fadeInRight mb-2 pl-0 pr-0">
              <!-- Product Big-->
              <article class="product-big" id="${tour.id}">
                <div class="unit flex-column flex-md-row align-items-md-stretch">
                  <div class="unit-left">
                    <a class="product-big-figure" href="tourdescription.html?tourId=${tour.id}"><img id="coverImg" src="${tour.coverPhoto}" alt="" width="500px" height="400px" /></a>
                  </div>
                  <div class="unit-body">
                    <div class="product-big-body">
                      <h5 class="product-big-title mb-3"><a href="tourdescription.html?tourId=${tour.id}">${tour.name}</a></h5>
                      <div class="group-sm group-middle justify-content-start">
                       
                       
                      </div>
                      <p class="tourDescription product-big-text">
                        ${tour.description}
                      </p>
                      <a id="viewTourButton" class="button button-black-outline button-ujarak" href="#" data-tour-id="${tour.id}">View Tour</a>
                      <div class="product-big-price-wrap"><span class="product-big-price" id="price">$${tour.price}</span></div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          `;

          // Append the tour element to the container
          tourContainer.appendChild(tourElement);

          // Add an event listener to the "View Tour" button
          const viewTourButton = tourElement.querySelector("#viewTourButton");
          viewTourButton.addEventListener("click", displayTourData);
        });
      })
      .catch((error) => {
        console.error("Error loading tour data:", error);
      });
  }



  // Call the function to load tour data
  loadTourData();
});
