using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Grpc.Common;
using Grpc.Web.Data;
using Grpc.Web.Hubs.SignalRWebPack.Hubs;
using Grpc.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Grpc.Web.Controllers
{
    [Route("api/[controller]")]
    public class PlanetsController : Controller
    {
        private readonly IRouteObserver routeObserver;

        public PlanetsController(IRouteObserver routeObserver)
        {
            this.routeObserver = routeObserver;
        }

        [HttpPost("[action]")]
        public OkResult Route([FromBody] RouteModel route)
        {
            routeObserver.Push(route);
            return Ok();
        }


        [HttpGet("[action]")]
        public IEnumerable<string> All()
        {
            return Planet.All.Values.Select(p => p.ToString());
        }
    }
}
