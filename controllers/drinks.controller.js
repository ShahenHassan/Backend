import desserts from "../models/desserts.model.js";
import food from "../models/food.model.js";

import drinks from "../models/drinks.models.js";

const Drink = require("../models/drinks"); 

exports.getDrink = async (req, res, next) => {
  try {
    const drink = await Drink.findById(req.params.id); 
    res.render("drink", { drink }); 
  } catch (error) {
    next(error);
  }
};

exports.postDrink = async (req, res, next) => {
  try {
    const { name, type, price } = req.body;
    const drink = new Drink({ name, type, price });
    await drink.save();
    res.redirect("/drinks"); 
  } catch (error) {
    next(error);
  }
};

exports.putDrink = async (req, res, next) => {
  try {
    const { name, type, price } = req.body;
    const drink = await Drink.findByIdAndUpdate(
      req.params.id,
      { name, type, price },
      { new: true }
    ); 
    res.render("drink", { drink }); 
  } catch (error) {
    next(error);
  }
};

exports.deleteDrink = async (req, res, next) => {
  try {
    await Drink.findByIdAndDelete(req.params.id); 
    res.redirect("/drinks");
  } catch (error) {
    next(error);
  }
};
