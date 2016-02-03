
define([
	"angularMocks",
	"public/app/main/main.module"
	], 
	function (angularMocks, mainModule) {
	
	describe("NewSessionController", function () {
		
		var $controller, 
			$httpBackend, 
			newSessionController, 
			$locationMock, 
			userDataServiceMock,
			sessionResourceServiceMock;
		
		beforeEach(module("main"));
		
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
				},
				path: function () { 
				}
			};
			
			sessionResourceServiceMock = {};

			newSessionController = $controller("NewSessionController", {
				$location: $locationMock,
				sessionResourceService: sessionResourceServiceMock
			});
		}));

		it("should create the NewSessionController", function () { 
			expect(newSessionController).toBeDefined();
		});

		it("should create new session", function () {
			
			
		});
	});
});