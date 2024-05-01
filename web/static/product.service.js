function getProducts() {
  fetch("/api/products")
    .then((response) => response.json())
    .then((data) => {
      // Handle data
      console.log(data);

      // Get table body
      var productListBody = document.querySelector("#product-list tbody");
      productListBody.innerHTML = ""; // Clear previous data

      // Loop through products and populate table rows
      data.forEach((product) => {
        var row = document.createElement("tr");

        // Name
        var nameCell = document.createElement("td");
        nameCell.textContent = product.name;
        row.appendChild(nameCell);

        // Description
        var descriptionCell = document.createElement("td");
        descriptionCell.textContent = product.description;
        row.appendChild(descriptionCell);

        // Price
        var priceCell = document.createElement("td");
        priceCell.textContent = product.price;
        row.appendChild(priceCell);

        // Stock
        var stockCell = document.createElement("td");
        stockCell.textContent = product.stock;
        row.appendChild(stockCell);
        
        // Actions
        var actionsCell = document.createElement("td");

        // Edit link
        var editLink = document.createElement("a");
        editLink.href = `/edit-product/${product.id}`;
        editLink.textContent = "Edit";
        editLink.className = "btn btn-primary mr-2";
        actionsCell.appendChild(editLink);

        // Delete link
        var deleteLink = document.createElement("a");
        deleteLink.href = "#";
        deleteLink.textContent = "Delete";
        deleteLink.className = "btn btn-danger";
        deleteLink.addEventListener("click", function () {
          deleteProduct(product.id);
        });
        actionsCell.appendChild(deleteLink);

        row.appendChild(actionsCell);

        productListBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error:", error));
}

function createProduct() {
  var data = {
    name: document.getElementById("product-name").value,
    price: document.getElementById("product-price").value,
    stock: document.getElementById("product-quantity").value,
    description: document.getElementById("product-description").value,
  };

  fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handle success
      console.log(data);
    })
    .catch((error) => {
      // Handle error
      console.error("Error:", error);
    });
}

function updateProduct(e) {
  var productId = document.getElementById("product-id").value;
  
  var data = {
    name: document.getElementById("name").value,
    price: document.getElementById("price").value,
    description: document.getElementById("description").value,
    stock: document.getElementById("stock").value,
  };

  fetch(`/api/products/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handle success
      console.log(data);
      // Optionally, redirect to another page or show a success message
    })
    .catch((error) => {
      // Handle error
      console.error("Error:", error);
    });
}

function deleteProduct(productId) {
  console.log("Deleting product with ID:", productId);
  if (confirm("Are you sure you want to delete this product?")) {
    fetch(`/api/products/${productId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Handle success
        console.log("Product deleted successfully:", data);
        // Reload the product list
        getProducts();
      })
      .catch((error) => {
        // Handle error
        console.error("Error:", error);
      });
  }
}
