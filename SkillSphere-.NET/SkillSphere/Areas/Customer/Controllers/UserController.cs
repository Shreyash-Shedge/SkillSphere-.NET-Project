using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SkillSphere.DataAccess.Data;
using SkillSphere.DataAccess.Repository.IRepository;
using SkillSphere.Repositories;
using SkillSphere.Utility;
using System.Security.Claims;
using SkillSphere.Models.ViewModels;
using SkillSphere.Models;


namespace SkillSphere.Areas.Customer.Controllers
{
    
    [Area("Customer")]
    public class UserController : Controller
    {
        private readonly ICourseRepository _courseRepository;
        private readonly IConsultationRepository _consultationRepository;
        private readonly ApplicationDbContext _context;
             private readonly IConfiguration _configuration;

        public UserController(ICourseRepository courseRepository, IConsultationRepository consultationRepository, ApplicationDbContext context, IConfiguration configuration)
        {
            _courseRepository = courseRepository;
            _consultationRepository = consultationRepository;
            _context = context;
            _configuration = configuration;
        }

        public IActionResult Index()
        {
            var courses = _courseRepository.GetAllCourses().ToList();
            var consultations = _consultationRepository.GetAllConsultations().ToList();

            // Log the count of courses and consultations
            Console.WriteLine($"Courses Count: {courses.Count}");
            Console.WriteLine($"Consultations Count: {consultations.Count}");

            var viewModel = new UserDashboardViewModel
            {
                Courses = courses,
                Consultations = consultations
            };

            return View(viewModel);
        }

        [Authorize(Roles = SD.Role_Customer)]
        public IActionResult PurchaseCourse(int id)
        {
            var course = _courseRepository.GetCourseById(id);
            if (course == null)
            {
                return NotFound();
            }

            // Logic to add course to the user's list
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userCourse = new UserCourse
            {
                CourseId = course.Id,
                UserId = userId
            };
            _context.UserCourses.Add(userCourse);
            _context.SaveChanges();

            return RedirectToAction("MyCourses");
        }

        [Authorize(Roles = SD.Role_Customer)]
        public IActionResult PurchaseConsultation(int id)
        {
            var consultation = _consultationRepository.GetConsultationById(id);
            if (consultation == null)
            {
                return NotFound();
            }

            // Logic to add consultation to the user's list
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userConsultation = new UserConsultation
            {
                ConsultationId = consultation.Id,
                UserId = userId
            };
            _context.UserConsultations.Add(userConsultation);
            _context.SaveChanges();

            return RedirectToAction("MyConsultations");
        }

        [Authorize(Roles = SD.Role_Customer)]
        [Route("Customer/User/MyCourse")]
        public IActionResult MyCourses()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var courses = _context.UserCourses
                                  .Where(uc => uc.UserId == userId)
                                  .Select(uc => uc.Course)
                                  .ToList();
            return View(courses);
        }

