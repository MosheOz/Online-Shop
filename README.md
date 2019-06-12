# Online-Shop
In this project, I built an online shopping store using the technologies: Angular 7, NodeJS, MongoDB
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
* <b>Express</b> for all the <b>rest API</b> requests calls. <br>
* <b>Cors </b> to allow calls from a different port on the client side.<br>
* I divided the routing files into four:<br>
  *1.<b>App.js</b> main file, using <b> middlewares</b> for: <br>
    *<b>server.use(express.json())</b> for requests body parser. <br>
    *<b>server.use(cors())</b> for Cors<br>
    *<b>server.use("/api", controller)</b> for api routes to th controller page.<br>




