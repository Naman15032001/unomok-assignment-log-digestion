const fs = require("fs");

// Function to read and parse logs from a file
async function read_logs(file_path) {
    return new Promise((resolve, reject) => {
      const processed_logs = [];
  
      // Create a read stream to process the log file
      const readStream = fs.createReadStream(file_path, { encoding: "utf8" });
  
      readStream.on("data", (chunk) => {
        const lines = chunk.toString().split(/\r?\n/);
  
        for (const line of lines) {
          const entry = parse_logs(line);
          if (entry) {
            processed_logs.push(entry);
          }
        }
      });
  
      readStream.on("error", (err) => reject(err));
      readStream.on("end", () => resolve(processed_logs));
    });
  }

// Function to parse a log entry
function parse_logs(input_line) {
    const parts = input_line.split(": ");

    if (parts.length < 2) {
        return null;
    }

    const timestamp = parts[0];
    const event_details = parts[1].trim();

    // Regular expression to extract method, endpoint, and status code
    const regex = /.*"(GET|POST|PUT|DELETE|PATCH) (\S+).*HTTP\/\d\.\d" (\d{3})/;

    const match = event_details.match(regex);

    if (!match || !timestamp) {
        return null;
    }

    // Extract details from the match
    const [, method, endpoint, status_code] = match;
    const parsed_timestamp = new Date(timestamp);

    if (
        !(parsed_timestamp instanceof Date) ||
        isNaN(parsed_timestamp) ||
        isNaN(parseInt(status_code))
    ) {
        return null;
    }

    return {
        timestamp: parsed_timestamp,
        method: method,
        endpoint: endpoint,
        status_code: status_code,
    };
}

// Function to count API endpoints
function count_api_endpoints(parsed_logs) {
    const endpoint_map = {}; // endpoint -> count

    for (const parsed_log of parsed_logs) {
        if (parsed_log.endpoint) {
            endpoint_map[parsed_log.endpoint] = (endpoint_map[parsed_log.endpoint] || 0) + 1;
        }
    }

    // Convert endpoint_map to an array of objects
    return Object.entries(endpoint_map).map(([Endpoint, Count]) => ({
        Endpoint,
        Count,
    }))
}

// Function to count API calls per minute
function count_api_calls_per_min(parsed_logs) {
    const calls_per_min_map = {}; // timestamp unique -> count

    for (const entry of parsed_logs) {
        const minute = entry.timestamp.toISOString().slice(0, 16);
        calls_per_min_map[minute] = (calls_per_min_map[minute] || 0) + 1;
    }

    // Convert calls_per_min_map to an array of objects
    return Object.entries(calls_per_min_map).map(([Minute, API_Count]) => ({
        Minute,
        API_Count,
    }))
}

// Function to count API calls by status code
function count_api_calls_by_code(parsed_logs) {
    const map = {};

    for (const parsed_log of parsed_logs) {
        if (parsed_log.status_code) {
            const status_info = get_status_info(parsed_log.status_code);
            map[status_info] = (map[status_info] || 0) + 1;
        }
    }

    // Convert map to an array of objects
    let data_array = [];

    for (let key in map) {
        let status_info = key;
        let status_code = get_status_code(status_info);
        let count = map[key];
        data_array.push({ status_info, status_code, count });
    }

    return data_array;
}

// Function to get status info from status code
function get_status_info(status_code) {
    let obj = {
        404: "Not found",
        500: "Server Error",
        304: "Not changed",
        200: "OK",
    };
    if(!obj[status_code]){
        return "OK"
    }
    return obj[status_code]
}

// Function to get status code from status info
function get_status_code(status_info) {
    switch (status_info) {
        case "Not found":
            return 404;
        case "Server Error":
            return 500;
        case "Not changed":
            return 304;
        default:
            return 200;
    }
}

module.exports = {
    read_logs,
    parse_logs,
    count_api_endpoints,
    count_api_calls_per_min,
    count_api_calls_by_code  
};
