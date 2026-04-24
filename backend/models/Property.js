const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    location: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true },
    beds: { type: Number, default: 0 },
    baths: { type: Number, default: 0 },
    sqft: { type: Number, required: true },
    status: {
      type: String,
      enum: ['Ready to Move', 'Under Construction', 'New Launch', 'Upcoming'],
      required: true,
    },
    type: {
      type: String,
      enum: ['Apartment', 'Villa', 'Penthouse', 'Commercial', 'Plot'],
      required: true,
    },
    category: {
      type: String,
      enum: ['Buy', 'Rent', 'Commercial'],
      required: true,
    },
    developer: { type: String, required: true, trim: true },
    rera: { type: String, default: 'Applied' },
    image: {
      type: String,
      default:
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Property', propertySchema);
