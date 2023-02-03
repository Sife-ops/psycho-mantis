import { builder } from "../builder";

// const ArticleType = builder
//   .objectRef<Article.ArticleEntityType>("Article")
//   .implement({
//     fields: (t) => ({
//       id: t.exposeID("articleID"),
//       url: t.exposeString("url"),
//       title: t.exposeString("title"),
//     }),
//   });

const ArticleType = builder.objectRef<{
  articleID: string;
  title: string;
  url: string;
}>("Article");

builder.queryFields((t) => ({
  article: t.field({
    type: ArticleType,
    args: {
      articleID: t.arg.string({ required: true }),
    },
    resolve: async (_, args) => {
      return {
        articleID: "1",
        title: "1",
        url: "1",
      };
    },
  }),
  articles: t.field({
    type: [ArticleType],
    resolve: () => [],
  }),
}));

builder.mutationFields((t) => ({
  createArticle: t.field({
    type: ArticleType,
    args: {
      title: t.arg.string({ required: true }),
      url: t.arg.string({ required: true }),
    },
    resolve: (_, args) => {
      return {
        articleID: "1",
        title: "1",
        url: "1",
      };
    },
  }),
}));
