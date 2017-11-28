angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('PocetnaCtrl', function($scope, $http) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

    $scope.studenti = [];
    $scope.search = {};

    $scope.pretrazi = function () {
        $http.get('http://it.ffos.hr/P11617/tjakopec/P3/Programiranje3API/search/' + $scope.search.input)
            .success(function (podaci) {
                $scope.studenti = podaci;
            })
    };
    $http.get('http://it.ffos.hr/P11617/tjakopec/P3/Programiranje3API/read')
        .success(function (podaci) {
            $scope.studenti = podaci;
        });

})

.controller('DetaljiCtrl', function($scope, $stateParams, $http, $state) {
  $scope.student = {};
  $scope.update = true;
  $scope.naslov = 'Detalji studenta';
    $http.get('http://it.ffos.hr/P11617/tjakopec/P3/Programiranje3API/read/'
        + $stateParams.sifra)
        .success(function (podatak) {
            $scope.student = podatak;
        });

    $scope.akcija = function () {
      delete $scope.student.datumprijave;
        $http({
            url: 'http://it.ffos.hr/P11617/tjakopec/P3/Programiranje3API/update',
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

    $scope.obrisi = function () {
      var sifra = {
        sifra: $scope.student.sifra
      };

        $http({
            url: 'http://it.ffos.hr/P11617/tjakopec/P3/Programiranje3API/delete',
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
    .controller('NoviCtrl', function ($scope, $http, $state) {
        $scope.student = {};
        $scope.naslov = 'Novi student';

        $scope.akcija = function () {
            $http({
                url: 'http://it.ffos.hr/P11617/tjakopec/P3/Programiranje3API/create',
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