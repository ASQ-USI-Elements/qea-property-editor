'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var qeaAdvancedCodeEditor = function () {
    function qeaAdvancedCodeEditor() {
      _classCallCheck(this, qeaAdvancedCodeEditor);
    }

    _createClass(qeaAdvancedCodeEditor, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'qea-advanced-code-editor';
        this.properties = {
          label: {
            type: String,
            value: 'Create or modify code'
          },
          isDialogOpen: {
            notify: true,
            type: Boolean,
            value: false
          },
          theme: {
            notify: true,
            type: String,
            value: 'chrome'
          },
          fontSize: {
            notify: true,
            type: Number,
            value: 12
          },
          mode: {
            notify: true,
            type: String,
            value: 'html'
          },
          readonly: {
            notify: true,
            type: Boolean,
            value: false
          },
          tabSize: {
            notify: true,
            value: 4,
            type: Number
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
      * Promise use to open the advanced code dialog
      * @param content : if you whant to modify code
      * @return the text created or modified or null if user close the dialog
      */

    }, {
      key: 'openCodeDialog',
      value: function openCodeDialog(content) {
        var _this = this;

        this.isDialogOpen = true;
        if (content) {
          this.$.aceEditor.editorValue = content;
        }
        return new Promise(function (resolve) {
          var self = _this;
          function onIronOverlayClosed(e) {
            var result = null;
            if (e.detail.confirmed) {
              result = self.$.aceEditor.editorValue;
            }
            self.$.aceEditor.editorValue = '';
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

    return qeaAdvancedCodeEditor;
  }();

  Polymer(qeaAdvancedCodeEditor);
})();