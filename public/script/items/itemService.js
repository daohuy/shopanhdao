(function () {
    'use strict';

    angular.module('myApp')
        // URL : https://shopanhdao-174606.appspot.com/
        .constant("baseURL", "http://localhost:8080/") // url api server mongodb
        //.constant("baseURL", "http://35.202.183.187:8080/") // url api server mongodb
        .factory('itemsFactory', itemsFac);

    function itemsFac($localStorage, $resource, $state, baseURL, Upload) {
        var itemService = {};

        itemService.aodaiResource = aodaiResource;
        itemService.dressResource = dressResource;
        itemService.shirtsResource = shirtsResource;
        itemService.trousersResource = trousersResource;
        itemService.orderResource = orderResource;
        itemService.shopping = shopping;
        itemService.buyNow = buyNow;
        itemService.remove = remove; //remove item in local
        itemService.customerOrder = customerOrder;
        itemService.uploadResource = uploadResource;
        itemService.removeItem = removeItem;

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
                }
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
                }
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
                }
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
                }
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
            if (!$localStorage.BAG) {
                $localStorage.BAG = [];
                var bag = {
                    MASO: items._id,
                    tittle: items.tittle,
                    image: items.image[0],
                    price: items.price,
                    quantity: 1
                };
                $localStorage.BAG.push(bag);
                $localStorage.haveBag = true;
                $state.reload();
            } else {
                var bag = {
                    MASO: items._id,
                    tittle: items.tittle,
                    image: items.image[0],
                    price: items.price,
                    quantity: 1
                };
                $localStorage.BAG.push(bag);
                $localStorage.haveBag = true;
                $state.reload();
            }


        }

        function buyNow(items) {
            if (!$localStorage.BAG) {

                console.log('No Item In BAG')

                var bag = {
                    MASO: items._id,
                    tittle: items.tittle,
                    image: items.image[0],
                    price: items.price,
                    quantity: 1
                };
                $localStorage.BAG = [];
                $localStorage.BAG.push(bag);

                $state.go('home.buynow');
            } else {
                console.log('Have Item In BAG');
                $state.go('home.buynow')
            }
        }

        function remove() {
            delete $localStorage.BAG;
            $localStorage.haveBag = false;
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
                    delete $localStorage.BAG;
                    delete $localStorage.totalPrice;
                    $state.go('home.success');
                }, function (res) {
                    console.log(res);
                });
        }

        function uploadResource() {
            return $resource(baseURL + "upload", {
                save: {
                    method: "POST",
                }
            })
        }

        function removeItem(item) {

            bootbox.confirm({
                size: "small",
                message: " Bạn Có Chắc Muốn Xoá Chứ ?",
                buttons: {
                    confirm: {
                        label: 'Đồng Ý !',
                        className: 'btn-primary'
                    },
                    cancel: {
                        label: 'Suy Nghĩ Lại !',
                        className: 'btn-danger'
                    }
                },
                callback: function (result) {
                    if (result == true) {
                        console.log(item)
                    } else {
                        console.log('No')
                    }
                }
            })
        }

    }

})();
