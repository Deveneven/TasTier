using System;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using TasTierAPI.MockData;
using TasTierAPI.Models;

namespace TasTierAPI.Services
{
    public class DatabaseService:IDatabaseService
    {
        public DatabaseService(IConfiguration configuration)
        {
            //get Data from conf file;
        }

        public IEnumerable<Recipe> GetRecipes()
        {
            RecipeMockData rmd = new RecipeMockData();

            return rmd.getMockRecipes();
        }
    }
}
