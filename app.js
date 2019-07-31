// Storage Controller

// Item Controller
const ItemCtrl = (function() {
  // Item Constructor
  const Item = function(id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data structure / State
  const data = {
    items: [
      { id: 0, name: "Halim", calories: 900 },
      { id: 1, name: "Pizza slice", calories: 350 },
      { id: 2, name: "Chicken Burger", calories: 950 }
    ],
    currentItem: null,
    totalCalories: 0
  };

  // public methods
  return {
    getItems: function() {
      return data.items;
    },
    addItem: function(name, calories) {
      let ID;
      // create id
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // calories to number
      calories = parseInt(calories);

      // create new Item
      newItem = new Item(ID, name, calories);
      data.items.push(newItem);

      return newItem;
    },
    logData: function() {
      return data;
    }
  };
})();

// UI Controller
const UICtrl = (function() {
  const UISelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories"
  };

  //public methods
  return {
    populateItemList: function(items) {
      let html = "";

      items.forEach(function(item) {
        html += `<li class="collection-item" id="item-${item.id}">
                    <strong>${item.name}: </strong> <em>${
          item.calories
        } calories</em>
                    <a href="#" class="secondary-content">
                    <i class="fa fa-pencil edit-item"></i>
                    </a>
                </li>`;
      });

      // insert list items into UI
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    getItemInput: function() {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      };
    },
    getSelectors: function() {
      return UISelectors;
    }
  };
})();

// App Controller
const App = (function(ItemCtrl, UICtrl) {
  // load event listeners
  const loadEventListeners = function() {
    // get UI selectors
    const UISelectors = UICtrl.getSelectors();
    // add item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener("click", itemAddSubmit);
  };

  // Add item submit
  const itemAddSubmit = function(e) {
    // Get form input from UI Controller
    const input = UICtrl.getItemInput();

    // check for name and calorie input
    if (input.name !== "" && input.calories !== "") {
      // add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);
    } else {
    }

    e.preventDefault();
  };

  // public methods
  return {
    init: function() {
      console.log("Initializing app...");
      // Fetch items from data structure
      const items = ItemCtrl.getItems();
      // Populate list with items
      UICtrl.populateItemList(items);
      // Load Event Listeners
      loadEventListeners();
    }
  };
})(ItemCtrl, UICtrl);

// Initialize app
App.init();
