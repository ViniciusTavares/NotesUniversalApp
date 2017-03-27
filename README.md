<h1>Notes - Simple notations updated on real time!</h1>

<img src="/src/client/static/img/header.png" alt="Cover image" />

<h3>Description:</h3>
Notes is a demo of how to use React, Redux, REST Services, Sockeio.io, Webpack and Universal Javascript together. Its interface is simple and objective, in this moment there're only 2 pages, however the most important part of this project is its background development.  

It contains some modern principles and structures, for instance: Single Page Application, State container and Universal Javascript through server rendering and processing the initial application state. Below there is a list with not only the principles, but also the frameworks that have been used here.  

The whole project has been coded in ES6 ( ES-2015 ), so is necessary to transpile the code. Webpack has chosen to prepare our bundle, executing babel-loader for transpiling the code and setting some enviroment variables. I believe it's awesome, working well not only with client bundles, but also server bundles too.  

Gulp has an import participation, once its is responsible for preparing and executing tasks so, there are tasks for bundling (through webpack module), cleaning the build directory, copying static files and watching changes in javascripts files.  

<h3>Notes's patterns and principles:</h3>

* Single page application
* Domain based
* State container
* Factories
* Multi layer
* Singleton
* Universal javascript
* Generic repository

<h3>Tools:</h3>

* ExpressJS 4.X
* React
* React Router Redux
* Redux
* Templates EJS
* GulpJS with ES6
* Socket.io
* Babel
* Mongoose
* Foundation
* Webpack

<h3>Budling and running the server</h3>
Install all packages
```
npm install
```

As I had said before, I used Gulp for executing some tasks. The default task will bundle all the code, watching .js files and then start a server on port 3000. You can execute it running one of these commands on your terminal:
```
npm start
```
Or
```
gulp
```

<h3>Setting up the enviroment</h3>
By default config variables were set up in webpack's configs. Take a look at plugins section on webpack.#.config.js files, there will be some code like this:

```
new webpack.DefinePlugin({
  'process.env': {
        'NODE_ENV':  JSON.stringify('production'),
        'PORT': JSON.stringify("3000"),
        'API_URL': JSON.stringify("http://localhost:3000"),
        'MONGO' : { URI:  JSON.stringify("mongodb://notesapp:notes123@ds147799.mlab.com:47799/heroku_lwvj2lv2") }
      }
})
```

Notice that I've already set up a mongoDB connection in Heroku's cloud. Besides that, there's a config classe located in `src/server/config/config.js`. It accesses env's variables based on those process.env values.

<h3>Routes Draft:</h3>

<h4>Notes </h4>

 > REASON	Create a note  
 > METHOD	POST  
 > URL	{base}/api/notes
 > BODY	{ title, date, body, category ( reference) }  
 > RESPONSE	Success: 201. Error: 500  

 > REASON	Update a note  
 > METHOD	PUT  
 > URL	{base}/api/notes  
 > BODY	{ _id, title, date, body, category ( reference) }  
 > RESPONSE	Success: 204. Error: 500  

 > REASON	Retrieve notes  
 > METHOD	GET    
 > URL	{base}/api/notes?page={page}&limit={limit}  
 > RESPONSE	Success: 200 with data or 404. Error: 500  

<h4>Categories</h4>

 > REASON	Create a category  
 > METHOD	POST  
 > URL	{base}/api/categories  
 > BODY	{ name }  
 > RESPONSE	Success: 201. Error: 500  

 > REASON	Update a category  
 > METHOD	PUT  
 > URL	{base}/api/categories  
 > BODY	{ _id, name }  
 > RESPONSE	Success: 204. Error: 500  

 > REASON	Retrieve categories  
 > METHOD	GET  
 > URL	{base}/api/categories  
 > RESPONSE	Success: 200 with data or 404. Error: 500  

<h3>References:</h3>
[React Redux Files Structure Reference](http://marmelab.com/blog/2015/12/17/react-directory-structure.html)  
[Express Code Structure](https://github.com/ViniciusTavares/express_code_structure)  
[Server Side Rendering with Redux and React Router](https://www.codementor.io/reactjs/tutorial/redux-server-rendering-react-router-universal-web-app)

<h3>Issues and questions</h3>
Have you have any questions? Found any issue? It'll be a pleasure to help you.    
I'll be checking issues topics whenever possible :)
