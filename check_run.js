

function init(app) {
    app.log.info("Init check_run!");
  
    app.on("check_run.completed", async (context) => {
        console.log("check run created");
        console.log(context);
      });
  };
  
  module.exports = Object.freeze({
      init: init,
  });