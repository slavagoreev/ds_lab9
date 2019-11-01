# DS Lab №9
#### Report by Vyacheslav Goreev (SB)

The app is running in kubernetes cluster. It consists of mongodb replicaset of three nodes and one application node which uses replicas to store data.
![](https://i.imgur.com/ANu2y1c.png)
You may see the docker image deployed to the [Docker Hub](https://cloud.docker.com/u/slavagoreev/repository/docker/slavagoreev/lab9-app). It is simple NodeJS application that supports messaging in a single chat. It was taken with minor improvements from [there](https://github.com/ezesundayeze/anonymouse-realtime-chat-app).
![](https://i.imgur.com/LDDM1LU.png)

The `lab9-mongo-mongodb-replicaset-1` turned out to be the primary node so we could connect to it `kubectl exec -it lab9-mongo-mongodb-replicaset-1 mongo`
    
    rs0:PRIMARY> rs.status()
    {
        "set" : "rs0",
        "date" : ISODate("2019-11-01T20:40:10.356Z"),
        "myState" : 1,
        "term" : NumberLong(3),
        "syncingTo" : "",
        "syncSourceHost" : "",
        "syncSourceId" : -1,
        "heartbeatIntervalMillis" : NumberLong(2000),
        "optimes" : {
            "lastCommittedOpTime" : {
                "ts" : Timestamp(1572640803, 1),
                "t" : NumberLong(3)
            },
            "readConcernMajorityOpTime" : {
                "ts" : Timestamp(1572640803, 1),
                "t" : NumberLong(3)
            },
            "appliedOpTime" : {
                "ts" : Timestamp(1572640803, 1),
                "t" : NumberLong(3)
            },
            "durableOpTime" : {
                "ts" : Timestamp(1572640803, 1),
                "t" : NumberLong(3)
            }
        },
        "members" : [
            {
                "_id" : 0,
                "name" : "lab9-mongo-mongodb-replicaset-0.lab9-mongo-mongodb-replicaset.default.svc.cluster.local:27017",
                "health" : 1,
                "state" : 2,
                "stateStr" : "SECONDARY",
                "uptime" : 1337,
                "optime" : {
                    "ts" : Timestamp(1572640803, 1),
                    "t" : NumberLong(3)
                },
                "optimeDurable" : {
                    "ts" : Timestamp(1572640803, 1),
                    "t" : NumberLong(3)
                },
                "optimeDate" : ISODate("2019-11-01T20:40:03Z"),
                "optimeDurableDate" : ISODate("2019-11-01T20:40:03Z"),
                "lastHeartbeat" : ISODate("2019-11-01T20:40:10.042Z"),
                "lastHeartbeatRecv" : ISODate("2019-11-01T20:40:09.034Z"),
                "pingMs" : NumberLong(0),
                "lastHeartbeatMessage" : "",
                "syncingTo" : "lab9-mongo-mongodb-replicaset-1.lab9-mongo-mongodb-replicaset.default.svc.cluster.local:27017",
                "syncSourceHost" : "lab9-mongo-mongodb-replicaset-1.lab9-mongo-mongodb-replicaset.default.svc.cluster.local:27017",
                "syncSourceId" : 1,
                "infoMessage" : "",
                "configVersion" : 3
            },
            {
                "_id" : 1,
                "name" : "lab9-mongo-mongodb-replicaset-1.lab9-mongo-mongodb-replicaset.default.svc.cluster.local:27017",
                "health" : 1,
                "state" : 1,
                "stateStr" : "PRIMARY",
                "uptime" : 1341,
                "optime" : {
                    "ts" : Timestamp(1572640803, 1),
                    "t" : NumberLong(3)
                },
                "optimeDate" : ISODate("2019-11-01T20:40:03Z"),
                "syncingTo" : "",
                "syncSourceHost" : "",
                "syncSourceId" : -1,
                "infoMessage" : "",
                "electionTime" : Timestamp(1572639481, 1),
                "electionDate" : ISODate("2019-11-01T20:18:01Z"),
                "configVersion" : 3,
                "self" : true,
                "lastHeartbeatMessage" : ""
            },
            {
                "_id" : 2,
                "name" : "lab9-mongo-mongodb-replicaset-2.lab9-mongo-mongodb-replicaset.default.svc.cluster.local:27017",
                "health" : 1,
                "state" : 2,
                "stateStr" : "SECONDARY",
                "uptime" : 1338,
                "optime" : {
                    "ts" : Timestamp(1572640803, 1),
                    "t" : NumberLong(3)
                },
                "optimeDurable" : {
                    "ts" : Timestamp(1572640803, 1),
                    "t" : NumberLong(3)
                },
                "optimeDate" : ISODate("2019-11-01T20:40:03Z"),
                "optimeDurableDate" : ISODate("2019-11-01T20:40:03Z"),
                "lastHeartbeat" : ISODate("2019-11-01T20:40:10.043Z"),
                "lastHeartbeatRecv" : ISODate("2019-11-01T20:40:08.888Z"),
                "pingMs" : NumberLong(0),
                "lastHeartbeatMessage" : "",
                "syncingTo" : "lab9-mongo-mongodb-replicaset-1.lab9-mongo-mongodb-replicaset.default.svc.cluster.local:27017",
                "syncSourceHost" : "lab9-mongo-mongodb-replicaset-1.lab9-mongo-mongodb-replicaset.default.svc.cluster.local:27017",
                "syncSourceId" : 1,
                "infoMessage" : "",
                "configVersion" : 3
            }
        ],
        "ok" : 1,
        "operationTime" : Timestamp(1572640803, 1),
        "$clusterTime" : {
            "clusterTime" : Timestamp(1572640803, 1),
            "signature" : {
                "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
                "keyId" : NumberLong(0)
            }
        }
    }
    
Now, lets shut down the `lab9-mongo-mongodb-replicaset-1` and see whats happen.
    
    # Delete pod
    kubectl delete pod lab9-mongo-mongodb-replicaset-1
    
Now, the 0-th pod is the primary. This is what it outputs to `rs.status()`

    rs0:PRIMARY> rs.status()
    {
        "set" : "rs0",
        "date" : ISODate("2019-11-01T20:49:46.191Z"),
        "myState" : 1,
        "term" : NumberLong(4),
        "syncingTo" : "",
        "syncSourceHost" : "",
        "syncSourceId" : -1,
        "heartbeatIntervalMillis" : NumberLong(2000),
        "optimes" : {
            "lastCommittedOpTime" : {
                "ts" : Timestamp(1572641381, 1),
                "t" : NumberLong(4)
            },
            "readConcernMajorityOpTime" : {
                "ts" : Timestamp(1572641381, 1),
                "t" : NumberLong(4)
            },
            "appliedOpTime" : {
                "ts" : Timestamp(1572641381, 1),
                "t" : NumberLong(4)
            },
            "durableOpTime" : {
                "ts" : Timestamp(1572641381, 1),
                "t" : NumberLong(4)
            }
        },
        "members" : [
            {
                "_id" : 0,
                "name" : "lab9-mongo-mongodb-replicaset-0.lab9-mongo-mongodb-replicaset.default.svc.cluster.local:27017",
                "health" : 1,
                "state" : 1,
                "stateStr" : "PRIMARY",
                "uptime" : 1915,
                "optime" : {
                    "ts" : Timestamp(1572641381, 1),
                    "t" : NumberLong(4)
                },
                "optimeDate" : ISODate("2019-11-01T20:49:41Z"),
                "syncingTo" : "",
                "syncSourceHost" : "",
                "syncSourceId" : -1,
                "infoMessage" : "",
                "electionTime" : Timestamp(1572641139, 1),
                "electionDate" : ISODate("2019-11-01T20:45:39Z"),
                "configVersion" : 3,
                "self" : true,
                "lastHeartbeatMessage" : ""
            },
            {
                "_id" : 1,
                "name" : "lab9-mongo-mongodb-replicaset-2.lab9-mongo-mongodb-replicaset.default.svc.cluster.local:27017",
                "health" : 1,
                "state" : 2,
                "stateStr" : "SECONDARY",
                "uptime" : 1913,
                "optime" : {
                    "ts" : Timestamp(1572641381, 1),
                    "t" : NumberLong(4)
                },
                "optimeDurable" : {
                    "ts" : Timestamp(1572641381, 1),
                    "t" : NumberLong(4)
                },
                "optimeDate" : ISODate("2019-11-01T20:49:41Z"),
                "optimeDurableDate" : ISODate("2019-11-01T20:49:41Z"),
                "lastHeartbeat" : ISODate("2019-11-01T20:49:45.908Z"),
                "lastHeartbeatRecv" : ISODate("2019-11-01T20:49:45.907Z"),
                "pingMs" : NumberLong(0),
                "lastHeartbeatMessage" : "",
                "syncingTo" : "lab9-mongo-mongodb-replicaset-0.lab9-mongo-mongodb-replicaset.default.svc.cluster.local:27017",
                "syncSourceHost" : "lab9-mongo-mongodb-replicaset-0.lab9-mongo-mongodb-replicaset.default.svc.cluster.local:27017",
                "syncSourceId" : 0,
                "infoMessage" : "",
                "configVersion" : 3
            }
        ],
        "ok" : 1,
        "operationTime" : Timestamp(1572641381, 1),
        "$clusterTime" : {
            "clusterTime" : Timestamp(1572641381, 1),
            "signature" : {
                "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
                "keyId" : NumberLong(0)
            }
        }
    }
    
Now, lets shut down the `lab9-mongo-mongodb-replicaset-0` and see whats happen.
    
    # Delete pod
    kubectl delete pod lab9-mongo-mongodb-replicaset-0
    
At last, we may run the `rs.status()` at 2-nd node:

    rs0:PRIMARY> rs.status()
    {
        "set" : "rs0",
        "date" : ISODate("2019-11-01T20:52:19.062Z"),
        "myState" : 1,
        "term" : NumberLong(5),
        "syncingTo" : "",
        "syncSourceHost" : "",
        "syncSourceId" : -1,
        "heartbeatIntervalMillis" : NumberLong(2000),
        "optimes" : {
            "lastCommittedOpTime" : {
                "ts" : Timestamp(1572641537, 1),
                "t" : NumberLong(5)
            },
            "readConcernMajorityOpTime" : {
                "ts" : Timestamp(1572641537, 1),
                "t" : NumberLong(5)
            },
            "appliedOpTime" : {
                "ts" : Timestamp(1572641537, 1),
                "t" : NumberLong(5)
            },
            "durableOpTime" : {
                "ts" : Timestamp(1572641537, 1),
                "t" : NumberLong(5)
            }
        },
        "members" : [
            {
                "_id" : 0,
                "name" : "lab9-mongo-mongodb-replicaset-2.lab9-mongo-mongodb-replicaset.default.svc.cluster.local:27017",
                "health" : 1,
                "state" : 1,
                "stateStr" : "PRIMARY",
                "uptime" : 2069,
                "optime" : {
                    "ts" : Timestamp(1572641537, 1),
                    "t" : NumberLong(5)
                },
                "optimeDate" : ISODate("2019-11-01T20:52:17Z"),
                "syncingTo" : "",
                "syncSourceHost" : "",
                "syncSourceId" : -1,
                "infoMessage" : "could not find member to sync from",
                "electionTime" : Timestamp(1572641515, 1),
                "electionDate" : ISODate("2019-11-01T20:51:55Z"),
                "configVersion" : 3,
                "self" : true,
                "lastHeartbeatMessage" : ""
            }
        ],
        "ok" : 1,
        "operationTime" : Timestamp(1572641537, 1),
        "$clusterTime" : {
            "clusterTime" : Timestamp(1572641537, 1),
            "signature" : {
                "hash" : BinData(0,"AAAAAAAAAAAAAAAAAAAAAAAAAAA="),
                "keyId" : NumberLong(0)
            }
        }
    }
   
As we may see the app is still alive
![](https://i.imgur.com/3WwdOY6.png)
