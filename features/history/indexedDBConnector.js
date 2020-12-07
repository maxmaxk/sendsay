/**********************************************
* This module exports an instance of IndexedDatabase class
* It contains all necessary methods to work with IndexedDb browser database 
*
*
***********************************************/

class IndexedDatabase{
  constructor(){
    this.db = null;
  }
  openDatabase = () => {
    return new Promise((resolve, reject) => {
      const openDB = indexedDB.open("sendsay");
      openDB.onupgradeneeded = () => {
        this.db = openDB.result;
        if (!this.db.objectStoreNames.contains("history")){
          this.db.createObjectStore("history");
        }
        resolve();
      }
      openDB.onerror = () => {
        reject(new Error("Error while open IndexedDB"));
      }
      openDB.onsuccess = () => {
        this.db = openDB.result;
        resolve();
      }
    });
  }
  updateDatabase = (historyItems) => {
    if(!this.db){
      console.log("IndexedDB didn't open");
      return;
    }
    const transaction = this.db.transaction("history", "readwrite");
    const history = transaction.objectStore("history");
    history.clear();
    historyItems.forEach((item, index) => {
      history.put(JSON.stringify(item), index);
    });
  }
  getHistory = () => {
    return new Promise((resolve, reject) => {
      if(!this.db){
        reject(new Error("IndexedDB didn't open"));
      }
      const transaction = this.db.transaction("history");
      const history = transaction.objectStore("history");
      let request = history.getAll();
      request.onsuccess = () => {
        resolve(request.result);
      }
      request.onerror = () => {
        reject(new Error("Can't get history data from IndexedDB"));
      }
    })
  }
}

export const indexedDatabase = new IndexedDatabase();
