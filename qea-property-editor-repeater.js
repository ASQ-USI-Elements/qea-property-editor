'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  var qeaPropertyEditorRepeater = function () {
    function qeaPropertyEditorRepeater() {
      _classCallCheck(this, qeaPropertyEditorRepeater);
    }

    _createClass(qeaPropertyEditorRepeater, [{
      key: 'beforeRegister',
      value: function beforeRegister() {
        this.is = 'qea-property-editor-repeater';
        this.properties = {
          /**
          * Array of objects represented all the properties
          */
          propertyArray: {
            type: Array,
            observer: '_valuesCreator'
          },

          /**
          * Object containing the binded values of the properties.
          * Object keys are the property names
          * @notify true
          * @type {{<propertyName>: value}}
          */
          values: {
            type: Object,
            value: function value() {
              return {};
            },
            notify: true
          },

          /**
          * Property use to hide advanced property to normal users
          * @default false
          */
          isAdvancedUser: {
            type: Boolean
          }
        };
      }

      // function here

    }, {
      key: '_valuesCreator',
      value: function _valuesCreator(propertyArray) {
        var values = {};
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = propertyArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var prop = _step.value;

            values[prop.name] = undefined;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        this.values = values;
      }
    }, {
      key: '_notifyChanges',
      value: function _notifyChanges(e) {
        var propName = e.target.name;
        var value = e.detail.value;
        var currentValues = this.values;
        if (value != undefined) {
          currentValues[propName] = value;
          this.set('values', Object.assign({}, currentValues));
        }
      }
    }, {
      key: 'behaviors',
      get: function get() {
        return [];
      }
    }]);

    return qeaPropertyEditorRepeater;
  }();

  Polymer(qeaPropertyEditorRepeater);
})();