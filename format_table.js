const Table = require("cli-table3");

// It creates a well formatted table and prints it to console
function format_table(data) {
    const column_names = Object.keys(data[0]);

    // Create a new instance of the cli-table3 with formatting configuration
    const table = new Table({
        head: column_names, // Set the column names as the table headers
        chars: {
            top: "-",
            "top-mid": "-",
            "top-left": "-",
            "top-right": "-",
            bottom: "-",
            "bottom-mid": "-",
            "bottom-left": "-",
            "bottom-right": "-",
            left: "|",
            "left-mid": "|",
            mid: "-",
            "mid-mid": "-",
            right: "|",
            "right-mid": "|",
        },
    });

    // Iterate through each row in the data and push in the table object
    data.forEach((row) => {
        const formatted_row = column_names.map((name) => String(row[name]));
        table.push(formatted_row);
    });

    console.log(table.toString()); // display a well formatted table
}

module.exports = {
    format_table
}