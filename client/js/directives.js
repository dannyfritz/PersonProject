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
        value: -1,
        position: -1,
        text: "",
        widget: "radio"
      };
      fields.forEach(function(f) {
        newField.value = f.value > newField.value ? f.value : newField.value;
        newField.position = f.position > newField.position ? f.position : newField.position;
      });

      newField.value++;
      newField.position++;

      fields.push(newField);
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

    $scope.addRadioOption = function(question) {
      var newField = {
        field_id: "radio-14",
        value: 8,
        position: 8,
        text: "",
        widget: "radio"
      };

      question.fields.push(newField);
    };

    $scope.singleQuestionType = function(group) {
      if (!group || !group.questions || group.questions.length > 1) {
        return false;
      }

      if (group.questions.length === 0 ||
          !group.questions[0].fields ||
          group.questions[0].fields.length === 0) {
        return false;
      }
      var widgetType = group.questions[0].fields[0].widget;
      if (widgetType === "number" ||
          widgetType === "text") {
        return true;
      }

      return false;
    }

    $scope.removeRadio = function(question, field) {
      question.fields = question.fields.filter(function(f) {
        return f.field_id !== field.field_id;
      });
    };

    $scope.removeQuestionGroup = function(group) {
      $scope.survey.groups = $scope.survey.groups.filter(function(g) {
        return g !== group;
      })
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
  var editorTemplate = ['<span class="click-to-edit">',
                    '<span ng-hide="view.editorEnabled">',
                      '{{value}} ',
                      '<a ng-click="enableEditor()">Edit</a>',
                    '</span>',
                    '<span ng-show="view.editorEnabled">',
                      '<input ng-model="view.editableValue">',
                      '<a href="#" ng-click="save()">Done</a>',
                      ' or ',
                      '<a ng-click="disableEditor()">cancel</a>.',
                    '</span>',
                  '</span>'].join('');

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
