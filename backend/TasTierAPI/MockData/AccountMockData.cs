using System;
using System.Collections.Generic;
using TasTierAPI.Models;

namespace TasTierAPI.MockData
{
    public class AccountMockData
    {
        public IEnumerable<Account> GetAccounts()
        {
            List<Account> accounts = new List<Account>();
            Account acc1 = new Account
            {
                login = "login1",
                password = "pass1",
                email = "test@test.pl"
            };
            Account acc2 = new Account
            {
                login = "login2",
                password = "pass2",
                email = "test1@test.pl"
            };
            Account acc3 = new Account
            {
                login = "login3",
                password = "pass3",
                email = "test2@test.pl"
            };

            accounts.Add(acc1);
            accounts.Add(acc2);
            accounts.Add(acc3);

            return accounts;
        }
    }
}
