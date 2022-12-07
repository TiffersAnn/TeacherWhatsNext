using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using TeacherWhatsNext.Models;
using TeacherWhatsNext.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TeacherWhatsNext.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GradeController : ControllerBase
    {
        private readonly IGradeRepository _gradeRepository;
        public GradeController(IGradeRepository gradeRepository)
        {
            _gradeRepository = gradeRepository;
        }
        // GET: api/<GradeController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_gradeRepository.GetAllGrades());
        }

        // GET api/<GradeController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var grade = _gradeRepository.GetById(id);
            if (grade == null)
            {
                return NotFound();
            }
            return Ok(grade);
        }

        // POST api/<GradeController>
        [HttpPost]
        public IActionResult Grade(Grade grade)
        {
            _gradeRepository.Add(grade);
            return CreatedAtAction("Get", new { id = grade.Id }, grade);
        }

        // PUT api/<GradeController>/5
        [HttpPut("{id}")]
        public IActionResult Update(int id, Grade grade)
        {
            _gradeRepository.Update(grade);
            return Ok(grade);
        }

        // DELETE api/<GradeController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _gradeRepository.Delete(id);
            return NoContent();
        }
    }
}
