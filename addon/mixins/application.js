import Ember from 'ember';

export default Ember.Mixin.create({

  find: function () {
    return this.preAppFind({
      arguments: arguments,
      super: this._super
    });
  },

  findAll: function () {
    return this.preAppFind({
      arguments: arguments,
      super: this._super
    });
  },

  preAppFind: function (opts) {

    // Grab our global objects as well as our type.
    var typeKey = opts.arguments[1].typeKey;
    var request =  window.__ds_adapter_preapp_request[typeKey];

    // Delete the key so no subsequent calls to `find` use it.
    delete window.__ds_adapter_preapp_request[typeKey];

    // If no request exists, use super and call it a day.
    if ( !request ) {
      return opts.super.apply(this, opts.arguments);
    } else {

      return new Ember.RSVP.Promise(function (resolve, reject) {

        // If responseText has already been set by the pre-app request,
        // resolve with it.
        if ( request.responseText ) {
          resolve(JSON.parse(request.responseText));

        // If response has not been set by the pre-app request,
        // this likely means that the request is not yet finished.
        // Let's hook into the onload and resolve/reject accordingly.
        } else {

          var onFn = function () {
            var response = JSON.parse(request.responseText);
            if (request.status >= 200 && request.status < 400) {
              resolve(response);
            } else {
              reject(response);
            }
          };

          request.onload = onFn;
          request.onerror = onFn;

        }

      });

    }

  }

});
