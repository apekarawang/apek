import 'react-select/dist/react-select.css';
import 'material-icons/iconfont/material-icons.css';

import Select from 'react-select';
import MaterialIconList from 'material-design-icon-list/src/icons.json';

export const Control = createClass({
  handleChange(option) {
    this.props.onChange(option.name)
  },
  render() {
    return h(
      Select,
      {
        labelKey: 'name',
        valueKey: 'name',
        options: MaterialIconList,
        optionRenderer: this.renderOption,
        onChange: this.handleChange,
        value: this.props.value,
        valueRenderer: this.renderOption,
      }
    );
  },
  renderOption(option) {
    return h(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center'
        }
      },
      h('i', { className: 'material-icons' }, option.name),
      h('span', {style: {marginLeft: 10}}, option.name.replace('_', ' ').toUpperCase())
    );
  },
});

export const Preview = createClass({
  render: function() {
    return h('i', { className: 'material-icons' }, this.props.value.name);
  },
});