using Microsoft.AspNetCore.Mvc;
using TeacherWhatsNext.Models;
using TeacherWhatsNext.Repositories;

namespace TeacherWhatsNext.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepo;

        public CommentController(ICommentRepository commentRepo)
        {
            _commentRepo = commentRepo;
        }
        // GET: api/<CommentsController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_commentRepo.GetAllComments());
        }

        // GET api/<CommentController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var comment = _commentRepo.GetCommentById(id);
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment);
        }

        // POST api/<CommentsController>
        [HttpPost]
        public IActionResult Post(Comment newComment)
        {
            _commentRepo.AddComment(newComment);
            return CreatedAtAction("Get", new { id = newComment.Id }, newComment);
        }

        // PUT api/<CommentsController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Comment comment)
        {
            if (id != comment.Id)
            {
                return BadRequest();
            }
            _commentRepo.EditComment(comment);
            return NoContent();
        }

        // DELETE api/<CommentsController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _commentRepo.DeleteComment(id);
            return NoContent();
        }
    }
}
