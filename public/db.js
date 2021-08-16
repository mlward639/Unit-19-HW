let db;
let budgetVersion;

// Create a new db request for budget database
const request = indexedDB.open("BudgetDB", budgetVersion || 21);

request.onupgradeneeded = function (e) {
  console.log("Upgrade needed in IndexDB");

  const { oldVersion } = e;
  const newVersion = e.newVersion || db.version;

  console.log(
    `BudgetDB updated from ${oldVersion} version to ${newVersion} version`
  );

  db = e.target.result;

  if (db.objectStoreNames.length === 0) {
    db.createObjectStore("BudgetStore", { autoIncrement: true });
  }
};

request.onerror = function (e) {
  console.log(`error. ${e.target.errorCode}`);
};

function checkDatabase() {
  console.log("check db invoked");

  // Open a transaction on BudgetStore db
  let transaction = db.transaction(["BudgetStore"], "readwrite");

  // access the BudgetStore object
  const store = transaction.objectStore("BudgetStore");

  // Get all records from store and set to the variable getAll
  const getAll = store.getAll();

  // If request is successful...
  getAll.onsuccess = function () {
    // If there are items in the store, bulk add them when back online
    if (getAll.result.length > 0) {
      fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((res) => {
          // If returned response is not empty then open another transaction to BudgetStore with the ability to read and write
          if (res.length !== 0) {
            transaction = db.transaction(["BudgetStore"], "readwrite");
            // Then assign the current store to the variable currentStore
            const currentStore = transaction.objectStore("BudgetStore");
            // And clear existing entries after successful bulk add
            currentStore.clear();
            console.log("Clearing store");
          }
        });
    }
  };
}

request.onsuccess = function (e) {
  console.log("success");
  db = e.target.result;

  // Check if app is online before reading from db
  if (navigator.onLine) {
    console.log("Backend is online");
    checkDatabase();
  }
};

// storing whatever the content is into the indexdb database
const saveRecord = (record) => {
  console.log("Save record invoked");
  // Create a transaction on the BudgetStore db with read write access
  const transaction = db.transaction(["BudgetStore"], "readwrite");

  // Access your BudgetStore object store
  const store = transaction.objectStore("BudgetStore");

  // Add record to your store with add method
  store.add(record);
};

// Listen for app coming back online
window.addEventListener("online", checkDatabase);
