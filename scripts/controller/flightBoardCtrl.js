appFlightBoard.controller("FlightBoardCtrl", function ($scope, $http, ModalService, sharedProperties) {

    var baseUrl = "http://127.0.0.1:8080/";
    var entity = "Flight";
    var slash = "/"

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

    $scope.filterFirstDate = ""

    $scope.filterLastDate = ""

    $scope.simpleFlights = []

    $scope.clearFilter = function () {
        $scope.filterCodeFlight = ""

        $scope.filterFirstDate = new Date()

        $scope.filterLastDate = new Date()

        $scope.filterCityDeparture = ""

        $scope.filterCityArrived = ""

        $scope.getAllSimpleFlights();
    }

    $scope.getSimpleFlightsByFilter = function () {

        urlRequest = baseUrl + entity + slash;

        filterData = {
            codeFlight: $scope.filterCodeFlight,
            firstDate: $scope.filterFirstDate,
            lastDate: $scope.filterLastDate,
            cityDeparture: $scope.filterCityDeparture,
            cityArrived: $scope.filterCityArrived,
        }

        console.log(filterData);

        $http.post(urlRequest, filterData).then(function (response) {

            console.log(response);

            $scope.simpleFlights = response.data;

        }, function (error) {

            console.log("Error on get getSimpleFlightsByFilter: " + error);

        });
    };

    $scope.getAllSimpleFlights = function () {

        urlRequest = baseUrl + entity + slash;

        $http.get(urlRequest).then(function (response) {

            console.log(response);

            $scope.simpleFlights = response.data;

        }, function (error) {

            console.log("Error on get getAllSimpleFlights: " + error);

        });
    };

    $scope.filterCityDeparture = ""

    $scope.citysDeparture = []

    $scope.getCitysDeparture = function () {

        urlRequest = baseUrl + entity + slash + 'citysDeparture';

        $http.get(urlRequest).then(function (response) {

            console.log(response);

            $scope.citysDeparture = response.data;

        }, function (error) {

            console.log("Error on get citysDeparture: " + error);

        });
    };

    $scope.filterCityArrived = ""

    $scope.citysArrived = []

    $scope.getCitysArrived = function () {

        urlRequest = baseUrl + entity + slash + 'citysArrived';

        $http.get(urlRequest).then(function (response) {

            console.log(response)

            $scope.citysArrived = response.data;

        }, function (error) {

            console.log("Error on get citysArrived: " + error);

        });
    };

    $scope.description = ""

    $scope.getDescriptionFlightOnModal = function (codeFlight) {

        urlRequest = baseUrl + entity + slash + codeFlight;

        $http.get(urlRequest).then(function (response) {

            $scope.description = response.data;

            console.log($scope.description)

            sharedProperties.setProperty($scope.description)

            $scope.openModal()

        }, function (error) {

            console.log("Error on get etDescriptionFlightOnModal: " + error);

        });
    };

    $scope.show = function (codeFlight) {
        $scope.getDescriptionFlightOnModal(codeFlight)
    };

    $scope.openModal = function () {
        ModalService.showModal({
            templateUrl: 'modal.html',
            controller: 'ModalController'
        }).then(function (modal) {
            modal.element.modal();
        });
    }

    $scope.init();
});

appFlightBoard.controller('ModalController', function ($scope, close, sharedProperties) {

    $scope.codeFlightFiltered = sharedProperties.getProperty().codeFlight

    $scope.gateFiltered = sharedProperties.getProperty().gate

    $scope.statusFiltered = sharedProperties.getProperty().status

    $scope.cityArraivedFiltered = sharedProperties.getProperty().cityArrived

    $scope.cityDepartureFiltered = sharedProperties.getProperty().cityDeparture

    $scope.dateTimeArraivedFiltered = sharedProperties.getProperty().dateTimeArrived

    $scope.dateTimeDepartureFiltered = sharedProperties.getProperty().dateTimeDeparture

    $scope.passangerFiltered = sharedProperties.getProperty().passanger

    $scope.pilotsFiltered = sharedProperties.getProperty().pilots

    $scope.close = function (result) {
        close(result, 500);
    };

});
