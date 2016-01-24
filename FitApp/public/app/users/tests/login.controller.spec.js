
define([
	"angularMocks",
	"public/app/users/users.module"
	], 
	function (angularMocks, usersModule) {
	
	var $controller, $httpBackend, loginController, $locationMock, userDataServiceMock;
	
	beforeEach(module("users"));
	
	beforeEach(inject(function ($injector) {
		$controller = $injector.get("$controller");
		
		$httpBackend = $injector.get("$httpBackend");
		
		userDataServiceMock = {
			loggedInUser: function (user) { 
			}
		};
		
		$locationMock = {
			hash: '/not-changed',
			updateHash: function (hash) {
				this.hash = hash;
			},
			search: function () {
				return {
					username: "username"
				}
			}
		};

		loginController = $controller("LoginController", { 
			$location: $locationMock,
			userDataService: userDataServiceMock
		});
	}));

	describe("LoginController", function () {
		
		it("should create the LoginController", function () { 
			expect(loginController).toBeDefined();
		});

		it("should show error message if username is missing", function () {
			
			loginController.isUsernameEmpty = function () {
				return true;
			};

			loginController.isPasswordEmpty = function () {
				return false;
			};

			loginController.logIn();

			expect(loginController.errorMessage).toBe("Username and/or password is empty");
		});

		it("should show error message if password is missing", function () {
			
			loginController.isUsernameEmpty = function () {
				return false;
			};
			
			loginController.isPasswordEmpty = function () {
				return true;
			};
			
			loginController.logIn();
			
			expect(loginController.errorMessage).toBe("Username and/or password is empty");
		});

		it("should set the logged in user in the service for existing user", function () {
			
			var user = {
				username: "Joe",
				password: "123"
			};

			$httpBackend.whenPOST("/user/login")
				.respond(user);
			
			spyOn(userDataServiceMock, "loggedInUser");
			
			loginController.credentials.username = user.username;
			loginController.credentials.password = user.password;

			loginController.logIn();
			
			$httpBackend.flush();  

			expect(userDataServiceMock.loggedInUser).toHaveBeenCalled();
			expect(userDataServiceMock.loggedInUser.calls.argsFor(0)).toEqual([user]);
		});

		it("should show error message for user who doesn't exist", function () {
			
			var user = {
				username: "Joe",
				password: "123"
			};
			
			$httpBackend.whenPOST("/user/login")
				.respond(null);
			
			spyOn(userDataServiceMock, "loggedInUser");
			
			loginController.credentials.username = user.username;
			loginController.credentials.password = user.password;
			
			loginController.logIn();
			
			$httpBackend.flush();
			
			expect(userDataServiceMock.loggedInUser).not.toHaveBeenCalled();
			expect(loginController.errorMessage).toBe("Wrong username and/or password");
		});
	});
});