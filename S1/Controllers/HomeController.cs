using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChatSample.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;

namespace S1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HomeController : ControllerBase
    {
        private readonly IHubContext<ChatHub> _hubContext;

        public HomeController(ILogger<HomeController> logger, IHubContext<ChatHub> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpGet]
        public void Get(string ad)
        {
            _hubContext.Clients.All.SendAsync("broadcastMessage", ad,DateTime.Now.ToString());
        }
    }
}
