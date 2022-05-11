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

        public bool CheckCredidentials(string login, string password)
        {
            AccountMockData amd = new AccountMockData();
            IEnumerable<Account> accounts = new List<Account>();
            accounts = amd.GetAccounts();
            foreach(Account acc in accounts)
            {
                if((acc.login == login)&&(acc.password == password))
                {
                    return true;
                }
            }
            return false;

        }
    }
}
