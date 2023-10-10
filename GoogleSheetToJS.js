// MIT License
//
// Copyright (c) 2023 Mark "Grandy" Bishop
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

class GoogleSheetToJS {
    /* 
     * Constructor; creates initial state and begins the update loop.
     * @param sheetId
     *          the ID of the Google sheet.
     * @param tabNum
     *          the # of the tab (left to right, beginning at index 1)
     * @param freq
     *          the looping interval (in milliseconds)
     */
    constructor(apiKey, sheetId, tabName, freq) {
        this.url = "https://sheets.googleapis.com/v4/spreadsheets/" + sheetId + "/values/" + tabName + "?key=" + apiKey;
        this.freq = freq;
        console.log("Querying '" + this.url + "' every '" + this.freq + "ms' (if looping is enabled)");

        // 'cellValues' is our cache of cell ids to their content, e.g. "C3" => "Test value"
        this.cellValues = new Map();
    }

    /*
     * updateLoop - our main timer and update function.
     * Fetching the json, drilling down into its cells and setting document elements
     * based on their tag names.
     */
    updateLoop() {
        this.update();
        /*
         * "Google Sheets API has a limit of 500 requests per 100 seconds per project, and 100 requests per 100 seconds per user."
         * I imagine there'd be multiple pages using this, some of which will need quicker update times than others.
         * Every 2-3 seconds is probably a safe bet..?
         */
        setTimeout(this.updateLoop.bind(this), this.freq);
    }

    update() {
        fetch(this.url)
            .then(this.handleErrors)
            .then(res => res.json())
            .then((data) => {
                var values = data.values;
                var entry = [];
                for (let row = 0; row < values.length; row++) {
                  for (let col = 0; col < values[row].length; col++) {
                    const cellRef = String.fromCharCode(65 + col) + (row + 1);
                    entry.push({
                      ref: cellRef,
                      value: values[row][col]
                    });
                  }
                }

                let that = this;
                entry.forEach(function(e, i){
                    let cellRef = e.ref;
                    let cellContent = e.value;

                    let existing = that.cellValues.get(cellRef);
                    if (existing == null || existing !== cellContent) {
                        // Only update document content if cells have changed values
                        console.debug(cellRef + " has changed; '" + existing + "' -> '" + cellContent + "'");
                        that.cellValues.set(cellRef, cellContent);

                        // Set the element
                        var outputElement = document.getElementById(cellRef);
                        if (outputElement != null) {
                            if (outputElement.nodeName.toLowerCase() === 'img') {
                                outputElement.src = cellContent.trim() === '' || cellContent === '#N/A' ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVQYV2NgYAAAAAMAAWgmWQ0AAAAASUVORK5CYII=' : cellContent;
                            } else {
                                console.debug(`Applying to '${cellRef}': '${cellContent}'`);
                                outputElement.innerHTML = cellContent;
                            }
                        }
                    }
                });

                console.debug("Update loop completed");

            }).catch(err => console.error(err));
    };

    /*
     * handleErrors - used to help diagnose any 404-esque errors during the fetch in updateLoop.
     */
    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }
}