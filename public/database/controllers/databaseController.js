/**
 * Created by Koby on 06-Oct-15.
 */
function databaseController(databaseService) {

    var vm = this;

    vm.itemsByPage=10;
    vm.displayedPages=10

    vm.rowCollection = [];

    // dummy
    for (var j = 0; j < 50; j++) {
        vm.rowCollection.push({
            qid: j+17,
            dateCreated: Date.now(),
            lastUpdated: Date.now(),
            name: "Dummy name",
            instanceOf: "Human",
            viafIndentifier: Math.floor(Math.random()*1000),
            nliIdentifier: Math.floor(Math.random()*1000)
        });
    }
}

angular.module('app').controller('databaseController', databaseController);

