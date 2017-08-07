var appFlightBoard = angular.module("appFlightBoard", ['angularModalService'])
    .service('sharedProperties', function () {
        var property = '';

        return {
            getProperty: function () {
                console.log(property);
                return property;
            },
            setProperty: function(value) {
                console.log(value);
                property = value;
            }
        };
    });