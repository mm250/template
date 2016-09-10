define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "dijit/registry",
    "app/provider!app/template/TemplateEvents",
    "dojo/dom",
    "dojo/_base/lang",
    "dijit/form/Select",
    "dojo/Deferred",
    "dojo/promise/all",
    "dijit/form/ValidationTextBox"
  ],
  function(
    declare,
    array,
    registry,
    templateEvents,
    dom,
    lang,
    Select,
    Deferred,
    all,
    ValidationTextBox
  ) {

  return declare(null, {

    createElementsFromQuestions: function(template) {
      var klass, deferred, deferreds = [];
      array.forEach(template.sections, lang.hitch(this, function (section) {
        array.forEach(section.questions, lang.hitch(this, function (question) {
          deferred = new Deferred();
          deferreds.push(deferred);

          require([ "dijit/form/" + question.type ], lang.hitch(this, function (Klass) {
            klass = new Klass(this.getAttributes(question));
            klass.placeAt(dom.byId("form"));
            deferred.resolve(klass);
          }))

        }));
      }));
      return all(deferreds);
    },

    createRulesFromQuestions: function(template) {
      array.forEach(template.sections, lang.hitch(this, function (section) {
        this.parseRules(section.questions);
      }));
    },

    parseRules: function (questions) {
      array.forEach(questions, lang.hitch(this, function (question) {
        this.applyRules(question.dataPoint, question.rules);
      }));
    },

    parseElements: function (questions) {
      var klass
      array.forEach(questions, lang.hitch(this, function (question) {
          klass = new ValidationTextBox(this.getAttributes(question));
          klass.placeAt(dom.byId("form"));
      }));
    },

    getAttributes: function (obj) {
      return lang.mixin({ id: obj.dataPoint }, obj.attributes);
    },

    applyRules: function (id, rules) {
      var klass
      array.forEach(rules, lang.hitch(this, function (rule) {
        require([ "app/template/" + rule.name ], lang.hitch(this, function (Klass) {
          klass = new Klass();
          templateEvents.addEvent(id, klass.applyRules(registry.byId(id), rule.options),
            klass.onEvent, rule.options.source);
        }))
      }));
    },

    parse: function (template) {

      templateEvents.clear();

      // new Select({
      //   id: "lastname",
      //   name: "lastname",
      //   options: [
      //     {label: "00002", value: "000002"},
      //     {label: "00003", value: "000003", selected: true},
      //     {label: "00004", value: "000004"}
      //   ]
      // }).placeAt(dom.byId("form")).startup();

      this.createElementsFromQuestions(template).then(
        lang.hitch(this, function() {
          this.createRulesFromQuestions(template);
      }));

    }
  })
});


