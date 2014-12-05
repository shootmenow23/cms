:: take user input to decide if starter data is to be included or not in this installation
:: :PromptForStarterDataAgain
::set /p include_documents=Do you wish to include starter data with this install (yes/no):
::if /I %include_documents%==yes goto AddStarterData
::if /I %include_documents%==no goto ContinueInstall
:: ::if not %include_documents%==no && if not %include_documents%==yes goto PromptForStarterDataAgain
::goto PromptForStarterDataAgain
:AddStarterData
:: delete databases whose starter data is to be included, and then just copy their db files into the dbs directory of target couchdb
curl -X DELETE http://localhost:5984/collectionlist
curl -X DELETE http://localhost:5984/resources
curl -X DELETE http://localhost:5984/groups
curl -X DELETE http://localhost:5984/coursestep
set couchdb_databases_folder="C:\Program Files (x86)\Apache Software Foundation\CouchDB\var\lib\couchdb\"
set documents_folder="documents\"
:: copy the resources, collectionlist, groups, and coursestep db files into the couchdb_databases_folder
copy /y %documents_folder%resources.couch %couchdb_databases_folder%resources.couch
copy /y %documents_folder%collectionlist.couch %couchdb_databases_folder%collectionlist.couch
copy /y %documents_folder%groups.couch %couchdb_databases_folder%groups.couch
copy /y %documents_folder%coursestep.couch %couchdb_databases_folder%coursestep.couch
:: if "documents" folder did not have any data in it, then we need to create the databases again
curl -X PUT http://localhost:5984/collectionlist
curl -X PUT http://localhost:5984/coursestep
curl -X PUT http://localhost:5984/groups
curl -X PUT http://localhost:5984/resources
:: add design doc for resources as its starter database file may not have design doc in it
curl -d @documents\design_doc_resources.txt -H "Content-Type: application/json" -X POST http://localhost:5984/resources
curl -d @documents\design_doc_groups.txt -H "Content-Type: application/json" -X POST http://localhost:5984/groups
curl -d @documents\design_doc_coursestep.txt -H "Content-Type: application/json" -X POST http://localhost:5984/coursestep
curl -d @documents\design_doc_collectionlist.txt -H "Content-Type: application/json" -X POST http://localhost:5984/collectionlist



:ContinueInstall
call push_code_to_apps_db.bat
start firefox http://127.0.0.1:5984/apps/_design/bell/MyApp/index.html#login