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
        items.removeItem = removeItem;
        
        // AODAI
        items.aodais = itemsFactory
            .aodaiResource()
            .query(function (res) {
                items.aodais = res;
                console.log(items.aodais);
            }, function (res) {
                console.log(res);
            });
        //DRESS
        items.dress = itemsFactory 
            .dressResource()
            .query(function (res) {
                items.dress = res;
                //console.log(items.dress);
            }, function (res) {
                console.log(res);
            });
        //SHIRTT
        items.shirts = itemsFactory
            .shirtsResource()
            .query(function (res) {
                items.shirts = res;
                //console.log(items.dress);
            }, function (res) {
                console.log(res);
            });
        //TROUSERS
        items.trousers = itemsFactory
            .trousersResource()
            .query(function (res) {
                items.trousers = res;
                //console.log(items.dress);
            }, function (res) {
                console.log(res);
            });
        
        function removeItem(item) {
            itemsFactory.removeItem(item);
        }
        
    }

    function headerCont($localStorage, itemsFactory) {
        var items = this;

        items.info = {};
        items.customerOrder = customerOrder;
        items.remove = remove;
        items.haveBag = false;

        $localStorage.haveBag = false;

        //USER
        items.signIn = false;

        //console.log(items.info);
        //check local BAG
        if ($localStorage.BAG) {
            //co local BAG
            console.log('Have Local BAG', $localStorage.BAG);
            $localStorage.haveBag = true;
            items.haveBag = true;
            items.BAG = $localStorage.BAG;
            var total = [];
            for (var i = 0; i < items.BAG.length; i++) {
                total.push(parseInt(items.BAG[i].price));
            };
            $localStorage.totalPrice = total.reduce((a, b) => a + b, 0);
            //console.log($localStorage.totalPrice);
            items.totalPrice = $localStorage.totalPrice;
            //console.log(items.BAG);
        } else {
            // khong co local BAG
            console.log('Not Data In BAG', $localStorage.BAG);
        }
        //check user login
        if ($localStorage.userToken) {
            items.signIn = true;
            items.username = $localStorage.userToken.User.username;
        } else {
            items.signIn = false;
        };

        function remove() {
            itemsFactory.remove();
        }

        function customerOrder() {
            itemsFactory.customerOrder(items.info);
        }


    }
    /*CONTROLLER AODAI*/
    function aodaiCont(itemsFactory, $stateParams, $localStorage, $state) {
        var items = this;
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
        items.shopping = shopping;
        items.buyNow = buyNow;

        function shopping() {
            itemsFactory.shopping(items.aodai);
        }

        function buyNow() {
            itemsFactory.buyNow(items.aodai);
        }

    }
    /*CONTROLLER DRESS*/
    function dressCont(itemsFactory, $stateParams, $localStorage, $state) {
        var items = this;
        items.dres = itemsFactory
            .dressResource()
            .get({
                dressId: $stateParams.id
            }, function (res) {
                items.dres = res;
            }, function (res) {
                //console.log('Error');
            });
        //console.log(items.aodai);
        items.shopping = shopping;
        items.buyNow = buyNow;

        function shopping() {
            itemsFactory.shopping(items.dres);
        }

        function buyNow() {
            itemsFactory.buyNow(items.dres);
        }

    }
    /*CONTROLLER SHIRTS*/
    function shirtsCont(itemsFactory, $stateParams, $localStorage, $state) {
        var items = this;
        items.shirt = itemsFactory
            .shirtsResource()
            .get({
                shirtId: $stateParams.id
            }, function (res) {
                items.shirt = res;
            }, function (res) {
                console.log('Error');
            });
        //console.log(items.aodai);
        items.shopping = shopping;
        items.buyNow = buyNow;

        function shopping() {
            itemsFactory.shopping(items.shirt);
        }

        function buyNow() {
            itemsFactory.buyNow(items.shirt);
        }

    }
    /*CONTROLLER TROUSERS*/
    function trousersCont(itemsFactory, $stateParams, $localStorage, $state) {
        var items = this;
        items.trouser = itemsFactory
            .trousersResource()
            .get({
                trouserId: $stateParams.id
            }, function (res) {
                items.trouser = res;
            }, function (res) {
                console.log('Error');
            });
        //console.log(items.aodai);
        items.shopping = shopping;
        items.buyNow = buyNow;

        function shopping() {
            itemsFactory.shopping(items.trouser);
        }

        function buyNow() {
            itemsFactory.buyNow(items.trouser);
        }

    }

})();
