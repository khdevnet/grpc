using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.AspNetCore.Server.Kestrel.Https;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Grpc.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
            //.ConfigureKestrel(options =>
            //{
            //    options.ListenLocalhost(50051, listenOptions =>
            //    {
            //        // ALPN is not available on macOS so only use Https on Windows and Linux
            //        //if (!RuntimeInformation.IsOSPlatform(OSPlatform.OSX))
            //        //{
            //        //    var basePath = Path.GetDirectoryName(typeof(Program).Assembly.Location);
            //        //    var certPath = Path.Combine(basePath!, "Certs", "server.pfx");

            //        //    listenOptions.UseHttps(certPath, "1111", o =>
            //        //    {
            //        //        o.ClientCertificateMode = ClientCertificateMode.AllowCertificate;
            //        //    });
            //        //}
            //        listenOptions.Protocols = HttpProtocols.Http2;
            //    });
            //})
                .UseStartup<Startup>();
    }
}
