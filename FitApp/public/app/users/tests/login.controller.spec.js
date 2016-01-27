
define([
	"angularMocks",
	"public/app/users/users.module"
	], 
	function (angularMocks, usersModule) {
	
	describe("LoginController", function () {
		
		var $controller, $httpBackend, loginController, $locationMock, $scopeMock, userDataServiceMock;

		beforeEach(module("users"));
		
		beforeEach(inject(function ($injector) {
			$controller = $injector.get("$controller");
			
			$httpBackend = $injector.get("$httpBackend");
			
			$scopeMock = $injector.get("$rootScope");
			
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
				},
				path: function () { 
				}
			};
			
			loginController = $controller("LoginController", {
				$scope: $scopeMock,
				$location: $locationMock,
				userDataService: userDataServiceMock
			});
		}));

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

		it("should set the logged in user in the service for existing user and notify scope that user is logged in", function () {
			
			var user = {
				username: "Joe",
				password: "123"
			};

			$httpBackend.whenPOST("/user/login")
				.respond(user);
			
			spyOn(userDataServiceMock, "loggedInUser");
			
			loginController.credentials.username = user.username;
			loginController.credentials.password = user.password;
			
			spyOn($scopeMock, "$emit");

			loginController.logIn();
			
			$httpBackend.flush();  

			expect(userDataServiceMock.loggedInUser).toHaveBeenCalled();
			expect(userDataServiceMock.loggedInUser.calls.argsFor(0)).toEqual([user]);

			expect($scopeMock.$emit).toHaveBeenCalled();
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

		it("should redirect user to register page", function () { 
			
			spyOn($locationMock, "path");

			loginController.register();

			expect($locationMock.path).toHaveBeenCalled();
			expect($locationMock.path.calls.argsFor(0)).toEqual(["/user/register"]);
		});
	});
});