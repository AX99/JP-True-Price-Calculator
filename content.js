function calculateTruePriceForLotDetails() {
  // Check if the page matches the LotDetails URL pattern
  const displayPriceElement = document.querySelector(
    "#actionForm > div > div.detail__price > span.detail__price--current.Bidding_Current_Price.awe-rt-CurrentPrice"
  );

  if (displayPriceElement) {
    // Check if true price has already been added
    const existingTruePrice = displayPriceElement.parentNode.querySelector(".true-price-added");
    if (existingTruePrice) {
      return; // Already processed
    }

    const displayPriceText = displayPriceElement.textContent;
    const displayPrice = parseFloat(displayPriceText.replace(/[^0-9.]/g, ""));
    const vatRate = 0.20; // 20% VAT
    const buyerPremiumRate = 0.25; // 25% Buyer's Premium

    const vatAmount = displayPrice * vatRate;
    const buyerPremiumAmount = displayPrice * buyerPremiumRate;
    const vatBPAmount = buyerPremiumAmount * vatRate;
    const truePrice = displayPrice + vatAmount + buyerPremiumAmount + vatBPAmount;

    const truePriceElement = document.createElement("span");
    truePriceElement.className = "detail__price--current true-price-added"; // Add marker class
    truePriceElement.innerHTML = `£${truePrice.toFixed(2)}`;

    const strongElement = document.createElement("strong");
    strongElement.textContent = "Total Price (inc fees): ";

    // Insert the true price elements after the existing element
    displayPriceElement.parentNode.appendChild(strongElement);
    displayPriceElement.parentNode.appendChild(truePriceElement);

    console.log(`VAT: £${vatAmount}`);
    console.log(`BP: £${buyerPremiumAmount}`);
    console.log(`VAT on BP: £${vatBPAmount}`);
    console.log(`Total fees: £${vatBPAmount + buyerPremiumAmount + vatAmount}`);
  }
}

function modifyWatchingPage() {
  // Check if the page is the "Watching" page
  const watchingPage = document.querySelector("#biddingWatching");
  if (watchingPage) {
    // Check if already processed
    if (watchingPage.querySelector(".true-price-added")) {
      return; // Already processed
    }

    // Select the third and fourth divs in each listing
    const listingContainers = document.querySelectorAll(
      "#biddingWatching .col-xs-12.col-sm-8.col-md-3"
    );

    listingContainers.forEach((container) => {
      const currentBidDiv = container.querySelector(".watch-item__label");
      const currentPriceSpan = container.querySelector(".awe-rt-CurrentPrice.price");

      if (currentBidDiv && currentPriceSpan) {
        // Create a new div
        const newDiv = document.createElement("div");
        newDiv.className = "col-xs-12 col-sm-8 col-md-3 true-price-added"; // Add marker class

        // Create div.watch-item__label and span.awe-rt-CurrentPrice.price elements for the new div
        const watchItemLabel = document.createElement("div");
        watchItemLabel.className = "watch-item__label";
        const showOnEndSpan = document.createElement("span");
        showOnEndSpan.className = "awe-rt-ShowOnEnd";
        showOnEndSpan.textContent = "Total Price + Fees";
        watchItemLabel.appendChild(showOnEndSpan);

        const strongElement = document.createElement("strong");
        const aweRtCurrentPrice = document.createElement("span");
        aweRtCurrentPrice.className = "awe-rt-CurrentPrice price";
        const numberPartSpan = document.createElement("span");
        numberPartSpan.className = "NumberPart";
        
        // Calculate and set the truePrice
        const displayPriceText = currentPriceSpan.textContent;
        const displayPrice = parseFloat(displayPriceText.replace(/[^0-9.]/g, ""));
        const vatRate = 0.20; // 20% VAT
        const buyerPremiumRate = 0.25; // 25% Buyer's Premium
        const vatAmount = displayPrice * vatRate;
        const buyerPremiumAmount = displayPrice * buyerPremiumRate;
        const vatBPAmount = buyerPremiumAmount * vatRate;
        const truePrice = displayPrice + vatAmount + buyerPremiumAmount + vatBPAmount;
        numberPartSpan.textContent = `£${truePrice.toFixed(2)}`;

        aweRtCurrentPrice.appendChild(numberPartSpan);
        strongElement.appendChild(aweRtCurrentPrice);
        
        // Append the elements to the new div
        newDiv.appendChild(watchItemLabel);
        newDiv.appendChild(strongElement);

        // Insert the new div between the third and fourth divs
        container.parentNode.insertBefore(newDiv, container.nextSibling);

        // Update the class of the last div
        container.classList.remove("col-md-6");
        container.classList.add("col-md-3");
      }
    });
  }
}

function modifyListingsPage() {
  // Check if we're on a listings page by looking for gallery units
  const galleryUnits = document.querySelectorAll(".galleryUnit");
  
  if (galleryUnits.length > 0) {
    galleryUnits.forEach((unit) => {
      // Check if this unit has already been processed
      if (unit.querySelector(".true-price-added")) {
        return; // Skip if already processed
      }

      // Find the current price element within this listing
      const currentPriceElement = unit.querySelector(".awe-rt-CurrentPrice.galleryPrice .NumberPart");
      
      if (currentPriceElement) {
        const displayPriceText = currentPriceElement.textContent;
        const displayPrice = parseFloat(displayPriceText.replace(/[^0-9.]/g, ""));
        
        if (!isNaN(displayPrice)) {
          const vatRate = 0.20; // 20% VAT
          const buyerPremiumRate = 0.25; // 25% Buyer's Premium
          
          const vatAmount = displayPrice * vatRate;
          const buyerPremiumAmount = displayPrice * buyerPremiumRate;
          const vatBPAmount = buyerPremiumAmount * vatRate;
          const truePrice = displayPrice + vatAmount + buyerPremiumAmount + vatBPAmount;
          
          // Find the gallery data values section where we'll add the true price
          const galleryDataValues = unit.querySelector(".awe-rt-HideOnEnd.galleryData--values");
          
          if (galleryDataValues) {
            // Create a new paragraph for the true price
            const truePriceParagraph = document.createElement("p");
            truePriceParagraph.className = "galleryData--values true-price-added"; // Add marker class
            truePriceParagraph.style.marginTop = "5px";
            truePriceParagraph.style.fontSize = "16px";
            truePriceParagraph.style.color = "#dc3545";
            truePriceParagraph.style.fontWeight = "bold";
            
            // Create the true price element
            const truePriceElement = document.createElement("span");
            truePriceElement.className = "awe-rt-CurrentPrice galleryPrice";
            truePriceElement.innerHTML = `Total Price + Fees: £<span class="NumberPart">${truePrice.toFixed(2)}</span>`;
            
            truePriceParagraph.appendChild(truePriceElement);
            
            // Insert the true price after the existing price
            galleryDataValues.parentNode.insertBefore(truePriceParagraph, galleryDataValues.nextSibling);
            
            console.log(`Listing ${unit.getAttribute('data-listingid')}: True Price £${truePrice.toFixed(2)}`);
          }
        }
      }
    });
  }
}

// Execute the functions when the page is ready
window.addEventListener("load", calculateTruePriceForLotDetails);
window.addEventListener("load", modifyWatchingPage);
window.addEventListener("load", modifyListingsPage);  
