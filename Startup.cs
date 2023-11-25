using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using project.Data;
using project.Interfaces.Repositories;
using project.Models.Repositories;

namespace project
{

    public class Startup {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            // Other service registrations...

            services.AddDbContext<DataContext>(options =>
                options.UseNpgsql(Configuration.GetConnectionString("DefaultConnection")));


            //services.AddScoped<ITodoRepository, TodoRepository>();

            // how do i inject the datacontext into the repository?

            services.AddScoped<ITodoRepository, TodoRepository>(provider => {
                 var dataContext = provider.GetService<DataContext>();
                 return new TodoRepository(dataContext ?? throw new System.ArgumentNullException(nameof(dataContext)));
             });

            services.AddControllers();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        
        }
    }
}
