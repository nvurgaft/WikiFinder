/**
 * Created by Koby on 06-Oct-15.
 */
function databaseController($log, databaseService) {

    var vm = this;

    vm.itemsByPage = 10;
    vm.displayedPages = 10;

    vm.rowCollection = [];

    vm.newRecord = {
        qid: "",
        name: "",
        instanceOf: "",
        viafIndentifier: "",
        nliIdentifier: ""
    };

    vm.isCollapsed = true;
    vm.toggleCollapse = function () {
        vm.isCollapsed = !vm.isCollapsed;
        console.log(vm.isCollapsed);
    };

    vm.submit = function () {
        $log.debug("submit");
        vm.rowCollection.push(vm.newRecord);
        vm.newRecord = {
            qid: "",
            name: "",
            instanceOf: "",
            viafIndentifier: "",
            nliIdentifier: ""
        };
    };

    vm.removeRecord = function (item) {
        var idx = _.indexOf(vm.rowCollection, item);
        vm.rowCollection.splice(idx, 1);
    };

}

angular.module('app').controller('databaseController', databaseController);

