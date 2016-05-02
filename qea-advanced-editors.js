'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var qeaAdvancedEditors = function () {
    function qeaAdvancedEditors() {
      _classCallCheck(this, qeaAdvancedEditors);
    }

    _createClass(qeaAdvancedEditors, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'qea-advanced-editors';
        this.properties = {
          _isOpen: {
            type: Boolean,
            value: false
          },
          _disabled: {
            type: Object,
            value: function value() {
              return { text: false, code: false };
            }
          },
          _selected: {
            type: Number,
            value: 0
          }
        };
      }
    }, {
      key: '_preventCancellation',
      value: function _preventCancellation() {
        event.preventDefault();
      }
    }, {
      key: '_selectPage',
      value: function _selectPage() {
        var type = arguments.length <= 0 || arguments[0] === undefined ? 'text-code' : arguments[0];
        var content = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

        switch (type.toLowerCase()) {
          case 'richtext':
            this.set('_disabled.code', true);
            this._selected = 0;
            this.$.textEditor.setContent(content);
            break;
          case 'code':
            this.set('_disabled.text', true);
            this._selected = 1;
            this.$.aceEditor.editorValue = content;
            break;
          default:
            this.set('_disabled.code', false);
            this.set('_disabled.text', false);
            this.$.textEditor.setContent(content);
            this.$.aceEditor.editorValue = content;
        }
      }
    }, {
      key: '_getContent',
      value: function _getContent() {
        var content = '';
        if (this._selected == 0) {
          content = this.$.textEditor.getContent();
        } else {
          content = '<pre><code>' + this.$.aceEditor.editorValue + '</code></pre>';
        }
        return content;
      }
    }, {
      key: 'openDialog',
      value: function openDialog(content, type) {
        var _this = this;

        this._isOpen = true;
        this._selectPage(type, content);
        return new Promise(function (resolve) {
          var self = _this;
          function onIronOverlayClosed(e) {
            var result = null;
            if (e.detail.confirmed) {
              result = self._getContent();
            }
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

    return qeaAdvancedEditors;
  }();

  Polymer(qeaAdvancedEditors);
})();