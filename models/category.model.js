const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    validate: {
      validator: function(v) {
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  description: {
    type: String,
    trim: true
  },
  taxApplicable: {
    type: Boolean,
    default: false
  },
  tax: {
    type: Number,
    min: 0
  },
  baseAmount: {
    type: Number,
    required: true,
    min: 0
  },
  discount: {
    type: Number,
    min: 0,
    default: 0
  },
  totalAmount: {
    type: Number,
    required: true
  }
});

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    validate: {
      validator: function(v) {
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  description: {
    type: String,
    trim: true
  },
  taxApplicable: {
    type: Boolean,
    default: function() { return this.parent().taxApplicable; }
  },
  tax: {
    type: Number,
    default: function() { return this.parent().tax; }
  },
  items: [itemSchema]
});

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(v);
      },
      message: props => `${props.value} is not a valid URL!`
    }
  },
  description: {
    type: String,
    trim: true
  },
  taxApplicable: {
    type: Boolean,
    required: true,
    default: false
  },
  tax: {
    type: Number,
    min: 0,
    required: function() { return this.taxApplicable; }
  },
  taxType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: function() { return this.taxApplicable; }
  },
  subCategories: [subCategorySchema],
  items: [itemSchema]
}, {
  timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
