using System;
using System.Collections.Generic;
using System.IO;
using GroverClevelandHopscotch.Core.Interfaces;
using GroverClevelandHopscotch.Core.Objects;
namespace GroverClevelandHopscotch.Infrastructure.Dependencies
{
    public class FlatFileMechanics : IFlatFileMechanics
    {
        public void DeletePresident(string id)
        {
            List<President> presidents = GetPresidents();
            int counter = 0;
            List<int> indexesForDeletion = new List<int>(){};
            foreach (var president in presidents)
            {
                if (president.Name == id)
                {
                    indexesForDeletion.Add(counter);
                }
                counter++;
            }
            indexesForDeletion.Reverse();
            foreach (int index in indexesForDeletion)
            {
                presidents.RemoveAt(index);
            }
            SetPresidents(presidents);
        }

        public List<President> GetPresidents()
        {
            string file = "BackingStore.csv";
            string path = System.IO.Path.GetFullPath(file);
            path = path.Replace(file, "bin\\Debug\\netcoreapp2.0\\" + file);
            using (FileStream fileStream = new FileStream(path, FileMode.Open))
            {
                using (StreamReader streamReader = new StreamReader(fileStream))
                {
                    List<President> presidents = new List<President>() { };
                    string concatenation = streamReader.ReadToEnd();
                    if (concatenation.Contains("\n") && !concatenation.Contains("\r\n"))
                    {
                        concatenation = concatenation.Replace("\n","\r\n");
                    }
                    foreach (string scrapping in concatenation.Split("\r\n"))
                    {
                        President president = new President();
                        string[] scrappings = scrapping.Split(",");
                        if (scrappings.Length > 2)
                        {
                            president.HasNonconsecutiveTerms = Convert.ToBoolean(scrappings[2]);
                        }
                        if (scrappings.Length > 1 && !String.IsNullOrWhiteSpace(scrappings[1]))
                        {
                            president.Party = scrappings[1].Trim();
                        }
                        president.Name = scrappings[0].Trim();
                        presidents.Add(president);
                    }
                    if (presidents[presidents.Count-1].Name == null || presidents[presidents.Count - 1].Name == "")
                    {
                        presidents.RemoveAt(presidents.Count - 1);
                    }
                    return presidents;
                }
            }
        }

        public void SetPresidents(List<President> presidents)
        {
            string file = "BackingStore.csv";
            string path = System.IO.Path.GetFullPath(file);
            path = path.Replace(file, "bin\\Debug\\netcoreapp2.0\\" + file);
            using (StreamWriter streamWriter = File.CreateText(path))
            { 
                if (presidents.Count == 0)
                {
                    streamWriter.Write("");
                }
                else
                {
                    bool hasWipedFile = false;
                    foreach (President president in presidents)
                    {
                        string line = (president.Name + "").Trim();
                        if (president.HasNonconsecutiveTerms)
                        {
                            if (president.Party != null && president.Party.Trim() != "")
                            {
                                line += ", " + president.Party.Trim() + ", true";
                            }
                            else
                            {
                                line += ", , true";
                            }
                        }
                        else
                        {
                            if (president.Party != null && president.Party.Trim() != "")
                            {
                                line += ", " + president.Party.Trim();
                            }
                        }
                        if (hasWipedFile)
                        {
                            streamWriter.WriteLine(line);
                        }
                        else
                        {
                            streamWriter.Write(line + "\r\n");
                            hasWipedFile = true;
                        }
                    }
                }
            }      
        }
    }
}