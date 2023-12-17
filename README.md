# Smart Education

This project requires docker installed in your system

## Running locally

Go to project root directory in terminal. Then run following commands:

```sh
docker compose build # one time only unless a package.json file is edited
docker compose up # starts the server
```

Now visit [http://localhost:3000](http://localhost:3000).

## Contributing

Open the project in your favourite editor (peferably vscode). Start the application using `docker compose up` command. Live reloading and hot module reloading (HMR) is implemented so no need to refresh the page on every code changes.

## API documentation

Use [./smart-education.postman_collection.json](./smart-education.postman_collection.json) file in postman to import the collection.
