$(function() {

  App.Models.Group = Backbone.Model.extend({

    idAttribute: "_id",

    url: function() {
      if (_.has(this, 'id')) {
        var url = (_.has(this.toJSON(), '_rev'))
          ? App.Server + '/groups/' + this.id + '?rev=' + this.get('_rev') // For UPDATE and DELETE
          : App.Server + '/groups/' + this.id // For READ
      }
      else {
        var url = App.Server + '/groups' // for CREATE
      }
      return url
    },

    defaults: {
      kind: "Group"
    },

    schema: {
      CourseTitle: 'Text',

      courseLeader:{
            type:'Select',
            options:null,
      },

      subjectLevel: {
        type: 'Select',
        options: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
      }, 

      description:'TextArea',
   
      startDate: 'Text',
      endDate: 'Text',
      frequency: {
        type: 'Radio',
        options: ['Daily', 'Weekly']
      },
      Day: {
        type: 'Checkboxes',
        options: ['Saturday', 'Sunday','Monday','Tuesday','Wednesday','Thursday','Friday']
      },
      startTime: 'Text',
      endTime: 'Text',
      
      members: {
        type: 'Checkboxes',
        options: null // Populate this when instantiating
      },
      
    },

  }) 

})
