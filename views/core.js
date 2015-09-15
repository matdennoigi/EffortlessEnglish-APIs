/*
* Module : views/core.js
* Author : Huy, Phan Quang
* Description : Controller for angular JS
*/

var effortlessenglishApp = angular.module('effortlessenglish', ['ui.bootstrap', 'ui.pagedown', 'ngAnimate']);

effortlessenglishApp.factory('sharedService', ['$rootScope', function($rootScope) {
	var sharedService = {};

	sharedService.notifyCDDataChanged = function() {
		$rootScope.$broadcast('CDDataChanged');
	};

	return sharedService;
}]);

var cdcontroller = effortlessenglishApp.controller("cdcontroller", ['$scope', '$http', '$modal', 'sharedService', 
	function($scope, $http, $modal, sharedService) {
	$scope.cds = {};

	function getCDs() {
		$http.get('/api/cds')
		.success(function(respone) {
			console.log(respone);
			$scope.cds = respone;
		})
	}

	$scope.$on('CDDataChanged', getCDs);

	$scope.createCD = function(cd) {

		$http.post('/api/cds', cd)
		.success(function(respone) {
			sharedService.notifyCDDataChanged();
		})
		.error(function(data) {
            console.log('Error: ' + data);
        });
	};

	$scope.deleteCD = function(cd) {
		$http.delete('/api/cds?ids=' + cd._id)
		.success(function(respone) {
			sharedService.notifyCDDataChanged();
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	}

	$scope.openCreateCDModal = function() {
		var modalInstance = $modal.open({
			templateUrl : 'createCDModal.html',
			controller : 'createCDModalInstanceController',
		});

		modalInstance.result.then(
			function(cd) {
				$scope.createCD(cd);
			});
	}

	$scope.openDeleteCDModal = function($event, cd) {
		if ($event)
		{
			$event.preventDefault();
			$event.stopPropagation();
		}

		var modalInstance = $modal.open({
			templateUrl: 'confirmDeleteCDModal.html',
			controller: 'deleteCDModalInstanceController'
		});

		modalInstance.result.then(function(isDelete) {
			if (isDelete) {
				$scope.deleteCD(cd);
				console.log('Delete');
			}
		});
	}

	getCDs();
}]);

effortlessenglishApp.controller('createCDModalInstanceController', 
	['$scope', '$modalInstance', function($scope, $modalInstance) {
		$scope.create = function(cd) {
			$modalInstance.close(cd);
		}

		$scope.cancel = function() {
			$modalInstance.dismiss();
		}
}]);

effortlessenglishApp.controller('deleteCDModalInstanceController',
	['$scope', '$modalInstance', function($scope, $modalInstance) {
		$scope.yes = function() {
			$modalInstance.close(true);
		}

		$scope.no = function() {
			$modalInstance.dismiss();
		}
}]);

effortlessenglishApp.controller('lessonController', 
	['$scope', '$http', '$modal', 'sharedService', function($scope, $http, $modal, sharedService) {
		$scope.createLesson = function(cd, lesson) {
			$http.post('/api/cds/' + cd._id + '/lessons', lesson)
			.success(function(respone) {
				sharedService.notifyCDDataChanged();
			})
			.error(function(err) {
				console.log('Error: ' + err);
			});
		}

		$scope.openCreateLessonModal = function(e, cd) {
			if (e) {
				e.preventDefault();
				e.stopPropagation();
			}
			
			var modalInstance = $modal.open({
				templateUrl : 'createLessonModal.html',
				controller : 'createLessonModalInstanceController'
			});

			modalInstance.result.then(
				function(lesson) {
					$scope.createLesson(cd, lesson);
				});
		}
}]);

effortlessenglishApp.controller('createLessonModalInstanceController', 
	['$scope', '$modalInstance', function($scope, $modalInstance) {
		$scope.createLessonForm = { title: 'Day of the dead'};
		$scope.create = function(lesson) {
			$modalInstance.close(lesson);
		}

		$scope.cancel = function() {
			$modalInstance.dismiss();
		}
}])

effortlessenglishApp.controller('lessonSectionController',
	['$scope', '$http', '$modal', function($scope, $http, $modal) {
		

		$scope.createLessonSection = function(cd, lesson, lessonSection) {
			$http.post('cds/' + cd._id + 'lessons/' + lesson._id + 'lessonsections', lessonSection)
			.success(function(result) {

			})
			.error(function(err) {

			})
		}

		$scope.openCreateLessonSectionModal = function(e) {
			if (e) {
				e.preventDefault();
				e.stopPropagation();
			}
			
			var modalInstance = $modal.open({
				templateUrl: 'createLessonSectionModal.html',
				controller: 'createLessonSectionModalInstanceController'
			});
		}
}]);

effortlessenglishApp.controller('createLessonSectionModalInstanceController',
	['$scope', function($scope, $q) {
		$scope.seclectedSectionType = 'Choose Section Type';
		
		$scope.createLessonSectionForm = {
			textContent: '**Hello World**'
		};

		$scope.sectionTypes = [
			'content',
			'vocabulary',
			'ministory'
		]

		$scope.sectionTypeSelected = function(sectionType) {
			$scope.seclectedSectionType = sectionType;
		}

		$scope.insertImage = function insertImage() {
			var deferred = $q.defer();
    		deferred.resolve("http://www.discoposse.com/wp-content/uploads/2014/08/test-all-the-things.jpg");
    		return deferred.promise;
		}
	}]);



