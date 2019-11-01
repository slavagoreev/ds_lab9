# DS Lab №9
#### Report by Vyacheslav Goreev (SB)

The app is running in kubernetes cluster. It consists of mongodb replicaset of three nodes and one application node which uses replicas to store data.
![](https://i.imgur.com/ANu2y1c.png)
You may see the docker image deployed to the [Docker Hub](https://cloud.docker.com/u/slavagoreev/repository/docker/slavagoreev/lab9-app). It is simple NodeJS application that supports messaging in a single chat. It was taken with minor improvements from [there](https://github.com/ezesundayeze/anonymouse-realtime-chat-app).
![](https://i.imgur.com/LDDM1LU.png)
