const Joi = require("joi");

const hexColor = Joi.string().pattern(/^#[0-9A-Fa-f]{6}$/);

const schema = Joi.object({
  beaconType: Joi.string().valid("singleBeacon", "networkBeacon").required(),

  ui: Joi.object({
    title: Joi.string().min(3).max(100).required(),

    colors: Joi.object({
      primary: hexColor.required(),
      secondary: hexColor.required(),
    }).required(),

    logos: Joi.object({
      main: Joi.string().uri({ relativeOnly: true }).required(),
      founders: Joi.array()
        .items(Joi.string().uri({ relativeOnly: true }))
        .max(3),
    }).required(),

    commonFilters: Joi.object({
      topics: Joi.array().items(Joi.string().min(1).max(20)).max(3).required(),

      filterLabels: Joi.object()
        .pattern(
          Joi.string().valid(...Joi.ref("...topics")),
          Joi.array().items(Joi.string().min(1).max(30)).max(6)
        )
        .required(),
    }).required(),
  }).required(),
});

module.exports = schema;
