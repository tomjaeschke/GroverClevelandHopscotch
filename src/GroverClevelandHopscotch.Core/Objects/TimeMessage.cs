using System;
using GroverClevelandHopscotch.Core.Interfaces;
namespace GroverClevelandHopscotch.Core.Objects
{
    public class TimeMessage
    {
        public string FriendlyFormatTime { get; set; }

        public TimeMessage(IClockMechanics clockMechanics)
        {
            string day;
            string hour;
            string month;
            DateTime time = clockMechanics.GetTime();      

            switch (time.Day)
            {
                case 1:
                    day = "1st";
                    break;
                case 2:
                    day = "2nd";
                    break;
                case 3:
                    day = "3rd";
                    break;
                case 21:
                    day = "21st";
                    break;
                case 22:
                    day = "22nd";
                    break;
                case 23:
                    day = "23rd";
                    break;
                case 31:
                    day = "31st";
                    break;
                default:
                    day = time.Day + "th";
                    break;
            }

            switch (time.Hour)
            {
                case 0:
                    hour = "midnight";
                    break;
                case 12:
                    hour = "noon";
                    break;
                default:
                    if (time.Hour < 12)
                    {
                        hour = time.Hour + " in the ante meridiem";
                    }
                    else
                    {
                        hour = (time.Hour - 12) + " in the post meridiem";
                    }
                    break;
            }

            switch (time.Month)
            {
                case 1:
                    month = "January";
                    break;
                case 2:
                    month = "February";
                    break;
                case 3:
                    month = "March";
                    break;
                case 4:
                    month = "April";
                    break;
                case 5:
                    month = "May";
                    break;
                case 6:
                    month = "June";
                    break;
                case 7:
                    month = "July";
                    break;
                case 8:
                    month = "August";
                    break;
                case 9:
                    month = "September";
                    break;
                case 10:
                    month = "October";
                    break;
                case 11:
                    month = "November";
                    break;
                case 12:
                    month = "December";
                    break;
                default:
                    throw new Exception("The number for month doesn't make any sense.");
            }

            FriendlyFormatTime = $"{time.Minute} past {hour} on {month}, {day} of {time.Year}";
        }
    }
}