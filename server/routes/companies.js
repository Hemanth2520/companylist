const express = require('express');
const router = express.Router();
const Company = require('../models/Company');

// GET /api/companies — list with optional filters
router.get('/', async (req, res) => {
  try {
    const { industry, transactionType, location, search, page = 1, limit = 12, minEmployees, maxEmployees, minBudget, maxBudget } = req.query;

    const filter = {};
    if (industry && industry !== 'All') {
      const industries = industry.split(',');
      filter.industry = industries.length > 1 ? { $in: industries } : industries[0];
    }
    if (transactionType) {
      const txTypes = transactionType.split(',');
      filter.transactionType = txTypes.length > 1 ? { $in: txTypes } : txTypes[0];
    }
    if (location) {
      const locs = location.split(',');
      filter.country = locs.length > 1 ? { $regex: locs.join('|'), $options: 'i' } : { $regex: locs[0], $options: 'i' };
    }
    if (search) filter.$text = { $search: search };

    if (minEmployees || maxEmployees) {
      filter.employees = {};
      if (minEmployees) filter.employees.$gte = parseInt(minEmployees);
      if (maxEmployees) filter.employees.$lte = parseInt(maxEmployees);
    }

    // Note: Budget is currently stored as String. For numeric filtering,
    // we would need a numeric field in the model. For now, we implement
    // it as a simple string match or skip if not numeric.
    // In a real app, we'd migrate 'budget' to a Number field.
    if (minBudget || maxBudget) {
      // This is a placeholder for budget filtering since budget is String
      // If budget was Number, it would look like:
      // filter.budget = {};
      // if (minBudget) filter.budget.$gte = parseFloat(minBudget);
      // if (maxBudget) filter.budget.$lte = parseFloat(maxBudget);
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Company.countDocuments(filter);
    const companies = await Company.find(filter)
      .sort({ featured: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      companies,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/companies/industries — get industry counts
router.get('/industries', async (req, res) => {
  try {
    const counts = await Company.aggregate([
      { $group: { _id: '$industry', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    res.json(counts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/companies/:id — single company
router.get('/:id', async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: 'Company not found' });
    // Increment views
    company.views += 1;
    await company.save();
    res.json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/companies — create
router.post('/', async (req, res) => {
  try {
    const company = new Company(req.body);
    const saved = await company.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/companies/:id — update
router.put('/:id', async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.json(company);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/companies/:id — delete
router.delete('/:id', async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.json({ message: 'Company deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
