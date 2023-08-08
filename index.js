const path = require("path");
const {
    read_logs,
    count_api_endpoints,
    count_api_calls_per_min,
    count_api_calls_by_code,
} = require("./utility");
const log_file_path = path.join("logs", "prod-api-prod-out.log");
const ora = require("ora"); //light-weight loading spinner
const { format_table } = require("./format_table");

async function main() {
    try {
        const spinner = ora().start(); //start spinner
        const parsed_logs = await read_logs(log_file_path); // process the logs in stream

         // Get the command-line argument (node index.js <command>)
        const [, , command] = process.argv;

        switch (command) {
            case "status":
                // Count API calls by status code
                const count_status_result = count_api_calls_by_code(parsed_logs);
                console.log("api calls by status code are");
                spinner.stop();
                format_table(count_status_result);
                break;
            case "endpoints":
                // Count API calls by endpoint
                const count_endpoint_result = count_api_endpoints(parsed_logs);
                console.log("Endpoint counts are:");
                spinner.stop();
                format_table(count_endpoint_result);
                break;

            case "calls":
                 // Count API calls per minute
                const count_call_result = count_api_calls_per_min(parsed_logs);
                console.log("API Calls per Minute:");
                spinner.stop();
                format_table(count_call_result);
                break;

            default:
                // Display help information for incorrect or missing command
                spinner.stop();
                console.log("Usage: node index <command>");
                console.log("Available commands: status , endpoints, calls");
        }
    } catch (err) {
        console.error("Error occurred:", err);
    }
}

main();
