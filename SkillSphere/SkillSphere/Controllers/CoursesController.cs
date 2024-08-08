using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Skillsphere.Core.Interfaces;
using Skillsphere.Core.Models;
using SkillSphere.Core.DTOs;
using SkillSphere.Services;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SkillSphere.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly CourseService _courseService;

        public CoursesController(IUnitOfWork unitOfWork, CourseService courseService)
        {
            _unitOfWork = unitOfWork;
            _courseService = courseService;
        }

        [HttpGet("user/courses")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetAllCoursesForUser()
        {
            var userId = int.Parse(User.FindFirstValue("UserId")!);
            var purchases = await _unitOfWork.Purchases.GetPurchasesByUserIdAsync(userId);
            var courseIds = purchases.Where(p => p.PaymentSuccess).Select(p => p.CourseId).ToList();
            var courses = await _courseService.GetCoursesByIdsAsync(courseIds);

            return Ok(courses);
        }

        [HttpGet("user/courses/{courseId}")]
        [Authorize(Roles = "User")]
        public async Task<IActionResult> GetCourseForUser(int courseId)
        {
            var userId = int.Parse(User.FindFirstValue("UserId")!);
            var purchase = await _unitOfWork.Purchases.GetPurchaseByUserIdAndCourseIdAsync(userId, courseId);
            if (purchase == null || !purchase.PaymentSuccess)
            {
                return Forbid();
            }

            var course = await _courseService.GetCourseByIdAsync(courseId);
            if (course == null)
            {
                return NotFound();
            }

            return Ok(course);
        }

        [HttpGet("creator/courses")]
        [Authorize(Roles = "Creator")]
        public async Task<IActionResult> GetAllCoursesForCreator()
        {
            var creatorId = int.Parse(User.FindFirstValue("CreatorId")!);
            var courses = await _courseService.GetCoursesByCreatorIdAsync(creatorId);
            return Ok(courses);
        }

        [HttpGet("creator/courses/{courseId}")]
        [Authorize(Roles = "Creator")]
        public async Task<IActionResult> GetCourseForCreator(int courseId)
        {
            var creatorId = int.Parse(User.FindFirstValue("CreatorId")!);
            var course = await _courseService.GetCourseByIdAsync(courseId);
            if (course == null || course.CreatorId != creatorId)
            {
                return Forbid();
            }

            return Ok(course);
        }

        [HttpPost("creator/courses")]
        [Authorize(Roles = "Creator")]
        public async Task<IActionResult> CreateCourse([FromForm] CourseCreateDto courseDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var creatorId = int.Parse(User.FindFirstValue("CreatorId")!);

            var course = new Course
            {
                Title = courseDto.Title,
                Description = courseDto.Description,
                Price = courseDto.Price,
                CreatorId = creatorId,
                Modules = new List<Module>()
            };

            foreach (var moduleDto in courseDto.Modules)
            {
                var module = new Module
                {
                    Title = moduleDto.Title,
                    Content = moduleDto.Content,
                    Videos = new List<Video>()
                };

                foreach (var videoDto in moduleDto.Videos)
                {
                    var filePath = await SaveFile(videoDto.File);
                    var video = new Video
                    {
                        Title = videoDto.Title,
                        FilePath = filePath
                    };

                    module.Videos.Add(video);
                }

                course.Modules.Add(module);
            }

            await _courseService.CreateCourseAsync(course);
            await _unitOfWork.CompleteAsync();

            return CreatedAtAction(nameof(GetCourseForCreator), new { courseId = course.Id }, course);
        }


        [HttpPut("creator/courses/{courseId}")]
        [Authorize(Roles = "Creator")]
        public async Task<IActionResult> UpdateCourse(int courseId, [FromForm] CourseUpdateDto courseDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var creatorId = int.Parse(User.FindFirstValue("CreatorId")!);

            var course = await _courseService.GetCourseByIdAsync(courseId);
            if (course == null || course.CreatorId != creatorId)
            {
                return Forbid();
            }

            course.Title = courseDto.Title;
            course.Description = courseDto.Description;
            course.Price = courseDto.Price;
            course.Modules.Clear();

            foreach (var moduleDto in courseDto.Modules)
            {
                var module = new Module
                {
                    Title = moduleDto.Title,
                    Content = moduleDto.Content,
                    Videos = new List<Video>()
                };

                foreach (var videoDto in moduleDto.Videos)
                {
                    var filePath = await SaveFile(videoDto.File);
                    var video = new Video
                    {
                        Title = videoDto.Title,
                        FilePath = filePath
                    };

                    module.Videos.Add(video);
                }

                course.Modules.Add(module);
            }

            await _courseService.UpdateCourseAsync(course);
            await _unitOfWork.CompleteAsync();

            return NoContent();
        }

        [HttpDelete("creator/courses/{courseId}")]
        [Authorize(Roles = "Creator")]
        public async Task<IActionResult> DeleteCourse(int courseId)
        {
            var creatorId = int.Parse(User.FindFirstValue("CreatorId")!);
            var course = await _courseService.GetCourseByIdAsync(courseId);
            if (course == null || course.CreatorId != creatorId)
            {
                return Forbid();
            }

            await _courseService.DeleteCourseAsync(courseId);
            await _unitOfWork.CompleteAsync();

            return NoContent();
        }

        private async Task<string> SaveFile(IFormFile file)
        {
            var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");
            if (!Directory.Exists(uploadPath))
            {
                Directory.CreateDirectory(uploadPath);
            }
            var filePath = Path.Combine(uploadPath, file.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            return filePath;
        }
    }
}
