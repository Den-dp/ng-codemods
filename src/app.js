(function(){
    'use strict';

    angular.module('app', [])
        .config(routeConfiguration)
        .run(routeConfiguration);

    function routeConfiguration(){
        var foo = 1;
    }

})();
