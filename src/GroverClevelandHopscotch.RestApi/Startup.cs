﻿using GroverClevelandHopscotch.Core.Interfaces;
using GroverClevelandHopscotch.Infrastructure.Dependencies;
using GroverClevelandHopscotch.RestApi.Middleware;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json.Serialization;
namespace GroverClevelandHopscotch.RestApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddMvc(options =>
            {
                options.Filters.Add(new BubbleUpExceptions());
            }).AddJsonOptions(opt => opt.SerializerSettings.ContractResolver = new DefaultContractResolver());
            ConfigureIoC(services);
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {      
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseMvc();
        }

        public void ConfigureIoC(IServiceCollection services)
        {
            services.AddTransient<IClockMechanics, ClockMechanics>();
            services.AddTransient<IFlatFileMechanics, FlatFileMechanics>();
            services.AddTransient<IIpMechanics, IpMechanics>();          
        }
    }
}