using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using project.Authentication;
using project.Data;
using project.Models.Repositories;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();

builder.Services.AddCors(options => {
    options.AddPolicy("CorsPolicy", policy => {
        policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:3000");
    });
});

builder.Services.AddDbContext<DataContext>(options => {
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Use JWT Bearer Authentication
builder.Services.AddAuthentication()
    .AddBearerToken(IdentityConstants.BearerScheme)
    .AddIdentityCookies();
    

builder.Services.AddAuthorizationBuilder()
    .AddPolicy("ApiScope", policy => {
        policy.RequireAuthenticatedUser();
        policy.AddAuthenticationSchemes(IdentityConstants.BearerScheme);
    });

builder.Services.AddIdentityCore<UserModel>(options => {
    options.Password.RequireDigit = false;
    options.Password.RequireLowercase = false;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 4;
    options.Password.RequiredUniqueChars = 0;
})
    .AddEntityFrameworkStores<DataContext>()
    .AddApiEndpoints()
    .AddDefaultTokenProviders();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();

app.UseRouting();

app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

var group = app.MapGroup("/api/v1");

group
    .MapGroup("/auth")
    .MapIdentityApi<UserModel>();

app.UseCors("CorsPolicy");

app.Run();
