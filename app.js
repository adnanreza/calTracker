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

  //public methods
  return {
    logData: function() {
      return data;
    }
  };
})();

// UI Controller
const UICtrl = (function() {
  //public methods
  return {};
})();

// App Controller
const App = (function(ItemCtrl, UICtrl) {
  //public methods
  return {
    init: function() {
      console.log("Initializing app...");
    }
  };
})(ItemCtrl, UICtrl);

// Initialize app
App.init();
