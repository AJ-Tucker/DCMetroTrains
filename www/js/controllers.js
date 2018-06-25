angular.module('starter.controllers', [])
.filter('stationsByLine', function($scope) 
{
	return function(lineCode) 
	{
		return $scope.station.LineCode1 == lineCode || 
			$scope.station.LineCode2 == lineCode ||
			$scope.station.LineCode3 == lineCode ||
			$scope.station.LineCode4 == lineCode;
	}
})

.controller('DashCtrl', function($scope, $http) 
{
	var trainsUrl =  "https://api.wmata.com/StationPrediction.svc/json/GetPrediction/All?api_key=ymdf4w43j6jxjak7cfuw32bq";
	var stationsUrl =  "https://api.wmata.com/Rail.svc/json/jStations?api_key=ymdf4w43j6jxjak7cfuw32bq";
	var linesUrl =  "https://api.wmata.com/Rail.svc/json/jLines?api_key=ymdf4w43j6jxjak7cfuw32bq";

	$http.get(trainsUrl)
	.success(function(data, status, headers, config) 
	{
		$scope.trains = data.Trains;
	})
	.error(function(data, status, headers, config) 
	{});
	
	$http.get(stationsUrl)
	.success(function(data, status, headers, config) 
	{
		$scope.stations = data.Stations;

	})
	.error(function(data, status, headers, config) 
	{});
	
	$http.get(linesUrl)
	.success(function(data, status, headers, config) 
	{
		$scope.lines = data.Lines;
	})
	.error(function(data, status, headers, config) 
	{});
	
	$scope.setSelectedLine = function(line)
	{
		$scope.selectedLine = line;
	};
	
	$scope.stationsByLine = function(station) 
	{
		if ($scope.selectedLine)
		{
			return  station.LineCode1 == $scope.selectedLine.LineCode || 
					station.LineCode2 == $scope.selectedLine.LineCode ||
					station.LineCode3 == $scope.selectedLine.LineCode ||
					station.LineCode4 == $scope.selectedLine.LineCode;
		}
		else
		{
			return true;
		}
	};
})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
