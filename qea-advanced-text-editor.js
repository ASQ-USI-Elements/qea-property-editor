'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var qeaAdvancedTextEditor = function () {
    function qeaAdvancedTextEditor() {
      _classCallCheck(this, qeaAdvancedTextEditor);
    }

    _createClass(qeaAdvancedTextEditor, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'qea-advanced-text-editor';
        this.properties = {
          /**
          * notify the state of the dialog. true means open
          * readOnly
          */
          isDialogOpen: {
            type: Boolean,
            value: false,
            notify: true
          }
        };
      }

      /**
      * prevent the cancellation of the dialog when opened the code inspector of
      * the text editor or click outside the dialog
      */

    }, {
      key: '_preventCancellation',
      value: function _preventCancellation() {
        event.preventDefault();
      }

      /**
      * @return content (innerHtml) of text editor
      */

    }, {
      key: 'getContent',
      value: function getContent() {
        return this.$.editor.getContent();
      }
    }, {
      key: '_setContent',
      value: function _setContent(content) {
        this.$.editor.setContent(content);
      }

      /**
      * Promise use to open the advanced text dialog
      * @param content : if you whant tto modyfy text pass it as html
      * @return the text created or modified or null if user close the dialog
      */

    }, {
      key: 'openTextDialog',
      value: function openTextDialog(content) {
        var _this = this;

        this.isDialogOpen = true;
        if (content) {
          this._setContent(content);
        }
        return new Promise(function (resolve) {
          var self = _this;
          function onIronOverlayClosed(e) {
            var result = null;
            if (e.detail.confirmed) {
              result = self.getContent();
            }
            self._setContent('');
            e.target.removeEventListener('iron-overlay-closed', onIronOverlayClosed);
            resolve(result);
          }
          _this.$.myDialog.addEventListener('iron-overlay-closed', onIronOverlayClosed);
        });
      }
    }, {
      key: 'behaviors',
      get: function get() {
        return [];
      }
    }]);

    return qeaAdvancedTextEditor;
  }();

  Polymer(qeaAdvancedTextEditor);
})();