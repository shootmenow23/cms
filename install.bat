@echo off

net start "Apache CouchDB"

:: configure couchdb to be accessible to any node on the LAN
curl -X PUT http://localhost:5984/_config/httpd/bind_address -d "\"0.0.0.0\""

:: delete databases
curl -X DELETE http://localhost:5984/activitylog
curl -X DELETE http://localhost:5984/apps
curl -X DELETE http://localhost:5984/assignmentpaper
curl -X DELETE http://localhost:5984/assignments
curl -X DELETE http://localhost:5984/calendar
curl -X DELETE http://localhost:5984/collectionlist
curl -X DELETE http://localhost:5984/communities
curl -X DELETE http://localhost:5984/community
curl -X DELETE http://localhost:5984/communityreports
curl -X DELETE http://localhost:5984/configurations
curl -X DELETE http://localhost:5984/courseschedule
curl -X DELETE http://localhost:5984/coursestep
curl -X DELETE http://localhost:5984/feedback
curl -X DELETE http://localhost:5984/groups
curl -X DELETE http://localhost:5984/invitations
curl -X DELETE http://localhost:5984/languages
curl -X DELETE http://localhost:5984/mail
curl -X DELETE http://localhost:5984/meetups
curl -X DELETE http://localhost:5984/members
curl -X DELETE http://localhost:5984/membercourseprogress
curl -X DELETE http://localhost:5984/nationreports
curl -X DELETE http://localhost:5984/publicationdistribution
curl -X DELETE http://localhost:5984/publications
curl -X DELETE http://localhost:5984/report
curl -X DELETE http://localhost:5984/requests
curl -X DELETE http://localhost:5984/resourcefrequency
curl -X DELETE http://localhost:5984/resources
curl -X DELETE http://localhost:5984/shelf
curl -X DELETE http://localhost:5984/usermeetups

:: create databases
curl -X PUT http://localhost:5984/activitylog
curl -X PUT http://localhost:5984/apps
curl -X PUT http://localhost:5984/assignmentpaper
curl -X PUT http://localhost:5984/assignments
curl -X PUT http://localhost:5984/calendar
curl -X PUT http://localhost:5984/collectionlist
curl -X PUT http://localhost:5984/communities
curl -X PUT http://localhost:5984/community
curl -X PUT http://localhost:5984/communityreports
curl -X PUT http://localhost:5984/configurations
curl -X PUT http://localhost:5984/courseschedule
curl -X PUT http://localhost:5984/coursestep
curl -X PUT http://localhost:5984/feedback
curl -X PUT http://localhost:5984/groups
curl -X PUT http://localhost:5984/invitations
curl -X PUT http://localhost:5984/languages
curl -X PUT http://localhost:5984/mail
curl -X PUT http://localhost:5984/meetups
curl -X PUT http://localhost:5984/members
curl -X PUT http://localhost:5984/membercourseprogress
curl -X PUT http://localhost:5984/nationreports
curl -X PUT http://localhost:5984/publicationdistribution
curl -X PUT http://localhost:5984/publications
curl -X PUT http://localhost:5984/report
curl -X PUT http://localhost:5984/requests
curl -X PUT http://localhost:5984/resourcefrequency
curl -X PUT http://localhost:5984/resources
curl -X PUT http://localhost:5984/shelf
curl -X PUT http://localhost:5984/usermeetups

curl -d @documents\languages.txt -H "Content-Type: application/json" -X POST http://localhost:5984/languages
curl -d @documents\configurations.txt -H "Content-Type: application/json" -X POST http://localhost:5984/configurations
curl -d @documents\admin.txt -H "Content-Type: application/json" -X POST http://localhost:5984/members

:: add design docs to all dbs, they are used/needed at different points in the application
curl -d @documents\activitylog.txt -H "Content-Type: application/json" -X POST http://localhost:5984/activitylog
curl -d @documents\assignments.txt -H "Content-Type: application/json" -X POST http://localhost:5984/assignments
curl -d @documents\assignmentpaper.txt -H "Content-Type: application/json" -X POST http://localhost:5984/assignmentpaper
curl -d @documents\calendar.txt -H "Content-Type: application/json" -X POST http://localhost:5984/calendar
curl -d @documents\collectionlist.txt -H "Content-Type: application/json" -X POST http://localhost:5984/collectionlist
curl -d @documents\communityreports.txt -H "Content-Type: application/json" -X POST http://localhost:5984/communityreports
curl -d @documents\courseschedule.txt -H "Content-Type: application/json" -X POST http://localhost:5984/courseschedule
curl -d @documents\coursestep.txt -H "Content-Type: application/json" -X POST http://localhost:5984/coursestep
curl -d @documents\feedback.txt -H "Content-Type: application/json" -X POST http://localhost:5984/feedback
curl -d @documents\groups.txt -H "Content-Type: application/json" -X POST http://localhost:5984/groups
curl -d @documents\invitations.txt -H "Content-Type: application/json" -X POST http://localhost:5984/invitations
curl -d @documents\mail.txt -H "Content-Type: application/json" -X POST http://localhost:5984/mail
curl -d @documents\meetups.txt -H "Content-Type: application/json" -X POST http://localhost:5984/meetups
curl -d @documents\membercourseprogress.txt -H "Content-Type: application/json" -X POST http://localhost:5984/membercourseprogress
curl -d @documents\members.txt -H "Content-Type: application/json" -X POST http://localhost:5984/members
curl -d @documents\nationreports.txt -H "Content-Type: application/json" -X POST http://localhost:5984/nationreports
curl -d @documents\publicationdistribution.txt -H "Content-Type: application/json" -X POST http://localhost:5984/publicationdistribution
curl -d @documents\publications.txt -H "Content-Type: application/json" -X POST http://localhost:5984/publications
curl -d @documents\report.txt -H "Content-Type: application/json" -X POST http://localhost:5984/report
curl -d @documents\requests.txt -H "Content-Type: application/json" -X POST http://localhost:5984/requests
curl -d @documents\resourcefrequency.txt -H "Content-Type: application/json" -X POST http://localhost:5984/resourcefrequency
curl -d @documents\resources.txt -H "Content-Type: application/json" -X POST http://localhost:5984/resources
curl -d @documents\shelf.txt -H "Content-Type: application/json" -X POST http://localhost:5984/shelf
curl -d @documents\usermeetups.txt -H "Content-Type: application/json" -X POST http://localhost:5984/usermeetups

cd blackboard
call npm install
node_modules\.bin\couchapp push app.js http://127.0.0.1:5984/apps