using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace TeacherWhatsNext.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MainController : ControllerBase
    {
        [HttpGet]
        public IActionResult Main()
        {
            return Content("hello");
        }

        [Authorize]
        [HttpGet("auth")]
        public IActionResult MainAuth()
        {
            return Content("hello from an endpoint that requires auth");
        }
    }
}
