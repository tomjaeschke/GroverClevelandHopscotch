using System;
using System.Collections.Generic;
using System.IO;
using GroverClevelandHopscotch.Core.Interfaces;
using GroverClevelandHopscotch.Core.Objects;
namespace GroverClevelandHopscotch.Infrastructure.Dependencies
{
    public class FlatFileMechanics: IFlatFileMechanics
    {
        public List<President> GetPresidents()
        {
            string file = "BackingStore.csv";
            string path = System.IO.Path.GetFullPath(file);
            path = path.Replace(file, "bin\\Debug\\netcoreapp2.0\\" + file);
            using (FileStream fileStream = new FileStream(path, FileMode.Open))
            {
                using (StreamReader streamReader = new StreamReader(fileStream))
                {
                    List<President> presidents = new List<President>() {};
                    foreach (string scrapping in streamReader.ReadToEnd().Split("\r\n"))
                    {
                        President president = new President();
                        string[] scrappings = scrapping.Split(",");
                        if (scrappings.Length > 2)
                        {
                            president.HasNonconsecutiveTerms = Convert.ToBoolean(scrappings[2]);
                        }
                        if (scrappings.Length > 1)
                        {
                            president.Party = scrappings[1];
                        }
                        president.Name = scrappings[0];
                        presidents.Add(president);
                    }
                    return presidents;
                }
            }
        }
    }
}