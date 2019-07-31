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
      //   { id: 0, name: "Halim", calories: 900 },
      //   { id: 1, name: "Pizza slice", calories: 350 },
      //   { id: 2, name: "Chicken Burger", calories: 950 }
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
    getItemById: function(id) {
      let found = null;
      // loop through item
      data.items.forEach(function(item) {
        if (id === item.id) {
          found = item;
        }
      });
      return found;
    },
    getCurrentItem: function() {
      return data.currentItem;
    },
    setCurrentItem: function(item) {
      data.currentItem = item;
    },
    getTotalCalories: function() {
      let total = 0;
      // Loop through items and add calories
      data.items.forEach(function(item) {
        total += item.calories;
      });
      // Set total calories in data structure
      data.totalCalories = total;
      return data.totalCalories;
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
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories"
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
    addListItem: function(item) {
      //Show the list
      document.querySelector(UISelectors.itemList).style.display = "block";
      // Create li element
      const li = document.createElement("li");
      li.className = "collection-item";
      // Add id
      li.id = `item-${item.id}`;
      // Add html
      li.innerHTML = `<strong>${item.name}: </strong><em>${
        item.calories
      } calories</em><a href="#" class="secondary-content"><i class="fa fa-pencil edit-item"></i></a>`;

      // Insert item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },
    clearInput: function() {
      document.querySelector(UISelectors.itemNameInput).value = "";
      document.querySelector(UISelectors.itemCaloriesInput).value = "";
    },
    hideList: function() {
      document.querySelector(UISelectors.itemList).style.display = "none";
    },
    addItemToForm: function() {
      document.querySelector(
        UISelectors.itemNameInput
      ).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(
        UISelectors.itemCaloriesInput
      ).value = ItemCtrl.getCurrentItem().calories;
      UICtrl.showEditState();
    },
    showTotalCalories: function(totalCalories) {
      document.querySelector(
        UISelectors.totalCalories
      ).textContent = totalCalories;
    },
    clearEditState: function() {
      UICtrl.clearInput();
      document.querySelector(UISelectors.updateBtn).style.display = "none";
      document.querySelector(UISelectors.deleteBtn).style.display = "none";
      document.querySelector(UISelectors.backBtn).style.display = "none";
      document.querySelector(UISelectors.addBtn).style.display = "inline";
    },
    showEditState: function() {
      document.querySelector(UISelectors.updateBtn).style.display = "inline";
      document.querySelector(UISelectors.deleteBtn).style.display = "inline";
      document.querySelector(UISelectors.backBtn).style.display = "inline";
      document.querySelector(UISelectors.addBtn).style.display = "none";
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
    // edit icon click event
    document
      .querySelector(UISelectors.itemList)
      .addEventListener("click", itemEditClick);
  };

  // Add item submit
  const itemAddSubmit = function(e) {
    // Get form input from UI Controller
    const input = UICtrl.getItemInput();

    // check for name and calorie input
    if (input.name !== "" && input.calories !== "") {
      // add item
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      // add item to UI list
      UICtrl.addListItem(newItem);
      // get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // add total calories to UI
      UICtrl.showTotalCalories(totalCalories);
      // clear fields
      UICtrl.clearInput();
    }

    e.preventDefault();
  };

  // Update item submit
  const itemEditClick = function(e) {
    // use event delegation here since list is loaded only after item added (not on init)
    if (e.target.classList.contains("edit-item")) {
      // get the list item id (eg. item-0)
      const listId = e.target.parentNode.parentNode.id;
      // break into an array
      const listIdArr = listId.split("-");
      // get actual id
      const id = parseInt(listIdArr[1]);
      // get item
      const itemToEdit = ItemCtrl.getItemById(id);
      // set current item
      ItemCtrl.setCurrentItem(itemToEdit);
      // add item to form
      UICtrl.addItemToForm();
    }
    e.preventDefault();
  };

  // public methods
  return {
    init: function() {
      // Clear edit state / set initial state
      UICtrl.clearEditState();
      // Fetch items from data structure
      const items = ItemCtrl.getItems();
      // Check if any items are there
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate list with items
        UICtrl.populateItemList(items);
      }
      // get total calories
      const totalCalories = ItemCtrl.getTotalCalories();
      // add total calories to UI
      UICtrl.showTotalCalories(totalCalories);
      // Load Event Listeners
      loadEventListeners();
    }
  };
})(ItemCtrl, UICtrl);

// Initialize app
App.init();