        [Authorize(Roles = SD.Role_Customer)]
        [Route("Customer/User/MyConsultation")]
        public IActionResult MyConsultations()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var consultations = _context.UserConsultations
                                        .Where(uc => uc.UserId == userId)
                                        .Select(uc => uc.Consultation)
                                        .ToList();
            return View(consultations);
        }


        [Route("Customer/User/CourseDetails/{id}")]
        public IActionResult CourseDetails(int id)
        {
            var course = _courseRepository.GetCourseById(id);
            if (course == null)
            {
                return NotFound();
            }
            ViewBag.PaypalClientId = _configuration["PaypalSettings:ClientId"];
            ViewBag.PaypalSecret = _configuration["PaypalSettings:Secret"];
            ViewBag.PaypalUrl = _configuration["PaypalSettings:Url"];
            return View(course);
        }

        [Route("Customer/User/ConsultationDetails/{id}")]
        public IActionResult ConsultationDetails(int id)
        {
            var consultation = _consultationRepository.GetConsultationById(id);
            if (consultation == null)
            {
                return NotFound();
            }
            ViewBag.PaypalClientId = _configuration["PaypalSettings:ClientId"];
            ViewBag.PaypalSecret = _configuration["PaypalSettings:Secret"];
            ViewBag.PaypalUrl = _configuration["PaypalSettings:Url"];
            return View(consultation);
        }

        //[Authorize(Roles = SD.Role_Customer)]
       
        //public async Task<IActionResult> AddToCalendar(int id)
        //{
        //    var consultation = _consultationRepository.GetConsultationById(id);
        //    if (consultation == null)
        //    {
        //        return NotFound();
        //    }

        //    var googleAuth = _configuration.GetSection("GoogleAuth");
        //    string[] scopes = { CalendarService.Scope.Calendar };

        //    var credential = await GoogleWebAuthorizationBroker.AuthorizeAsync(
        //        new ClientSecrets
        //        {
        //            ClientId = googleAuth["ClientId"],
        //            ClientSecret = googleAuth["ClientSecret"]
        //        },
        //        scopes,
        //        "user",
        //        CancellationToken.None);

        //    var service = new CalendarService(new BaseClientService.Initializer()
        //    {
        //        HttpClientInitializer = credential,
        //        ApplicationName = "SkillSphere",
        //    });

        //    var calendarEvent = new Event
        //    {
        //        Summary = consultation.Title,
        //        Description = consultation.Description,
        //        Start = new EventDateTime
        //        {
        //            DateTime = consultation.StartDate,
        //            TimeZone = "Asia/Kolkata"
        //        },
        //        End = new EventDateTime
        //        {
        //            DateTime = consultation.EndDate,
        //            TimeZone = "Asia/Kolkata"
        //        },
        //        Attendees = new List<EventAttendee>
        //    {
        //        new EventAttendee { Email = "attendee@example.com" }
        //    },
        //        ConferenceData = new ConferenceData
        //        {
        //            CreateRequest = new CreateConferenceRequest
        //            {
        //                RequestId = Guid.NewGuid().ToString(),
        //                ConferenceSolutionKey = new ConferenceSolutionKey
        //                {
        //                    Type = "hangoutsMeet"
        //                }
        //            }
        //        }
        //    };

        //    var request = service.Events.Insert(calendarEvent, "primary");
        //    request.ConferenceDataVersion = 1;
        //    var createdEvent = await request.ExecuteAsync();

        //    return Redirect(createdEvent.HtmlLink);
        //}

        //[Authorize(Roles = SD.Role_Customer)]
        //public async Task<IActionResult> AuthorizeGoogleCalendar(int id)
        //{
        //    var googleAuth = _configuration.GetSection("GoogleAuth");
        //    string[] scopes = { CalendarService.Scope.Calendar };

        //    var redirectUri = Url.Action("GoogleCalendarCallback", "User", new { id }, Request.Scheme);

        //    var credential = await GoogleWebAuthorizationBroker.AuthorizeAsync(
        //        new ClientSecrets
        //        {
        //            ClientId = googleAuth["ClientId"],
        //            ClientSecret = googleAuth["ClientSecret"]
        //        },
        //        scopes,
        //        "user",
        //        CancellationToken.None,
        //        new FileDataStore("Google.Apis.Auth")
        //    );

        //    if (credential.Token.IsExpired(credential.Flow.Clock))
        //    {
        //        if (await credential.RefreshTokenAsync(CancellationToken.None))
        //        {
        //            // Redirect to the callback with the consultation ID
        //            return RedirectToAction("GoogleCalendarCallback", new { id });
        //        }
        //    }

        //    // If already authorized, redirect to callback immediately
        //    return RedirectToAction("GoogleCalendarCallback", new { id });
        //}



        //[Authorize(Roles = SD.Role_Customer)]
        //[Route("Customer/User/GoogleCalendarCallback")]
        //public async Task<IActionResult> GoogleCalendarCallback(int id)
        //{
        //    var consultation = _consultationRepository.GetConsultationById(id);
        //    if (consultation == null)
        //    {
        //        return NotFound();
        //    }

        //    var googleAuth = _configuration.GetSection("GoogleAuth");
        //    string[] scopes = { CalendarService.Scope.Calendar };

        //    var credential = await GoogleWebAuthorizationBroker.AuthorizeAsync(
        //        new ClientSecrets
        //        {
        //            ClientId = googleAuth["ClientId"],
        //            ClientSecret = googleAuth["ClientSecret"]
        //        },
        //        scopes,
        //        "user",
        //        CancellationToken.None,
        //        new FileDataStore("Google.Apis.Auth")
        //    );

        //    var service = new CalendarService(new BaseClientService.Initializer()
        //    {
        //        HttpClientInitializer = credential,
        //        ApplicationName = "SkillSphere",
        //    });

        //    var calendarEvent = new Event
        //    {
        //        Summary = consultation.Title,
        //        Description = consultation.Description,
        //        Start = new EventDateTime
        //        {
        //            DateTime = consultation.StartDate,
        //            TimeZone = "Asia/Kolkata"
        //        },
        //        End = new EventDateTime
        //        {
        //            DateTime = consultation.EndDate,
        //            TimeZone = "Asia/Kolkata"
        //        },
        //        Attendees = new List<EventAttendee>
        //{
        //    new EventAttendee { Email = User.FindFirstValue(ClaimTypes.Email) }
        //}
        //    };

        //    var request = service.Events.Insert(calendarEvent, "primary");
        //    var createdEvent = await request.ExecuteAsync();

        //    return Redirect(createdEvent.HtmlLink);
        //}

      


    }
}
