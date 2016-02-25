app.directive("surveyEdit", [function() {
  var controller = ['$scope', function($scope) {
    $scope.addTableQuestion = function(fields, group) {
      group.questions.push({fields: fields,
                            data: {question_id: "",
                                   position: null,
                                   text: ""
                                  }
                           });
    };

    $scope.addTableColumn = function(fields, group) {
      var newField = {
        field_id: "blah",
        value: 8,
        position: 8,
        text: "",
        widget: "radio"
      };

      fields.push(newField);

      group.questions.forEach(function(q) {
        q.fields.push(newField);
      });

    };

    $scope.removeTableQuestion = function(group, question) {
      group.questions = group.questions.filter(function(q) {
        return q !== question;
      });
    };

    $scope.removeTableColumn = function(fields, field, group) {
      for (var i = fields.length - 1; i >= 0; i--) {
        if (fields[i].field_id === field.field_id) {
          fields.splice(i, 1);
        }
      }

      group.questions.forEach(function(q) {
        q.fields = q.fields.filter(function(f) {
          return f.field_id !== field.field_id;
        });
      });
    };
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

app.directive("clickToEdit", [function() {
  var editorTemplate = ['<div class="click-to-edit">',
                    '<div ng-hide="view.editorEnabled">',
                      '{{value}} ',
                      '<a ng-click="enableEditor()">Edit</a>',
                    '</div>',
                    '<div ng-show="view.editorEnabled">',
                      '<input ng-model="view.editableValue">',
                      '<a href="#" ng-click="save()">Done</a>',
                      ' or ',
                      '<a ng-click="disableEditor()">cancel</a>.',
                    '</div>',
                  '</div>'].join('');

  return {
    restrict: "A",
    replace: true,
    template: editorTemplate,
    scope: {
      value: "=clickToEdit",
    },
    controller: ['$scope', function($scope) {
      $scope.view = {
        editableValue: $scope.value,
        editorEnabled: false
      };

      $scope.enableEditor = function() {
        $scope.view.editorEnabled = true;
        $scope.view.editableValue = $scope.value;
      };

      $scope.disableEditor = function() {
        $scope.view.editorEnabled = false;
      };

      $scope.save = function() {
        $scope.value = $scope.view.editableValue;
        $scope.disableEditor();
      };
    }]
  };
}]);
