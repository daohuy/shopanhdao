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
        items.itemsKM = [];
        items.routeItem = routeItem;
        items.changeOnSale = changeOnSale;
        items.changeKM = changeKM;
        // get all items
        
        items.aodais = itemsFactory
            .aodaiResource()
            .query(function (res) {
                items.aodais = res;
                //console.log(items.aodais);
            }, function (res) {
                console.log(res);
            });
        
        items.dress = itemsFactory 
            .dressResource()
            .query(function (res) {
                items.dress = res;
                //console.log(items.dress);
            }, function (res) {
                console.log(res);
            });
        
        items.shirts = itemsFactory
            .shirtsResource()
            .query(function (res) {
                items.shirts = res;
                //console.log(items.dress);
            }, function (res) {
                console.log(res);
            });
        
        items.trousers = itemsFactory
            .trousersResource()
            .query(function (res) {
                items.trousers = res;
                //console.log(items.dress);
            }, function (res) {
                console.log(res);
            });
        
        function removeItem(item,id) {
            //console.log(item,id);
            itemsFactory.removeItem(item,id);
        }
        // sale tren trang chu
        items.aodaisOSale = itemsFactory
            .itemResourceKMOS('aodai','onsale')
            .query(function(res) {
                //console.log(res);
                items.aodaisOSale = res;
            }, function(res) {
                console.log(res)
            });
        items.dressOSale = itemsFactory
            .itemResourceKMOS('dress','onsale')
            .query(function(res) {
                //console.log(res);
            items.dressOSale = res;
            }, function(res) {
                console.log(res)
            });
        items.shirtsOSale = itemsFactory
            .itemResourceKMOS('shirts','onsale')
            .query(function(res) {
                //console.log(res);
                items.shirtsOSale = res;
            }, function(res) {
                console.log(res)
            });
        items.trousersOSale = itemsFactory
            .itemResourceKMOS('trousers','onsale')
            .query(function(res) {
                //console.log(res);
                items.trousersOSale = res;
            }, function(res) {
                console.log(res)
            });
        // Danh Muc Khuyen Mai
        items.aodaisKM = itemsFactory
            .itemResourceKMOS('aodai','khuyenmai')
            .query(function(res) {
            
                //console.log('Get Ao Dai KM', res)
                for ( var i = 0; i < res.length ; i++ ) {
                    items.itemsKM.push(res[i]);
                }
                //console.log('AODAI items push ',items.itemsKM);
            
            }, function(res) {
                console.log(res)
            });
        items.dressKM = itemsFactory
            .itemResourceKMOS('dress','khuyenmai')
            .query(function(res) {
                //console.log(res);
                
                for ( var i = 0; i < res.length ; i++ ) {
                    items.itemsKM.push(res[i]);
                }
                //console.log('Dress items push ',items.itemsKM);
            
            }, function(res) {
                console.log(res)
            });
        items.shirtsKM = itemsFactory
            .itemResourceKMOS('shirts','khuyenmai')
            .query(function(res) {
                //console.log(res);
            
                for ( var i = 0; i < res.length ; i++ ) {
                    items.itemsKM.push(res[i]);
                }
                //console.log('Shirts items push ',items.itemsKM);
            
            }, function(res) {
                console.log(res)
            });
        items.trousersKM = itemsFactory
            .itemResourceKMOS('trousers','khuyenmai')
            .query(function(res) {
                //console.log(res);
            
                for ( var i = 0; i < res.length ; i++ ) {
                    items.itemsKM.push(res[i]);
                }
                //console.log('Trousers items push ',items.itemsKM);
            
            }, function(res) {
                console.log(res)
            });
        
        console.log('After PUSH items in itemsKM', items.itemsKM);
        // route Khuyen Mai
        function routeItem(clas,_id) {
            //console.log(clas, _id);
            itemsFactory.routeItem(clas,_id);
        }
        
        //change onsale
        function changeOnSale(_id,clas,onsale) {
            //console.log(_id,clas);
            itemsFactory.changeOnSale(_id,clas,onsale);
        }
        
        //change khuyenmai
        function changeKM(_id,clas,featured) {
            itemsFactory.changeKM(_id,clas,featured);
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
            //console.log('Have Local BAG', $localStorage.BAG);
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
        //console.log('aodaiController');
        var items = this;
        items.changeInfoItem = changeInfoItem;
        items.infoItem = {};
        
        items.aodai = itemsFactory
            .aodaiResource()
            .get({
                aodaiId: $stateParams.id
            }, function (res) {
                items.aodai = res;
                //console.log(items.aodai);
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
        
        function changeInfoItem (_id, item,clas) {
            console.log(_id, item,clas);
            itemsFactory.changeInfoItem(_id, item,clas);
        }
        
    }
    /*CONTROLLER DRESS*/
    function dressCont(itemsFactory, $stateParams, $localStorage, $state) {
        //console.log('dressController');
        var items = this;
        items.changeInfoItem = changeInfoItem;
        items.infoItem = {};
        
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

        function changeInfoItem (_id, item,clas) {
            //console.log(_id, item,clas);
            itemsFactory.changeInfoItem(_id, item,clas);
        }
        
    }
    /*CONTROLLER SHIRTS*/
    function shirtsCont(itemsFactory, $stateParams, $localStorage, $state) {
        //console.log('shirtController');
        var items = this;
        items.changeInfoItem = changeInfoItem;
        items.infoItem = {};
        
        items.shirt = itemsFactory
            .shirtsResource()
            .get({
                shirtId: $stateParams.id
            }, function (res) {
                items.shirt = res;
            }, function (res) {
                console.log(res);
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

        function changeInfoItem (_id, item, clas) {
            //console.log(_id, item,clas);
            itemsFactory.changeInfoItem(_id, item,clas);
        }
        
    }
    /*CONTROLLER TROUSERS*/
    function trousersCont(itemsFactory, $stateParams, $localStorage, $state) {
        //console.log('trouserController');
        var items = this;
        items.changeInfoItem = changeInfoItem;
        items.infoItem = {};
        
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

        function changeInfoItem (_id, item,clas) {
            //console.log(_id, item,clas);
            itemsFactory.changeInfoItem(_id, item,clas);
        }
        
    }

})();
