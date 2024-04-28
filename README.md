# CS6650project
1. Launch 4 EC2 instances (Used Ubuntu free tier instances)
(1) launch one instance for config server
(2) launch one instance for shard server 1 replica setup
(3) launch one instance for shard server 2 replica setup
(4) launch one instance for mongos server to connect our backend server

2. install mongodb on each of the above MongoDB server
I installed mongodb according to this instruction: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/


3. Connect to config server and set up configuration
    After connection:
	(1) Run the following command on config server. To create the data direcotries.
		mkdir -p shard-demo/configsrv shard-demo/configsrv1 shard-demo/configsrv2
			
	(2) Start mongodb replica set for config server (on port 28041, 28042 and 28043)
		
		nohup mongod --configsvr  --port 28041 --bind_ip localhost,[public DNS address of config server] --replSet config_repl --dbpath shard-demo/configsrv &
		
		nohup mongod --configsvr  --port 28042 --bind_ip localhost,[public DNS address of config server] --replSet config_repl --dbpath shard-demo/configsrv1 &
		 
		nohup mongod --configsvr  --port 28043 --bind_ip localhost,[public DNS address of config server] --replSet config_repl --dbpath shard-demo/configsrv2 &

		check the mongodb process with the following command: ps -aef  | grep "mongo"
		
	(3) Connect to one of the replica set node:
			
		mongosh --host [public IPv4 address of config server] --port 28041
		
	(4)	Define the replica set config:
		
		rsconf = {
		  _id: "config_repl",
		  members: [
			{
			 _id: 0,
			 host: "[public IPv4 address of config server]:28041"
			},
			{
			 _id: 1,
			 host: "[public IPv4 address of config server]:28042"
			},
			{
			 _id: 2,
			 host: "[public IPv4 address of config server]:28043"
			}
		   ]
		}
		

	(5) initiate the replica set using the config defined above:			
		rs.initiate(rsconf)
		

4. Connect to shard1 server and set up configuration:
	(1) Run the following command on Shard1 server to create the data direcotries:
		mkdir -p shard-demo/shardrep1 shard-demo/shardrep2 shard-demo/shardrep3 
			
	(2) Start mongodb replica set for shard1 (on port 28081, 28082 and 28083)
		
		nohup mongod --shardsvr --port 28081 --bind_ip localhost,[public DNS address of shard1 server] --replSet shard_repl --dbpath shard-demo/shardrep1 &
		
		nohup mongod --shardsvr --port 28082 --bind_ip localhost,[public DNS address of shard1 server] --replSet shard_repl --dbpath shard-demo/shardrep2 &
			
		nohup mongod --shardsvr --port 28083 --bind_ip localhost,[public DNS address of shard1 server] --replSet shard_repl --dbpath shard-demo/shardrep3 &
			
	(3) Connect to one of the replica set node:
		
		mongosh --host [public IPv4 address of shard1 server]  --port 28081
		
	(4) Define the replica set config of shard one:
		
		rsconf = {
			  _id: "shard_repl",
			  members: [
				{
				 _id: 0,
				 host: "[public IPv4 address of shard1 server]:28081"
				},
				{
				 _id: 1,
				 host: "[public IPv4 address of shard1 server]:28082"
				},
				{
				 _id: 2,
				 host: "[public IPv4 address of shard1 server]:28083"
				}
			   ]
			}
		
	(5) initiate the replica set using the config defined above:	
		rs.initiate(rsconf)

5. Connect to shard2 server and set up configuration:
	(1) Run the following command on Shard2 server to create the data direcotries. 
		mkdir -p shard-demo/shard2rep1 shard-demo/shard2rep2 shard-demo/shard2rep3 

	(2) Start mongodb replica set for shard2 (on port 29081, 29082, 29083):
		nohup mongod --shardsvr --port 29081 --bind_ip localhost,[public DNS address of shard2 server] --replSet shard2_repl --dbpath shard-demo/shard2rep1 &
		
		nohup mongod --shardsvr --port 29082 --bind_ip localhost,[public DNS address of shard2 server]  --replSet shard2_repl --dbpath shard-demo/shard2rep2 &
			
		nohup mongod --shardsvr --port 29083 --bind_ip localhost,[public DNS address of shard2 server]  --replSet shard2_repl --dbpath shard-demo/shard2rep3 &
		
	(3) Connect to one of the replica set node (note down the IP address):
		mongosh --host [public IPv4 address of shard2 server]  --port 29081
		
	(4) Define the replica set config of shard one:
		rsconf = {
			  _id: "shard2_repl",
			  members: [
				{
				 _id: 0,
				 host: "[public IPv4 address of shard2 server]:29081"
				},
				{
				 _id: 1,
				 host: "[public IPv4 address of shard2 server]:29082"
				},
				{
				 _id: 2,
				 host: "[public IPv4 address of shard2 server]:29083"
				}
			   ]
			}
		
	(5) initiate the replica set using the config defined above:	
		rs.initiate(rsconf)

