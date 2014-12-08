$(function () {

	App.Views.Dashboard = Backbone.View.extend({

		template: $('#template-Dashboard').html(),

		vars: {},
		nationConfiguration: null,
		latestVersion: null,
		nationConfigJson: null,
		events: {
			"click #updateButton": function (e) {
				var configurations = Backbone.Collection.extend({
					url: App.Server + '/configurations/_all_docs?include_docs=true'
				})
				var config = new configurations()
				config.fetch({
					async: false
				})
				var currentConfig = config.first().toJSON().rows[0].doc
				currentConfig.version = this.latestVersion
				var nationName = currentConfig.nationName
				var nationURL = currentConfig.nationUrl
				
				App.startActivityIndicator()
				$.ajax({
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json; charset=utf-8'
					},
					type: 'POST',
					url: '/_replicate',
					dataType: 'json',
					data: JSON.stringify({
					    "source": 'http://' + nationName + ':oleoleole@' + nationURL + '/apps',
						"target": "apps"
					}),
					success: function (response) {
						$.ajax({
							
							headers: {
								'Accept': 'application/json',
								'Content-Type': 'multipart/form-data'
							},
							type: 'PUT',
							url: App.Server + '/configurations/' + currentConfig._id + '?rev=' + currentConfig._rev,
							dataType: 'json',
							data: JSON.stringify(currentConfig),
							success: function (response) {
							         alert("Successfully updated.")
							         location.reload();
							 },
							 
							async: false
						})
					      App.stopActivityIndicator()
					      
					},
					error: function(){
					      App.stopActivityIndicator()
					      alert("Not Replicated!")
					},
					async: false
				})

				
			},
			"click #showReleaseNotesDiv": function (e) {
				if ($('#releaseVersion').css('display') == 'none') {
					$("#releaseVersion").slideDown("slow", function () {

					});
				}
				else {
					$("#releaseVersion").slideUp("slow", function () {
						$('#appversion').val("")
						$('#notes').val("")
					});
				}
			},
			"click #cancelnotes": function (e) {
				$("#releaseVersion").slideUp("slow", function () {
					$('#appversion').val("")
					$('#notes').val("")
				});
			},
			"click #savenotes": function (e) {
				if ($('#appversion').val() == "") {
					alert("Please enter version no.")
					return
				}
				if ($('#notes').val() == "") {
					alert("Please enter release notes.")
					return
				}

				var configurations = Backbone.Collection.extend({
					url: App.Server + '/configurations/_all_docs?include_docs=true'
				})
				var config = new configurations()
				config.fetch({
					async: false
				})
				var con = config.first()
				con = (con.get('rows')[0]).doc
				var conTable = new App.Models.ReleaseNotes({
					_id: con._id
				})
				conTable.fetch({
					async: false
				})
				conTable.set('version', $('#appversion').val())
				conTable.set('notes', $('#notes').val())
				conTable.save(null, {
					success: function (e) {
						$("#releaseVersion").slideUp("slow", function () {
							$('#appversion').val("")
							$('#notes').val("")
							alert('Notes successfully saved.')
						})
					}
				})


			},
			"click #viewReleaseNotes": function (e) {
				if ($('#showReleaseNotes').css('display') == 'none') {
					$("#showReleaseNotes").slideDown("slow", function () {
						$("textarea#shownotes").val(nationConfigJson.notes)

					});
				}
				else {
					$("#showReleaseNotes").slideUp("slow", function () {});
				}
			}
		},
		render: function () {

			var dashboard = this
			this.vars.mails = 0
			var clanguage = App.configuration.get("currentLanguage")
            var typeofBell=App.configuration.get("type")
			console.log(App.languageDict)
			console.log(clanguage)
			this.vars.languageDict = App.languageDict;

			this.vars.imgURL = "img/header_slice.png"
			var a = new App.Collections.MailUnopened({
				receiverId: $.cookie('Member._id')
			})
			a.fetch({
				async: false
			})
			this.vars.mails = a.length
			this.$el.html(_.template(this.template, this.vars))

			groups = new App.Collections.MemberGroups()
			groups.memberId = $.cookie('Member._id')
			groups.fetch({
				success: function (e) {
					groupsSpans = new App.Views.GroupsSpans({
						collection: groups
					})
					groupsSpans.render()

					$('#cc').append(groupsSpans.el)

					TutorsSpans = new App.Views.TutorsSpans({
						collection: groups
					})

					TutorsSpans.render()
					$('#tutorTable').append(TutorsSpans.el)
				}
			})

			shelfSpans = new App.Views.ShelfSpans()
			shelfSpans.render()

			UserMeetups = new App.Collections.UserMeetups()
			UserMeetups.memberId = $.cookie('Member._id')
			UserMeetups.fetch({
				async: false
			})
			MeetupSpans = new App.Views.MeetupSpans({
				collection: UserMeetups
			})
			MeetupSpans.render()
			$('#meetUpTable').append(MeetupSpans.el)

			$('.now').html(moment().format('dddd | DD MMMM, YYYY'))
			// Member Name
			var member = App.member
			var attchmentURL = '/members/' + member.id + '/'
			if (typeof member.get('_attachments') !== 'undefined') {
				attchmentURL = attchmentURL + _.keys(member.get('_attachments'))[0]
				document.getElementById("imgurl").src = attchmentURL
			}
			var temp = $.url().data.attr.host.split(".")
			temp = temp[0].substring(3)	
			if (temp == "") {
				temp = ""
			}
			temp=temp.charAt(0).toUpperCase() + temp.slice(1);
			temp = temp + " Blackboard"
			$('.bellLocation').html(temp)
			if (!member.get('visits')) {
				member.set('visits', 1)
				member.save()
			}
			if (parseInt(member.get('visits')) == 0) {
				temp = "Error!!"
			}
			else {
				temp = member.get('visits') + " visits"
			}
			var roles = "&nbsp;-&nbsp;"
			var temp1 = 0
			if (member.get("roles").indexOf("Learner") != -1) {
				roles = roles + "Learner"
				temp1 = 1
			}
			if (member.get("roles").indexOf("Leader") != -1) {
				if (temp1 == 1) {
					roles = roles + ",&nbsp;"
				}
				roles = roles + "Leader"
				temp1 = 1
			}
			if (member.get("roles").indexOf("Manager") != -1) {
				if (temp1 == 1) {
					roles = roles + ",&nbsp;"
				}

				roles = ' ' + '<a href="#member/edit/' + $.cookie('Member._id') + '">Admin</a>'
			}
			$('.visits').html(temp)
			$('.name').html(member.get('firstName') + ' ' + member.get('lastName') + '<span style="font-size:15px;">' + '</span>' + '&nbsp;<a href="#member/edit/' + $.cookie('Member._id') + '"><i class="fui-gear"></i></a>')

		}

	})

})