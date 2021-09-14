const { createTokenAuth } = require("@octokit/auth-token");

const auth = createTokenAuth("1234567890abcdef1234567890abcdef12345678");

function init(app) {
    app.log.info("Init issue_comment!");

    app.on("issue_comment.created", async (context) => {
        var payload = context.payload;
        if ('pull_request' in payload.issue){
            issue_user_login = payload.issue.login;
            comment_user_login = payload.comment.user.login;
            comment_body = payload.comment.body;
            command = null;
            if (comment_body.toLowerCase().startsWith('/azurepipelineswrapper run')){
                command = comment_body.substring(26);
            }
            else if (comment_body.toLowerCase().startsWith('/azpw run')){
                command = comment_body.substring(9);
            }
            if (command != null){
                if (issue_user_login == comment_user_login){
                    comment = '/AzurePipelines run' + command;
                    const issueComment = context.issue({
                        body: "Thanks for opening this issue!",
                    });
                    return context.octokit.issues.createComment(issueComment);
                }
            }
            
        }
    console.log("issue comment created");
    console.log(context);
  });
};

module.exports = Object.freeze({
    init: init,
});