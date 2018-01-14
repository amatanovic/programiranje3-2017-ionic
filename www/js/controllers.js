angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($rootScope) {
        $rootScope.putanja = 'http://it.ffos.hr/P11617/tjakopec/P3/Programiranje3API/';
    })

    .controller('PocetnaCtrl', function ($scope, $http, $rootScope) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        $scope.$on('$ionicView.enter', function(e) {
            $scope.studenti = [];

            $http.get($rootScope.putanja + 'read')
                .success(function (podaci) {
                    $scope.studenti = podaci;
                });
        });


        $scope.search = {};
        $scope.pretrazi = function () {
            var traziUrl = $rootScope.putanja + 'search/' + $scope.search.input;
            if($scope.search.input === ''){
                traziUrl = $rootScope.putanja + 'read';
            }

            $http.get(traziUrl)
                .success(function (podaci) {
                    $scope.studenti = podaci;
                })
        };

    })

    .controller('DetaljiCtrl', function ($scope, $stateParams, $http, $state, $rootScope) {
        $scope.student = {};
        $scope.update = true;
        $scope.naslov = 'Detalji studenta';
        $http.get($rootScope.putanja + 'read/'
            + $stateParams.sifra)
            .success(function (podatak) {
                $scope.student = podatak;
            });

        $scope.akcija = function () {
            delete $scope.student.datumprijave;
            $http({
                url: $rootScope.putanja + 'update',
                data: $scope.student,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function (odgovor) {
                if (odgovor === 'OK') {
                    $state.go('tab.pocetna');
                }
            })
        };

        $scope.brisanje = function () {
            var sifra = {
                sifra: $scope.student.sifra
            };

            $http({
                url: $rootScope.putanja + 'delete',
                data: sifra,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function (odgovor) {
                if (odgovor === 'OK') {
                    $state.go('tab.pocetna');
                }
            })
        };
    })
    .controller('NoviCtrl', function ($scope, $http, $state, $rootScope) {
        $scope.student = {};
        $scope.naslov = 'Novi student';

        $scope.akcija = function () {
            $http({
                url: $rootScope.putanja + 'create',
                data: $scope.student,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).success(function (odgovor) {
                if (odgovor === 'OK') {
                    $state.go('tab.pocetna');
                }
            })
        };
    });