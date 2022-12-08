using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using TeacherWhatsNext.Repositories;


namespace TeacherWhatsNext
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityController : ControllerBase
    {
        private readonly IActivityRepository _activityRepository;
        public ActivityController(IActivityRepository activityRepository)
        {
            _activityRepository = activityRepository;
        }

        // GET: api/<ActivityController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_activityRepository.GetAll());
        }

        // GET api/<ActivityController>/5
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var activity = _activityRepository.GetById(id);
            if (activity == null)
            {
                return NotFound();
            }
            return Ok(activity);
        }

        // POST api/<ActivityController>
        [HttpPost]
        public IActionResult Activity(Activity activity)
        {
            _activityRepository.Insert(activity);
            return CreatedAtAction("Get", new { id = activity.Id }, activity);
        }

        // PUT api/<ActivityController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Activity activity)
        {
            if (id != activity.Id)
            {
                return BadRequest();
            }

            _activityRepository.Update(activity);
            return NoContent();
        }

        //DELETE api/<ActivityController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _activityRepository.Delete(id);
            return NoContent();
        }

        [HttpGet("search")]
        public IActionResult Search(string q)
        {
            return Ok(_activityRepository.Search(q));
        }
    }
}
