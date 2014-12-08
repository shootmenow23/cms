$(function () {

    App.Views.CourseInfoView = Backbone.View.extend({


        authorName: null,
        tagName: "table",

        className: "courseInfo-table",
        initialize: function () {
            this.$el.html('<th colspan="20">Course Information</th>')
        },

        add: function (model) {
            //Single Author Should not be displayed multiple times on The Screen

        },


        render: function () {
            var courseInfo = this.model.toJSON()
            var leaderInfo = this.leader.toJSON()
            

            this.$el.append('<tr><td>Name : </td><td>' + courseInfo.name + '</td></tr>')
            this.$el.append('<tr><td>Levels : </td><td>' + courseInfo.subjectLevel + '</td></tr>')
            this.$el.append('<tr><td>Description : </td><td>' + courseInfo.description + '</td></tr>')

            this.$el.append('<tr><td>Leader Name: </td><td>' + leaderInfo.firstName + ' ' + leaderInfo.lastName + '</td></tr>')
            this.$el.append('<tr><td>Leader Email : </td><td>' + leaderInfo.email + '</td></tr>')

        },

    })

})