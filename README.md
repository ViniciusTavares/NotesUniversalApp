#Notes - Simple notations updated on real time!

<img src="/src/client/static/img/header.png" alt="Cover image" />

###App description:
Notes is a demo of how to use React, Redux, REST Services, Sockeio.io, Webpack and Universal Javascript together. Its interface is simple and objective, in this moment there're only 2 pages, however the most important part of this project is its background development.  

It contains some modern principles and structures, for instance: Single Page Application, State container and Universal Javascript through server rendering and processing the initial application state. Below there is a list with not only the principles, but also the frameworks that have been used here.  

The whole project has been coded in ES6 ( ES-2015 ), so is necessary to transpile the code. Webpack has chosen to prepare our bundle, executing babel-loader for transpiling the code and setting some enviroment variables. I believe it's awesome, working well not only with client bundles, but also server bundles too.  

Gulp has an import participation, once its is responsible for preparing and executing tasks so, there are tasks for bundling (through webpack module), cleaning the build directory, copying static files and watching changes in javascripts files.  

###Notes's patterns and principles:

* Single page application
* Domain based
* State container
* Factories
* Multi layer
* Singleton
* Universal javascript
* Generic repository

###Tools:

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

### Roadmap for February 2017

* Add unit tests
* Create tasks for development and production enviroments
* Add devtools in store

###Budling and running the server
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

###Setting up the enviroment
By default config variables were set up in webpack's configs. Take a look at plugins section at webpack.#.config.js files, there will be some code like this:
```
new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV':  JSON.stringify('production'),
    'PORT': JSON.stringify("3000"),
    'API_URL': JSON.stringify("http://localhost:3000"),
    'MONGO' : { address:  JSON.stringify('localhost'), port:  JSON.stringify('27017'), database:  JSON.stringify('LiveFeed') }
  }
}),
```
Changing them you'll be able to set your own personal port, address, etc.
Besides that, there's a config classe located at ```src/server/config/config.js```. It access env's variables, so what you do at webpack's configs will reflect on it.

### Routes Draft::

####Notes

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

####Categories

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

###References:
[React Redux Files Structure Reference](http://marmelab.com/blog/2015/12/17/react-directory-structure.html)  
[Express Code Structure](https://github.com/ViniciusTavares/express_code_structure)  
[Server Side Rendering with Redux and React Router](https://www.codementor.io/reactjs/tutorial/redux-server-rendering-react-router-universal-web-app)  

###Issues and questions
Have you have any questions? Found any issue? So, it'll be a pleasure to help you.    
I'll be checking the issues topis whenever possible :)
