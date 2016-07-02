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
          label: {
            type: String,
            value: ''
          },

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

          /**
          * return value of the editor
          */
          value: {
            notify: true,
            observer: '_applyProperty'
          },

          /**
          * OPTIONAL. if true this property will be visible only to advanced users
          * @default true
          */
          isAdvancedProperty: {
            type: String,
            value: 'false'
          },

          /**
          * if true, the code editor will not wrap the return values into <pre><code> tags
          */
          noWrap: {
            type: Boolean,
            value: false
          },

          /**
          * list of options for enum type
          */
          options: {
            type: String,
            value: '',
            observer: '_setOptions'
          },

          /**
          * OPTIONAL. if true all properties will be visible
          * @default true
          */
          isAdvancedUser: {
            type: String,
            value: 'false'
          },

          _nameToVisualize: {
            type: String,
            computed: '_nameChooser(name)'
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
          },

          _isPropertyVisible: {
            type: Boolean,
            computed: '_isAcceptableType(type, isAdvancedUser)'
          },

          _showDescription: {
            type: Boolean,
            value: true,
            computed: '_showDesc(description)'
          }
        };
      }
    }, {
      key: '_showDesc',
      value: function _showDesc(desc) {
        return desc ? false : true;
      }
    }, {
      key: '_isAcceptableType',
      value: function _isAcceptableType(type, isAdvancedUser) {
        var availableType = ['boolean', 'string', 'number', 'enum'].indexOf(type.toLowerCase()) > -1;
        var isAdvUs = isAdvancedUser.toLowerCase() == 'true';
        var isAdvPr = this.isAdvancedProperty && this.isAdvancedProperty.toLowerCase() == 'true';

        return availableType && (isAdvUs === isAdvPr || !isAdvPr);
      }
    }, {
      key: '_showNumber',
      value: function _showNumber(type) {
        var inputKind = arguments.length <= 1 || arguments[1] === undefined ? 'simple' : arguments[1];

        if (type.toLowerCase() === 'number' && this.widgetType == inputKind) {
          return true;
        } else if (type.toLowerCase() === 'number' && !this.widgetType && inputKind == 'simple') {
          return true;
        }
        return false;
      }
    }, {
      key: '_showString',
      value: function _showString(type, templateType) {
        var general = type.toLowerCase() === 'string';
        if (!general) {
          return false;
        }
        var withWidget = this.widgetType && ['code', 'richtext', 'text-code'].indexOf(this.widgetType.toLowerCase()) > -1;
        if (withWidget && templateType == 'advanced') {
          return true;
        }
        if (!withWidget && templateType == 'simple') {
          return true;
        }
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
        var label = this.label || '';
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

            if (defaultValue && this._enum.indexOf(defaultValue) > -1) {
              this.value = this.value || defaultValue;
            } else {
              this.value = this.value || '';
            }
            break;
          default:

        }
      }
    }, {
      key: '_applyProperty',
      value: function _applyProperty(value, old) {
        if (value === undefined && old !== undefined) {
          this.value = old;
        }
        if (this.referenceId && this.referenceId !== '') {
          Polymer.dom(this.parentNode).querySelector('#' + this.referenceId)[this.name] = value;
        }
      }
    }, {
      key: '_openAdvancedEdit',
      value: function _openAdvancedEdit() {
        var _this = this;

        var advancedEditors = Polymer.dom(this.parentNode).querySelector('qea-advanced-editors');
        if (advancedEditors) {
          var value = this.value || this.default || '';
          advancedEditors.openDialog(value, this.widgetType, this.noWrap).then(function (result) {
            if (result) {
              _this.value = result;
            }
          });
        } else {
          console.error("no editor founded. remember to include the qea-advanced-editors file");
        }
      }
    }, {
      key: '_setOptions',
      value: function _setOptions() {
        var options = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

        if (!this.options) {
          console.error('no options defined for enum type');
          return;
        }
        this._enum = options.split(',');
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