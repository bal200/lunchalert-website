function StorageService($log) {

  // we create our service object
  var StorageService = {};

  // this is where we'll store our stuff
  var storage = [];

  // this method will take in an object and set our storage variable to whatever that object is
  StorageService.store = function(object) {
    $log.log(object);
    this.storage = object;
    $log.log(this.storage);
  }

  // this is the getter for whatever is in our store
  StorageService.getStore = function() {
    return this.storage;
  }
  // here we return our newly created storage service
  return StorageService;
}

StorageService.$inject = ['$log'];

angular.module('lunchalert-portal')
  .factory('StorageService', StorageService);