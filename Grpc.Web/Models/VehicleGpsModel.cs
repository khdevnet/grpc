using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Grpc.Web.Models
{
    public class VehicleeGpsModel
    {
        public string Direction { get; set; }

        public PointModel Gps { get; set; }
    }
}
