(function (back) {
  var settings = Object.assign({
    hrm: 0,
    stepGoal: 10000,
    stepGoalNotification: false
  }, require("Storage").readJSON("health.json", true) || {});

  E.showMenu({
    "": { title: /*LANG*/"Health Tracking" },

    /*LANG*/"< Back": () => back(),

    /*LANG*/"HRM Interval": {
      value: settings.hrm,
      min: 0,
      max: 3,
      format: v => [
        /*LANG*/"Off",
        /*LANG*/"3 min",
        /*LANG*/"10 min",
        /*LANG*/"Always"
      ][v],
      onchange: v => {
        settings.hrm = v;
        setSettings(settings);
      }
    },

    /*LANG*/"Daily Step Goal": {
      value: settings.stepGoal,
      min: 0,
      max: 20000,
      step: 250,
      onchange: v => {
        settings.stepGoal = v;
        setSettings(settings);
      }
    },
    /*LANG*/"Step Goal Notification": {
      value: "stepGoalNotification" in settings ? settings.stepGoalNotification : false,
      format: () => (settings.stepGoalNotification ? 'Yes' : 'No'),
      onchange: () => {
        settings.stepGoalNotification = !settings.stepGoalNotification;
        setSettings();
      }
    }
  });

  function setSettings(settings) {
    require("Storage").writeJSON("health.json", settings);
  }
})
