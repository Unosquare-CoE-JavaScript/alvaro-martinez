const fs = require('fs');

class Journal {
  constructor(props) {
    this.entries = {};
  }

  addEntry(text) {
    let c = ++Journal.count;
    let entry = `${c}: ${text}`;
    this.entries[c] = entry;
    return c;
  }

  removeEntry(index) {
    delete this.entries[index];
  }

  toString() {
    return Object.entries(this.entries).join('\n');
  }

  save(filename) {
    fs.writeFilesync(filename, this.toString());
  }

  load(filename) {}

  loadFromUrl(url) {}
}

Journal.count = 0;

class PersistenceManager {
  preprocess(j) {}

  saveToFile(journal, filename) {
    fs.writeFileSync(filename, journal.toString());
  }
}

let J = new Journal();
J.addEntry('hola');
J.addEntry('mundo');
console.log(J.toString());
