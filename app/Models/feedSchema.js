const feedSchema = {};

feedSchema.article = 'select article_id as id, creation_date as "createdOn", article_title as title, article_text as article, employee_id as authorId from articles order by "createdOn" limit 20';
feedSchema.articleComments = 'SELECT c.comment_id as commentId, c.comment_text as comment, c.employee_id as authorId, c.creation_date as createdOn, ac.article_id as articleId FROM comments_table c, article_comment ac WHERE c.comment_id=ac.comment_id'

feedSchema.gif = 'select gif_id as id, creation_date as "createdOn", gif_title as title, gif_url as url, employee_id as authorId from gif_table order by "createdOn" limit 20';
feedSchema.gifComments = 'SELECT c.comment_id as commentId, c.comment_text as comment, c.employee_id as authorId, c.creation_date as createdOn, gc.gif_id as gifId FROM comments_table c, gif_comment gc WHERE c.comment_id=gc.comment_id'

export default feedSchema;
