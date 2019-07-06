using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Grpc.Common.Models
{
    public class VehicleeGpsModel
    {
        public string Direction { get; set; }

        public Point Gps { get; set; }
    }
}
