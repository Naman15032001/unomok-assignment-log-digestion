# unomok-assignment-log-digestion

# logs-digestion-cli 
This a simple Logs Analyzer Node JS CLI

## Requirements

- Node.js 
  
## Clone the repository and install dependencies

``` 
//on local
git clone https://github.com/Naman15032001/unomok-assignment-log-digestion
cd unomok-assignment-log-digestion
npm install
```

# Usage

```
Usage: node index <command>
Available commands: status , endpoints, calls
```

# Output (Eg)

```
node index status
```
--------------------------------------
| status_info  │ status_code │ count |
|------------------------------------|
| OK           │ 200         │ 54373 |
|------------------------------------|
| Not found    │ 404         │ 46699 |
|------------------------------------|
| Server Error │ 500         │ 1284  |
|------------------------------------|
| Not changed  │ 304         │ 13390 |
--------------------------------------
