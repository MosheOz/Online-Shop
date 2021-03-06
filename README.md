# Online-Shop
In this project, I built an online shopping store using the technologies: Angular 7, NodeJS, MongoDB
<br>
<br>
<b>Angular part</b>
<br>
For the client side I used<br>
* <b> Redux </b> for the site components connection and updates from server to the store. Using the pattern of actions, reducer and store with <b> NgReduxModule </b><br>
* this site contains users and admin modules, for this I have used a <b> lazy loading </b> for the admin module. with <b> PreloadAllModules </b> in the <b> Routes </b> module.<br> 
* This site contains login page for the users, to prevent unregistered users from logging in, I have used <b>CanActivate</b> and attached it to every route using <b> login-guard service</b> that I've created for the routers module. <br> This done accordingly as well for the admin login.<br>
* I used <b> FormsModule </b> for all the forms on site, with the <b> ngModel </b> to create and get objects <br>
* <b> Bootstrap </b> for the site responsiveness. <br>

<br><br>

<b>NodeJS part</b>
<br>
For the server side I used<br>
* <b>Express</b> for all <b>RESTful API</b> requests calls. <br>
* <b>Cors </b> to allow calls from a different port on the client side.<br>
* The files divided into four:<br>
    <b> ==> App.js</b> main file, using <b> middlewares</b> for: <br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>const server = express();</b><br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>server.use(express.json())</b> for requests body parser. <br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>server.use(cors())</b> for Cors<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>server.use("/api", controller)</b> for api routes to the controller page.<br>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>server.use(express.static('public'))</b> for public files access.<br>
    <b> ==> Controller.js</b> Uses for all API routes with <b>express.Router()</b><br>
    <b> ==> Logics.js</b> Uses to connect the requests between the The api layer and the Database<br>
    <b> ==> Dal.js</b> Uses to active the DB connection.<br>
* <b> Mongoose </b> for the ability to use Object modeling in this projects. <br>
* <b> Multer </b> Allowing uploading files from the client side <br>
* <b>Models</b> folder for all the <b>Mongoose.models</b> on the server side. <br>
* <b>Public</b> folder for storing all files for client side use. <br>
* The server listens to Port 3000 <b>server.listen()</b><br>
<br><br>

<b> MongoDB part</b>
<br>
* Using <b>Mongoose</b> for Object modeling ability.<br>
* Using MongoDB Compass for DB management <br>

    
        




