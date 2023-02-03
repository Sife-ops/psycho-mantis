const DUMMY_RESOLVER = { serialize: x => x, parseValue: x => x }; 
import SchemaBuilder from '@pothos/core';
var builder = new SchemaBuilder({});
builder.queryType({});
builder.mutationType({});
var ArticleType = builder.objectRef('Article');
builder.queryFields(t => ({
    article: t.field({
        type: ArticleType,
        args: { articleID: t.arg.string({ required: true }) }
    }),
    articles: t.field({ type: [ArticleType] })
}));
builder.mutationFields(t => ({
    createArticle: t.field({
        type: ArticleType,
        args: {
            title: t.arg.string({ required: true }),
            url: t.arg.string({ required: true })
        }
    })
}));
var schema = builder.toSchema({});
export {
    schema
};