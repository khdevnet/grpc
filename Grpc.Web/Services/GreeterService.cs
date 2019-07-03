using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Greet;
using Grpc.Core;

namespace Grpc.Web
{
    public class GreeterService : Greeter.GreeterBase
    {
        public override Task<HelloReply> SayHello(HelloRequest request, ServerCallContext context)
        {
            return Task.FromResult(new HelloReply
            {
                Message = "Hello " + request.Name
            });
        }

        public override async Task<HelloReply> ListFeatures(IAsyncStreamReader<HelloRequest> requestStream, ServerCallContext context)
        {

            while (await requestStream.MoveNext())
            {
                var current = requestStream.Current;
            }

            return new HelloReply
            {
                Message = "Delivery Done"
            };
        }
    }
}
