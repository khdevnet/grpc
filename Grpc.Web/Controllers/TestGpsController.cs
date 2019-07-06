using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Grpc.Web.Hubs.SignalRWebPack.Hubs;
using Grpc.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Grpc.Web.Controllers
{
    [Route("api/[controller]")]
    public class TestGpsController : Controller
    {
        private readonly IHubContext<ChatHub, IChatHub> hubContext;

        public TestGpsController(IHubContext<ChatHub, IChatHub> hubContext)
        {
            this.hubContext = hubContext;
        }

        [HttpPost("[action]")]
        public VehicleeGpsModel SendPoint([FromBody] VehicleeGpsModel point)
        {
            hubContext.Clients.All.MessageReceived(point);

            return point;
        }
    }
}
