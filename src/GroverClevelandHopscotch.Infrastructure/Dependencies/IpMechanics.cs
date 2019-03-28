using System;
using System.IO;
using System.Net;
using System.Text;
using GroverClevelandHopscotch.Core.Interfaces;
namespace GroverClevelandHopscotch.Infrastructure.Dependencies
{
    public class IpMechanics : IIpMechanics
    {
        public string GetIpAddress()
        {
            string failover = null;
            string[] scrappings = new string[] { };
            StringBuilder scrappingSpool = new StringBuilder();
            try
            {
                Scrape("https://www.expressvpn.com/what-is-my-ip", ref scrappingSpool);
            }
            catch (Exception exception)
            {
                scrappingSpool = new StringBuilder();
                Scrape("https://www.ultratools.com/tools/yourIPResult", ref scrappingSpool);
                scrappings = scrappingSpool.ToString().Split("\"".ToCharArray());
                foreach (string scrapping in scrappings)
                {
                    if (scrapping.Contains("/tools/ipWhoisLookupResult?ipAddress"))
                    {
                        failover = scrapping.Split("=".ToCharArray())[1].Replace("\n", "");
                    }
                }
            }
            if (failover != null) return failover;
            scrappings = scrappingSpool.ToString().Split(">".ToCharArray());
            int counter = 0;
            foreach (string scrapping in scrappings)
            {
                if (scrapping.IndexOf("Your public IP address") > -1)
                {
                    return scrappings[counter + 2].Split("<".ToCharArray())[0].Replace("\n", "");
                }
                if (scrapping.IndexOf("Your IP address") > -1)
                {
                    return scrappings[counter + 2].Split("<".ToCharArray())[0].Replace("\n", "");
                }
                counter++;
            }
            return null;
        }

        private void Scrape(string url, ref StringBuilder scrappingSpool)
        {
            int counter = 0;
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
            {
                using (Stream stream = response.GetResponseStream())
                {
                    byte[] buffer = new byte[1000000];
                    do
                    {
                        counter = stream.Read(buffer, 0, buffer.Length);
                        if (counter != 0)
                        {
                            string chunk = Encoding.ASCII.GetString(buffer, 0, counter);
                            scrappingSpool.Append(chunk);
                        }
                    } while (counter > 0);
                }
            }
        }
    }
}