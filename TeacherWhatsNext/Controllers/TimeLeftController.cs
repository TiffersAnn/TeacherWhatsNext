using Microsoft.AspNetCore.Mvc;
using TeacherWhatsNext.Models;
using TeacherWhatsNext.Repositories;

namespace TeacherWhatsNext.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimeLeftController : ControllerBase
    {

        private readonly ITimeLeftRepository _timeLeftRepository;
        public TimeLeftController(ITimeLeftRepository timeLeftRepository)
        {
            _timeLeftRepository = timeLeftRepository;
        }
        // GET: api/<TimeLeftController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_timeLeftRepository.GetAllTimes());
        }

        // GET api/<TimeLeftController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var timeLeft = _timeLeftRepository.GetById(id);
            if (timeLeft == null)
            {
                return NotFound();
            }
            return Ok(timeLeft);
        }
    

        // POST api/<TimeLeftController>
        [HttpPost]
        public IActionResult TimeLeft(TimeLeft timeLeft)
        {
            _timeLeftRepository.Add(timeLeft);
            return CreatedAtAction("Get", new { id = timeLeft.Id }, timeLeft);
        }

        // PUT api/<TimeLeftController>/5
        [HttpPut("{id}")]
        public IActionResult Update(int id, TimeLeft timeLeft)
        {
            _timeLeftRepository.Update(timeLeft);
            return Ok(timeLeft);
        }

        // DELETE api/<TimeLeftController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _timeLeftRepository.Delete(id);
            return NoContent();
        }
    }
}
