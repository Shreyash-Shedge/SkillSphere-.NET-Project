using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Skillsphere.Core.Interfaces;
using Skillsphere.Core.Models;
using Skillsphere.Infrastructure.Data;
using Skillsphere.Infrastructure.Mappings;
using Skillsphere.Infrastructure.Repositories;
using Skillsphere.Seed;
using Skillsphere.Services;
using SkillSphere.Core.Interfaces;
using SkillSphere.Core.Models;
using SkillSphere.Infrastructure.Repositories;
using SkillSphere.Services;
using System.Text;
using System.Text.Json.Serialization;

namespace SkillSphere
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add logging
            builder.Logging.ClearProviders();
            builder.Logging.AddConsole();

            // 1. Connection to Database
            // Configure the DbContext to use SQL Server with the connection string from appsettings.json
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            // 2. Adding Identity
            // Configure Identity to use our custom User class and set password requirements
            builder.Services.AddIdentity<User, IdentityRole<int>>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 8;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = true;
            })
            .AddEntityFrameworkStores<AppDbContext>()
            .AddDefaultTokenProviders();

            // 3. JWT authentication
            // Configure JWT authentication with the settings from appsettings.json
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = builder.Configuration["Jwt:Issuer"],
                    ValidAudience = builder.Configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
                };
            });

            // 4. Register AutoMapper
            // Register AutoMapper with the specified profile
            builder.Services.AddAutoMapper(typeof(AutoMapperProfile));

            // 5. Add Controllers
            // Add controllers as services for dependency injection
            builder.Services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
            });

            // 6. Add Scoped Services
            // Register our custom services and repositories for dependency injection
            builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
            builder.Services.AddScoped<IAuthService, AuthService>();
            builder.Services.AddScoped<ICourseRepository, CourseRepository>();
            builder.Services.AddScoped<IPurchaseRepository, PurchaseRepository>();
            builder.Services.AddScoped<CourseService>();
            builder.Services.AddScoped<PurchaseService>();
            builder.Services.AddScoped<IConsultationService, ConsultationService>();
            builder.Services.AddScoped<IConsultationRepository, ConsultationRepository>();

            // Register RazorpayPaymentService and ensure HttpClient is available for dependency injection
            builder.Services.AddScoped<IPaymentService, RazorpayPaymentService>();
            builder.Services.AddHttpClient<IPaymentService, RazorpayPaymentService>(); // Added HttpClient registration

            // Add Razorpay configuration from appsettings.json
            builder.Services.Configure<RazorpaySettings>(builder.Configuration.GetSection("Razorpay"));

            // 7. Add Swagger for API documentation ( StackOverFlow)
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Test01", Version = "v1" });

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "JWT Authorization header using the Bearer scheme."

                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                          new OpenApiSecurityScheme
                          {
                              Reference = new OpenApiReference
                              {
                                  Type = ReferenceType.SecurityScheme,
                                  Id = "Bearer"
                              }
                          },
                         Array.Empty<string>()
                    }
                });
            });

            // 8. Adding CORS policy
            // Configure CORS to allow requests from specified origins
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", builder =>
                    builder.WithOrigins("http://localhost:3000") // Add specific origin
                           .AllowAnyMethod()
                           .AllowAnyHeader()
                           .AllowCredentials());
            });

            // 9. Add Authorization policies
            // Configure authorization policies for roles
            builder.Services.AddAuthorization(options =>
            {
                options.AddPolicy("Admin", policy => policy.RequireRole("Admin"));
            });

            var app = builder.Build();

            // Seed roles and admin user
            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var context = services.GetRequiredService<AppDbContext>();
                var userManager = services.GetRequiredService<UserManager<User>>();
                var roleManager = services.GetRequiredService<RoleManager<IdentityRole<int>>>();
                var logger = services.GetRequiredService<ILogger<SeedData>>();
                await SeedData.SeedRolesAndAdminAsync(userManager, roleManager, logger);
            }

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            // Adding routing + CORS + authentication + authorization
            app.UseRouting();

            // Use CORS
            app.UseCors("CorsPolicy");

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}