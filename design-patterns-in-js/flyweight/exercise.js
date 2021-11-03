class Sentence {
  constructor(sentence) {
    this.sentence = sentence;
    this.capitalize = false;
  }

  at(index) {
    const sentenceLen = this.sentence.split(' ').length;
    if (index > sentenceLen - 1 || index < 0) {
      throw new Error('index out ');
    }

    this.index = index;

    return this;
  }

  toString() {
    return this.sentence
      .split(' ')
      .map((word, i) =>
        this.capitalize && this.index === i ? word.toUpperCase() : word
      )
      .join(' ');
  }
}

let s = new Sentence('hola mundo!!');
s.at(1).capitalize = true;
console.log(s.toString());
