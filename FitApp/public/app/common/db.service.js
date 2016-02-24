
define(["dexie"], function (Dexie) { 

		function dbService() {
			var db;
			var service = {
				saveUser: saveUser,
				getAllUsers: getAllUsers
			};
		
			init();
		
			return service;
		
			function init() {
				db = new Dexie("fitappdb");
			
				db.version(1).stores({
					users: "_id, username, password, firstname, lastname, email, gender, birthdate"
				});
			
				Dexie.Promise.on('error', function (err) {
					console.log("Uncaught error: " + err);
				});
			
				db.on('blocked', function () {
					debugger;
				});
			
				db.open();
			}
		
			function saveUser(user) {
				db.users.put(user);
			}
		
			function getAllUsers() {
				return db.users.toArray();
			}
		}

		return dbService;
	}
);