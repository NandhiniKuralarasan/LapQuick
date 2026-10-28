 const form = document.getElementById("laptop-form");

 const selectedLaptops=[];
 
const comparisonList = document.getElementById("comparison-list");
const comparisonMessage = document.getElementById("comparison-message");


 // creating sample laptop data
 const laptops=[
    {
       
     name: "ASUS Vivobook Go 14",
     brand: "ASUS",
     price: 34490,
     processor: "AMD Ryzen 3 7320U",
     ram: "8GB",
     storage: "512GB SSD",
     usage: ["study", "office", "coding"]
    },
    {
    name: "Lenovo IdeaPad Slim 3",
    brand: "Lenovo",
    price: 64500,
    processor: "AMD Ryzen 5 7520U",
    ram: "8GB DDR5",
    storage: "512GB SSD",
    usage: ["study", "office", "coding"]
    },
    {
    name: "Acer Nitro V 15",
    brand: "Acer",
    price: 75040,
    processor: "AMD Ryzen 7 7735HS",
    ram: "16GB DDR5",
    storage: "512GB SSD",
    usage: ["coding", "design", "gaming"]
    },
    {
    name: "Dell Inspiron 15 3535",
    brand: "Dell",
    price: 56990,
    processor: "AMD Ryzen 5 7530U",
    ram: "16GB DDR4",
    storage: "512GB SSD",
    usage: ["study", "office", "coding"]
    }
];


  form.addEventListener("submit", function(event) {
  event.preventDefault();

  const budget = document.getElementById("budget").value;
  const usage = document.getElementById("usage").value;

  if (budget === "" || usage === "") {
    alert("Please select your budget and laptop usage.");
    return;
  }
// filtering data
  const selectedBudget = Number(budget);

const recommendedLaptops = laptops.filter(function(laptop) {
  let matchesBudget = false;

  if (selectedBudget === 30000) {
    matchesBudget = laptop.price < 30000;
  } else if (selectedBudget === 50000) {
    matchesBudget = laptop.price >= 30000 &&
                    laptop.price <= 50000;
  } else if (selectedBudget === 80000) {
    matchesBudget = laptop.price > 50000 &&
                    laptop.price <= 80000;
  } else if (selectedBudget === 100000) {
    matchesBudget = laptop.price > 80000;
  }

  return matchesBudget && laptop.usage.includes(usage);
});
// sorting
recommendedLaptops.sort(function(a, b) {
  const scoreA = selectedBudget - a.price;
  const scoreB = selectedBudget - b.price;

  return scoreA - scoreB;
});

  const laptopList = document.getElementById("laptop-list");

  laptopList.innerHTML = "";

  if (recommendedLaptops.length === 0) {
    laptopList.textContent = "No laptops match your selections. Try increasing your budget or choosing a different usage.";
  }
  else {
    recommendedLaptops.forEach(function(laptop) {
    const laptopCard = document.createElement("div");

    laptopCard.className = "laptop-card";
    laptopCard.innerHTML = `
     ${laptop === recommendedLaptops[0]
  ? '<span class="recommendation-badge">Best Match</span>'
  : ''}
      <h3>${laptop.name}</h3>
      <p>Price: ₹${laptop.price.toLocaleString("en-IN")}</p>
      <p>Processor: ${laptop.processor}</p>
      <p>RAM: ${laptop.ram}</p>
      <p>Storage: ${laptop.storage}</p>
      <p>Suitable for: ${laptop.usage.join(", ")}</p>
      <button class="compare-button">Compare</button>
    `;
     
     
const compareButton = laptopCard.querySelector(".compare-button");

compareButton.addEventListener("click", function() {
  if (selectedLaptops.includes(laptop)) {
    alert("This laptop is already selected.");
    return;
  }

  if (selectedLaptops.length >= 2) {
    alert("You can compare only two laptops at a time.");
    return;
  }

  selectedLaptops.push(laptop);

comparisonMessage.textContent =
  selectedLaptops.length + " of 2 laptops selected.";


comparisonList.innerHTML = `
  <table class="comparison-table">
    <thead>
      <tr>
        <th>Specification</th>
        ${selectedLaptops.map(function(item) {
          return `<th>${item.name}</th>`;
        }).join("")}
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Price</td>
        ${selectedLaptops.map(function(item) {
          return `<td>₹${item.price.toLocaleString("en-IN")}</td>`;
        }).join("")}
      </tr>
      <tr>
        <td>Processor</td>
        ${selectedLaptops.map(function(item) {
          return `<td>${item.processor}</td>`;
        }).join("")}
      </tr>
      <tr>
        <td>RAM</td>
        ${selectedLaptops.map(function(item) {
          return `<td>${item.ram}</td>`;
        }).join("")}
      </tr>
      <tr>
        <td>Storage</td>
        ${selectedLaptops.map(function(item) {
          return `<td>${item.storage}</td>`;
        }).join("")}
      </tr>
    </tbody>
  </table>
`;
});


    laptopList.appendChild(laptopCard);
  });
}
  });
//   reset button code
const resetButton = document.getElementById("reset-button");

resetButton.addEventListener("click",function(){
    form.reset();

    document.getElementById("laptop-list").innerHTML = "";
  selectedLaptops.length = 0;
  comparisonList.innerHTML = "";

comparisonMessage.textContent =
    "Select two laptops to compare their specifications.";
});