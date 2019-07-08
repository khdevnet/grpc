using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Grpc.Common;
using Grpc.Web.Hubs.SignalRWebPack.Hubs;
using Grpc.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Grpc.Web.Controllers
{
    [Route("api/[controller]")]
    public class PlanetsController : Controller
    {
        [HttpPost("[action]")]
        public IEnumerable<string> Get()
        {
            return Planet.All.Values.Select(p => p.ToString());
        }
    }
}
