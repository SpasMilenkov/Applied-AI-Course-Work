using Banking.Services;
using Microsoft.AspNetCore.Mvc;

namespace Banking.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegionController(IRegionService regionService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAllRegions()
        {
            return Ok(await regionService.GetAllRegions());
        }
    }
}
