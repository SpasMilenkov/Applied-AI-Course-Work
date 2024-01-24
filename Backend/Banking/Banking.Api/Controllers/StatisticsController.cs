using Banking.Services;
using Microsoft.AspNetCore.Mvc;

namespace Banking.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticsController(IClientService clientService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetGeoReportData()
        {
            var statistics = await clientService.CalculateStatisticsAsync();
            return Ok(statistics);
        }
        [HttpGet("{regionId}")]
        public async Task<IActionResult> GetGeoReportDataByRegionId(int regionId)
        {
            var statistics = await clientService.CalculateStatisticsAsync(regionId);
            return Ok(statistics);
        }
    }
}