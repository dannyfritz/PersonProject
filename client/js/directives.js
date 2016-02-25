app.directive("surveyEdit", [function() {
  var controller = ['$scope', function($scope) {

  }];

  return {
    scope: {
      survey: "=",
      close: "&"
    },
    controller: controller,
    templateUrl: "partials/admin/survey_edit.html"
  };
}]);