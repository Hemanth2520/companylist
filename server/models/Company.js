const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    tagline: { type: String, default: '' },
    industry: {
      type: String,
      required: true,
      enum: ['Manufacturing', 'Technology', 'Healthcare', 'Hospitality', 'Energy', 'Finance', 'Retail'],
    },
    badge: {
      type: String,
      enum: ['PREMIUM', 'VERIFIED', 'NEW LISTING', 'URGENT SALE', 'FEATURED', null],
      default: null,
    },
    transactionType: {
      type: String,
      enum: ['Business for Sale', 'Investment Opportunity'],
      default: 'Business for Sale',
    },
    // Financial fields
    budget: { type: String, default: '' },      // e.g. "$4.2M"
    revenue: { type: String, default: '' },     // e.g. "$1.2M /yr"
    investment: { type: String, default: '' },  // e.g. "$1.5M - $2.0M"
    askingPrice: { type: String, default: '' }, // e.g. "$12.5M"
    assets: { type: String, default: '' },      // e.g. "$1.2M"
    ebitda: { type: String, default: '' },      // e.g. "15%"
    // Company details
    employees: { type: Number, default: 0 },
    location: { type: String, required: true },
    country: { type: String, default: '' },
    established: { type: Number, default: null },
    about: { type: String, default: '' },
    description: { type: String, default: '' },
    image: { type: String, default: '' },
    // Extra
    website: { type: String, default: '' },
    contactEmail: { type: String, default: '' },
    tags: [{ type: String }],
    featured: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
  },
  { timestamps: true }
);

// Text search index
companySchema.index({ name: 'text', about: 'text', industry: 'text', location: 'text' });

module.exports = mongoose.model('Company', companySchema);
