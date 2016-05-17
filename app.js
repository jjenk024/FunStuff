var app = angular.module('myApp',['ngStorage']);
app.controller('dir',function ($scope, $http,$localStorage){
	$http.get("seed.json")
	.then(function(data){
		$scope.$storage = $localStorage;
		$localStorage.dir = data.data;
		$scope.dir = data.data;
		$scope.avatarLink = $scope.dir.contacts[0].avatar.substring(0, $scope.dir.contacts[0].avatar.length - 1);
		
		$scope.viewSwap = true;
		$scope.contactView = true;
		$scope.contactAdd = true;
		$scope.contactUpdate = true;
		
		$scope.open = function(id){
			var person = $scope.dir.contacts.filter(function(val,index,array){
				return val.id == id;
			});
			$scope.current = person[0];
			$("#ViewContact").modal();
		};
		
		$scope.add = function(){
			$("#AddContact").modal();
		}
		
		$scope.getNextID = function(){
			return (Math.max.apply(0,$scope.dir.contacts.map(function(v){return v.id}))+1);
		}
		
		$scope.createContact = function(){
			var newID = $scope.getNextID();
			
			var newContact = {
			"id": newID,
			"name": $scope.newName,
			"phone": $scope.newNumber,
			"email": $scope.newEmail,
			"birthday": $scope.newBirthday,
			"avatar": $scope.avatarLink + newID
			};
			
			$scope.dir['contacts'].push(newContact);
			$scope.contactAdd = false;
			
			$scope.newName="";
			$scope.newNumber="";
			$scope.newEmail="";
			$scope.newBirthday="";
		}
		
		$scope.openUpdate = function(){
			$("#ViewContact").modal('hide');
			$("#EditContact").modal();
		}
		
		$scope.updateContact = function(){
			$("#EditContact").modal('hide');
			$("#ViewContact").modal();
		}
		
		$scope.clearFilter = function(){
			$scope.filter.name="";
		}
	});
});
	
	$('.has-clear input[type="text"]').on('input propertychange', function() {
  var $this = $(this);
  var visible = Boolean($this.val());
  $this.siblings('.form-control-clear').toggleClass('hidden', !visible);
}).trigger('propertychange');

$('.form-control-clear').click(function() {
  $(this).siblings('input[type="text"]').val('')
    .trigger('propertychange').focus();
});
	
