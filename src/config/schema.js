const Joi = require("joi");

const hexColor = Joi.string().pattern(/^#[0-9A-Fa-f]{6}$/);
url: Joi.string()
  .pattern(/^https:\/\/.+/)
  .required();

const allowedEntryTypes = [
  "analyses",
  "biosamples",
  "cohorts",
  "datasets",
  "g_variants",
  "individuals",
  "runs",
];

const schema = Joi.object({
  beaconType: Joi.string().valid("singleBeacon", "networkBeacon").required(),
  apiUrl: Joi.string()
    .pattern(/^https:\/\/.+/)
    .required()
    .messages({
      "string.pattern.base":
        'API_URL must be a valid HTTPS URL (e.g., "https://example.com/api")',
      "any.required": "API_URL is required",
    }),

  assemblyId: Joi.array()
    .items(Joi.string().min(1))
    .min(1)
    .required()
    .messages({
      "any.required": "assemblyId is required",
      "array.min": "At least one assemblyId must be provided",
      "string.min": "assemblyId values cannot be empty strings",
    }),

  ui: Joi.object({
    showExternalNavBarLink: Joi.boolean().required(),

    externalNavBarLink: Joi.alternatives().conditional(
      "showExternalNavBarLink",
      {
        is: true,
        then: Joi.array()
          .items(
            Joi.object({
              label: Joi.string().min(1).max(30).required(),
              url: Joi.string()
                .pattern(/^https:\/\/.+/)
                .required()
                .messages({
                  "string.pattern.base":
                    "Each externalNavBarLink URL must be a valid HTTPS link (e.g., https://...)",
                }),
            })
          )
          .min(1)
          .required(),
        otherwise: Joi.forbidden().messages({
          "any.unknown":
            "externalNavBarLink is not allowed when showExternalNavBarLink is false",
        }),
      }
    ),
    title: Joi.string().min(3).max(100).required(),
    entryTypesOrder: Joi.array()
      .items(Joi.string().valid(...allowedEntryTypes))
      .max(7)
      .optional()
      .messages({
        "array.max": "You can specify a maximum of 7 entry types for ordering.",
      }),
  }).required(),
  showAboutPage: Joi.boolean().optional(),
  showContactPage: Joi.boolean().optional(),

  colors: Joi.object({
    primary: hexColor.required(),
    darkPrimary: hexColor.required(),
    secondary: hexColor.required(),
    tertiary: hexColor.required(),
  }).required(),

  logos: Joi.object({
    main: Joi.string().uri({ relativeOnly: true }).required(),
    founders: Joi.array()
      .items(Joi.string().uri({ relativeOnly: true }))
      .max(3),
  }).required(),

  // This is optional, but when the user decides to fill in the field, then there are rules.
  // This field gives a lot of freedom to the beacon user
  commonFilters: Joi.object({
    filterCategories: Joi.array()
      .items(Joi.string().min(1).max(20))
      .max(3)
      .required(),

    filterLabels: Joi.object()
      .pattern(
        Joi.string().valid(...Joi.ref("...filterCategories")),
        Joi.array()
          .items(
            Joi.object({
              key: Joi.string().min(1).max(100).required(),
              label: Joi.string().min(1).max(100).optional(),
              type: Joi.string().valid("ontology", "alphanumeric").required(),
              id: Joi.string().min(1).required(),
            })
          )
          .max(6)
      )
      .required(),
  }).optional(),

  // This is also optional
  // This field directs the user into choosing at least one of the following strings
  // This filed might need further development (TODO)
  genomicAnnotations: Joi.object({
    visibleGenomicCategories: Joi.array()
      .items(
        Joi.string().valid(
          "SNP Examples",
          "CNV Examples",
          "Protein Examples",
          "Molecular Effect"
        )
      )
      .min(1)
      .required()
      .messages({
        "any.required":
          "visibleGenomicCategories is required under genomicAnnotations",
        "array.min":
          "At least one genomicAnnotations category must be provided",
      }),
  }).optional(),
});

module.exports = schema;
