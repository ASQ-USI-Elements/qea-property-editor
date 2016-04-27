'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var qeaPropertyEditor = function () {
    function qeaPropertyEditor() {
      _classCallCheck(this, qeaPropertyEditor);
    }

    _createClass(qeaPropertyEditor, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'qea-property-editor';
        this.properties = {
          /**
          * Name of the property
          */
          name: String,

          /**
          * OPTIONAL. User friendly name of the property.
          * if not specified will be used the 'name' property OPTIONAL
          */
          label: String,

          /**
          * Specify the type of the input to show to edit the property
          * @value boolean | string | number | enum
          */
          type: {
            type: String,
            value: 'string'
          },

          /**
          * OPTIONAL Specify the type of the advanced input to show
          * to edit the property
          * @value colour | richText  | range | code
          */
          widgetType: String,

          /**
          * OPTIONAL description of the property.
          */
          description: String,

          /**
          * OPTIONAL id of the item you want to apply this property.
          * Use polymer data binding when possible.
          */
          referenceId: String,

          /**
          * OPTIONAL default property value,
          * if type == enum will bean array of strings ex "['hello', 'world']".
          * if type == number && widgetType == range use this notation "1-10"
          */
          default: {
            notify: true
          },

          value: {
            notyfy: true
          },

          /**
          * OPTIONAL. if true this property will be visible only to advanced users
          * @default true
          */
          isAdvancedProperty: {
            type: Boolean,
            value: true
          },

          isAdvancedUser: {
            type: Boolean,
            value: false
          },

          _nameToVisualize: {
            type: String,
            computed: '_nameChooser(name, label)'
          }
        };
      }
    }, {
      key: '_isAcceptableType',
      value: function _isAcceptableType(type) {
        return ['boolean', 'string', 'number', 'enum'].indexOf(type.toLowerCase()) > -1;
      }
    }, {
      key: '_checkType',
      value: function _checkType(type, propType) {
        return type.toLowerCase() === propType.toLowerCase();
      }
    }, {
      key: '_nameChooser',
      value: function _nameChooser(name) {
        var label = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

        return label === '' ? name : label;
      }
    }, {
      key: 'behaviors',
      get: function get() {
        return [];
      }
    }]);

    return qeaPropertyEditor;
  }();

  Polymer(qeaPropertyEditor);
})();