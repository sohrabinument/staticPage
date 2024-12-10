const bgColor = ["lightgreen", "orange", "lightblue", "yellow"];

function createListItem(elementOrder, bgColor, slotIndex) {
  const li = document.createElement("li");
  li.classList.add(
    "item",
    "product",
    "product-item",
    "pa-recommendation",
    `order-${elementOrder}`
  );
  li.style.order = elementOrder;
  li.style.minHeight = "500px";

  // Create the <div> element
  const div = createInnerDiv(bgColor, slotIndex);

  // Append the div to the li
  li.appendChild(div);

  return li;
}

// Function to create the inner <div> with styles and content
function createInnerDiv(bgColor, slotIndex) {
  const div = document.createElement("div");
  div.classList.add("inner-div");

  // Apply styles to the div
  const styles = {
    height: "100%",
    borderRadius: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "20px",
    backgroundColor: bgColor,
  };

  // Set the styles using Object.assign
  Object.assign(div.style, styles);

  // Add the text to the div
  div.innerText = `PA  SLOT: ${slotIndex}`;

  return div;
}

// Function to insert new items at the top and adjust orders of existing items
function insertNewItems() {
  const productList = document.querySelector(".products-grid .product-items");

  // Get all existing product items
  const existingItems = Array.from(
    productList.querySelectorAll(".product-items .product-item")
  );

  let updateElementOrder = [];
  let trackProductOrder = [];

  // Loop through only the elements in bgColor array
  bgColor.forEach((color, index) => {
    // Check if there are enough existing items to insert the new item
    if (index < existingItems.length) {
      const item = existingItems[index]; // Get the corresponding existing item
      const currentOrder = parseInt(item.style.order, 10);
      const isBannerProduct = item.classList.contains("banner-product");

      // Create new item with order after the current one
      const newItem = createListItem(currentOrder + 1, color, index + 1);

      // Insert the new item after the current item
      item.insertAdjacentElement("afterend", newItem);
      updateElementOrder.push(currentOrder);

      // If it's not a banner product, add the current order to update the list
      if (!isBannerProduct) {
        trackProductOrder.push(currentOrder);
      }
    }
  });

  updateExistingItemsOrder(updateElementOrder, trackProductOrder);
}

// Function to update the order of the existing items after inserting new ones
function updateExistingItemsOrder(updateElementOrder, trackProductOrder) {
  const lastUpdatedProductOrder =
    updateElementOrder[updateElementOrder.length - 1];

  // Loop through the updateElementOrder array to adjust the order of the existing items
  updateElementOrder.forEach((currentOrder, index) => {
    // If the current order is present in trackProductOrder, we need to update it
    if (trackProductOrder.includes(currentOrder)) {
      const newOrder = lastUpdatedProductOrder + index + 1; // Increment order by the number of new items
      const itemToUpdate = document.querySelector(
        `.product-item[style*="order: ${currentOrder}"]`
      );

      // Update the order of the element in the DOM
      if (itemToUpdate) {
        itemToUpdate.style.order = newOrder + 1;
        console.log(`Updated order-${currentOrder} to order-${newOrder}`);
      }
    }
  });
}

// Call the function to insert new items and adjust orders
document.addEventListener("DOMContentLoaded", () => {
  insertNewItems();
});
