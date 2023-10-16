// Register a Handlebars helper to format key-value pairs into a string
Handlebars.registerHelper('formatStyles', function(styles) {
    return Object.keys(styles)
      .map(key => `${key}: ${styles[key]}`)
      .join('; ');
});

// Register a Handlebars helper to add additional strings with a space between
Handlebars.registerHelper('concatenate', function(initial, additional) {
    var joined = [initial, additional].join(" ");
    return joined;
});

// "box" - a div with a span inside; expected data e.g: { class: "one two", style: "left: 200px; top: 100px" }
Handlebars.registerPartial("box", `
    <div class="{{class}}" style="{{style}}">
        <span id="{{cell}}"></span>
    </div>
`);
const partialBox = Handlebars.compile(`{{> box}}`);

// "box-absolute" - an absolutely positioned 'box'; expected data e.g: { class: 'one two', style: { left: '200px', top: '100px' }}
Handlebars.registerPartial("box-absolute", `{{> box class=(concatenate class 'absolute') }}`);
const partialBoxAbsolute = Handlebars.compile(`{{> box-absolute}}`);

// "box-centered" - a 'box-absolute', with centered text; expected data
Handlebars.registerPartial("box-centered", `{{> box-absolute class=(concatenate class 'flex-center-center') }}`);
const partialBoxCentered = Handlebars.compile(`{{> box-centered}}`);

// "box-left" - a 'box-absolute', with centered text; expected data
Handlebars.registerPartial("box-left", `{{> box-absolute class=(concatenate class 'flex-center-left') }}`);
const partialBoxLeft = Handlebars.compile(`{{> box-left}}`);

// "table-row" - 
Handlebars.registerPartial("table-row", `
    <div class="table-row absolute" style="left: {{rowLeft}}; top: {{rowTop}}">
        <div class="table-inner">
            {{#each cells}}
                {{> box-absolute }}
            {{/each}}
        </div>
    </div>
`);
const partialTableRow = Handlebars.compile(`{{> table-row }}`);

/**
 * Create a table row, starting at the given position and cell ref, extending along the row
 * for however many 'cellData' entries are provided.
 *
 * @param {string} cellRef e.g. "B2"
 * @param {object} position in pixels, e.g. {left: 200, top: 50}
 * @param {int} columnSpacing distance in pixels between each column, e.g. 10
 * @param {array} cellData array of objects, one per column in the table
 *      e.g. [{width: 150, height: 50, class: 'padding', alignment: 'flex-center-center', style: 'color: #000;'}], repeat
 * @returns {string} the generated html
 */
function relativeTableRow(cellRef, position, columnSpacing, cellData) {
    // adjust/generate data
    var newData = { rowLeft: `${position.left}px`, rowTop: `${position.top}px` };
    var cells = [];
    var previousCellLeft = 0;
    for (var i = 0; i < cellData.length; i++) {
        var cell = {};
        // Figure out cell references
        cell.cell = (i == 0) ? cellRef : Helpers.relativeColumn(cellRef, i);

        // Figure out positionings
        var data = cellData[i];
        cell.style = `top: 0px; left: ${previousCellLeft}px; width: ${data.width}px; height: ${data.height}px`;
        cell.style = data.style ? `${data.style} ${cell.style}` : cell.style;

        cell.class = data.alignment ? data.alignment : 'flex-center-left'; // default
        cell.class = data.class ? `${data.class} ${cell.class}` : cell.class;

        cells.push(cell);
        previousCellLeft = previousCellLeft + data.width + columnSpacing;
    }
    newData.cells = cells;
    console.log(newData);
    return partialTableRow(newData);
}

/**
 * Create an entire table, originating from the given position and cell ref, extending along
 * the row and the column.
 *
 * @param {string} cellRef e.g. "B2"
 * @param {int} numRows e.g. 4
 * @param {object} position in pixels, e.g. {left: 200, top: 50}
 * @param {int} columnSpacing distance in pixels between each column, e.g. 10
 * @param {int} rowSpacing distance in pixels from the top of one row, to the top of the next, e.g. 67
 * @param {array} cellData array of objects, one per column in the table
 *      e.g. [{width: 150, height: 50, class: 'padding', alignment: 'flex-center-center', style: 'color: #000;'}], repeat
 * @returns {string} the generated html
 */
function table(cellRef, numRows, position, columnSpacing, rowSpacing, cellData) {
    var html = "";

    for (var i = 0; i < numRows; i++) {
        html += relativeTableRow(Helpers.relativeRow(cellRef, i), position, columnSpacing, cellData);
        position.top += rowSpacing;
    }

    return html;
}