6. Connect to mongos server and set up configuration:
	(1) Use The following command to connect mongos to config server installed on AWS EC2 instance.
		nohup mongos --configdb config_repl/[public DNS address of config server]:28041,[public DNS address of config server]:28042,[public DNS address of config server]:28043 --port 27041 --bind_ip localhost,[public DNS address of mongos server] &

	(2) Connect to the Sharded Cluster (through MongoS):
		mongosh --host localhost --port 27041

	(3) Add shard1 and shard2 shards to mongos server, so we can execute commands from mongos
		
		sh.addShard( "shard_repl/[public IPv4 address of shard1 server]:28081,[public IPv4 address of shard1 server]:28082,[public IPv4 address of shard1 server]:28083")
		
		sh.addShard( "shard2_repl/[public IPv4 address of shard2 server]:29081,[public IPv4 address of shard2 server]:29082,[public IPv4 address of shard2 server]:29083")
		sh.status()

7. create database and collections:
	(1) create a new database (e.g. in my example-- "Shopping") in mongos: use Shopping
	(2) create collections (in my case, User table, Product table and Order table)

8. connect to backend springboot server: 
In backend "application.properties", add a configuration:
spring.data.mongodb.uri=mongodb://[public DBS address of mongos server]:27041/admin
spring.data.mongodb.database=[the database name created above]

9. Define sharding in Shopping database:
	(1) run the following command in one of the replica set of mongos server:
		sh.enableSharding("Shopping")
	(2) to define sharding for User table (use Zone range):
		db.User.createIndex({ "username" : 1 })
		sh.shardCollection("Shopping.User", { "username" : 1 })

		sh.addShardTag("shard_repl", "zone_A_to_M")
		sh.addShardTag("shard2_repl", "zone_N_to_Z")

		sh.updateZoneKeyRange("Shopping.User", { "username": "a" }, { "username": "m" }, "zone_A_to_M")
		sh.updateZoneKeyRange("Shopping.User", { "username": "m" }, { "username": "z" },"zone_N_to_Z")

	(3) to define sharding for Product table (use Zone range):
		db.Product.createIndex({ "name" : 1 })
		sh.shardCollection("Shopping.Product", { "name" : 1 })

		sh.updateZoneKeyRange("Shopping.Product", { "name": "a" }, { "name": "m" }, "zone_A_to_M")
		sh.updateZoneKeyRange("Shopping.Product", { "name": "m" }, { "name": "z" },"zone_N_to_Z")

	(4) to define sharding for Order table (use Zone range):
		db.Order.createIndex({ "productName" : 1 })
		sh.shardCollection("Shopping.Order", { "productName" : 1 })

		sh.updateZoneKeyRange("Shopping.Order", { "productName": "a" }, { "productName": "m" }, "zone_A_to_M")
		sh.updateZoneKeyRange("Shopping.Order", { "productName": "m" }, { "productName": "z" },"zone_N_to_Z")

10. See sharding results:
	(1) after run backend and frontend, use browser to register new Users, add Products and buy products (add orders), run following commands in mongos server to see the distribution records for User, Product and Order table:
		db.User.getShardDistribution()	
		db.Product.getShardDistribution()	
		db.Order.getShardDistribution()	

	(2) In shard1 server, run following commands to see data saved in shard1:
		use Shopping
		db.User.find()
		db.Product.find()
		db.Order.find()

	(3) In shard2 server, run following commands to see data saved in shard2:
		use Shopping
		db.User.find()
		db.Product.find()
		db.Order.find()

11. See replication results (take shard1 as an example):
	(1) use the following command to exit from current primary replica:
		exit()
	(2) use the following command to se the current processes running on 28081 port:
		ps -ef | grep 28081
	(3) use kill -9 to kill all the processes running on 28081
	(4) then use the following command to enter one of the secondary replica:
		mogosh --host [public IPv4 address of shard1 server]  --port 28081
	(5) run above find commands to see data
	(6) use browser to test registration, adding product and adding order functions
