const articleSchema = {};

articleSchema.newArticle = 'INSERT INTO articles(article_title, article_text, appr_status, employee_id, creation_date) VALUES($1, $2, $3, $4, $5) RETURNING *';

articleSchema.getAnArticleText = 'select a.article_id as id, a.creation_date as createdOn, a.article_title as title, a.article_text as article from articles a where a.article_id=$1';

articleSchema.getTagArticleText = 'select a.article_id as id, a.creation_date as createdOn, a.article_title as title, a.article_text as article, tag from articles a where a.tag=$1';

articleSchema.getAllArticleText = 'select a.article_id as id, a.creation_date as createdOn, a.article_title as title, a.article_text as article from articles a where a.employee_id=$1';

articleSchema.getAnArticleComment = 'SELECT c.comment_id as commentId, c.comment_text as comment, c.employee_id as authorId, c.creation_date as createdOn FROM comments_table c, article_comment ac WHERE ac.article_id=$1 and c.comment_id=ac.comment_id';

articleSchema.postAnArticleComment = 'INSERT INTO comments_table(comment_text, employee_id, creation_date, appr_status) VALUES($1, $2, $3, $4) RETURNING *';
articleSchema.updateArticleCommentTable = 'INSERT INTO article_comment(article_id, comment_id, employee_id) VALUES($1, $2, $3) RETURNING *';

articleSchema.updateAnArticle = 'UPDATE articles SET article_title=$1, article_text=$2 WHERE article_id=$3 AND employee_id=$4 RETURNING *';

articleSchema.deleteAnArticle = 'DELETE FROM articles WHERE article_id=$1 and employee_id=$2 RETURNING *';

articleSchema.getEmployeeId = 'SELECT employee_id FROM employees WHERE email=$1';

articleSchema.flagArticle = 'UPDATE articles SET appr_status=$1 WHERE article_id=$2 RETURNING *';

articleSchema.deleteComment = 'DELETE FROM comments_table WHERE comment_id=$1 and employee_id=$2 RETURNING *';

articleSchema.getCommentId = 'SELECT comment_id as id FROM article_comment WHERE article_id=$1';
articleSchema.flagArticleComment = 'UPDATE comments_table SET appr_status=$1 WHERE comment_id=$2 RETURNING *';

articleSchema.deleteFlaggedArticle = 'DELETE FROM articles where article_id=$1';
articleSchema.getFlaggedComment = 'SELECT * FROM comments_table WHERE comment_id=$1';
articleSchema.deleteFlaggedComment = 'DELETE FROM article_comment where comment_id=$1';
articleSchema.getFlaggedArticle = 'SELECT * FROM articles WHERE article_id=$1';

export default articleSchema;
