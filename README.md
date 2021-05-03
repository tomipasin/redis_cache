# Cache with Redis in Node.js 
A cache implementation can reduce both time of response on requisitions and also the amount of server's resources.

Here I've implemented a cache using Redis in a simple code that retrieve brazilian CEP (ZIP code).

## How it works?
First time the code catch data from API but also store this data in Redis. From this on the code try to find the data on cache. If exists then data from cahe is delivered. If isn't in cache the code will catch data from API and save it on cache. 


```javascript
        client.get(searchTerm, async (err, cep) => {
            if (err) throw err;
    
            if (cep) {
                res.status(200).send({
                    cep: JSON.parse(cep),
                    message: "Dados do cache!"
                });
                console.log("Dados do cache!")
            }
            else {
                const cep = await axios.get(`http://viacep.com.br/ws/${searchTerm}/json`);
                client.setex(searchTerm, 600, JSON.stringify(cep.data));
                res.status(200).send({
                    cep: cep.data,
                    message: "Dados da API. Este CEP não estava no cache. Agora estará ;-)"
                });
                console.log("Dados da API. Este CEP não estava no cache. Agora estará ;-)")
            }
        });

```

I've not implemented yet a TTL on this data because we haven't CEP changes so easely but it's possible define for how long the data will be stored on cache (very useful with data that changes a lot.)   