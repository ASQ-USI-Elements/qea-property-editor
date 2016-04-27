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
          * if type == enum will bea series of strings ex "dog, cat, elephant".
          * if type == number && widgetType == range use this notation "1-10"
          */
          default: {
            notify: true,
            observer: '_setInitialValue'
          },

          value: {
            notify: true,
            observer: '_applyProperty'
          },

          /**
          * OPTIONAL. if true this property will be visible only to advanced users
          * @default true
          */
          isAdvancedProperty: {
            type: Boolean,
            value: false
          },

          isAdvancedUser: {
            type: Boolean,
            value: false
          },

          _nameToVisualize: {
            type: String,
            computed: '_nameChooser(name, label)'
          },

          _slider: {
            type: Object,
            value: function value() {
              return { min: 0, max: 10 };
            }
          },

          _enum: {
            type: Array,
            value: function value() {
              return [];
            }
          }
        };
      }
    }, {
      key: '_isAcceptableType',
      value: function _isAcceptableType(type, isAdvancedUser, isAdvancedProperty) {
        var availableType = ['boolean', 'string', 'number', 'enum'].indexOf(type.toLowerCase()) > -1;
        return availableType && isAdvancedUser === isAdvancedProperty || !isAdvancedProperty;
      }
    }, {
      key: '_showNumber',
      value: function _showNumber(type) {
        var inputKind = arguments.length <= 1 || arguments[1] === undefined ? 'simple' : arguments[1];

        if (type === 'number' && this.widgetType == inputKind) {
          return true;
        } else if (type === 'number' && !this.widgetType && inputKind == 'simple') {
          return true;
        }
        return false;
      }
    }, {
      key: '_showString',
      value: function _showString(type) {
        return type.toLowerCase() === 'string';
      }
    }, {
      key: '_showEnum',
      value: function _showEnum(type) {
        return type.toLowerCase() === 'enum';
      }
    }, {
      key: '_showBoolean',
      value: function _showBoolean(type) {
        return type.toLowerCase() === 'boolean';
      }
    }, {
      key: '_nameChooser',
      value: function _nameChooser(name) {
        var label = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

        return label === '' ? name : label;
      }
    }, {
      key: '_setInitialValue',
      value: function _setInitialValue(defaultValue) {
        // boolean | string | number | enum
        // colour | richText  | range | code
        switch (this.type.toLowerCase()) {
          case 'boolean':
            this.value = defaultValue == 'true';
            break;
          case 'string':
            if (this.widgetType && ['colour', 'richText', 'code'].indexOf(this.widgetType.toLowerCase()) > -1) {
              // set advance editor
            } else {
                this.value = defaultValue;
              }
            break;
          case 'number':
            if (this.widgetType && this.widgetType.toLowerCase() === 'range') {
              var values = defaultValue.split('-');
              this._slider = { min: Number(values[0]), max: Number(values[1]) };
            } else {
              this.value = defaultValue;
            }
            break;
          case 'enum':
            this._enum = defaultValue.split(',');
            break;
          default:

        }
      }
    }, {
      key: '_applyProperty',
      value: function _applyProperty(value) {
        if (this.referenceId && this.referenceId !== '') {
          Polymer.dom(this.parentNode).querySelector('#' + this.referenceId)[this.name] = value;
        }
      }
    }, {
      key: '_showInfo',
      value: function _showInfo() {
        alert(this.description);
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