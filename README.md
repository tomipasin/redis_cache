# Cache with Redis in Node.js 
A cache implementation can reduce both time of response on requisitions and also the amount of server's resources.
Here I've implemented a cache using Redis. 
It's a simple code that retrieve brazilian CEP (ZIP code).
First time the code catch data from API but also store this data in Redis. From this on the code try to find the data on cache. If exists then data from cahe is delivered. If isn't in cache the code will catch data from API and save it on cache. 
I've not implemented yet a TTL on this data because we haven't CEP changes so easely but it's possible define for how long the data will be stored on cache (very useful with data that changes a lot.)   

