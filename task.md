# Task #0 Log digestion 

## data
https://drive.google.com/drive/folders/1DzmYjCawYct6kfstCyUzU_kxIHnahGWD?usp=sharing


## What needs to be done

Download the data above and split it into time series data. to get the following insights.

1. Which endpoint is called how many times
2. How many API calls were being made on per minute basis
3. How many API calls are there in total for each HTTP status code 


### Rules/criteria
- The entire app/project needs to be done as CLI. No server or browser should be needed
- your code must be for NodeJS. so either write it in JS or in TS
- Show all the data in a formatted table like following 


```
┌──────────────┬────────────┬───────┐
│   (index)    │ statusCode │ count │
├──────────────┼────────────┼───────┤
│ Server Error │    500     │  23   │
│  Not found   │    404     │  23   │
│      OK      │    200     │ 1256  │
│ Not changed  │    304     │  50   │
└──────────────┴────────────┴───────┘                    
```


## How to up your selection chances? (Optional)

- Use typescript
- Comment your code properly
- Have all edge cases handled
- import the lowest amount of packages with the smallest size
- proper readme and other instuction to run the code