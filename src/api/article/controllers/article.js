"use strict";

/**
 *  article controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::article.article", ({ strapi }) => ({
  async findOne(ctx) {
    const { id } = ctx.params;
    const sanitizedQueryParams = await this.sanitizeQuery(ctx);
    const article = await strapi.documents("api::article.article").findMany({
      ...sanitizedQueryParams,
      filters: { slug: id },
      // populate: ["author", "category", "cover", "blocks"],
    });
    const sanitizedEntity = await this.sanitizeOutput(article[0], ctx);
    return this.transformResponse(sanitizedEntity);
  },
}));
