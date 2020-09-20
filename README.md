Start DB:
```
docker-compose -f stack.yml up
```

Start app:
```
npm install
cd web && npm install && cd ..
cd api && npm install && cd ..
npm start
```