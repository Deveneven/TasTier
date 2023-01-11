using System;
namespace TasTierAPI.Models
{
	public class MetricDefinition
	{
		public int id { get; set; }
        public string name { get; set; }
        public int weightPerUnit { get; set; }
	}
}

