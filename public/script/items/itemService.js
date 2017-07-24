(function () {
    'use strict';

    angular.module('myApp')
        .constant("baseURL", "https://localhost:3443/") // url api server mongodb
        .factory('itemsFactory', itemsFac);

    function itemsFac($resource, baseURL) {
        var itemService = {};

        itemService.aodaiResource = aodaiResource;
        itemService.dressResource = dressResource;
        itemService.shirtsResource = shirtsResource;
        itemService.trousersResource = trousersResource;

        return itemService;

        function aodaiResource() {
            return $resource(baseURL + "aodai/:aodaiId", {
                aodaiId: "@aodaiId"
            }, {
                update: {
                    method: "PUT"
                },
                query: {
                    method: 'GET',
                    isArray: true
                },
            });
        }

        function dressResource() {
            return $resource(baseURL + "dress/:dressId", {
                dressId: "@dressId"
            }, {
                update: {
                    method: "PUT"
                },
                query: {
                    method: 'GET',
                    isArray: true
                },
            })
        }

        function shirtsResource() {
            return $resource(baseURL + "shirts/:shirtId", {
                shirtId: "@shirtId"
            }, {
                update: {
                    method: "PUT"
                },
                query: {
                    method: 'GET',
                    isArray: true
                },
            });
        }

    }

    function trousersResource() {
        return $resource(baseURL + "trousers/:trouserId", {
            trouserId: "@trouserId"
        }, {
            update: {
                method: "PUT"
            },
            query: {
                method: 'GET',
                isArray: true
            },
        });
    }

})();
