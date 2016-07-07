exports.config = {

  allScriptsTimeout: 20000,

  specs: [
    '*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:7072/',

  framework: 'jasmine',

  rootElement: '.planejamento-wrapper',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }

};
