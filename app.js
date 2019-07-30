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
    logData: function() {
      return data;
    }
  };
})();

// UI Controller
const UICtrl = (function() {
  const UISelectors = {
    itemList: "#item-list"
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
    }
  };
})();

// App Controller
const App = (function(ItemCtrl, UICtrl) {
  // public methods
  return {
    init: function() {
      console.log("Initializing app...");
      // Fetch items from data structure
      const items = ItemCtrl.getItems();
      // Populate list with items
      UICtrl.populateItemList(items);
    }
  };
})(ItemCtrl, UICtrl);

// Initialize app
App.init();
