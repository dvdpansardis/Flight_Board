appFlightBoard.controller("FlightBoardCtrl", function ($scope, $http, ModalService) {

    var baseUrl = "http://127.0.0.1:8080/";

    $scope.init = function () {
        $scope.getAllSimpleFlights();
        $scope.getCitysDeparture();
        $scope.getCitysArrived();
    };

    $scope.configTableFlights = {
        itemsPerPage: 5,
        fillLastPage: true
    }

    $scope.filterCodeFlight = ""

    $scope.filterFirstData = ""

    $scope.filterLastData = ""

    $scope.simpleFlights = []

    $scope.getSimpleFlightsByFilter = function () {

        var urlRequest = baseUrl + 'Flight/';

        $http.post(urlRequest, {
            codeFlight : $scope.filterCodeFlight,
            firstData : $scope.filterFirstData,
            lastData : $scope.filterLastData,
            cityDeparture : $scope.filterCityDeparture,
            cityArrived : $scope.filterCityArrived,
        }).then(function (response) {

            console.log(response);

            for (var i = 0; i < response.data.length; i++) {
                $scope.simpleFlights.push(response.data[i]);
            }

        }, function (error) {

            console.log("Error on get citysDeparture: " + error);

        });
    };

    $scope.getAllSimpleFlights = function () {

        var urlRequest = baseUrl + 'Flight/';

        $http.get(urlRequest).then(function (response) {

            console.log(response);

            for (var i = 0; i < response.data.length; i++) {
                $scope.simpleFlights.push(response.data[i]);
            }

        }, function (error) {

            console.log("Error on get citysDeparture: " + error);

        });
    };

    $scope.filterCityDeparture = ""

    $scope.citysDeparture = []

    $scope.getCitysDeparture = function () {

        var urlRequest = baseUrl + 'Flight/citysDeparture';

        $http.get(urlRequest).then(function (response) {

            for (var i = 0; i < response.data.length; i++) {
                $scope.citysDeparture.push(response.data[i]);
            }

        }, function (error) {

            console.log("Error on get citysDeparture: " + error);

        });
    };

    $scope.filterCityArrived = ""

    $scope.citysArrived = []

    $scope.getCitysArrived = function () {

        var urlRequest = baseUrl + 'Flight/citysArrived';

        $http.get(urlRequest).then(function (response) {

            console.log(response)

            for (var i = 0; i < response.data.length; i++) {
                $scope.citysArrived.push(response.data[i]);
            }

        }, function (error) {

            console.log("Error on get citysArrived: " + error);

        });
    };

    $scope.descriptionFlight = ""

    $scope.getDescriptionFlightOnModal = function (codeFlight, modal) {

        var urlRequest = baseUrl + 'Flight/' + codeFlight;

        $http.get(urlRequest).then(function (response) {

            console.log(response.data.codeFlight)

            $scope.descriptionFlight = response.data;

            modal.element.modal();

        }, function (error) {

            console.log("Error on get citysArrived: " + error);

        });
    };

    $scope.show = function (codeFlight) {
        ModalService.showModal({
            templateUrl: 'modal.html',
            controller: "ModalController"
        }).then(function (modal) {
            $scope.getDescriptionFlightOnModal(codeFlight, modal);
            modal.close.then(function (result) {
                //$scope.descriptionFlight = {}
            });
        });
    };

    $scope.init();
});

appFlightBoard.controller('ModalController', function ($scope, close) {

    $scope.close = function (result) {
        close(result, 500); // close, but give 500ms for bootstrap to animate
    };

});
