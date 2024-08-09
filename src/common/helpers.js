// MIT License
//
// Copyright (c) 2023 Mark "Grandy" Bishop
// https://github.com/GrandyB/SheetToHTML
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

class Helpers {
  /**
   * @param cellReference {string} a Google Sheet cell reference, e.g. "G4"
   * @param offset {number} the number of columns to shift e.g. 2
   * @return {string} a new cell reference, e.g. "I4" (using example parameters above)
   */
  static relativeColumn(cellReference, offset) {
    if (offset == 0) return cellReference;
    const column = cellReference.replace(/\d+/g, "");
    const columnIndex = this.columnToIndex(column);
    const newIndex = columnIndex + offset;
    const newColumn = this.indexToColumn(newIndex);
    const row = cellReference.replace(/[A-Z]+/g, "");

    return newColumn + row;
  }

  /**
   * @param cellReference {string} a Google Sheet cell reference, e.g. "G4"
   * @param offset {number} the number of rows to shift e.g. 2
   * @return {string} a new cell reference, e.g. "G6" (using example parameters above)
   */
  static relativeRow(cellReference, offset) {
    if (offset == 0) return cellReference;
    const row = parseInt(cellReference.replace(/\D+/g, ""));
    const newRow = row + offset;
    const column = cellReference.replace(/\d+/g, "");

    return column + newRow;
  }

  // // Helper function to convert column indices to letters
  static indexToColumn(column) {
    var temp, letter = '';
    column += 1;
    while (column > 0) {
      temp = (column - 1) % 26;
      letter = String.fromCharCode(temp + 65) + letter;
      column = (column - temp - 1) / 26;
    }
    return letter;
  }

  // Helper function to convert column letters to indices
  static columnToIndex(letter) {
    var column = -1, length = letter.length;
    for (var i = 0; i < length; i++) {
      column += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
    }
    return column;
  }

  static addVideoSrcListener(videoElement, func) {
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
                func(videoElement);
            }
        });
    });
    
    observer.observe(videoElement, {
        attributes: true
    });
    
    func(videoElement);
  }
}