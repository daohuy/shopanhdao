(function () {
    'use strict';

    angular.module('myApp')
        .constant("baseURL", "https://shopanhdao-174606.appspot.com/") // url api server mongodb
        .factory('itemsFactory', itemsFac);

    function itemsFac($localStorage, $resource, $state, baseURL) {
        var itemService = {};

        itemService.aodaiResource = aodaiResource;
        itemService.dressResource = dressResource;
        itemService.shirtsResource = shirtsResource;
        itemService.trousersResource = trousersResource;
        itemService.orderResource = orderResource;
        itemService.shopping = shopping;
        itemService.buyNow = buyNow;
        itemService.remove = remove;
        itemService.customerOrder = customerOrder;

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

        function orderResource() {
            return $resource(baseURL + "bill/:billId", {
                billId: "@billId"
            }, {
                update: {
                    method: "PUT"
                },
                query: {
                    method: "GET",
                    isArray: true
                }
            })
        }

        function shopping(items) {
            var bag = {
                MASO: items._id,
                tittle: items.tittle,
                image: items.image[0],
                price: items.price,
                quantity: 1
            };
            $localStorage.BAG.push(bag);
        }

        function buyNow(items) {
            if ($localStorage.BAG.length == 0) {

                console.log('No Item In BAG')

                var bag = {
                    MASO: items._id,
                    tittle: items.tittle,
                    image: items.image[0],
                    price: items.price,
                    quantity: 1
                };

                $localStorage.BAG.push(bag);

                $state.go('home.buynow');
            } else {
                console.log('Have Item In BAG');
                $state.go('home.buynow')
            }
        }

        function remove() {
            $localStorage.$reset();
            location.reload();
        }

        function customerOrder(items) {
            var order = {
                name: items.name,
                phone: items.phone,
                address: items.address,
                city: items.city,
                bill: $localStorage.BAG,
                total: $localStorage.totalPrice
            };
            //console.log(order);
            $resource(baseURL + "bill")
                .save(order, function (res) {
                    $localStorage.$reset();
                    $state.go('home.success');
                }, function (res) {
                    console.log(res);
                });
        }

    }

})();
