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
            int counter = 0;
            string url = "https://www.expressvpn.com/what-is-my-ip";
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            StringBuilder scrappingSpool = new StringBuilder();
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
            string[] scrappings = scrappingSpool.ToString().Split(">".ToCharArray());
            counter = 0;
            foreach (string scrapping in scrappings)
            {
                if (scrapping.IndexOf("Your public IP address") > -1)
                {
                    return scrappings[counter + 2].Split("<".ToCharArray())[0];
                }
                if (scrapping.IndexOf("Your IP address") > -1)
                {
                    return scrappings[counter + 2].Split("<".ToCharArray())[0];
                }
                counter++;
            }
            return null;
        }
    }
}