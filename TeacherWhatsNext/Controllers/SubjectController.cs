using Microsoft.AspNetCore.Mvc;
using TeacherWhatsNext.Models;
using TeacherWhatsNext.Repositories;

namespace TeacherWhatsNext.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectController : ControllerBase
    {
        private readonly ISubjectRepository _subjectRepository;
        public SubjectController(ISubjectRepository subjectRepository)
        {
            _subjectRepository = subjectRepository;
        }
        // GET: api/<SubjectController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_subjectRepository.GetAllSubjects());
        }

        // GET api/<SubjectController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var category = _subjectRepository.GetById(id);
            if (category == null)
            {
                return NotFound();
            }
            return Ok(category);
        }

        // POST api/<SubjectController>
        [HttpPost]
        public IActionResult Subject(Subject subject)
        {
            _subjectRepository.Add(subject);
            return CreatedAtAction("Get", new { id = subject.Id }, subject);
        }

        // PUT api/<SubjectController>/5
        [HttpPut("{id}")]
        public IActionResult Update(int id, Subject subject)
        {
            _subjectRepository.Update(subject);
            return Ok(subject);
        }

        // DELETE api/<SubjectController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _subjectRepository.Delete(id);
            return NoContent();
        }
    }
}
