using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Skillsphere.Core.Interfaces;
using Skillsphere.Core.Models;
using SkillSphere.Core.DTOs;
using SkillSphere.Services;
using System.Security.Claims;


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

            var courseDtos = courses.Select(course => new
            {
                course.Id,
                course.Title,
                course.Description,
                course.Price,
                Modules = course.Modules.Select(module => new
                {
                    module.Id,
                    module.Title,
                    module.Content
                })
            });

            return Ok(courseDtos);
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

            var courseDto = new
            {
                course.Id,
                course.Title,
                course.Description,
                course.Price,
                Modules = course.Modules.Select(module => new
                {
                    module.Id,
                    module.Title,
                    module.Content,
                    Videos = module.Videos.Select(video => new
                    {
                        video.Id,
                        video.Title,
                        video.FilePath
                    })
                })
            };

            return Ok(courseDto);
        }

        [HttpPost("creator/courses")]
        [Authorize(Roles = "Creator")]
        public async Task<IActionResult> CreateCourse([FromBody] CourseCreateDto courseDto)
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
                CreatorId = creatorId
            };

            await _courseService.CreateCourseAsync(course);
            await _unitOfWork.CompleteAsync();

            return CreatedAtAction(nameof(GetCourseForCreator), new { courseId = course.Id }, course);
        }

        [HttpPost("creator/courses/{courseId}/modules")]
        [Authorize(Roles = "Creator")]
        public async Task<IActionResult> AddModule(int courseId, [FromBody] ModuleCreateDto moduleDto)
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

            var module = new Module
            {
                Title = moduleDto.Title,
                Content = moduleDto.Content,
                CourseId = courseId
            };

            await _courseService.AddModuleAsync(module);
            await _unitOfWork.CompleteAsync();

            return CreatedAtAction(nameof(GetCourseForCreator), new { courseId = course.Id }, module);
        }

        [HttpPost("creator/modules/{moduleId}/videos")]
        [Authorize(Roles = "Creator")]
        public async Task<IActionResult> AddVideo(int moduleId, [FromForm] VideoCreateDto videoDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var module = await _courseService.GetModuleByIdAsync(moduleId);
            if (module == null)
            {
                return NotFound();
            }

            var filePath = await SaveFile(videoDto.File);

            var video = new Video
            {
                Title = videoDto.Title,
                FilePath = filePath,
                ModuleId = moduleId
            };

            await _courseService.AddVideoAsync(video);
            await _unitOfWork.CompleteAsync();

            return CreatedAtAction(nameof(GetCourseForCreator), new { courseId = module.CourseId }, video);
        }

        [HttpPut("creator/courses/{courseId}")]
        [Authorize(Roles = "Creator")]
        public async Task<IActionResult> UpdateCourse(int courseId, [FromBody] CourseUpdateDto courseDto)
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

            await _courseService.UpdateCourseAsync(course);
            await _unitOfWork.CompleteAsync();

            return NoContent();
        }

        [HttpPut("creator/courses/{courseId}/modules/{moduleId}")]
        [Authorize(Roles = "Creator")]
        public async Task<IActionResult> UpdateModule(int courseId, int moduleId, [FromBody] ModuleUpdateDto moduleDto)
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

            var module = await _courseService.GetModuleByIdAsync(moduleId);
            if (module == null || module.CourseId != courseId)
            {
                return Forbid();
            }

            module.Title = moduleDto.Title;
            module.Content = moduleDto.Content;

            await _courseService.UpdateModuleAsync(module);
            await _unitOfWork.CompleteAsync();

            return NoContent();
        }

        [HttpPut("creator/modules/{moduleId}/videos/{videoId}")]
        [Authorize(Roles = "Creator")]
        public async Task<IActionResult> UpdateVideo(int moduleId, int videoId, [FromForm] VideoUpdateDto videoDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var module = await _courseService.GetModuleByIdAsync(moduleId);
            if (module == null)
            {
                return NotFound();
            }

            var video = module.Videos.FirstOrDefault(v => v.Id == videoId);
            if (video == null)
            {
                return NotFound();
            }

            video.Title = videoDto.Title;

            if (videoDto.File != null)
            {
                var filePath = await SaveFile(videoDto.File);
                video.FilePath = filePath;
            }

            await _courseService.UpdateVideoAsync(video);
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

        [HttpDelete("creator/modules/{moduleId}")]
        [Authorize(Roles = "Creator")]
        public async Task<IActionResult> DeleteModule(int moduleId)
        {
            var module = await _courseService.GetModuleByIdAsync(moduleId);
            if (module == null)
            {
                return NotFound();
            }

            var creatorId = int.Parse(User.FindFirstValue("CreatorId")!);
            var course = await _courseService.GetCourseByIdAsync(module.CourseId);
            if (course == null || course.CreatorId != creatorId)
            {
                return Forbid();
            }

            await _courseService.DeleteModuleAsync(moduleId);
            await _unitOfWork.CompleteAsync();

            return NoContent();
        }

        [HttpDelete("creator/modules/{moduleId}/videos/{videoId}")]
        [Authorize(Roles = "Creator")]
        public async Task<IActionResult> DeleteVideo(int moduleId, int videoId)
        {
            var module = await _courseService.GetModuleByIdAsync(moduleId);
            if (module == null)
            {
                return NotFound();
            }

            var video = module.Videos.FirstOrDefault(v => v.Id == videoId);
            if (video == null)
            {
                return NotFound();
            }

            await _courseService.DeleteVideoAsync(videoId);
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
