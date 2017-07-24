(function () {
    'use strict';

    angular
        .module('myApp')
        .controller('itemsController', itemCont)
        .controller('headerController', headerCont)
        .controller('aodaiController', aodaiCont)
        .controller('dressController', dressCont)
        .controller('shirtsController', shirtsCont)
        .controller('trousersController', trousersCont)
        ;

    function itemCont(itemsFactory) {
        var items = this;
        // AODAI
        items.aodais = itemsFactory
            .aodaiResource()
            .query(function (res) {
                items.aodais = res;
                //console.log(items.aodais);
            }, function (res) {
                console.log(res);
            });
        //DRESS
        items.dress = itemsFactory
            .dressResource()
            .query(function (res) {
                items.dress = res;
                //console.log(items.aodais);
            }, function (res) {
                console.log(res);
            });
        //SHIRTS
        items.shirts = itemsFactory
            .shirtsResource()
            .query(function (res) {
                items.shirts = res;
                //console.log(items.aodais);
            }, function (res) {
                console.log(res);
            });
        //TROUSERS
        items.trousers = itemsFactory
            .trousersResource()
            .query(function (res) {
                items.trousers = res;
                //console.log(items.aodais);
            }, function (res) {
                console.log(res);
            });
    }

    function headerCont($localStorage) {
        var items = this;
        items.remove = remove;

        if ($localStorage.BAG) {
            //co local BAG
            //console.log('Local BAG', $localStorage.BAG);
            items.BAG = $localStorage.BAG;
            var total = [];
            for (var i = 0; i < items.BAG.length; i++) {
                total.push(parseInt(items.BAG[i].price));
            };
            $localStorage.totalPrice = total.reduce((a, b) => a + b, 0);
            console.log($localStorage.totalPrice);
            items.totalPrice = $localStorage.totalPrice;
            //console.log(items.BAG);
        } else {
            $localStorage.BAG = [];
            console.log('Data', $localStorage.BAG);
        }

        function remove() {
            $localStorage.$reset();
            location.reload();
        }



    }

    function aodaiCont(itemsFactory, $stateParams, $localStorage, $state) {
        var items = this;
        items.shopping = shopping;
        items.buyNow = buyNow;

        items.aodai = itemsFactory
            .aodaiResource()
            .get({
                aodaiId: $stateParams.id
            }, function (res) {
                items.aodai = res;
            }, function (res) {
                console.log(res);
            });
        //console.log(items.aodai);

        function shopping() {
            var bag = {
                MASO: items.aodai._id,
                tittle: items.aodai.tittle,
                image: items.aodai.image[0],
                price: items.aodai.price,
                quantity: 1
            };
            $localStorage.BAG.push(bag);
        }

        function buyNow() {
            if ($localStorage.BAG.length == 0) {

                console.log('No')

                var bag = {
                    MASO: items.aodai._id,
                    tittle: items.aodai.tittle,
                    image: items.aodai.image[0],
                    price: items.aodai.price,
                    quantity: 1
                };

                $localStorage.BAG.push(bag);

                $state.go('home.buynow');
            } else {
                console.log('Yes');
                $state.go('home.buynow')
            }
        }

    }


})();
