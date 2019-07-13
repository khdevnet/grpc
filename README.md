# Space shuttle simulator on map 
Designed and created for training purpose in asp.net core 3 gRPC.

# TechStack
* ASP.NET CORE 3
* gRPC
* Dajkstar algorithm
* ReactJs (Typescript)

# Start application
1. Clone project
2. Run Grpc.Web, Grpc.Truck

# Architecture
![](https://github.com/khdevnet/grpc/blob/master/docs/architecture.png)
# User Interface
![](https://github.com/khdevnet/grpc/blob/master/docs/2019-07-12_13-52-52.png)
# gRPC
In gRPC a client application can directly call methods on a server application on a different machine as if it was a local object, making it easier for you to create distributed applications and services. As in many RPC systems, gRPC is based around the idea of defining a service, specifying the methods that can be called remotely with their parameters and return types. On the server side, the server implements this interface and runs a gRPC server to handle client calls. On the client side, the client has a stub (referred to as just a client in some languages) that provides the same methods as the server.

# gRPC Concepts
* **Unary RPCs** where the client sends a single request to the server and gets a single response back, just like a normal function call.
* **Server streaming RPCs** where the client sends a request to the server and gets a stream to read a sequence of messages back. The client reads from the returned stream until there are no more messages. gRPC guarantees message ordering within an individual RPC call.
* **Client streaming RPCs** where the client writes a sequence of messages and sends them to the server, again using a provided stream. Once the client has finished writing the messages, it waits for the server to read them and return its response. Again gRPC guarantees message ordering within an individual RPC call.
* **Bidirectional streaming RPCs** where both sides send a sequence of messages using a read-write stream. The two streams operate independently, so clients and servers can read and write in whatever order they like: for example, the server could wait to receive all the client messages before writing its responses, or it could alternately read a message then write a message, or some other combination of reads and writes. The order of messages in each stream is preserved.

# Resources
* [Grpc](https://grpc.io/docs/guides/)
* [aspnet-react-and-docker](https://hjerpbakk.com/blog/2018/06/25/aspnet-react-and-docker)
* [Dajkstar algorithm](https://gist.github.com/jpillora/7382441)
* [Canvas image movement](https://codepen.io/JTParrett/pen/vgwHA)
* [redux-websocket-example](https://github.com/maxnachlinger/redux-websocket-example)
