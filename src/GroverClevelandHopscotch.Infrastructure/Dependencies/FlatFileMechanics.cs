﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using GroverClevelandHopscotch.Core.Interfaces;
using GroverClevelandHopscotch.Core.Objects;
namespace GroverClevelandHopscotch.Infrastructure.Dependencies
{
    public class FlatFileMechanics : IFlatFileMechanics
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
                    List<President> presidents = new List<President>() { };
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