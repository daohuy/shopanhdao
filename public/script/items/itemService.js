(function () {
    'use strict';

    angular.module('myApp')
        // URL : https://shopanhdao-174606.appspot.com/
        //.constant("baseURL", "http://localhost:8080/") // url api server mongodb
        //.constant("baseURL", "http://35.202.183.187:8080/") // url api server mongodb
        .constant("baseURL", "http://shopanhdao.ml/") // url api server mongodb
        .factory('itemsFactory', itemsFac);

    function itemsFac($localStorage, $resource, $state, baseURL, Upload) {
        var itemService = {};

        itemService.aodaiResource = aodaiResource;
        itemService.itemResourceKMOS = itemResourceKMOS;
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
        itemService.routeItem = routeItem;
        itemService.changeOnSale = changeOnSale;
        itemService.changeKM = changeKM;
        itemService.changeInfoItem = changeInfoItem;

        return itemService;

        function aodaiResource() {
            return $resource(baseURL + "aodai/:aodaiId", {
                aodaiId: "@aodaiId"
            }, {
                update: {
                    method: 'PUT'
                },
                query: {
                    method: 'GET',
                    isArray: true
                },
                get: {
                    method: 'GET'
                },
                delete: {
                    method: 'DELETE'
                }
            });
        }

        function itemResourceKMOS(kmOros, data) {
            return $resource(baseURL + kmOros + "/" + data, {}, {
                'query': {
                    method: 'GET',
                    isArray: true
                }
            })
        }

        function dressResource() {
            return $resource(baseURL + "dress/:dressId", {
                dressId: "@dressId"
            }, {
                update: {
                    method: 'PUT'
                },
                query: {
                    method: 'GET',
                    isArray: true
                },
                get: {
                    method: 'GET'
                },
                delete: {
                    method: 'DELETE'
                }
            })
        }

        function shirtsResource() {
            return $resource(baseURL + "shirts/:shirtId", {
                shirtId: "@shirtId"
            }, {
                update: {
                    method: 'PUT'
                },
                query: {
                    method: 'GET',
                    isArray: true
                },
                get: {
                    method: 'GET'
                },
                delete: {
                    method: 'DELETE'
                }
            });
        }

        function trousersResource() {
            return $resource(baseURL + "trousers/:trouserId", {
                trouserId: "@trouserId"
            }, {
                update: {
                    method: 'PUT'
                },
                query: {
                    method: 'GET',
                    isArray: true
                },
                get: {
                    method: 'GET'
                },
                delete: {
                    method: 'DELETE'
                }
            });
        }

        function orderResource() {
            return $resource(baseURL + "bill/:billId", {
                billId: "@billId"
            }, {
                update: {
                    method: 'PUT'
                },
                query: {
                    method: 'GET',
                    isArray: true
                },
                get: {
                    method: 'GET'
                },
                delete: {
                    method: 'DELETE'
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
            } else if ($localStorage.BAG) {
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

                //console.log('No Item In BAG')

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
                //console.log('Have Item In BAG');
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

        function removeItem(item, id) {

            bootbox.confirm({
                size: "small",
                message: "<strong> Bạn Có Chắc Muốn Xoá Chứ ? </strong>",
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
                        console.log(item, id)
                        // aodai
                        if (item === 'Áo Dài') {
                            aodaiResource().delete({
                                aodaiId: id
                            }, function (res) {
                                console.log(res);
                                bootbox.alert({
                                    message: "Đã Xoá Sản Phẩm Với Mã Số : " + id,
                                    backdrop: true
                                });
                                $state.transitionTo('home.listItems', {}, {
                                    reload: true
                                });
                            }, function (res) {
                                bootbox.alert({
                                    message: "Xoá Sản Phẩm Thất Bại, Xin Mời Thử Lại Vào Dịp Khác !",
                                    backdrop: true
                                });
                            });
                            // ao
                        } else if (item === 'Áo') {
                            shirtsResource().delete({
                                shirtId: id
                            }, function (res) {
                                console.log(res);
                                bootbox.alert({
                                    message: "Đã Xoá Sản Phẩm Với Mã Số : " + id,
                                    backdrop: true
                                });
                                $state.transitionTo('home.listItems', {}, {
                                    reload: true
                                });
                            }, function (res) {
                                bootbox.alert({
                                    message: "Xoa That Bai, Moi Thu laiXoá Sản Phẩm Thất Bại, Xin Mời Thử Lại Vào Dịp Khác !",
                                    backdrop: true
                                });
                            });
                        } else if (item === 'Quần') {
                            trousersResource().delete({
                                trouserId: id
                            }, function (res) {
                                console.log(res);
                                bootbox.alert({
                                    message: "Đã Xoá Sản Phẩm Với Mã Số : " + id,
                                    backdrop: true
                                });
                                $state.transitionTo('home.listItems', {}, {
                                    reload: true
                                });
                            }, function (res) {
                                bootbox.alert({
                                    message: "Xoá Sản Phẩm Thất Bại, Xin Mời Thử Lại Vào Dịp Khác !",
                                    backdrop: true
                                });
                            });
                        } else if (item === 'Đầm') {
                            dressResource().delete({
                                dressId: id
                            }, function (res) {
                                console.log(res);
                                bootbox.alert({
                                    message: "Đã Xoá Sản Phẩm Với Mã Số : " + id,
                                    backdrop: true
                                });
                                $state.transitionTo('home.listItems', {}, {
                                    reload: true
                                });
                            }, function (res) {
                                bootbox.alert({
                                    message: "Xoá Sản Phẩm Thất Bại, Xin Mời Thử Lại Vào Dịp Khác !",
                                    backdrop: true
                                });
                            });
                        }

                    } else {
                        console.log('No')
                    }
                }
            })



        }

        function routeItem(clas, _id) {
            if (clas == 'Áo Dài') {
                //console.log('Route Aodai', clas);
                $state.go('home.aodai.detail', {
                    id: _id
                }, {
                    reload: true
                });
            } else if (clas == 'Áo') {
                $state.go('home.shirts.detail', {
                    id: _id
                }, {
                    reload: true
                });
            } else if (clas == 'Đầm') {
                $state.go('home.dress.detail', {
                    id: _id
                }, {
                    reload: true
                });
            } else if (clas == 'Quần') {
                $state.go('home.trousers.detail', {
                    id: _id
                }, {
                    reload: true
                });
            }
        }

        function changeOnSale(_id, clas, onsale) {
            if (clas == 'Áo Dài') {
                //console.log('Route Aodai', clas);
                //console.log(onsale);
                aodaiResource().update({
                    aodaiId: _id
                }, {
                    onSale: !onsale
                }, function (res) {
                    //console.log(res);
                    bootbox.alert({
                        message: 'Đã Thay Đổi Trạng Thái Sản Phẩm !',
                        backdrop: true
                    });
                    $state.transitionTo('home.listItems', {}, {
                        reload: true
                    });
                }, function (res) {
                    //console.log(res);
                    bootbox.alert({
                        message: 'Thay Đổi Thất Bại Mời Thử Lại !',
                        backdrop: true
                    });
                    $state.transitionTo('home.listItems', {}, {
                        reload: true
                    });
                })

            } else if (clas == 'Áo') {
                shirtsResource().update({
                    shirtId: _id
                }, {
                    onSale: !onsale
                }, function (res) {
                    //console.log(res);
                    bootbox.alert({
                        message: 'Đã Thay Đổi Trạng Thái Sản Phẩm !',
                        backdrop: true
                    });
                    $state.transitionTo('home.listItems', {}, {
                        reload: true
                    });
                }, function (res) {
                    //console.log(res);
                    bootbox.alert({
                        message: 'Thay Đổi Thất Bại Mời Thử Lại !',
                        backdrop: true
                    });
                    $state.transitionTo('home.listItems', {}, {
                        reload: true
                    });
                })
            } else if (clas == 'Đầm') {
                dressResource().update({
                    dressId: _id
                }, {
                    onSale: !onsale
                }, function (res) {
                    //console.log(res);
                    bootbox.alert({
                        message: 'Đã Thay Đổi Trạng Thái Sản Phẩm !',
                        backdrop: true
                    });
                    $state.transitionTo('home.listItems', {}, {
                        reload: true
                    });
                }, function (res) {
                    //console.log(res);
                    bootbox.alert({
                        message: 'Thay Đổi Thất Bại Mời Thử Lại !',
                        backdrop: true
                    });
                    $state.transitionTo('home.listItems', {}, {
                        reload: true
                    });
                })
            } else if (clas == 'Quần') {
                trousersResource().update({
                    trouserId: _id
                }, {
                    onSale: !onsale
                }, function (res) {
                    //console.log(res);
                    bootbox.alert({
                        message: 'Đã Thay Đổi Trạng Thái Sản Phẩm !',
                        backdrop: true
                    });
                    $state.transitionTo('home.listItems', {}, {
                        reload: true
                    });
                }, function (res) {
                    //console.log(res);
                    bootbox.alert({
                        message: 'Thay Đổi Thất Bại Mời Thử Lại !',
                        backdrop: true
                    });
                    $state.transitionTo('home.listItems', {}, {
                        reload: true
                    });
                })
            }
        }

        function changeKM(_id, clas, featured) {
            if (clas == 'Áo Dài') {
                //console.log('Route Aodai', clas);
                //console.log(onsale);
                aodaiResource().update({
                    aodaiId: _id
                }, {
                    featured: !featured
                }, function (res) {
                    //console.log(res);
                    bootbox.alert({
                        message: 'Đã Thay Đổi Trạng Thái Khuyến Mãi Sản Phẩm !',
                        backdrop: true
                    });
                    $state.transitionTo('home.listItems', {}, {
                        reload: true
                    });
                }, function (res) {
                    //console.log(res);
                    bootbox.alert({
                        message: 'Thay Đổi Thất Bại Mời Thử Lại !',
                        backdrop: true
                    });
                    $state.transitionTo('home.listItems', {}, {
                        reload: true
                    });
                })

            } else if (clas == 'Áo') {
                shirtsResource().update({
                    shirtId: _id
                }, {
                    featured: !featured
                }, function (res) {
                    //console.log(res);
                    bootbox.alert({
                        message: 'Đã Thay Đổi Trạng Thái Khuyến Mãi Sản Phẩm !',
                        backdrop: true
                    });
                    $state.transitionTo('home.listItems', {}, {
                        reload: true
                    });
                }, function (res) {
                    //console.log(res);
                    bootbox.alert({
                        message: 'Thay Đổi Thất Bại Mời Thử Lại !',
                        backdrop: true
                    });
                    $state.transitionTo('home.listItems', {}, {
                        reload: true
                    });
                })
            } else if (clas == 'Đầm') {
                dressResource().update({
                    dressId: _id
                }, {
                    featured: !featured
                }, function (res) {
                    //console.log(res);
                    bootbox.alert({
                        message: 'Đã Thay Đổi Trạng Thái Khuyến Mãi Sản Phẩm !',
                        backdrop: true
                    });
                    $state.transitionTo('home.listItems', {}, {
                        reload: true
                    });
                }, function (res) {
                    //console.log(res);
                    bootbox.alert({
                        message: 'Thay Đổi Thất Bại Mời Thử Lại !',
                        backdrop: true
                    });
                    $state.transitionTo('home.listItems', {}, {
                        reload: true
                    });
                })
            } else if (clas == 'Quần') {
                trousersResource().update({
                    trouserId: _id
                }, {
                    featured: !featured
                }, function (res) {
                    //console.log(res);
                    bootbox.alert({
                        message: 'Đã Thay Đổi Trạng Thái Khuyến Mãi Sản Phẩm !',
                        backdrop: true
                    });
                    $state.transitionTo('home.listItems', {}, {
                        reload: true
                    });
                }, function (res) {
                    //console.log(res);
                    bootbox.alert({
                        message: 'Thay Đổi Thất Bại Mời Thử Lại !',
                        backdrop: true
                    });
                    $state.transitionTo('home.listItems', {}, {
                        reload: true
                    });
                })
            }
        }

        function changeInfoItem(_id, item, clas) {
            //console.log(_id, item, clas);

            bootbox.confirm({
                size: 'smaill',
                message: 'Bạn Có Chắc Muốn Thay Đổi Chứ !',
                buttons: {
                    confirm: {
                        label: 'Đồng Ý !',
                        className: 'btn-primary'
                    },
                    cancel: {
                        label: 'Chưa !',
                        className: 'btn-danger'
                    }
                },
                callback: function (result) {
                    if (result == true) {
                        if (clas == 'Áo Dài') {
                            //console.log('Route Aodai', clas);
                            //console.log(onsale);
                            aodaiResource().update({
                                aodaiId: _id
                            }, item, function (res) {
                                console.log(res);
                                bootbox.alert({
                                    message: 'Đã Cập Nhật Sản Phẩm !',
                                    backdrop: true
                                });
                                $state.go('home.listItems.aodaiDetail', {
                                    id: _id
                                }, {
                                    reload: true
                                });
                            }, function (res) {
                                console.log(res);
                                bootbox.alert({
                                    message: 'Thay Đổi Thất Bại Mời Thử Lại !',
                                    backdrop: true
                                });
                                $state.go('home.listItems.aodaiDetail', {
                                    id: _id
                                }, {
                                    reload: true
                                });
                            })

                        } else if (clas == 'Áo') {
                            shirtsResource().update({
                                shirtId: _id
                            }, item, function (res) {
                                console.log(res);
                                bootbox.alert({
                                    message: 'Đã Cập Nhật Sản Phẩm !',
                                    backdrop: true
                                });
                                location.reload();
                            }, function (res) {
                                console.log(res);
                                bootbox.alert({
                                    message: 'Thay Đổi Thất Bại Mời Thử Lại !',
                                    backdrop: true
                                });
                                location.reload();
                            })
                        } else if (clas == 'Đầm') {
                            dressResource().update({
                                dressId: _id
                            }, item, function (res) {
                                console.log(res);
                                bootbox.alert({
                                    message: 'Đã Cập Nhật Sản Phẩm !',
                                    backdrop: true
                                });
                                location.reload();
                            }, function (res) {
                                console.log(res);
                                bootbox.alert({
                                    message: 'Thay Đổi Thất Bại Mời Thử Lại !',
                                    backdrop: true
                                });
                                location.reload();
                            })
                        } else if (clas == 'Quần') {
                            trousersResource().update({
                                trouserId: _id
                            }, item, function (res) {
                                console.log(res);
                                bootbox.alert({
                                    message: 'Đã Cập Nhật Sản Phẩm !',
                                    backdrop: true
                                });
                                location.reload();
                            }, function (res) {
                                console.log(res);
                                bootbox.alert({
                                    message: 'Thay Đổi Thất Bại Mời Thử Lại !',
                                    backdrop: true
                                });
                                location.reload();
                            })
                        }
                    } else {
                        console.log(result);
                    }
                }
            });

        }

    }

})();
