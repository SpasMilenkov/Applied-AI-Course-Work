using Banking.Data.Models;
using Banking.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Banking.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoanController(ILoanService loanService) : ControllerBase
    {
        [HttpGet("heatmap")]
        public async Task<IActionResult> GetHeatmapData()
        {
            var result = await loanService.LoadHeatMapData();
            return Ok(result.AppData);
        }

        [HttpGet("barchart")]
        public async Task<IActionResult> GetBarchartData()
        {
            return Ok(await loanService.LoadBarchartData());
        }
        
    }
}
